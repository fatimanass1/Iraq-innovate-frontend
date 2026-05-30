import { AdminDashboardApiError } from "../api/adminDashboardApi";
import type { AdminDashboardStatusItem } from "../types/admin-dashboard-api.types";
import type { AdminReviewStatusUpdate } from "../types/admin-projects.types";

const ACTION_TO_STATUS_VALUE: Record<AdminReviewStatusUpdate, string> = {
  approved: "approved",
  rejected: "declined",
  changes_requested: "changes_requested",
};

export function resolveAdminStatus(
  action: AdminReviewStatusUpdate,
  statuses: AdminDashboardStatusItem[],
): AdminDashboardStatusItem {
  const targetValue = ACTION_TO_STATUS_VALUE[action];
  const selectedStatus = statuses.find((item) => item.value === targetValue);

  if (!selectedStatus?.id) {
    throw new AdminDashboardApiError(
      `تعذر العثور على معرف الحالة (${action}). يرجى تحديث الصفحة والمحاولة مرة أخرى.`,
      400,
    );
  }

  return selectedStatus;
}
