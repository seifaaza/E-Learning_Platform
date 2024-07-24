import { create } from "zustand";

interface MainStore {
  isSheetOpen: boolean;
  setSheetOpen: (isOpen: boolean) => void;
}

export const mainStore = create<MainStore>((set) => ({
  isSheetOpen: false,
  setSheetOpen: (isOpen) => set({ isSheetOpen: isOpen }),
}));
