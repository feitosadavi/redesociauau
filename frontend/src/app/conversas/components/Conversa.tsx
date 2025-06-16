import { UserIcon } from "@/icons";
import useConversasStore from "@/store/useConversasStore";
import { MessageHistory } from "@/types";
import React, { useEffect, useRef } from "react";
import InfoContato from "./InfoContato";

const Conversa: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { cliente, toggleInfoContato } = useConversasStore();

  const scrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [cliente?.messageHistory]);

  if (cliente === null) return null;
  if (cliente?.messageHistory)
    return (
      <div className="relative flex w-full flex-col overflow-hidden p-2">
        <InfoContato />

        <div className="flex h-full w-full flex-col">
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-lg p-4 hover:bg-dark-2"
            onClick={() => toggleInfoContato()}
          >
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold text-white">
                {cliente.nomeCliente}
              </p>
              <p className="text-md font-bold text-gray-300">
                {cliente.telefoneCliente}
              </p>
            </div>
            <UserIcon size="34" />
          </div>
          <hr className="my-4 border-green-100" />

          {/* Scrollable container */}
          <div
            className="flex h-full w-full flex-col overflow-y-auto p-4 pb-5"
            ref={scrollContainerRef}
          >
            {Object.keys(cliente.messageHistory.mensagens).map((data) => (
              <React.Fragment key={data}>
                <div className="mb-5 self-center rounded bg-slate-900 px-4 py-1">
                  <p className="text-xs font-bold text-white">{data}</p>
                </div>
                {(cliente.messageHistory as MessageHistory).mensagens[data].map(
                  ({ role, content, data: msgData }, i) => {
                    const horario = new Date(msgData).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour12: false,
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    );
                    return (
                      <div
                        key={`${msgData}-${i}`}
                        className={`flex flex-col ${
                          role === "user"
                            ? "self-start rounded-2xl rounded-tl-none bg-teal-800"
                            : "self-end rounded-2xl rounded-tr-none bg-dark-2"
                        } mb-4 max-w-lg px-3 py-2 font-bold text-white`}
                      >
                        <p className="text-[11pt]">{content}</p>
                        <p className="ml-7 mt-[-2px] self-end text-[8pt] text-gray-200">
                          {horario}
                        </p>
                      </div>
                    );
                  },
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
};

export default Conversa;
