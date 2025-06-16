export const MENSAGENS_API = {
  send: async (data: {
    conteudo: string;
    enviado_por: number;
    recebido_por: number;
  }): Promise<any> => {
    return {
      id_mensagem: Math.floor(Math.random() * 10000),
      ...data,
    };
  },

  listForUser: async (userId: number): Promise<any[]> => {
    return [
      {
        id_mensagem: 123,
        conteudo: "Olá, tudo bem?",
        enviado_por: userId,
        recebido_por: 2,
      },
      {
        id_mensagem: 124,
        conteudo: "Sim, e você?",
        enviado_por: 2,
        recebido_por: userId,
      },
    ];
  },
};
