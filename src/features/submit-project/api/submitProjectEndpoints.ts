export const SUBMIT_PROJECT_ENDPOINTS = {
  SUBMIT: "/api/project/submit/",
  CATEGORIES: "/api/project/categories/",
  MEDIA_TYPES: "/api/project/media-types/",
  TEAM_MEMBER_SUBMIT: (projectId: number | string) =>
    `/api/project/${projectId}/members/submit/`,
} as const;
