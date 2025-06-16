"use client";
import React, { useEffect, useState } from "react";
import ImageUploadCard from "./ImageUploadCard";
import { EmailIcon, TelephoneIcon, UserIcon } from "@/icons";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";
import { validationMsgs } from "@/lib/validationMsgs";
import { USERS_API } from "@/api";
import toast from "@/lib/toast";
import { IUser } from "@/types";
import { useHookFormMask } from "use-mask-input";
import Button from "./Buttons/Button";
import { useRouter } from "next/navigation";
import { PwdInput, InputDefault } from "./Input";
import DefaultSelectOption from "./SelectOption/DefaultSelectOption";

interface IFormInput {
  email: string;
  name: string;
  telefone: string;
}

interface Props {
  user?: IUser | null;
  passwordBox?: boolean;
}

const UserForm: React.FC<Props> = ({ user, passwordBox }) => {
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
  } = useForm<IFormInput>({
    defaultValues: {
      name: user?.name || "",
      telefone: user?.telefone || "",
      email: user?.email || "",
    },
  });
  const registerWithMask = useHookFormMask(register);
  const [selectedImage, setSelectedImage] = useState<File | undefined | string>(
    user?.thumb,
  );
  const [role, setRole] = useState<{ value?: string; error?: string }>({
    value: user?.role,
  });

  const router = useRouter();

  const validation: {
    [key in keyof IFormInput]: RegisterOptions<IFormInput, key>;
  } = {
    email: {
      required: validationMsgs.required("email"),
    },
    name: {
      required: validationMsgs.required("nome"),
    },
    telefone: {
      required: validationMsgs.required("telefone"),
    },
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    let msg;

    if (selectedImage instanceof File)
      Object.assign(data, { thumb: selectedImage });

    if (role.value) Object.assign(data, { role: role.value });
    else {
      setRole({ error: "A função é obrigatória" });
      return;
    }

    if (user?._id) {
      msg = "Usuário atualizado com sucesso!";
      await USERS_API.update(data as any, user._id);
    } else {
      msg = "Usuário cadastrado com sucesso!";
      await USERS_API.create(data as any);
    }

    router.push("/usuarios");
    toast(msg, {
      type: "success",
      style: { backgroundColor: "#020D1A", color: "#fff" },
    });
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Cadastro
              </h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <InputDefault
                    id="name"
                    type="text"
                    label="Nome Completo"
                    placeholder="Seu Nome"
                    icon={<UserIcon />}
                    error={errors.name?.message}
                    {...register("name", validation.name)}
                  />
                  <InputDefault
                    id="phone"
                    type="tel"
                    label="Telefone"
                    placeholder="Seu telefone"
                    icon={<TelephoneIcon />}
                    error={errors.telefone?.message}
                    {...registerWithMask("telefone", ["(99) 99999-9999"], {
                      required: true,
                    })}
                  />
                </div>

                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <InputDefault
                    id="email"
                    type="text"
                    label="Email"
                    placeholder="Seu email"
                    icon={<EmailIcon />}
                    error={errors.email?.message}
                    {...register("email", validation.email)}
                  />
                  <DefaultSelectOption
                    label="Função"
                    placeholder="Selecione o função do usuário"
                    options={["Admin", "Captador"]}
                    value={role.value}
                    onChange={(e) => setRole({ value: e.target.value })}
                    id="role"
                    error={role.error}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    label="Cancelar"
                    type="button"
                    onClick={() => router.push("/usuarios")}
                    className="rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark transition hover:bg-slate-100 hover:shadow-1 dark:border-dark-3 dark:text-white dark:hover:bg-dark-4"
                    overrideClass
                  />
                  <Button
                    label="Salvar"
                    type="submit"
                    isLoading={isLoading}
                    className="px-6 py-[7px]"
                  />
                </div>
              </form>
            </div>
          </div>

          {passwordBox ? <PwdForm userId={user?._id} /> : ""}
        </div>

        <ImageUploadCard
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
        />
      </div>
    </>
  );
};

interface IPwdForm {
  currentPwd: string;
  confirmPwd: string;
  newPwd: string;
}

interface PwdFormProps {
  userId?: string;
}

export const PwdForm = ({ userId }: PwdFormProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    setError,
    formState: { isLoading, errors },
  } = useForm<IPwdForm>();

  const validation: {
    [key in keyof IPwdForm]: RegisterOptions<IPwdForm, key>;
  } = {
    currentPwd: {
      required: validationMsgs.required("Senha atual"),
    },
    confirmPwd: {
      required: validationMsgs.required("confirmPwd"),
    },
    newPwd: {
      required: validationMsgs.required("nova senha"),
      pattern: {
        value: /^(?=.*[A-Za-z]).{8,}$/,
        message:
          "A nova senha deve ter no mínimo 8 caracteres e conter pelo menos uma letra",
      },
    },
  };

  const onSubmit: SubmitHandler<IPwdForm> = async ({ confirmPwd, ...data }) => {
    if (userId) {
      const { success } = await USERS_API.updatePwd(data, userId);

      if (success)
        toast("Sennha atualizada com sucesso", {
          type: "success",
          style: { backgroundColor: "#020D1A", color: "#fff" },
        });
    } else console.error("User id not found");
  };

  const newPwd = watch("newPwd");
  const confirmPwd = watch("confirmPwd");
  useEffect(() => {
    if (confirmPwd?.length > 0 && newPwd !== confirmPwd) {
      setError("confirmPwd", {
        type: "manual",
        message: "Esta senha deve ser idêntica à nova senha",
      });
    } else {
      clearErrors("confirmPwd");
    }
  }, [newPwd, confirmPwd]);

  return (
    <div className="mt-5 rounded-[10px] border border-stroke bg-white p-7 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <form onSubmit={handleSubmit(onSubmit)}>
        <PwdInput
          id="password"
          label="Senha atual"
          placeholder="Sua senha atual"
          error={errors.currentPwd?.message}
          {...register("currentPwd", validation["currentPwd"])}
        />
        <PwdInput
          id="newPwd"
          label="Nova senha"
          placeholder="Sua nova senha"
          error={errors.newPwd?.message}
          {...register("newPwd", validation["newPwd"])}
        />
        <PwdInput
          id="confirm_pwd"
          label="Confirme sua nova senha"
          placeholder="Confirmar senha"
          error={errors.confirmPwd?.message}
          {...register("confirmPwd")}
        />
        <div className="flex justify-end gap-3">
          <Button
            label="Alterar senha"
            type="submit"
            isLoading={isLoading}
            className="px-6 py-[7px]"
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
