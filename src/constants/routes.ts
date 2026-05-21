export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  DASHBOARD_SETTINGS: "/dashboard/settings",
} as const;

/** Query param used to preserve post-login redirect targets. */
export const REDIRECT_QUERY_PARAM = "redirect";

/** Default destination after successful authentication. */
export const DEFAULT_AUTH_REDIRECT = ROUTES.DASHBOARD;

export const QUERY_KEYS = {
  HEALTH: ["health"] as const,
  AUTH_USER: ["auth", "user"] as const,
  CONTACT: ["contact"] as const,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  THEME: "theme",
} as const;
