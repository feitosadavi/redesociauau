"use client";

import { ChartIcon } from "@/icons";
import ChatIcon from "@/icons/ChatIcon";
import ThumbDown from "@/icons/ThumbDown";
import ThumbUp from "@/icons/ThumbUp";
import useUsuarioStore from "@/store/useUsuariosStore";
import { Avaliacao, Comentario, Postagem, Usuario } from "@/types";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Button from "./Buttons/Button";

export type TipoPostagem =
  | "texto"
  | "imagem"
  | "video"
  | "imagem+texto"
  | "video+texto";

export interface Props {
  postagem: Postagem;
}

const NAO_AVALIADO = "nao_avaliado";
type FoiAvaliadoComUpvote = boolean | "nao_avaliado";
const PostagemComp: React.FC<Props> = ({ postagem }) => {
  const {
    _id,
    conteudo,
    tipo,
    data_criacao,
    postado_por,
    avaliacoes,
    comentarios: _comentarios,
  } = postagem;

  const { usuario } = useUsuarioStore();

  const [comentarios, setComentarios] = useState<Comentario[]>(_comentarios);
  const [novoComentario, setNovoComentario] = useState("");

  useEffect(() => {
    // setComentarios(postagem.comentarios || []);
  }, [postagem.comentarios]);

  const [comentarioFilhoASerAdicionado, setComentarioFilhoASerAdicionado] =
    useState<null | string>(null);

  const adicionarComentario = (id_postagem: string) => {
    if (!novoComentario.trim()) return;
    if (comentarioFilhoASerAdicionado) {
      adicionarComentarioFilho(comentarioFilhoASerAdicionado);
      setComentarioFilhoASerAdicionado(null);
      return;
    }
    setComentarios([
      ...comentarios,
      {
        _id: "101",
        conteudo: novoComentario,
        id_postagem,
        usuario: usuario as Usuario,
      },
    ]);
    setNovoComentario("");
  };

  const adicionarComentarioFilho = (idPai: string) => {
    if (!novoComentario.trim()) return;
    const comentariosAlterados: Comentario[] = comentarios.map(
      ({ _id, comentarios, ...resto }) => {
        if (idPai === _id) {
          if (comentarios)
            comentarios?.push({
              _id: "102",
              conteudo: novoComentario,
              id_postagem: _id,
              usuario: usuario as Usuario,
            });
          else
            comentarios = [
              {
                _id: "102",
                conteudo: novoComentario,
                id_postagem: _id,
                usuario: usuario as Usuario,
              },
            ];
        }
        return { _id, comentarios, ...resto };
      }
    );

    setComentarios(comentariosAlterados);

    setNovoComentario("");
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const comentarComentario = (idComentarioPai: string) => {
    setComentarioFilhoASerAdicionado(idComentarioPai);
    inputRef.current?.focus();
  };

  const renderConteudo = () => {
    if (tipo === "texto") {
      return (
        <p className="text-gray-800 dark:text-white text-base">{conteudo}</p>
      );
    }

    if (tipo === "imagem") {
      return (
        <img
          src={conteudo}
          alt="Imagem da postagem"
          className="w-full rounded-lg mt-2"
        />
      );
    }

    if (tipo === "video") {
      return (
        <video controls className="w-full rounded-lg mt-2">
          <source src={conteudo} type="video/mp4" />
          Seu navegador não suporta vídeo.
        </video>
      );
    }

    if (tipo === "imagem+texto") {
      return (
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 text-base">{conteudo}</p>
          <img
            src={conteudo}
            alt="Imagem com texto"
            className="w-full rounded-lg"
          />
        </div>
      );
    }

    if (tipo === "video+texto") {
      return (
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 text-base">{conteudo}</p>
          <video controls className="w-full rounded-lg">
            <source src={conteudo} type="video/mp4" />
            Seu navegador não suporta vídeo.
          </video>
        </div>
      );
    }

    return <p className="text-red-600">Tipo de conteúdo desconhecido</p>;
  };

  const renderComentarios = (comentarios: Comentario[], ehFilho?: boolean) => {
    return (
      <ul className="space-y-2">
        {comentarios?.map(
          (
            { conteudo, _id, avaliacoes, comentarios: comentariosFilhos },
            index
          ) => (
            <>
              <li
                key={index}
                className="text-gray-800 relative dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md p-2 text-sm"
              >
                <div className="flex items-center mb-2 gap-2 dark:text-white text-sm text-gray-600 font-semibold">
                  <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-300">
                    <Image
                      src={postagem.postado_por.foto_perfil}
                      alt={`Foto de ${postagem.postado_por.nome}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-md">{postado_por.nome}</span>
                </div>
                <p className="text-[12pt]">{conteudo}</p>
                <BotoesDeAvaliacao
                  usuarioId={(usuario as Usuario)?._id}
                  avaliacoes={avaliacoes}
                />
                {!ehFilho && (
                  <button
                    onClick={() => comentarComentario(_id)}
                    className="absolute bottom-2 right-3"
                  >
                    <ChatIcon className="hover:text-primary cursor-pointer" />
                  </button>
                )}
              </li>
              <div className="ml-5">
                {comentariosFilhos &&
                  renderComentarios(comentariosFilhos, true)}
              </div>
            </>
          )
        )}
      </ul>
    );
  };

  return (
    <div className="bg-white dark:text-white rounded-xl w-[70vw] shadow-md dark:bg-p dark:bg-gray-dark p-5 mb-6 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <div className="flex justify-center items-center gap-2 dark:text-white text-sm text-gray-600 font-semibold">
          <div className="w-13 h-13 relative rounded-full overflow-hidden border border-gray-300">
            <Image
              src={postagem.postado_por.foto_perfil}
              alt={`Foto de ${postagem.postado_por.nome}`}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-lg">{postado_por.nome}</span>
        </div>
        <div className="text-sm text-gray-400 dark:text-white">
          {new Date(data_criacao).toLocaleDateString("pt-BR")}
        </div>
      </div>

      <div className="mb-4">{renderConteudo()}</div>

      <div className="flex gap-4 justify-between text-sm text-gray-500">
        <button className="dark:text-white">
          <ChatIcon className="hover:text-primary cursor-pointer" />
        </button>
        <BotoesDeAvaliacao
          usuarioId={(usuario as Usuario)?._id}
          avaliacoes={avaliacoes}
        />
      </div>

      {/* Seção de Comentários */}
      <div className="mt-6 border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">
          Comentários
        </h3>

        {comentarios.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-300 text-sm">
            Nenhum comentário ainda.
          </p>
        ) : (
          renderComentarios(comentarios)
        )}

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Adicionar um comentário..."
            value={novoComentario}
            ref={inputRef}
            onChange={(e) => setNovoComentario(e.target.value)}
          />
          <Button
            onClick={() => adicionarComentario(_id)}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark text-sm"
          >
            Comentar
          </Button>
        </div>
      </div>
    </div>
  );
};

interface BotoesDeAvaliacao {
  avaliacoes?: Avaliacao[];
  usuarioId: string;
}
const BotoesDeAvaliacao: React.FC<BotoesDeAvaliacao> = ({
  avaliacoes,
  usuarioId,
}) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  useEffect(() => {
    avaliacoes?.forEach((avaliacao) => {
      if (avaliacao.upvotes) setUpvotes((prev) => prev + 1);
      else setDownvotes((prev) => prev + 1);
    });
  }, []);

  const checkAvaliacoes = () => {
    if (!avaliacoes || avaliacoes?.length === 0) return NAO_AVALIADO;

    const avaliador = avaliacoes.find(
      ({ avaliado_por }) => avaliado_por._id === usuarioId
    );

    if (!avaliador) return NAO_AVALIADO;
    return avaliador.upvotes;
  };

  const [foiAvaliadoComUpvote, setFoiAvaliadoComUpvote] =
    useState<FoiAvaliadoComUpvote>(checkAvaliacoes());

  const like = () => {
    if (foiAvaliadoComUpvote === NAO_AVALIADO) {
      setUpvotes(upvotes + 1);
      setFoiAvaliadoComUpvote(true);
    } else if (foiAvaliadoComUpvote === true) {
      if (upvotes > 0) setUpvotes(upvotes - 1);
      setFoiAvaliadoComUpvote(NAO_AVALIADO);
    } else {
      if (downvotes > 0) setDownvotes(downvotes - 1);
      setUpvotes(upvotes + 1);
      setFoiAvaliadoComUpvote(true);
    }
  };

  const dislike = () => {
    if (foiAvaliadoComUpvote === NAO_AVALIADO) {
      setDownvotes(downvotes + 1);
      setFoiAvaliadoComUpvote(false);
    } else if (foiAvaliadoComUpvote === false) {
      if (downvotes > 0) setDownvotes(downvotes - 1);
      setFoiAvaliadoComUpvote(NAO_AVALIADO);
    } else {
      if (upvotes > 0) setUpvotes(upvotes - 1);
      setDownvotes(downvotes + 1);
      setFoiAvaliadoComUpvote(false);
    }
  };

  return (
    <div className="flex gap-4">
      <span className="flex items-center gap-1">
        <button onClick={like} className="dark:text-white">
          <ThumbUp
            className="dark:text-white hover:text-primary"
            fill={foiAvaliadoComUpvote === true ? "currentColor" : "none"}
          />
        </button>
        <span className="text-lg dark:text-white">{upvotes}</span>
      </span>
      <span className="flex items-center gap-1">
        <button onClick={dislike} className="dark:text-white">
          <ThumbDown
            className="dark:text-white hover:text-primary"
            fill={foiAvaliadoComUpvote === false ? "currentColor" : "none"}
          />
        </button>
        <span className="text-lg dark:text-white">{downvotes}</span>
      </span>
    </div>
  );
};

export default PostagemComp;
