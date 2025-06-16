"use client";

import { ChartIcon } from "@/icons";
import ChatIcon from "@/icons/ChatIcon";
import ThumbDown from "@/icons/ThumbDown";
import ThumbUp from "@/icons/ThumbUp";
import useUsuarioStore from "@/store/useUsuariosStore";
import { Postagem } from "@/types";
import Image from "next/image";
import React, { useState } from "react";

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

const PostagemComp: React.FC<Props> = ({ postagem }) => {
  const {
    conteudo,
    tipo,
    data_criacao,
    upvote: _upvote,
    downvote: _downvote,
    postado_por,
    avaliacoes,
  } = postagem;

  const { usuario } = useUsuarioStore();

  const [upvotes, setUpvotes] = useState(_upvote);
  const [downvotes, setDownvotes] = useState(_downvote);

  const checkAvaliacoes = () => {
    if (!avaliacoes || avaliacoes?.length > 0) return NAO_AVALIADO;

    const avaliador = avaliacoes.find(
      ({ avaliado_por }) => avaliado_por._id === usuario?._id
    );

    if (!avaliador) return NAO_AVALIADO;
    return avaliador.upvote;
  };

  // se NAO_AVALIADO -> não foi avaliado ainda
  const [foiAvaliadoComUpvote, setFoiAvaliadoComUpvote] = useState<
    boolean | "nao_avaliado"
  >(checkAvaliacoes());

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

  const like = () => {
    console.log({ foiAvaliadoComUpvote });

    if (foiAvaliadoComUpvote === NAO_AVALIADO) {
      console.log("primeiro");

      setUpvotes(upvotes + 1);
      setFoiAvaliadoComUpvote(true);
    } else if (foiAvaliadoComUpvote === true) {
      // Desfaz o upvote
      if (upvotes > 0) setUpvotes(upvotes - 1);
      setFoiAvaliadoComUpvote(NAO_AVALIADO);
    } else {
      // Remove downvote anterior, se houver
      if (foiAvaliadoComUpvote === false && downvotes > 0) {
        setDownvotes(downvotes - 1);
      }
      setUpvotes(upvotes + 1);
      setFoiAvaliadoComUpvote(true);
    }
  };

  const dislike = () => {
    console.log({ foiAvaliadoComUpvote });

    if (foiAvaliadoComUpvote === NAO_AVALIADO) {
      console.log("primeiro");

      setDownvotes(downvotes + 1);
      setFoiAvaliadoComUpvote(false);
    } else if (foiAvaliadoComUpvote === false) {
      // Desfaz o downvote
      if (downvotes > 0) setDownvotes(downvotes - 1);
      setFoiAvaliadoComUpvote(NAO_AVALIADO);
    } else {
      // Remove upvote anterior, se houver
      if (foiAvaliadoComUpvote === true && upvotes > 0) {
        setUpvotes(upvotes - 1);
      }
      setDownvotes(downvotes + 1);
      setFoiAvaliadoComUpvote(false);
    }
  };

  return (
    <div className="bg-white dark:text-white rounded-xl w-[50rem] shadow-md dark:bg-p dark:bg-gray-dark p-5 mb-6 border border-gray-200">
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

      <div className="mb-4 ">{renderConteudo()}</div>

      <div className="flex gap-4 justify-between text-sm text-gray-500">
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <button onClick={like} className="dark:text-white ">
              <ThumbUp
                className="dark:text-white hover:text-primary"
                fill={`${foiAvaliadoComUpvote !== NAO_AVALIADO && !foiAvaliadoComUpvote ? "bg-primary" : "none"}`}
              />
            </button>
            <span className="text-lg dark:text-white">{upvotes}</span>
          </span>
          <span className="flex items-center gap-1">
            <button onClick={dislike} className="dark:text-white ">
              <ThumbDown
                className="dark:text-white hover:text-primary"
                fill={`${foiAvaliadoComUpvote !== NAO_AVALIADO && !foiAvaliadoComUpvote ? "bg-primary" : "none"}`}
              />
            </button>
            <span className="text-lg dark:text-white">{downvotes}</span>
          </span>
        </div>
        <button className="dark:text-white">
          <ChatIcon className="hover:text-primary" />
        </button>
      </div>
    </div>
  );
};

export default PostagemComp;
