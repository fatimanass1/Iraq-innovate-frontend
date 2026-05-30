import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";

/** Response shape for `GET /api/project/dashboard/` */
export type AdminDashboardApiResponse = {
  count?: number;
  next?: string | null;
  previous?: string | null;
  results?: ApiProjectDetail[];
  projects?: ApiProjectDetail[];
};

export type AdminDashboardStatusItem = {
  id: number;
  value: string;
  label: string;
};

export type AdminDashboardStatusesResponse =
  | AdminDashboardStatusItem[]
  | { results?: AdminDashboardStatusItem[]; statuses?: AdminDashboardStatusItem[] };
