// usuarios
interface Usuario {
  id_usuario: number;
  email: string;
  nome_usuario: string;
  foto_perfil: string;
  data_nascimento: string; // ISO date string (YYYY-MM-DD)
  tags: string; // Pode ser string separada por vírgulas, ou transformar em string[]
}

// mensagens
interface Mensagem {
  id_mensagem: number;
  conteudo: string;
  enviado_por: number; // FK para usuarios.id_usuario
  recebido_por: number; // FK para usuarios.id_usuario
}

// grupos
interface Grupo {
  id_grupo: number;
  nome: string;
  descricao: string;
  criado_por: number; // FK para usuarios.id_usuario
  data_criacao: string; // ISO date
}

// lista_mebros_grupo
interface ListaMembrosGrupo {
  id_grupo: number; // FK para grupos.id_grupo
  id_usuario: number; // FK para usuarios.id_usuario
  funcao: string; // 'admin' | 'membro' idealmente, mas no banco é varchar(50)
}

// seguidores
interface Seguidor {
  id_seguidor: number; // FK para usuarios.id_usuario
  id_seguido: number; // FK para usuarios.id_usuario
}

// postagens
interface Postagem {
  _id: number;
  conteudo: string;
  tipo: string; // Pode ser 'texto', 'imagem', etc.
  data_criacao: string; // ISO date
  upvote: number;
  downvote: number;
  postado_por: number; // FK para usuarios.id_usuario
}

// comentarios
interface Comentario {
  id_comentario: number;
  conteudo: string;
  upvote: number;
  downvote: number;
  id_postagem: number; // FK para postagens.id_postagem
  id_usuario: number; // FK para usuarios.id_usuario
  id_comentario_pai?: number | null; // Comentário em comentário
}
