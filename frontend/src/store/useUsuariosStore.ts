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
        usuario: null,
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
