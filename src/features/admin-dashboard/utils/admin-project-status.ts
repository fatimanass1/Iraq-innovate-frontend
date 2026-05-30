import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import { getProjectStatusLabel, normalizeProjectStatus } from "@/features/dashboard/projects/utils/project.helpers";
import type { AdminProjectStatus } from "../types/admin-projects.types";

export function normalizeAdminProjectStatus(status: string, statusId?: string): AdminProjectStatus {
  const normalized = `${status} ${statusId ?? ""}`.trim().toLowerCase().replace(/-/g, "_");

  if (normalized.includes("draft")) return "draft";
  if (
    normalized.includes("changes_requested") ||
    normalized.includes("change_requested") ||
    normalized.includes("request_change")
  ) {
    return "changes_requested";
  }
  return normalizeProjectStatus(status);
}

export function getAdminStatusLabel(status: AdminProjectStatus): { ar: string; en: string } {
  if (status === "draft") {
    return { ar: "مسودة", en: "Draft" };
  }
  if (status === "changes_requested") {
    return { ar: "طلب تعديلات", en: "Changes Requested" };
  }
  return getProjectStatusLabel(status as ProjectStatus);
}

export type AdminStatusBadgeStyle = {
  bg: string;
  border: string;
  dot: string;
  text: string;
};

export const ADMIN_STATUS_BADGE_STYLES: Record<AdminProjectStatus, AdminStatusBadgeStyle> = {
  pending: {
    bg: "#FFFBEB",
    border: "#FEF3C6",
    dot: "#FE9A00",
    text: "#E17100",
  },
  approved: {
    bg: "#ECFDF5",
    border: "#D0FAE5",
    dot: "#009966",
    text: "#A8CF45",
  },
  rejected: {
    bg: "#FEF2F2",
    border: "#FFE2E2",
    dot: "#F33D46",
    text: "#F33D46",
  },
  draft: {
    bg: "#F3F4F6",
    border: "#E5E7EB",
    dot: "#6B7280",
    text: "#6B7280",
  },
  changes_requested: {
    bg: "#FFFBEB",
    border: "#FEF3C6",
    dot: "#FE9A00",
    text: "#D97706",
  },
};
