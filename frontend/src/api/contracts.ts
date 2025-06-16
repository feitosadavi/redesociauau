import { IAssistente, ICaptador, ICliente, ILoja, IUser } from "@/types";

export namespace LoginAPI {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = IUser;
}

export namespace UsersAPI {
  export type FindAllOutput = IUser[];

  export type FindByIdInput = string;
  export type FindByIdOutput = IUser;

  export type CreateOutput = IUser;
  export type CreateInput = Omit<IUser, "_id" | "thumb"> & {
    thumb?: File;
  };

  export type UpdateOutput = { success: boolean };
  export type UpdateInput = Omit<IUser, "_id" | "thumb"> & {
    thumb?: File;
  };

  export type UpdatePwdInput = {
    currentPwd: string;
    newPwd: string;
  };
  export type UpdatePwdOutput = { success: boolean };
}

export namespace AssistentesAPI {
  export type CreateInput = Omit<IAssistente, "_id">;
  export type UpdateInput = Partial<IAssistente & Required<{ _id: string }>>;
  export type FindAllOutput = IAssistente[];
}

export namespace LojasAPI {
  export type CreateInput = Omit<ILoja, "_id">;
  export type UpdateInput = Partial<ILoja & Required<{ _id: string }>>;
  export type FindAllOutput = Array<ILoja>;
}

export namespace CaptadoresAPI {
  export type FindAllOutput = ICaptador[];
}

export namespace ClientesAPI {
  export type FindAllInput = {
    page: number;
    limit: number;
  };
  export type FindAllOutput = {
    clientes: ICliente[];
    count: number;
  };
  export type FindByIdInput = string;
  export type FindByIdOutput = ICliente;

  export type UpdateInput = {
    id: string;
    data: Omit<Partial<ICliente>, "_id">;
  };
  export type UpdateOutput = ICliente;

  export type TransferirInput = {
    id: string;
    transferidoPara: string;
  };
  export type TransferirOutput = null;
}
