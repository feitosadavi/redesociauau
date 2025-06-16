import { usuariosMock } from "@/api";
import { Usuario } from "@/types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface UsuarioStore {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
}

const useUsuarioStore = create<UsuarioStore>()(
  devtools(
    persist(
      (set) => ({
        usuario: usuariosMock[0],
        setUsuario: async (usuario: Usuario) => set(() => ({ usuario })),
      }),
      {
        name: "usuario-storage",
        partialize: (state) => state,
      }
    )
  )
);

export default useUsuarioStore;
