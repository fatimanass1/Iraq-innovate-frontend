import type { ApiProjectListItem } from "@/features/dashboard/projects/types/project-api.types";
import type { AdminDashboardStatusItem } from "../../types/admin-dashboard-api.types";

export function buildStatusValueResolver(statuses: AdminDashboardStatusItem[]) {
  const byId = new Map(statuses.map((item) => [String(item.id), item.value.trim().toLowerCase()]));

  return (project: ApiProjectListItem): string => {
    const fromId = byId.get(String(project.status_id));
    if (fromId) return fromId;
    return project.status.trim().toLowerCase().replace(/-/g, "_");
  };
}
