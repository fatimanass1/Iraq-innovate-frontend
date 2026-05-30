import type { ApiProjectListItem } from "@/features/dashboard/projects/types/project-api.types";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import type { AuthUser } from "@/features/auth/types/auth.types";
import {
  formatProjectRelativeTime,
  getProjectStatusLabel,
  normalizeProjectStatus,
} from "@/features/dashboard/projects/utils/project.helpers";
import { ADMIN_STATS_LABELS, ARABIC_MONTHS } from "../constants/admin-dashboard-content";
import type {
  AdminDashboardStatusItem,
  AdminDashboardStatusesResponse,
} from "../types/admin-dashboard-api.types";
import type {
  AdminActivityItem,
  AdminActivityType,
  AdminChartPoint,
  AdminDashboardData,
  AdminDashboardUser,
  AdminEvaluationRow,
  AdminQuickReviewItem,
  AdminStatCard,
} from "../types/admin-dashboard.types";
import { resolveApiProjectIdFromProject } from "../utils/project-id";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function extractStatusesFromResponse(
  response: AdminDashboardStatusesResponse,
): AdminDashboardStatusItem[] {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.results)) return response.results;
  if (Array.isArray(response.statuses)) return response.statuses;
  return [];
}

export function buildStatusResolver(statuses: AdminDashboardStatusItem[]) {
  const byId = new Map(statuses.map((item) => [String(item.id), item.value]));

  return (project: ApiProjectListItem): ProjectStatus => {
    const mapped = byId.get(String(project.status_id));
    if (mapped) return normalizeProjectStatus(mapped);
    return normalizeProjectStatus(project.status);
  };
}

function mapAuthUserToAdminUser(user: AuthUser | null): AdminDashboardUser {
  const name = user?.name?.trim() || "مدير النظام";
  return {
    name,
    role: "مدير النظام",
    initials: getInitials(name),
  };
}

function isInMonth(dateIso: string, year: number, monthIndex: number): boolean {
  const date = new Date(dateIso);
  return date.getFullYear() === year && date.getMonth() === monthIndex;
}

function monthTrend(
  projects: ApiProjectListItem[],
  predicate: (project: ApiProjectListItem) => boolean,
): AdminStatCard["trend"] | undefined {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const current = projects.filter(
    (project) => predicate(project) && isInMonth(project.created_at, year, month),
  ).length;

  const previousMonth = month === 0 ? 11 : month - 1;
  const previousYear = month === 0 ? year - 1 : year;
  const previous = projects.filter(
    (project) => predicate(project) && isInMonth(project.created_at, previousYear, previousMonth),
  ).length;

  if (previous === 0 && current === 0) return undefined;

  const pct =
    previous === 0 ? 100 : Math.round(((current - previous) / previous) * 100);

  return {
    value: `${pct >= 0 ? "+" : ""}${pct}%`,
    tone: pct >= 0 ? "positive" : "negative",
    labelAr: "مقارنة بالشهر الماضي",
  };
}

export function buildStats(
  projects: ApiProjectListItem[],
  totalCount: number,
  resolveStatus: (project: ApiProjectListItem) => ProjectStatus = (project) =>
    normalizeProjectStatus(project.status),
): AdminStatCard[] {
  const approved = projects.filter((project) => resolveStatus(project) === "approved").length;
  const pending = projects.filter((project) => resolveStatus(project) === "pending").length;
  const rejected = projects.filter((project) => resolveStatus(project) === "rejected").length;

  return [
    {
      id: "total",
      labelAr: ADMIN_STATS_LABELS.total.ar,
      labelEn: ADMIN_STATS_LABELS.total.en,
      value: totalCount,
      icon: "total",
      variant: "highlight",
      trend: monthTrend(projects, () => true),
    },
    {
      id: "approved",
      labelAr: ADMIN_STATS_LABELS.approved.ar,
      labelEn: ADMIN_STATS_LABELS.approved.en,
      value: approved,
      icon: "approved",
      variant: "default",
      trend: (() => {
        const base = monthTrend(projects, (project) => resolveStatus(project) === "approved");
        return base ? { ...base, tone: "approved" as const } : undefined;
      })(),
    },
    {
      id: "pending",
      labelAr: ADMIN_STATS_LABELS.pending.ar,
      labelEn: ADMIN_STATS_LABELS.pending.en,
      value: pending,
      icon: "pending",
      variant: "default",
      trend: (() => {
        const base = monthTrend(projects, (project) => resolveStatus(project) === "pending");
        if (!base) return undefined;
        return {
          ...base,
          tone: "pending" as const,
          labelAr: pending > 0 ? "يحتاج إلى اهتمام" : base.labelAr,
        };
      })(),
    },
    {
      id: "rejected",
      labelAr: ADMIN_STATS_LABELS.rejected.ar,
      labelEn: ADMIN_STATS_LABELS.rejected.en,
      value: rejected,
      icon: "rejected",
      variant: "default",
      trend: monthTrend(projects, (project) => resolveStatus(project) === "rejected"),
    },
  ];
}

