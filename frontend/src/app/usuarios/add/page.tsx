import Breadcrumb from "@/app/@components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/app/@components/Layouts/DefaultLaout";
import UserForm from "@/app/@components/UserForm";
import React from "react";

const AddUsuarioPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Cadastrar Usuário" />

        <UserForm />
      </div>
    </DefaultLayout>
  );
};

export default AddUsuarioPage;
