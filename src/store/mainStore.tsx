import { create } from "zustand";

interface MainStore {
  isSignUpOpen: boolean;
  setSignUpOpen: (isOpen: boolean) => void;
}

export const mainStore = create<MainStore>((set) => ({
  isSignUpOpen: false,
  setSignUpOpen: (isOpen) => set({ isSignUpOpen: isOpen }),
}));
