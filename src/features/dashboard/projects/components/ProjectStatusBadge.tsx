"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { PROJECT_STATUS_CONFIG } from "../constants/project-status";
import { outfit } from "@/features/dashboard/fonts";
import type { ProjectStatus } from "../types/project.types";

type ProjectStatusBadgeProps = {
  status: ProjectStatus;
  className?: string;
};

export function ProjectStatusBadge({ status, className }: ProjectStatusBadgeProps) {
  const config = PROJECT_STATUS_CONFIG[status];
  const StatusIcon: LucideIcon = config.icon;

  return (
    <span
      className={cn(
        outfit.className,
        "inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold",
        className,
      )}
      style={{
        backgroundColor: config.bg,
        color: config.text,
      }}
    >
      <StatusIcon className="size-2.5 stroke-[2]" aria-hidden="true" />
      {config.label}
    </span>
  );
}
