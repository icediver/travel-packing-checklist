import { create } from "zustand";

type ExitModalState = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const useModalStore = create<ExitModalState>()((set) => ({
  isModalOpen: false,
  toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen })),
}));
