"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";

type AdminReviewEmptyStateProps = {
  message: string;
  icon: LucideIcon;
};

export function AdminReviewEmptyState({ message, icon: Icon }: AdminReviewEmptyStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-4 py-10 text-center"
      style={{ borderColor: T.cardBorder, backgroundColor: "rgba(249, 250, 251, 0.6)" }}
    >
      <span
        className="flex size-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: "rgba(168, 207, 69, 0.12)", color: T.primaryGreen }}
      >
        <Icon className="size-5" strokeWidth={1.75} />
      </span>
      <p className={cn(cairo.className, "max-w-xs text-[14px] leading-6")} style={{ color: T.textMuted }} lang="ar">
        {message}
      </p>
    </div>
  );
}
