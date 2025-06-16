import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../app";
import { JWT_SECRET } from "../config";

export const registerUser = async (
  email: string,
  nome: string,
  password: string,
  birthDate: Date
) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.usuario.create({
    data: {
      email,
      nome: nome,
      data_nascimento: birthDate,
      tags: "",
      foto_perfil: "default.jpg",
      password: hashedPassword,
    },
  });
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuario.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id_usuario }, JWT_SECRET, {
    expiresIn: "24h",
  });

  return {
    id: user.id_usuario,
    nome: user.nome,
    email: user.email,
    token,
  };
};
