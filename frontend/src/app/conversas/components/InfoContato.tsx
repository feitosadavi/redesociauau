import { CLIENTES_API, USERS_API } from "@/api";
import DefaultSelectOption from "@/app/@components/SelectOption/DefaultSelectOption";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ArrowDown, UserIcon } from "@/icons";
import useConversasStore from "@/store/useConversasStore";
import { IUser, UserRole } from "@/types";
import { useEffect, useState } from "react";

const InfoContato: React.FC = () => {
  let { cliente, infoContatoActive } = useConversasStore();
  const [convertido, setConvertido] = useState(false);
  const [user] = useLocalStorage<IUser>("user", null);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const getColorBasedOnStatus = {
    remarcado: "orange-500",
    agendado: "blue-500",
    desmarcado: "red-500",
    visitado: "green-500",
  };
  if (!cliente) return null;
  const {
    nomeCliente,
    telefoneCliente,
    convertido: clienteConvertido,
    agendamentos,
  } = cliente;

  useEffect(() => {
    USERS_API.findAll().then((_users) => {
      setUsers(_users.filter((_user) => _user.role === UserRole.CAPTADOR));
    });
    setConvertido(clienteConvertido);
  }, []);

  const handleConversao = async () => {
    CLIENTES_API.update({
      id: (cliente as any)._id,
      data: {
        convertido: !convertido,
      },
    });
    setConvertido(!convertido);
  };

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const _selectedUser = users.find(
      (user) => user._id === e.currentTarget.value,
    );
    setSelectedUser(_selectedUser);
    CLIENTES_API.transferir({
      id: cliente._id,
      transferidoPara: e.currentTarget.value,
    });
  };

  return (
    <div
      className={`absolute right-0 top-0 z-1 h-full w-64 rounded-r-[7px] bg-dark shadow-lg transition-transform ${
        infoContatoActive ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex flex-col items-center p-6">
        <UserIcon size="60" />

        <p className="text-lg font-bold text-white">{nomeCliente}</p>
        <p className="mb-5 text-sm font-semibold text-gray-300">
          {telefoneCliente}
        </p>
        <button
          onClick={handleConversao}
          className={`rounded px-4 py-2 ${
            convertido ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {convertido ? "Desconverter" : "Converter"}
        </button>
        {[UserRole.ADMIN, UserRole.SUPERADMIN].includes(user?.role) ? (
          <div className="mt-5">
            <label htmlFor="transferir">Transferir para captador: </label>
            <div className="relative z-20 bg-transparent dark:bg-dark-2">
              <select
                id="transferir"
                className="relative z-20 w-full appearance-none rounded-[7px] border border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                onChange={handleChange}
                value={selectedUser?._id || ""} // Keeps select controlled
                aria-label="Transferir para"
              >
                <option value="" disabled>
                  Transferir para:
                </option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.name}
                  </option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 z-30 -translate-y-1/2">
                <ArrowDown />
              </span>
            </div>
          </div>
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">Histórico de Agendamento</h3>
        {agendamentos && agendamentos?.length > 0 ? (
          agendamentos.map(({ dia, hora, status, motivoDesmarcacao }, i) => (
            <div
              key={i}
              className="mb-2 flex items-center justify-between rounded-lg bg-gray-dark p-4 shadow-sm"
            >
              <div className="flex flex-col text-sm">
                <p>{dia}</p>
                <p>{hora}</p>
              </div>
              <span
                className={`rounded-lg px-2 py-1 text-sm font-bold text-white bg-${getColorBasedOnStatus[status]}`}
              >
                {status[0].toUpperCase() + status.slice(1)}
              </span>
              {motivoDesmarcacao && (
                <p className="text-xs text-gray-600">{motivoDesmarcacao}</p>
              )}
            </div>
          ))
        ) : (
          <p>Nenhum agendamento realizado</p>
        )}
      </div>
    </div>
  );
};

export default InfoContato;
