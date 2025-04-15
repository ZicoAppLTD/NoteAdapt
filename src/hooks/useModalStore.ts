import { create, StateCreator } from "zustand";

export type ModalType = "locale_switcher";

interface ModalStore {
  type: ModalType | null;
  isModalOpen: boolean;
  onModalOpen: (type: ModalType) => void;
  onModalClose: () => void;
}

export const useModal = create<ModalStore>((set: StateCreator<ModalStore>) => ({
  type: null,
  isModalOpen: false,
  onModalOpen: (type: ModalType) => set({ isModalOpen: true, type }),
  onModalClose: () => set({ isModalOpen: false, type: null }),
}));
