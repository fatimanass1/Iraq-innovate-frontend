import { create } from "zustand";

export interface ModalPayload {
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
}

interface ModalState {
  activeModal: string | null;
  payload: ModalPayload | null;
  openModal: (id: string, payload?: ModalPayload) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  payload: null,
  openModal: (id, payload) => set({ activeModal: id, payload: payload ?? null }),
  closeModal: () => set({ activeModal: null, payload: null }),
}));

export const MODAL_IDS = {
  CONFIRM: "confirm",
  CONTACT: "contact",
} as const;
