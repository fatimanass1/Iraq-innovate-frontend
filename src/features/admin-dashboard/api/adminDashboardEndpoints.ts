export const ADMIN_DASHBOARD_ENDPOINTS = {
  DASHBOARD: "/api/project/dashboard/",
  STATUSES: "/api/project/dashboard/statuses/",
  projectStatus: (id: string | number) => `/api/project/dashboard/${id}/status/`,
} as const;
