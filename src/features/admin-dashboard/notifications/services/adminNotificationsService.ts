import { adminDashboardApi } from "../../api/adminDashboardApi";
import {
  extractProjectsFromResponse,
  extractStatusesFromResponse,
} from "../../mappers/admin-dashboard.mapper";
import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";
import type { AdminNotificationItem } from "../types/admin-notification.types";
import { mapProjectsToNotifications } from "../utils/map-projects-to-notifications";
import { notificationReadState } from "../utils/notification-read-state";
import { buildStatusValueResolver } from "../utils/resolve-project-status-value";
import {
  isAdminForbiddenError,
  TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS,
} from "../../utils/admin-dev-access";

const PAGE_SIZE = 10;

async function fetchNotificationItems(): Promise<AdminNotificationItem[]> {
  try {
    const [dashboardResponse, statusesResponse] = await Promise.all([
      adminDashboardApi.getDashboard(),
      adminDashboardApi.getStatuses().catch(() => null),
    ]);

    const projects = extractProjectsFromResponse(dashboardResponse) as ApiProjectDetail[];
    const statuses = statusesResponse ? extractStatusesFromResponse(statusesResponse) : [];
    const resolveStatusValue = buildStatusValueResolver(statuses);

    const items = mapProjectsToNotifications(projects, resolveStatusValue);
    return notificationReadState.applyReadState(items);
  } catch (error) {
    if (TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS && isAdminForbiddenError(error)) {
      return [];
    }

    throw error;
  }
}

export const adminNotificationsService = {
  async getNotifications(page = 1): Promise<{
    items: AdminNotificationItem[];
    totalCount: number;
    hasMore: boolean;
  }> {
    const all = await fetchNotificationItems();
    const end = page * PAGE_SIZE;

    return {
      items: all.slice(0, end),
      totalCount: all.length,
      hasMore: end < all.length,
    };
  },

  async markAsRead(id: string): Promise<void> {
    notificationReadState.markAsRead(id);
  },

  async markAllAsRead(): Promise<void> {
    const all = await fetchNotificationItems();
    notificationReadState.markAllAsRead(all.map((item) => item.id));
  },
};
