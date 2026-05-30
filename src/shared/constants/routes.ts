export const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  DASHBOARD: "/dashboard",
  SUBMIT_PROJECT: "/submit-project",
  MY_PROJECTS: "/dashboard/my-projects",
  PROJECT_SUBMIT: "/submit-project",
  SETTINGS: "/dashboard/settings",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PROJECTS: "/admin/projects",
  ADMIN_NOTIFICATIONS: "/admin/notifications",
  ADMIN_SETTINGS: "/admin/settings",
  adminProjectDetails: (id: string | number) => `/admin/projects/${id}`,
  projectDetails: (id: string | number) => `/dashboard/projects/${id}`,
} as const;

export const QUERY_KEYS = {
  CONTACT: ["contact"] as const,
  AUTH: {
    SESSION: ["auth", "session"] as const,
    VERIFY: ["auth", "verify"] as const,
  },
  DASHBOARD: ["dashboard"] as const,
  PROJECTS: ["projects"] as const,
} as const;
