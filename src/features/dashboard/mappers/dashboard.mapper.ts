import type { AuthUser } from "@/features/auth/types/auth.types";
import { DASHBOARD_STATS_LABELS } from "@/features/dashboard/constants/dashboard-content";
import type {
  DashboardActivity,
  DashboardData,
  DashboardProject,
  DashboardStat,
  DashboardUser,
  ActivityType,
} from "@/features/dashboard/types/dashboard.types";
import type { ProjectListItem } from "@/features/dashboard/projects/types/project.types";
import {
  formatProjectRelativeTime,
  getProjectStatusLabel,
} from "@/features/dashboard/projects/utils/project.helpers";
function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function mapAuthUserToDashboardUser(user: AuthUser | null): DashboardUser {
  const name = user?.name?.trim() || "مستخدم";
  const organization = user?.organization?.trim() || "—";

  return {
    name,
    organization,
    initials: getInitials(name),
  };
}

function mapProjectListItemToDashboardProject(project: ProjectListItem): DashboardProject {
  return {
    id: project.id,
    title: project.title,
    summary: project.summary,
    category: project.category,
    status: project.status,
    date: project.date,
    createdAt: project.createdAt,
    updatedAt: project.createdAt,
    imageUrl: project.imageUrl,
  };
}

function buildStats(totalCount: number, projects: DashboardProject[]): DashboardStat[] {
  const approvedCount = projects.filter((project) => project.status === "approved").length;
  const pendingCount = projects.filter((project) => project.status === "pending").length;
  const rejectedCount = projects.filter((project) => project.status === "rejected").length;

  return [
    {
      id: "total-projects",
      label: DASHBOARD_STATS_LABELS.totalProjects.ar,
      labelEn: DASHBOARD_STATS_LABELS.totalProjects.en,
      value: totalCount,
      variant: "highlight",
      icon: "file",
    },
    {
      id: "approved",
      label: DASHBOARD_STATS_LABELS.approved.ar,
      labelEn: DASHBOARD_STATS_LABELS.approved.en,
      value: approvedCount,
      variant: "default",
      icon: "check",
    },
    {
      id: "pending",
      label: DASHBOARD_STATS_LABELS.pending.ar,
      labelEn: DASHBOARD_STATS_LABELS.pending.en,
      value: pendingCount,
      variant: "default",
      icon: "clock",
    },
    {
      id: "rejected",
      label: DASHBOARD_STATS_LABELS.rejected.ar,
      labelEn: DASHBOARD_STATS_LABELS.rejected.en,
      value: rejectedCount,
      variant: "default",
      icon: "x",
    },
  ];
}

function getActivityType(status: DashboardProject["status"]): ActivityType {
  if (status === "approved") return "success";
  if (status === "rejected") return "warning";
  return "info";
}

function buildActivitiesFromProjects(projects: DashboardProject[]): DashboardActivity[] {
  return [...projects]
    .sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5)
    .map((project) => ({
      id: `activity-${project.id}`,
      type: getActivityType(project.status),
      messageAr: `مشروع «${project.title}» — ${getProjectStatusLabel(project.status).ar}`,
      timeLabel: formatProjectRelativeTime(project.updatedAt),
    }));
}

export function mapProjectsToDashboardData(
  count: number,
  projects: ProjectListItem[],
  user: AuthUser | null,
): DashboardData {
  const dashboardProjects = projects.map(mapProjectListItemToDashboardProject);

  return {
    user: mapAuthUserToDashboardUser(user),
    stats: buildStats(count, dashboardProjects),
    projects: dashboardProjects,
    activities: buildActivitiesFromProjects(dashboardProjects),
    unreadNotifications: 0,
    totalCount: count,
  };
}
