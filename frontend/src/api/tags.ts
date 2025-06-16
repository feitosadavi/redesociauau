export const TAGS_API = {
  create: async (data: { nome: string; criado_por: number }): Promise<any> => {
    return {
      id: Math.floor(Math.random() * 10000),
      ...data,
    };
  },

  listAll: async (): Promise<any[]> => {
    return [
      { id: 1, name: "música", criado_por: 2 },
      { id: 2, name: "futebol", criado_por: 1 },
      { id: 3, name: "cinema", criado_por: 3 },
    ];
  },
};
