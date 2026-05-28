export const PROJECTS_ENDPOINTS = {
  LIST: "/api/project/",
  DETAIL: (id: number | string) => `/api/project/${id}/`,
  SUBMIT: "/api/project/submit/",
  TEAM_MEMBER_SUBMIT: (projectId: number | string) =>
    `/api/project/${projectId}/members/submit/`,
} as const;
