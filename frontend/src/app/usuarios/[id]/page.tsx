import { USERS_API } from "@/api";
import Breadcrumb from "@/app/@components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/app/@components/Layouts/DefaultLaout";
import UserForm from "@/app/@components/UserForm";
import React from "react";

interface PageParams {
  params: {
    id: string;
  };
}

const UsuarioPage = async ({ params: { id } }: PageParams) => {
  let user = await USERS_API.findById(id);

  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Usuário" />
        <UserForm user={user} />
      </div>
    </DefaultLayout>
  );
};

export default UsuarioPage;
