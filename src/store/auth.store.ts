import { create } from "zustand";
import { persist } from "zustand/middleware";
import { clearAuthSession, setAuthSession } from "@/lib/auth/session";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  setUser: (user: AuthUser | null, token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user, token) => {
        if (token) setAuthSession(token);
        set({ user, isAuthenticated: Boolean(user) });
      },
      logout: () => {
        clearAuthSession();
        set({ user: null, isAuthenticated: false });
      },
    }),
    { name: "auth-store" },
  ),
);
