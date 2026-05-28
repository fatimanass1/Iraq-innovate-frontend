import { useAuthStore } from "@/features/auth/store/authStore";
import { mapProjectsToDashboardData } from "../mappers/dashboard.mapper";
import { projectsService } from "@/features/dashboard/projects/services/projectsService";
import type { DashboardData } from "../types/dashboard.types";

/** Business logic layer — no UI code. */
export const dashboardService = {
  async getDashboard(): Promise<DashboardData> {
    const user = useAuthStore.getState().user;
    const userId =
      user?.id == null ? undefined : Number.isFinite(Number(user.id)) ? Number(user.id) : undefined;
    const { count, projects } = await projectsService.getProjects(userId);
    return mapProjectsToDashboardData(count, projects, user);
  },
};
