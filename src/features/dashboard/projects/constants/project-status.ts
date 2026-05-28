import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { ProjectStatus } from "@/features/dashboard/projects/types/project.types";
import {
  getProjectStatusColor,
  getProjectStatusLabel,
} from "@/features/dashboard/projects/utils/project.helpers";

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; bg: string; text: string; icon: LucideIcon }
> = {
  pending: {
    label: getProjectStatusLabel("pending").en,
    ...getProjectStatusColor("pending"),
    icon: Clock3,
  },
  approved: {
    label: getProjectStatusLabel("approved").en,
    ...getProjectStatusColor("approved"),
    icon: CheckCircle2,
  },
  rejected: {
    label: getProjectStatusLabel("rejected").en,
    ...getProjectStatusColor("rejected"),
    icon: XCircle,
  },
};

export const CATEGORY_COLORS = [
  "bg-[#A8CF45]",
  "bg-[#60A5FA]",
  "bg-[#F97316]",
] as const;

export function getCategoryColor(category: string): string {
  const index = category.length % CATEGORY_COLORS.length;
  return CATEGORY_COLORS[index];
}
