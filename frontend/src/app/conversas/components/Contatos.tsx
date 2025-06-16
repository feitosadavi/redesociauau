import { CLIENTES_API } from "@/api";
import { createWebSocket, WebSocket } from "@/api/config";
import SearchBar from "@/app/@components/Header/SearchBar";
import LoadingScreen from "@/app/@components/LoadingScreen";
import Spinner from "@/app/@components/Spinner";
import { useApp } from "@/app/@context/AppContext";
import useConversasStore from "@/store/useConversasStore";
import { ICliente, Messages } from "@/types";
import { useEffect, useRef, useState } from "react";

const LIMIT = 7;

const Contatos: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [search, setSearch] = useState<ICliente[] | null>(null);
  const [loadingClientesScroll, setLoadingClientesScroll] = useState(false);
  const [count, setCount] = useState(0);
  const [clientesBeforeSearch, setClientesBeforeSearch] = useState<{
    items: ICliente[];
    count: number;
    lock: boolean;
  }>({ items: [], count: 0, lock: false });
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false);
  const contatosRef = useRef<HTMLDivElement>(null);
  const socket = useRef<WebSocket | null>(null);
  const { user } = useApp();
  const page = useRef(0);

  let {
    changeLoading,
    cliente,
    clientes,
    insertClientes,
    getClientes,
    resetClientes,
    switchCliente,
    removeCliente,
    updateCliente,
  } = useConversasStore();

  useEffect(() => {
    changeLoading(true);
    CLIENTES_API.findAll({ page: page.current, limit: LIMIT })
      .then(({ clientes, count }) => {
        resetClientes(clientes);
        setCount(count);
        const conversaStillExists = clientes.filter(
          (cliente) => cliente._id === cliente?._id,
        )?.[0];
        if (!conversaStillExists) removeCliente();
      })
      .finally(() => changeLoading(false));

    createWebSocket({
      exceptionCb: () => setLoadingClientesScroll(false),
    }).then((_socket) => {
      socket.current = _socket;

      socket.current.on("newCliente", (e: ICliente) => {
        insertClientes([e]);
        setCount((prev) => prev + 1);
      });

      socket.current.on("clientesLoadResult", ({ clientes, count }) => {
        setLoadingClientesScroll(false);
        insertClientes(clientes);
      });

      socket.current.on("clientesSearchResult", ({ items, count }) => {
        setCount(count);
        resetClientes(items);
        setIsSearchLoading(false);
      });

      socket.current.on(
        "newMsg",
        ({
          _id,
          mensagens,
        }: {
          _id: string;
          mensagens?: Messages;
          visualizadoPor: string[];
        }) => {
          const conversaStorage = localStorage.getItem("conversas-storage");
          if (conversaStorage) {
            const conversa = JSON.parse(conversaStorage);
            cliente = conversa.state.cliente;
          }

          // if the message is from a selected client
          if (cliente && cliente?.messageHistory?._id === _id) {
            updateCliente({
              ...cliente,
              messageHistory: {
                ...cliente?.messageHistory,
                mensagens: {
                  ...cliente.messageHistory.mensagens,
                  ...mensagens,
                },
              },
            });
          }

          const _clientes = getClientes().map((cliente) => {
            if (cliente.messageHistory?._id === _id) {
              const verifi = { ...cliente, unseen: cliente.unseen + 1 };
              return verifi;
            } else {
              return cliente;
            }
          });

          resetClientes(_clientes);
        },
      );
    });

    const container = contatosRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    const container = contatosRef.current;
    if (!container) return;

    const isBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 5;

    if (isBottom && !loadingClientesScroll && !(LIMIT * page.current > count)) {
      setLoadingClientesScroll(true);
      socket.current?.emit("loadMoreClientes", {
        page: page.current + 1,
        limit: LIMIT,
      });
      page.current++;
    }
  };

  const handleConversaChange = (selectedConversa: ICliente): void => {
    switchCliente(selectedConversa._id);

    if (selectedConversa.messageHistory && selectedConversa.unseen > 0)
      setMessageAsViewed(selectedConversa.messageHistory._id);
  };

  const setMessageAsViewed = (conversaId: string) => {
    socket.current?.emit("viewMsg", { clienteId: conversaId });

    const _clientes = clientes.map((c) => {
      if (c.messageHistory && c.messageHistory._id === conversaId) c.unseen = 0;
      return c;
    });

    resetClientes(_clientes);
  };

  const handleSearch = (searchTerm: string): void => {
    if (searchTerm) {
      setIsSearchLoading(true);
      if (!clientesBeforeSearch.lock)
        setClientesBeforeSearch({ items: clientes, count, lock: true });

      socket.current?.emit("searchClientes", { search: searchTerm });
    } else {
      resetClientes(clientesBeforeSearch.items);
      setClientesBeforeSearch((prev) => ({ ...prev, lock: false }));
      setCount(clientesBeforeSearch.count);
      setSearch(null);
    }
  };

  const timeoutRef = useRef<any>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => handleSearch(event.target.value),
      700,
    );
  };

  return (
    <div
      ref={contatosRef}
      className="h-full w-[300px] overflow-y-auto rounded-[7px] border-x bg-gray-dark px-4 pt-7 lg:w-[420px]"
    >
      <h1 className="mb-4 text-2xl font-bold text-white">Conversas </h1>
      <SearchBar
        value={searchValue}
        onChange={handleChange}
        placeholder="Pesquisar pelo nome ou telefone"
      />
      {/* <input
        type="text"
        value={searchValue}
        onChange={handleChange}
        placeholder="Pesquisar pelo nome ou telefone"
        className="mb-4 w-full rounded border p-2"
      /> */}
      <p className="mb-2 text-sm">{count} conversa(s)</p>
      <div className="relative h-full space-y-4">
        {isSearchLoading ? (
          <LoadingScreen />
        ) : (
          (search ?? clientes).map((item) => {
            return (
              <div
                key={item._id}
                onClick={() => handleConversaChange(item)}
                className={`cursor-pointer rounded border p-4 hover:bg-dark-2 ${item._id === cliente?._id ? "bg-dark-2" : ""}`}
              >
                <h2 className="font-semibold text-white">{item.nomeCliente}</h2>
                <p className="text-sm text-gray-300">{item.telefoneCliente}</p>
                {!item.messageHistory?.visualizadoPor?.includes(user._id) ? (
                  <span>
                    {item.unseen > 0 && `${item.unseen} Novas mensagens`}
                  </span>
                ) : (
                  ""
                )}
              </div>
            );
          })
        )}
      </div>
      {loadingClientesScroll && (
        <div className="my-5 flex w-full justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Contatos;
