"use client";

import Breadcrumb from "../@components/Breadcrumbs/Breadcrumb";
import UserForm from "../@components/UserForm";
import DefaultLaout from "../@components/Layouts/DefaultLaout";
import useLocalStorage from "../../hooks/useLocalStorage";
import React from "react";

const PerfilPage = () => {
  const [user] = useLocalStorage("user", null);

  return (
    <DefaultLaout>
      <div className="mx-auto w-full max-w-[1080px]">
        <Breadcrumb pageName="Meu Perfil" />
        <UserForm user={user} passwordBox />
      </div>
    </DefaultLaout>
  );
};

export default PerfilPage;
