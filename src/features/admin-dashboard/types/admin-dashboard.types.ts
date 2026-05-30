import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";

export type AdminNavId = "dashboard" | "projects" | "notifications" | "settings";

export type AdminStatIcon = "total" | "approved" | "pending" | "rejected";

export type AdminStatVariant = "default" | "highlight";

export type AdminStatCard = {
  id: string;
  labelAr: string;
  labelEn: string;
  value: number;
  icon: AdminStatIcon;
  variant: AdminStatVariant;
  trend?: {
    value: string;
    tone: "positive" | "pending" | "approved" | "negative";
    labelAr: string;
  };
};

export type AdminChartPeriod = "weekly" | "monthly" | "yearly";

export type AdminChartPoint = {
  label: string;
  total: number;
  approved: number;
};

export type AdminActivityType = "submission" | "approved" | "review" | "rejected";

export type AdminActivityItem = {
  id: string;
  projectId: number;
  type: AdminActivityType;
  titleAr: string;
  descriptionAr: string;
  timeLabel: string;
};

export type AdminEvaluationRow = {
  id: number;
  title: string;
  status: ProjectStatus;
  statusLabelAr: string;
  category: string;
};

export type AdminQuickReviewItem = {
  id: number;
  title: string;
  reference: string;
  description: string;
  teamLabel: string;
  isUrgent: boolean;
};

export type AdminDashboardUser = {
  name: string;
  role: string;
  initials: string;
};

export type AdminDashboardData = {
  user: AdminDashboardUser;
  stats: AdminStatCard[];
  chartSeries: AdminChartPoint[];
  activities: AdminActivityItem[];
  evaluations: AdminEvaluationRow[];
  quickReviews: AdminQuickReviewItem[];
  totalCount: number;
};
