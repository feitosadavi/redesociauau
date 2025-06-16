import { prisma } from '../app';
import { sendNotification } from './notification.service';

export const sendPrivateMessage = async (senderId: number, recipientId: number, content: string) => {
  const message = await prisma.mensagem.create({
    data: {
      conteudo: content,
      enviado_por: senderId,
      recebido_por: recipientId,
      status: 'enviada'
    },
    include: {
      remetente: {
        select: {
          nome_usuario: true,
          foto_perfil: true
        }
      }
    }
  });

  // Enviar notificação em tempo real
  await sendNotification(
    recipientId,
    `Nova mensagem de ${message.remetente.nome_usuario}`,
    { type: 'message', messageId: message.id_mensagem }
  );

  return message;
};

export const getConversation = async (userId1: number, userId2: number, page: number, limit: number) => {
  const skip = (page - 1) * limit;

  const messages = await prisma.mensagem.findMany({
    skip,
    take: limit,
    where: {
      OR: [
        { enviado_por: userId1, recebido_por: userId2 },
        { enviado_por: userId2, recebido_por: userId1 }
      ]
    },
    orderBy: { data_envio: 'desc' },
    include: {
      remetente: {
        select: {
          nome_usuario: true,
          foto_perfil: true
        }
      }
    }
  });

  // Marcar mensagens como lidas
  await prisma.mensagem.updateMany({
    where: {
      enviado_por: userId2,
      recebido_por: userId1,
      status: 'enviada'
    },
    data: { status: 'lida' }
  });

  return messages;
};

export const getUserConversations = async (userId: number) => {
  return prisma.$queryRaw`
    SELECT u.id_usuario, u.nome_usuario, u.foto_perfil, MAX(m.data_envio) as ultima_mensagem
    FROM mensagens m
    JOIN usuarios u ON (
      (m.enviado_por = u.id_usuario AND m.recebido_por = ${userId}) OR
      (m.recebido_por = u.id_usuario AND m.enviado_por = ${userId})
    )
    WHERE u.id_usuario != ${userId}
    GROUP BY u.id_usuario, u.nome_usuario, u.foto_perfil
    ORDER BY ultima_mensagem DESC
  `;
};
