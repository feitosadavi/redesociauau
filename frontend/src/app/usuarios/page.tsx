import Breadcrumb from "../@components/Breadcrumbs/Breadcrumb";
import { USERS_API } from "@/api";
import UsuariosPageDialogCsr from "./@csr/DialogCsr.usuarios";
import Table from "../@components/Tables/Table";
import { PlusIcon, UserIcon } from "@/icons";
import Link from "../@components/Link";
import EditButtonCsr from "./@csr/EditButtonCsr.usuarios";
import Image from "next/image";
import { DEFAULT_THUMB_PATH } from "@/constants";
import DefaultLayout from "../@components/Layouts/DefaultLaout";

const UsuariosPage = async () => {
  const users = await USERS_API.findAll();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Usuários" />
      <Table
        title={<UserIcon size="32" />}
        columns={["Nome", "Email", "Telefone", "Função", "Ações"]}
        className="min-w-[820px]"
        rows={users.map(({ _id, name, thumb, email, telefone, role }) => (
          <tr
            key="resultado-geral-row"
            className="border-t border-stroke py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-4 2xl:px-7.5"
          >
            <td
              key={`nome-cell-${_id}`}
              className="flex items-center gap-5 px-4 py-4 text-lg dark:text-white"
            >
              <Image
                src={thumb ? thumb : DEFAULT_THUMB_PATH}
                className="w-15 rounded-[100px] object-fill"
                width={60}
                height={50}
                alt={"Imagem do usuário:  " + name}
                role="presentation"
              />
              {name}
            </td>
            {[email, telefone, role].map((data, i) => (
              <td
                key={`usuario-cell-${i}-${_id}`}
                className="px-4 py-4 text-lg dark:text-white"
              >
                {data}
              </td>
            ))}
            <td
              key={`acoes-cell-${_id}`}
              className="flex justify-center gap-3 px-4 py-4 text-lg"
            >
              <EditButtonCsr
                user={{ _id, name, thumb, email, telefone, role }}
              />
              <UsuariosPageDialogCsr id={_id} />
            </td>
          </tr>
        ))}
        ActionHeader={
          <Link
            href="/usuarios/add"
            className="transition duration-200 hover:text-primary"
          >
            <PlusIcon />
          </Link>
        }
      />
    </DefaultLayout>
  );
};

export default UsuariosPage;
