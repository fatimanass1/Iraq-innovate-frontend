export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  CONTACT: {
    SUBMIT: "/contact",
  },
  HEALTH: {
    CHECK: "/health",
  },
} as const;
