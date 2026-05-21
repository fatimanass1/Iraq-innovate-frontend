import { AUTH_COOKIE_MAX_AGE, AUTH_COOKIE_NAME } from "@/constants/auth";
import { STORAGE_KEYS } from "@/constants/routes";

export function setAuthSession(token: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${AUTH_COOKIE_MAX_AGE}; SameSite=Lax`;
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
}

export function clearAuthSession(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export function getAuthSessionToken(): string | null {
  if (typeof document === "undefined") return null;

  const cookieMatch = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${AUTH_COOKIE_NAME}=`));

  if (cookieMatch) {
    return decodeURIComponent(cookieMatch.split("=")[1] ?? "");
  }

  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}
