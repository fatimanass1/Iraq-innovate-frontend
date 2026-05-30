import { useAuthStore } from "@/features/auth/store/authStore";
import {
  extractProjectsFromResponse,
  extractStatusesFromResponse,
  mapAdminDashboardData,
} from "../mappers/admin-dashboard.mapper";
import { adminDashboardApi } from "../api/adminDashboardApi";
import type { AdminDashboardData } from "../types/admin-dashboard.types";
import {
  isAdminForbiddenError,
  TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS,
} from "../utils/admin-dev-access";

function createEmptyAdminDashboardData(): AdminDashboardData {
  const user = useAuthStore.getState().user;
  return mapAdminDashboardData([], 0, user, []);
}

export const adminDashboardService = {
  async getDashboard(): Promise<AdminDashboardData> {
    try {
      const [dashboardResponse, statusesResponse] = await Promise.all([
        adminDashboardApi.getDashboard(),
        adminDashboardApi.getStatuses().catch(() => null),
      ]);

      const projects = extractProjectsFromResponse(dashboardResponse);
      const totalCount = dashboardResponse.count ?? projects.length;
      const statuses = statusesResponse ? extractStatusesFromResponse(statusesResponse) : [];
      const user = useAuthStore.getState().user;

      return mapAdminDashboardData(projects, totalCount, user, statuses);
    } catch (error) {
      if (TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS && isAdminForbiddenError(error)) {
        return createEmptyAdminDashboardData();
      }

      throw error;
    }
  },
};
