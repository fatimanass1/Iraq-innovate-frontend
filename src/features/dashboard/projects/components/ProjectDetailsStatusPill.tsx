"use client";

import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import type { ProjectStatus } from "../types/project.types";
import { getProjectStatusLabel } from "../utils/project.helpers";

const STATUS_ICONS: Record<ProjectStatus, LucideIcon> = {
  pending: Clock3,
  approved: CheckCircle2,
  rejected: XCircle,
};

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; border: string }> = {
  pending: {
    bg: "rgba(251,191,36,0.14)",
    text: "#B45309",
    border: "rgba(251,191,36,0.35)",
  },
  approved: {
    bg: "rgba(34,197,94,0.12)",
    text: "#15803D",
    border: "rgba(34,197,94,0.28)",
  },
  rejected: {
    bg: "rgba(239,68,68,0.1)",
    text: "#B91C1C",
    border: "rgba(239,68,68,0.25)",
  },
};

type ProjectDetailsStatusPillProps = {
  status: ProjectStatus;
  size?: "md" | "lg";
  className?: string;
};

export function ProjectDetailsStatusPill({
  status,
  size = "md",
  className,
}: ProjectDetailsStatusPillProps) {
  const Icon = STATUS_ICONS[status];
  const styles = STATUS_STYLES[status];
  const label = getProjectStatusLabel(status);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full font-semibold",
        size === "lg" ? "px-3.5 py-1.5 text-[12px]" : "px-2.5 py-1 text-[10px]",
        className,
      )}
      style={{
        backgroundColor: styles.bg,
        color: styles.text,
        border: `1px solid ${styles.border}`,
      }}
    >
      <Icon className={size === "lg" ? "size-3.5" : "size-3"} strokeWidth={2} aria-hidden="true" />
      <span className={cairo.className}>{label.ar}</span>
      <span className={cn(outfit.className, "hidden opacity-70 sm:inline")}>({label.en})</span>
    </span>
  );
}
