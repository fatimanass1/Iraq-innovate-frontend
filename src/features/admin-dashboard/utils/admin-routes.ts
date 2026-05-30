import { ROUTES } from "@/shared/constants/routes";
import type { AdminStatusFilter } from "../types/admin-projects.types";

export function adminProjectsListUrl(status?: AdminStatusFilter): string {
  if (!status || status === "all") {
    return ROUTES.ADMIN_PROJECTS;
  }
  return `${ROUTES.ADMIN_PROJECTS}?status=${status}`;
}

export function adminProjectsListUrlFromStatId(statId: string): string {
  const statusMap: Record<string, AdminStatusFilter | undefined> = {
    total: "all",
    approved: "approved",
    pending: "pending",
    rejected: "rejected",
  };
  return adminProjectsListUrl(statusMap[statId]);
}
