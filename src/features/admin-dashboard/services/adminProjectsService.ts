import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import { adminDashboardApi } from "../api/adminDashboardApi";
import { adminProjectsApi } from "../api/adminProjectsApi";
import {
  buildStatusResolver,
  extractProjectsFromResponse,
  extractStatusesFromResponse,
} from "../mappers/admin-dashboard.mapper";
import { buildAdminProjectsMeta, mapApiProjectToListRow } from "../mappers/admin-projects.mapper";
import type { AdminProjectListRow, AdminProjectsListData } from "../types/admin-projects.types";
import { isAdminForbiddenError, TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS } from "../utils/admin-dev-access";
import { resolveApiProjectId, resolveApiProjectIdFromProject } from "../utils/project-id";

function createEmptyProjectsList(): AdminProjectsListData {
  const resolveStatus = () => "pending" as ProjectStatus;
  const meta = buildAdminProjectsMeta([], 0, resolveStatus);

  return {
    projects: [],
    rawProjects: [],
    stats: meta.stats,
    categories: [],
    universities: meta.universities,
    totalCount: 0,
  };
}

function mergeCategories(
  fromProjects: { id: number; name: string }[],
  fromApi: { id: number; name: string }[],
): { id: number; name: string }[] {
  const map = new Map<number, string>();
  for (const item of [...fromApi, ...fromProjects]) {
    map.set(item.id, item.name);
  }
  return Array.from(map.entries())
    .map(([id, name]) => ({ id, name }))
    .sort((a, b) => a.name.localeCompare(b.name, "ar"));
}

function findRawProjectById(
  rawProjects: ApiProjectDetail[] | undefined,
  parsedId: number,
): ApiProjectDetail | undefined {
  if (!rawProjects?.length) return undefined;
  return rawProjects.find((project) => resolveApiProjectIdFromProject(project) === parsedId);
}

export const adminProjectsService = {
  async getProjectsList(): Promise<AdminProjectsListData> {
    try {
      const [dashboardResponse, statusesResponse, categoriesResponse] = await Promise.all([
        adminDashboardApi.getDashboard(),
        adminDashboardApi.getStatuses().catch(() => null),
        adminProjectsApi.getCategories().catch(() => null),
      ]);

      const rawProjects = extractProjectsFromResponse(dashboardResponse) as ApiProjectDetail[];
      const totalCount = dashboardResponse.count ?? rawProjects.length;
      const statuses = statusesResponse ? extractStatusesFromResponse(statusesResponse) : [];
      const resolveStatus = buildStatusResolver(statuses);

      const meta = buildAdminProjectsMeta(rawProjects, totalCount, resolveStatus);
      const apiCategories =
        categoriesResponse?.results?.map((category) => ({
          id: category.id,
          name: category.name,
        })) ?? [];

      return {
        projects: rawProjects
          .map((project) => mapApiProjectToListRow(project, resolveStatus))
          .filter((row): row is AdminProjectListRow => row !== null),
        rawProjects,
        stats: meta.stats,
        categories: mergeCategories(meta.categories, apiCategories),
        universities: meta.universities,
        totalCount,
      };
    } catch (error) {
      if (TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS && isAdminForbiddenError(error)) {
        return createEmptyProjectsList();
      }

      throw error;
    }
  },

  findRawProjectInList(
    rawProjects: ApiProjectDetail[] | undefined,
    id: string | number,
  ): ApiProjectDetail | undefined {
    const parsedId = resolveApiProjectId(id);
    if (!parsedId) return undefined;
    return findRawProjectById(rawProjects, parsedId);
  },
};
