import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE_SECONDS,
  REFRESH_TOKEN_COOKIE,
  USER_ID_COOKIE,
} from "./constants";

function buildCookieAttributes(maxAge = ACCESS_TOKEN_MAX_AGE_SECONDS): string {
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? "; Secure"
      : "";

  return `path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
}

function setCookie(name: string, value: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=${encodeURIComponent(value)}; ${buildCookieAttributes()}`;
}

function clearCookie(name: string): void {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

/** Persist access token in a cookie for middleware (client-side). */
export function setAccessTokenCookie(accessToken: string): void {
  setCookie(ACCESS_TOKEN_COOKIE, accessToken);
}

/** Persist refresh token in a cookie for session restore. */
export function setRefreshTokenCookie(refreshToken: string): void {
  setCookie(REFRESH_TOKEN_COOKIE, refreshToken);
}

/** Persist authenticated user id in a cookie for middleware. */
export function setUserIdCookie(userId: number): void {
  setCookie(USER_ID_COOKIE, String(userId));
}

/** Remove access token cookie. */
export function clearAccessTokenCookie(): void {
  clearCookie(ACCESS_TOKEN_COOKIE);
}

/** Remove refresh token cookie. */
export function clearRefreshTokenCookie(): void {
  clearCookie(REFRESH_TOKEN_COOKIE);
}

/** Remove user id cookie. */
export function clearUserIdCookie(): void {
  clearCookie(USER_ID_COOKIE);
}

/** Remove all auth cookies. */
export function clearAuthCookies(): void {
  clearAccessTokenCookie();
  clearRefreshTokenCookie();
  clearUserIdCookie();
}
