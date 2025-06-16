import { Postagem, Usuario } from "@/types";

const usuariosMock: Usuario[] = [
  {
    _id: 1,
    nome: "João Silva",
    email: "joao@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=1",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: 2,
    nome: "Maria Oliveira",
    email: "maria@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=2",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: 3,
    nome: "Carlos Souza",
    email: "carlos@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=3",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: 4,
    nome: "Ana Paula",
    email: "ana@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=4",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: 5,
    nome: "Lucas Mendes",
    email: "lucas@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=5",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
];

export const POSTAGENS_API = {
  create: async (data: FormData): Promise<Postagem> => {
    const userId = Number(data.get("postado_por"));
    const user = usuariosMock.find((u) => u._id === userId)!;

    return {
      _id: Math.floor(Math.random() * 10000),
      tipo: data.get("tipo") as Postagem["tipo"],
      conteudo: data.get("conteudo") as string,
      data_criacao: new Date().toISOString().split("T")[0],
      upvote: 0,
      downvote: 0,
      postado_por: user,
    };
  },

  comment: async (data: {
    id_postagem: number;
    id_usuario: number;
    conteudo: string;
    id_comentario_pai?: number;
  }): Promise<any> => {
    return {
      id_comentario: Math.floor(Math.random() * 10000),
      ...data,
      upvote: 0,
      downvote: 0,
    };
  },

  list: async (): Promise<Postagem[]> => {
    return [
      {
        _id: 1,
        conteudo: "Primeira postagem",
        tipo: "texto",
        data_criacao: "2025-06-14",
        upvote: 10,
        downvote: 2,
        postado_por: usuariosMock[0],
      },
      {
        _id: 2,
        conteudo: "https://example.com/foto1.jpg",
        tipo: "imagem",
        data_criacao: "2025-06-13",
        upvote: 25,
        downvote: 0,
        postado_por: usuariosMock[1],
      },
      {
        _id: 3,
        conteudo: "Curtam meu novo vídeo! https://example.com/video1.mp4",
        tipo: "video+texto",
        data_criacao: "2025-06-12",
        upvote: 30,
        downvote: 5,
        postado_por: usuariosMock[2],
      },
      {
        _id: 4,
        conteudo: "Bom dia, mundo!",
        tipo: "texto",
        data_criacao: "2025-06-11",
        upvote: 5,
        downvote: 1,
        postado_por: usuariosMock[0],
      },
      {
        _id: 5,
        conteudo: "https://example.com/video2.mp4",
        tipo: "video",
        data_criacao: "2025-06-10",
        upvote: 18,
        downvote: 3,
        postado_por: usuariosMock[1],
      },
      {
        _id: 6,
        conteudo: "Uma imagem vale mais que mil palavras",
        tipo: "imagem+texto",
        data_criacao: "2025-06-09",
        upvote: 22,
        downvote: 2,
        postado_por: usuariosMock[3],
      },
      {
        _id: 7,
        conteudo: "Alguém indo ao evento hoje?",
        tipo: "texto",
        data_criacao: "2025-06-08",
        upvote: 12,
        downvote: 0,
        postado_por: usuariosMock[4],
      },
      {
        _id: 8,
        conteudo: "https://example.com/foto2.jpg",
        tipo: "imagem",
        data_criacao: "2025-06-07",
        upvote: 16,
        downvote: 4,
        postado_por: usuariosMock[2],
      },
      {
        _id: 9,
        conteudo: "Vídeo da apresentação: https://example.com/video3.mp4",
        tipo: "video+texto",
        data_criacao: "2025-06-06",
        upvote: 40,
        downvote: 6,
        postado_por: usuariosMock[0],
      },
      {
        _id: 10,
        conteudo: "Final de semana chegando!",
        tipo: "texto",
        data_criacao: "2025-06-05",
        upvote: 7,
        downvote: 0,
        postado_por: usuariosMock[1],
      },
    ];
  },
};
