"use client";

import { EditIcon } from "@/icons";
import useUsuarioStore from "@/store/useUsuariosStore";
import { IUser } from "@/types";
import Link from "next/link";
import React from "react";

interface Props {
  user: IUser;
}

const EditButtonCsr: React.FC<Props> = ({ user }) => {
  const { setUser } = useUsuarioStore();

  return (
    <Link
      href={`/usuarios/${user._id}`}
      onClick={() => {
        setUser(user);
      }}
      className="hover:text-blue"
    >
      <EditIcon />
    </Link>
  );
};

export default EditButtonCsr;
