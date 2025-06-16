"use client";

import { USERS_API } from "@/api";
import Button from "@/app/@components/Buttons/Button";
import Dialog from "@/app/@components/Dialog";
import { DeleteIcon } from "@/icons";
import React, { useState } from "react";

interface Props {
  id: string;
}

const UsuariosPageDialogCsr: React.FC<Props> = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  const handleDeleteUser = async () => {
    await USERS_API.delete(id);
    window.location.reload();
  };

  return (
    <>
      <Button onClick={toggleDialog} className="hover:text-red" overrideClass>
        <DeleteIcon />
      </Button>
      <Dialog
        open={isDialogOpen}
        toggleDialog={toggleDialog}
        title="Tem certeza que deseja excluir o usuário?"
        Action={(toggle) => (
          <div className="flex justify-end gap-4">
            <Button
              onClick={toggle}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:text-gray-900 dark:text-white"
              overrideClass
            >
              Não
            </Button>
            <Button
              className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              onClick={handleDeleteUser}
              overrideClass
            >
              Sim
            </Button>
          </div>
        )}
      />
    </>
  );
};

export default UsuariosPageDialogCsr;
