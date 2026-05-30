"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "../../fonts";
import type { AdminProjectStatus } from "../../types/admin-projects.types";
import { ADMIN_STATUS_BADGE_STYLES } from "../../utils/admin-project-status";

type AdminStatusBadgeProps = {
  status: AdminProjectStatus;
  label: string;
};

export function AdminStatusBadge({ status, label }: AdminStatusBadgeProps) {
  const style = ADMIN_STATUS_BADGE_STYLES[status];

  return (
    <span
      className={cn(
        cairo.className,
        "inline-flex items-center gap-1.5 rounded-full border text-[12px] font-bold leading-4",
      )}
      style={{
        padding: "4px 12px",
        backgroundColor: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
      lang="ar"
    >
      <span className="size-1.5 rounded-full" style={{ width: 6, height: 6, backgroundColor: style.dot }} />
      {label}
    </span>
  );
}
