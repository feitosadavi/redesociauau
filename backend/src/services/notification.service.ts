import { Server, Socket } from 'socket.io';
import { prisma } from '../app';
import { JWT_SECRET } from '../config';
import jwt from 'jsonwebtoken';

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
    connectionStateRecovery: {
      maxDisconnectionDuration: 2 * 60 * 1000,
      skipMiddlewares: true
    }
  });

  io.use(async (socket: any, next: any) => {
    try {
      const token = socket.handshake.auth.token ||
                   socket.handshake.headers['authorization']?.split(' ')[1];

      if (!token) throw new Error('Token não fornecido');

      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
      const user = await prisma.usuario.findUnique({
        where: { id_usuario: decoded.userId },
        select: { id_usuario: true, nome_usuario: true }
      });

      if (!user) throw new Error('Usuário não encontrado');

      socket.data.user = user;
      next();
    } catch (error) {
      next(new Error('Falha na autenticação'));
    }
  });

  io.on('connection', (socket: any) => {
    console.log(`Usuário conectado: ${socket.data.user.nome_usuario}`);

    // Entrar na sala do usuário
    socket.join(`user_${socket.data.user.id_usuario}`);

    socket.on('disconnect', () => {
      console.log(`Usuário desconectado: ${socket.data.user.nome_usuario}`);
    });
  });
};

export const getIO = () => {
  if (!io) throw new Error('Socket.io não inicializado');
  return io;
};

export const sendNotification = async (userId: number, message: string, data: any) => {
  const io = getIO();

  // Enviar via Socket.io se o usuário estiver online
  io.to(`user_${userId}`).emit('notification', { message, data });

  // Armazenar no banco de dados para histórico
  await prisma.notificacao.create({
    data: {
      id_usuario: userId,
      mensagem: message,
      tipo: data.type || 'generic',
      dados: JSON.stringify(data),
      lida: false,
      data_criacao: new Date()
    }
  });
};

export const getUserNotifications = async (userId: number, limit: number = 20) => {
  return prisma.notificacao.findMany({
    where: { id_usuario: userId },
    orderBy: { data_criacao: 'desc' },
    take: limit
  });
};

export const markNotificationAsRead = async (notificationId: number) => {
  return prisma.notificacao.update({
    where: { id_notificacao: notificationId },
    data: { lida: true }
  });
};
