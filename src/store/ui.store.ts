import { create } from "zustand";

interface UiState {
  isMobileMenuOpen: boolean;
  isPageLoading: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setPageLoading: (loading: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,
  isPageLoading: false,
  setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  setPageLoading: (loading) => set({ isPageLoading: loading }),
}));
