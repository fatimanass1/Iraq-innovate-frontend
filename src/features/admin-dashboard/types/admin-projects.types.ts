import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";

export type AdminProjectStatus = ProjectStatus | "draft" | "changes_requested";

export type AdminReviewStatusUpdate = "approved" | "rejected" | "changes_requested";

export type AdminStatusFilter = "all" | AdminProjectStatus;

export type AdminSortOption = "newest" | "oldest" | "updated";

export type AdminProjectsFilters = {
  search: string;
  status: AdminStatusFilter;
  category: string;
  university: string;
  dateFrom: string;
  dateTo: string;
  sort: AdminSortOption;
};

export type AdminProjectListRow = {
  id: number;
  title: string;
  category: string;
  categoryId: number;
  ownerName: string;
  ownerEmail: string;
  universityLabel: string;
  status: AdminProjectStatus;
  statusLabelAr: string;
  createdAt: string;
  submissionDateLabel: string;
};

export type AdminProjectsListData = {
  projects: AdminProjectListRow[];
  /** Raw dashboard API items — used as fallback when `GET /api/project/{id}/` is unavailable for admin */
  rawProjects: ApiProjectDetail[];
  stats: import("./admin-dashboard.types").AdminStatCard[];
  categories: { id: number; name: string }[];
  universities: string[];
  totalCount: number;
};

export const DEFAULT_ADMIN_PROJECTS_FILTERS: AdminProjectsFilters = {
  search: "",
  status: "all",
  category: "all",
  university: "all",
  dateFrom: "",
  dateTo: "",
  sort: "newest",
};

export const ADMIN_PROJECTS_PAGE_SIZE = 4;
