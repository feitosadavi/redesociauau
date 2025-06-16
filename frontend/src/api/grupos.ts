export const GRUPOS_API = {
  create: async (data: {
    nome: string;
    descricao: string;
    criado_por: number;
  }): Promise<any> => {
    return {
      id_grupo: Math.floor(Math.random() * 10000),
      ...data,
      data_criacao: new Date().toISOString().split("T")[0],
    };
  },

  addMember: async (
    grupoId: number,
    usuarioId: number,
    funcao: string
  ): Promise<any> => {
    return {
      id_grupo: grupoId,
      id_usuario: usuarioId,
      funcao,
    };
  },

  listAll: async (): Promise<any[]> => {
    return [
      {
        id_grupo: 101,
        nome: "Tecnologia",
        descricao: "Grupo para amantes de tecnologia",
        criado_por: 1,
        data_criacao: "2024-01-10",
      },
    ];
  },
};
