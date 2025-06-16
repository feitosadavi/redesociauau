"use client";

import DefaultLayout from "@/app/@components/Layouts/DefaultLaout";
import React, { useState } from "react";
import { POSTAGENS_API } from "@/api";
import Postagem from "./@components/Postagem";
import { Postagem as PostagemType } from "@/types";
import Button from "./@components/Buttons/Button";

export default function Home() {
  const [postagens, setPostagens] = useState<PostagemType[]>([]);
  const [conteudo, setConteudo] = useState("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  React.useEffect(() => {
    (async () => {
      const data = await POSTAGENS_API.list();
      setPostagens(data);
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("conteudo", conteudo);

    // Detecta tipo
    if (arquivo) {
      const tipoMime = arquivo.type;
      if (tipoMime.startsWith("image/")) {
        formData.append("tipo", "imagem");
        formData.append("conteudo", URL.createObjectURL(arquivo));
      } else if (tipoMime.startsWith("video/")) {
        formData.append("tipo", "video");
        formData.append("conteudo", URL.createObjectURL(arquivo));
      }
    } else {
      formData.append("tipo", "texto");
    }

    formData.append("postado_por", "1"); // exemplo de usuário fixo

    const novaPostagem = await POSTAGENS_API.create(formData);
    setPostagens((prev) => [novaPostagem, ...prev]);
    setConteudo("");
    setArquivo(null);
  };

  return (
    <DefaultLayout>
      <div className="flex items-center justify-center flex-col p-4 w-full max-w-3xl mx-auto">
        {/* Formulário de nova publicação */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6 w-[70vw] border border-gray-300"
        >
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Criar nova publicação
          </h2>
          <textarea
            className="flex-1 border w-full border-gray-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
            placeholder="Escreva algo..."
            rows={3}
            value={conteudo}
            onChange={(e) => setConteudo(e.target.value)}
          />
          <div className="flex w-full mt-4 justify-between items-center">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setArquivo(e.target.files?.[0] ?? null)}
              className="mb-3"
            />
            <Button isLoading={isLoading}>Publicar</Button>
          </div>
        </form>

        {/* Lista de postagens */}
        {postagens.map(({ _id, ...postagem }) => (
          <Postagem key={_id} postagem={{ _id, ...postagem }} />
        ))}
      </div>
    </DefaultLayout>
  );
}
