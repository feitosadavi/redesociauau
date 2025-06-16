import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SidebarStoreType {
  sidebarOpen: boolean;
  setSidebarOpen: (sidebarOpen: boolean) => void;
}

const useSidebarStore = create<SidebarStoreType>()(
  devtools(
    persist(
      (set) => ({
        sidebarOpen: false,
        setSidebarOpen: async (sidebarOpen: boolean) =>
          set(() => ({ sidebarOpen })),
      }),
      {
        name: "sidebar-storage",
        partialize: (state) => state,
      },
    ),
  ),
);

export default useSidebarStore;
