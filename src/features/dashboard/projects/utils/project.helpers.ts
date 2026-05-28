import type { NormalizedProjectStatus } from "../types/project-api.types";
import type { ProjectStatus } from "../types/project.types";
import { resolveAssetUrl } from "./media.helpers";

export type ProjectStatusColors = {
  bg: string;
  text: string;
};

export type ProjectStatusLabel = {
  en: string;
  ar: string;
};

const STATUS_COLORS: Record<ProjectStatus, ProjectStatusColors> = {
  pending: {
    bg: "rgba(234,179,8,0.14)",
    text: "rgba(161,98,7,0.95)",
  },
  approved: {
    bg: "rgba(34,197,94,0.14)",
    text: "rgba(22,163,74,0.95)",
  },
  rejected: {
    bg: "rgba(239,68,68,0.14)",
    text: "rgba(220,38,38,0.95)",
  },
};

const STATUS_LABELS: Record<ProjectStatus, ProjectStatusLabel> = {
  pending: { en: "Pending", ar: "قيد المراجعة" },
  approved: { en: "Approved", ar: "موافق عليه" },
  rejected: { en: "Rejected", ar: "مرفوض" },
};

export function normalizeProjectStatus(status: string): ProjectStatus {
  const normalized = status.trim().toLowerCase().replace(/-/g, "_");

  if (normalized === "approved") return "approved";
  if (normalized === "rejected") return "rejected";
  if (normalized === "pending" || normalized === "under_review") return "pending";

  return "pending";
}

export function formatProjectDate(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatProjectRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const diffMs = Date.now() - date.getTime();

  if (Number.isNaN(date.getTime())) return "";

  const minutes = Math.floor(diffMs / 60_000);
  const hours = Math.floor(diffMs / 3_600_000);
  const days = Math.floor(diffMs / 86_400_000);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  if (days === 1) return "منذ يوم واحد";
  return `منذ ${days} يوم`;
}

export function getProjectStatusColor(status: NormalizedProjectStatus): ProjectStatusColors {
  return STATUS_COLORS[status];
}

export function getProjectStatusLabel(status: NormalizedProjectStatus): ProjectStatusLabel {
  return STATUS_LABELS[status];
}

export function getMediaUrl(item: { url?: string; file?: string }): string | null {
  return resolveAssetUrl(item.url) ?? resolveAssetUrl(item.file);
}

export function getFirstProjectMediaUrl(
  media: Array<{ url?: string; file?: string }>,
): string | null {
  for (const item of media) {
    const url = getMediaUrl(item);
    if (url) return url;
  }
  return null;
}
