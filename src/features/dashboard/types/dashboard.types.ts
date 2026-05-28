import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";

export type { ProjectStatus };

export type DashboardNavId = "dashboard" | "my-projects" | "settings" | "home";

export type ActivityType = "success" | "warning" | "info";

export type DashboardUser = {
  name: string;
  organization: string;
  initials: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  labelEn?: string;
  value: number;
  variant: "highlight" | "default";
  icon: "file" | "check" | "clock" | "x";
};

export type DashboardProject = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: ProjectStatus;
  date: string;
  createdAt: string;
  updatedAt: string;
  imageUrl: string | null;
};

export type DashboardActivity = {
  id: string;
  type: ActivityType;
  messageAr: string;
  timeLabel: string;
};

export type DashboardData = {
  user: DashboardUser;
  stats: DashboardStat[];
  projects: DashboardProject[];
  activities: DashboardActivity[];
  unreadNotifications: number;
  totalCount: number;
};
