import { Postagem, Usuario, Comentario } from "@/types";

export const usuariosMock: Usuario[] = [
  {
    _id: "1",
    nome: "João Silva",
    email: "joao@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=1",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: "2",
    nome: "Maria Oliveira",
    email: "maria@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=2",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: "3",
    nome: "Carlos Souza",
    email: "carlos@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=3",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: "4",
    nome: "Ana Paula",
    email: "ana@example.com",
    foto_perfil: "https://i.pravatar.cc/150?img=4",
    data_nascimento: "25/05/2003",
    tags: "animais",
  },
  {
    _id: "5",
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
    // const user = usuariosMock.find((u) => u._id === userId)!;

    return {
      _id: "dsfdf",
      tipo: data.get("tipo") as Postagem["tipo"],
      conteudo: data.get("conteudo") as string,
      data_criacao: new Date().toISOString().split("T")[0],
      postado_por: {} as any,
      comentarios: [],
    };
  },

  comment: async (data: {
    id_postagem: number;
    id_usuario: number;
    conteudo: string;
    _id_pai?: number;
  }): Promise<Comentario> => {
    // const usuario = usuariosMock.find((u) => u._id === data.id_usuario)!;
    return {
      _id: Math.floor(Math.random() * 10000),
      conteudo: data.conteudo,
      id_postagem: data.id_postagem,
      usuario: {} as Usuario,
      upvotes: 0,
      downvotes: 0,
      _id_pai: data._id_pai ?? null,
    } as any;
  },

  list: async (): Promise<Postagem[]> => {
    return [
      {
        _id: "1",
        conteudo: "Primeira postagem",
        tipo: "texto",
        data_criacao: "2025-06-14",
        postado_por: usuariosMock[0],
        avaliacoes: [
          {
            avaliado_por: usuariosMock[0],
            item_avaliado_id: "1",
            upvotes: true,
          },
        ],
        comentarios: [
          {
            _id: "101",
            conteudo: "Muito bom!",
            id_postagem: "1",
            usuario: usuariosMock[1],
            comentarios: [
              {
                _id: "101",
                conteudo: "Muito bom!",
                id_postagem: "1",
                usuario: usuariosMock[1],
                avaliacoes: [
                  {
                    avaliado_por: usuariosMock[0],
                    item_avaliado_id: "101",
                    upvotes: false,
                  },
                ],
              },
            ],
            avaliacoes: [
              {
                avaliado_por: usuariosMock[0],
                item_avaliado_id: "101",
                upvotes: true,
              },
            ],
          },
          {
            _id: "102",
            conteudo: "Concordo com você.",
            id_postagem: "1",
            usuario: usuariosMock[2],
          },
        ],
      },
      {
        _id: "2",
        conteudo: "https://example.com/foto1.jpg",
        tipo: "imagem",
        data_criacao: "2025-06-13",
        postado_por: usuariosMock[1],
        comentarios: [],
      },
      {
        _id: "3",
        conteudo: "Curtam meu novo vídeo! https://example.com/video1.mp4",
        tipo: "video+texto",
        data_criacao: "2025-06-12",
        postado_por: usuariosMock[2],
        comentarios: [
          {
            _id: "201",
            conteudo: "Muito criativo!",
            id_postagem: "3",
            usuario: usuariosMock[4],
          },
        ],
      },
      {
        _id: "4",
        conteudo: "Bom dia, mundo!",
        tipo: "texto",
        data_criacao: "2025-06-11",
        postado_por: usuariosMock[0],
        comentarios: [],
      },
      {
        _id: "5",
        conteudo: "https://example.com/video2.mp4",
        tipo: "video",
        data_criacao: "2025-06-10",
        postado_por: usuariosMock[1],
        comentarios: [],
      },
      {
        _id: "6",
        conteudo: "Uma imagem vale mais que mil palavras",
        tipo: "imagem+texto",
        data_criacao: "2025-06-09",
        postado_por: usuariosMock[3],
        comentarios: [],
      },
      {
        _id: "7",
        conteudo: "Alguém indo ao evento hoje?",
        tipo: "texto",
        data_criacao: "2025-06-08",
        postado_por: usuariosMock[4],
        comentarios: [],
      },
      {
        _id: "8",
        conteudo: "https://example.com/foto2.jpg",
        tipo: "imagem",
        data_criacao: "2025-06-07",
        postado_por: usuariosMock[2],
        comentarios: [],
      },
      {
        _id: "9",
        conteudo: "Vídeo da apresentação: https://example.com/video3.mp4",
        tipo: "video+texto",
        data_criacao: "2025-06-06",
        postado_por: usuariosMock[0],
        comentarios: [],
      },
      {
        _id: "1",
        conteudo: "Final de semana chegando!",
        tipo: "texto",
        data_criacao: "2025-06-05",
        postado_por: usuariosMock[1],
        comentarios: [],
      },
    ];
  },
};