export function buildChartSeries(
  projects: ApiProjectListItem[],
  resolveStatus: (project: ApiProjectListItem) => ProjectStatus = (project) =>
    normalizeProjectStatus(project.status),
): AdminChartPoint[] {
  const year = new Date().getFullYear();

  return ARABIC_MONTHS.map((label, monthIndex) => {
    const monthProjects = projects.filter((project) =>
      isInMonth(project.created_at, year, monthIndex),
    );

    return {
      label,
      total: monthProjects.length,
      approved: monthProjects.filter((project) => resolveStatus(project) === "approved").length,
    };
  });
}

function getActivityType(status: ProjectStatus): AdminActivityType {
  if (status === "approved") return "approved";
  if (status === "rejected") return "rejected";
  return "submission";
}

function buildActivities(
  projects: ApiProjectListItem[],
  resolveStatus: (project: ApiProjectListItem) => ProjectStatus,
): AdminActivityItem[] {
  return [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map((project) => {
      const projectId = resolveApiProjectIdFromProject(project);
      if (!projectId) return null;

      const status = resolveStatus(project);
      const type = getActivityType(status);

      let titleAr = `تقديم جديد: ${project.title}`;
      let descriptionAr = `فريق ${project.owner.name}`;

      if (type === "approved") {
        titleAr = `تم اعتماد المشروع: ${project.title}`;
        descriptionAr = getProjectStatusLabel(status).ar;
      } else if (type === "rejected") {
        titleAr = `تم رفض المشروع: ${project.title}`;
        descriptionAr = getProjectStatusLabel(status).ar;
      } else if (status === "pending") {
        titleAr = `قيد المراجعة: ${project.title}`;
        descriptionAr = "تمت إضافة ملاحظة مراجعة";
      }

      return {
        id: `activity-${projectId}`,
        projectId,
        type,
        titleAr,
        descriptionAr,
        timeLabel: formatProjectRelativeTime(project.created_at),
      };
    })
    .filter((item): item is AdminActivityItem => item !== null);
}

function buildEvaluations(
  projects: ApiProjectListItem[],
  resolveStatus: (project: ApiProjectListItem) => ProjectStatus,
): AdminEvaluationRow[] {
  return [...projects]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)
    .map((project) => {
      const projectId = resolveApiProjectIdFromProject(project);
      if (!projectId) return null;

      const status = resolveStatus(project);
      return {
        id: projectId,
        title: project.title,
        status,
        statusLabelAr: getProjectStatusLabel(status).ar,
        category: project.category?.name ?? "—",
      };
    })
    .filter((item): item is AdminEvaluationRow => item !== null);
}

function buildQuickReviews(
  projects: ApiProjectListItem[],
  resolveStatus: (project: ApiProjectListItem) => ProjectStatus,
): AdminQuickReviewItem[] {
  return projects
    .filter((project) => resolveStatus(project) === "pending")
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 2)
    .map((project, index) => {
      const projectId = resolveApiProjectIdFromProject(project);
      if (!projectId) return null;

      return {
        id: projectId,
        title: project.title,
        reference: `INV-${String(projectId).padStart(5, "0")}`,
        description: project.summary || "—",
        teamLabel: project.owner.name,
        isUrgent: index === 0,
      };
    })
    .filter((item): item is AdminQuickReviewItem => item !== null);
}

export function extractProjectsFromResponse(
  response: { results?: ApiProjectListItem[]; projects?: ApiProjectListItem[] },
): ApiProjectListItem[] {
  if (Array.isArray(response.results)) return response.results;
  if (Array.isArray(response.projects)) return response.projects;
  return [];
}

export function mapAdminDashboardData(
  projects: ApiProjectListItem[],
  totalCount: number,
  user: AuthUser | null,
  statuses: AdminDashboardStatusItem[] = [],
): AdminDashboardData {
  const resolveStatus = buildStatusResolver(statuses);

  return {
    user: mapAuthUserToAdminUser(user),
    stats: buildStats(projects, totalCount, resolveStatus),
    chartSeries: buildChartSeries(projects, resolveStatus),
    activities: buildActivities(projects, resolveStatus),
    evaluations: buildEvaluations(projects, resolveStatus),
    quickReviews: buildQuickReviews(projects, resolveStatus),
    totalCount,
  };
}
