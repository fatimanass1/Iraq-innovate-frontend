import { useAuthStore } from "@/features/auth/store/authStore";
import type { AuthSession } from "@/features/auth/types/auth.types";
import {
  clearAuthCookies,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setUserIdCookie,
} from "./cookies";

/** Apply authenticated session to store + cookies (for middleware). */
export function applyAuthSession(session: AuthSession): void {
  useAuthStore.getState().setSession(session);
  setAccessTokenCookie(session.tokens.access);
  setRefreshTokenCookie(session.tokens.refresh);

  if (session.user?.id != null) {
    setUserIdCookie(Number(session.user.id));
  }
}

/** Clear authenticated session from store + cookies. */
export function clearAuthSession(): void {
  useAuthStore.getState().logout();
  clearAuthCookies();
}
