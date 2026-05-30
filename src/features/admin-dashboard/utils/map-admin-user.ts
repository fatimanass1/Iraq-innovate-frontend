import type { DashboardUser } from "@/features/dashboard/types/dashboard.types";
import type { AdminDashboardUser } from "../types/admin-dashboard.types";

export function mapAdminUserToDashboardUser(user: AdminDashboardUser): DashboardUser {
  return {
    name: user.name,
    organization: user.role,
    initials: user.initials,
  };
}
