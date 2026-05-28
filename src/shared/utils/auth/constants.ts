/** Cookie read by Next.js middleware for route protection */
export const ACCESS_TOKEN_COOKIE = "iaict_access_token";

/** Refresh token cookie (client-readable; used for session restore) */
export const REFRESH_TOKEN_COOKIE = "iaict_refresh_token";

/** Authenticated user id cookie (for middleware / server checks) */
export const USER_ID_COOKIE = "iaict_user_id";

/** Default session lifetime (7 days) */
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const AUTH_SEARCH_PARAMS = {
  redirect: "redirect",
} as const;
