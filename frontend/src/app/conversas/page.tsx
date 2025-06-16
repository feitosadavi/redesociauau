"use client";

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "@/app/@components/ConversaSidebar";
import useIsMobile from "@/hooks/useIsMobile";
import DefaultLayout from "@/app/@components/Layouts/DefaultLaout";
import LoadingScreen from "@/app/@components/LoadingScreen";
import Contatos from "./components/Contatos";
import Conversa from "./components/Conversa";
import HamburgerToogleBtn from "@/app/@components/Buttons/HamburgerToogleBtn";

const ConversasPage: React.FC = () => {
  const [listaContatosActive, setListaContatosActive] =
    useState<boolean>(false);
  const listaContatosTriggerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = ({ target }: MouseEvent): void => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(target as Node) &&
      listaContatosTriggerRef.current &&
      !listaContatosTriggerRef.current.contains(target as Node)
    ) {
      setListaContatosActive(false);
    }
  };

  return (
    <DefaultLayout>
      <div
        className={`relative flex h-[89.5vh] w-[100vw] overflow-hidden rounded-[7px] bg-gray-dark shadow-card dark:shadow-1 lg:h-[80vh] lg:w-full`}
      >
        {isMobile ? (
          <>
            <HamburgerToogleBtn
              sidebarOpen={listaContatosActive}
              setSidebarOpen={setListaContatosActive}
            />
            <Sidebar
              active={listaContatosActive}
              setActive={setListaContatosActive}
              className="w-[70%]"
              left
            >
              <Contatos />
            </Sidebar>
          </>
        ) : (
          <Contatos />
        )}
        <Conversa />
      </div>
    </DefaultLayout>
  );
};

export default ConversasPage;
