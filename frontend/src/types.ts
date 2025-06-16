// usuarios
export interface Usuario {
  _id: string;
  email: string;
  nome: string;
  foto_perfil: string;
  data_nascimento: string; // ISO date string (YYYY-MM-DD)
  tags: string; // Pode ser string separada por vírgulas, ou transformar em string[]
}

// mensagens
export interface Mensagem {
  id_mensagem: string;
  conteudo: string;
  enviado_por: number; // FK para usuarios.id_usuario
  recebido_por: number; // FK para usuarios.id_usuario
}

// grupos
export interface Grupo {
  id_grupo: string;
  nome: string;
  descricao: string;
  criado_por: number; // FK para usuarios.id_usuario
  data_criacao: string; // ISO date
}

// lista_mebros_grupo
export interface ListaMembrosGrupo {
  id_grupo: string; // FK para grupos.id_grupo
  id_usuario: string; // FK para usuarios.id_usuario
  funcao: string; // 'admin' | 'membro' idealmente, mas no banco é varchar(50)
}

// seguidores
export interface Seguidor {
  id_seguidor: string; // FK para usuarios.id_usuario
  id_seguido: string; // FK para usuarios.id_usuario
}

export interface Avaliacao {
  avaliado_por: Usuario;
  item_avaliado_id: string;
  upvotes: boolean;
}

// postagens
export interface Postagem {
  _id: string;
  conteudo: string;
  tipo: string; // Pode ser 'texto', 'imagem', etc.
  data_criacao: string; // ISO date
  postado_por: Usuario; // FK para usuarios.id_usuario
  avaliacoes?: Avaliacao[];
  comentarios: Comentario[];
}

// comentarios
export interface Comentario {
  _id: string;
  conteudo: string;
  id_postagem: string; // FK para postagens.id_postagem
  usuario: Usuario; // FK para usuarios.id_usuario
  avaliacoes?: Avaliacao[];
  comentarios?: Array<Omit<Comentario, "comentarios">>; // Comentário em comentário
}
