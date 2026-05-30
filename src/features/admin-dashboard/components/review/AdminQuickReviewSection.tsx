"use client";

import { cn } from "@/shared/utils/utils";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_REVIEW, ADMIN_SECTIONS, ADMIN_STATES } from "../../constants/admin-dashboard-content";
import { cairo } from "../../fonts";
import type { AdminQuickReviewItem } from "../../types/admin-dashboard.types";
import { AdminPanelShell } from "../shared/AdminPanelShell";
import { AdminQuickReviewCard } from "./AdminQuickReviewCard";

type AdminQuickReviewSectionProps = {
  items: AdminQuickReviewItem[];
};

export function AdminQuickReviewSection({ items }: AdminQuickReviewSectionProps) {
  const pendingCount = items.length;

  return (
    <AdminPanelShell
      title={ADMIN_SECTIONS.quickReview}
      ariaLabel={ADMIN_SECTIONS.quickReview}
      className="h-full"
      headerStart={
        pendingCount > 0 ? (
          <span
            className={cn(cairo.className, "rounded-full px-2.5 py-1 text-[11px] font-semibold")}
            style={{ backgroundColor: T.iconBgPending, color: T.trendPending }}
            lang="ar"
          >
            {pendingCount} {ADMIN_REVIEW.pendingCount}
          </span>
        ) : null
      }
    >
      {items.length === 0 ? (
        <p
          className={cn(cairo.className, "py-10 text-center text-[14px]")}
          style={{ color: T.textMuted }}
          lang="ar"
        >
          {ADMIN_STATES.emptyQuickReview}
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <AdminQuickReviewCard key={item.id} item={item} featured={index === 0} />
          ))}
        </div>
      )}
    </AdminPanelShell>
  );
}
