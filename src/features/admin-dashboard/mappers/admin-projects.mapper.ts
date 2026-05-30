import type { ApiProjectListItem } from "@/features/dashboard/projects/types/project-api.types";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import { formatProjectDate } from "@/features/dashboard/projects/utils/project.helpers";
import { ADMIN_PROJECTS_STATS } from "../constants/admin-projects-content";
import { buildStats } from "./admin-dashboard.mapper";
import type { AdminProjectListRow } from "../types/admin-projects.types";
import { getAdminStatusLabel, normalizeAdminProjectStatus } from "../utils/admin-project-status";
import { resolveApiProjectIdFromProject } from "../utils/project-id";

export function mapApiProjectToListRow(
  project: ApiProjectListItem,
  resolveStatus?: (project: ApiProjectListItem) => ProjectStatus,
): AdminProjectListRow | null {
  const parsedId = resolveApiProjectIdFromProject(project);

  if (!parsedId) {
    console.warn(
      "[AdminProjects] Skipping project with invalid API id:",
      project.id,
      project.title,
    );
    return null;
  }

  const status = resolveStatus
    ? resolveStatus(project)
    : normalizeAdminProjectStatus(project.status, project.status_id);

  return {
    id: parsedId,
    title: project.title,
    category: project.category?.name ?? "—",
    categoryId: project.category?.id ?? 0,
    ownerName: project.owner?.name ?? "—",
    ownerEmail: project.owner?.email ?? "",
    universityLabel: project.owner?.name ?? "—",
    status,
    statusLabelAr: getAdminStatusLabel(status).ar,
    createdAt: project.created_at,
    submissionDateLabel: formatProjectDate(project.created_at),
  };
}

export function buildAdminProjectsMeta(
  projects: ApiProjectListItem[],
  totalCount: number,
  resolveStatus?: (project: ApiProjectListItem) => ProjectStatus,
) {
  const categoriesMap = new Map<number, string>();
  const universities = new Set<string>();

  for (const project of projects) {
    if (project.category?.id) {
      categoriesMap.set(project.category.id, project.category.name);
    }
    if (project.owner?.name) {
      universities.add(project.owner.name);
    }
  }

  const stats = buildStats(projects, totalCount, resolveStatus).map((stat) => {
    switch (stat.id) {
      case "total":
        return {
          ...stat,
          labelAr: ADMIN_PROJECTS_STATS.total.ar,
          labelEn: ADMIN_PROJECTS_STATS.total.en,
          variant: "default" as const,
        };
      case "pending":
        return { ...stat, labelAr: ADMIN_PROJECTS_STATS.pending.ar, labelEn: ADMIN_PROJECTS_STATS.pending.en };
      case "approved":
        return { ...stat, labelAr: ADMIN_PROJECTS_STATS.approved.ar, labelEn: ADMIN_PROJECTS_STATS.approved.en };
      case "rejected":
        return { ...stat, labelAr: ADMIN_PROJECTS_STATS.rejected.ar, labelEn: ADMIN_PROJECTS_STATS.rejected.en };
      default:
        return stat;
    }
  });

  return {
    stats,
    categories: Array.from(categoriesMap.entries()).map(([id, name]) => ({ id, name })),
    universities: Array.from(universities),
    totalCount,
  };
}
