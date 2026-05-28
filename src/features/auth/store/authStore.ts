import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, TokenPair } from "../types/auth.types";

type AuthState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setSession: (payload: { user?: AuthUser | null; tokens: TokenPair }) => void;
  setTokens: (tokens: TokenPair) => void;
  setUser: (user: AuthUser | null) => void;
  setHasHydrated: (value: boolean) => void;
  logout: () => void;
  clear: () => void;
};

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  hasHydrated: false,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: ({ user, tokens }) =>
        set({
          user: user ?? null,
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          isAuthenticated: Boolean(tokens.access),
        }),

      setTokens: (tokens) =>
        set({
          accessToken: tokens.access,
          refreshToken: tokens.refresh,
          isAuthenticated: Boolean(tokens.access),
        }),

      setUser: (user) => set({ user }),

      setHasHydrated: (value) => set({ hasHydrated: value }),

      logout: () => set({ ...initialState }),

      clear: () => set({ ...initialState }),
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export function getAuthTokens(): TokenPair | null {
  const { accessToken, refreshToken } = useAuthStore.getState();
  if (!accessToken || !refreshToken) return null;
  return { access: accessToken, refresh: refreshToken };
}
