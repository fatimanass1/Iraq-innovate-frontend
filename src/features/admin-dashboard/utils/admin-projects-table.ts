import { ADMIN_PROJECTS_TABLE } from "../constants/admin-projects-content";
import type { AdminProjectStatus } from "../types/admin-projects.types";

/** Table CTA label: pending → review, all other statuses → view details */
export function getAdminProjectTableActionLabel(status: AdminProjectStatus): string {
  return status === "pending" ? ADMIN_PROJECTS_TABLE.review : ADMIN_PROJECTS_TABLE.viewDetails;
}
