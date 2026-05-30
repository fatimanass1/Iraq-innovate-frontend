"use client";

import { ChevronLeft, Clock3 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_REVIEW } from "../../constants/admin-dashboard-content";
import { cairo, outfit } from "../../fonts";
import type { AdminQuickReviewItem } from "../../types/admin-dashboard.types";
import { AdminProjectDetailsLink } from "../navigation/AdminProjectDetailsLink";

type AdminQuickReviewCardProps = {
  item: AdminQuickReviewItem;
  featured?: boolean;
};

export function AdminQuickReviewCard({ item, featured = false }: AdminQuickReviewCardProps) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-2xl border transition-shadow",
        featured && "ring-1 ring-[rgba(168,207,69,0.2)]",
      )}
      style={{
        borderColor: featured ? "rgba(168, 207, 69, 0.22)" : T.dividerLight,
        background: featured ? "rgba(168, 207, 69, 0.06)" : T.innerCardBg,
        boxShadow: featured ? "0 4px 16px rgba(168, 207, 69, 0.08)" : "none",
      }}
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {item.isUrgent ? (
              <span
                className={cn(cairo.className, "rounded-full px-2.5 py-0.5 text-[10px] font-semibold")}
                style={{ backgroundColor: T.urgentBadge, color: T.urgentText }}
                lang="ar"
              >
                عاجل
              </span>
            ) : null}
            <span
              className={cn(
                outfit.className,
                "rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
              )}
              style={{ backgroundColor: T.surfaceInset, color: T.textSubtle }}
            >
              {item.reference}
            </span>
          </div>
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: T.iconBgPending }}
          >
            <Clock3 className="size-4" style={{ color: T.trendPending }} strokeWidth={1.75} />
          </div>
        </div>

        <div className="text-end">
          <AdminProjectDetailsLink
            projectId={item.id}
            source="quick-review-title"
            className="block"
          >
            <h3
              className={cn(
                cairo.className,
                "text-[15px] font-semibold leading-6 text-[#010B18] transition-colors group-hover:text-[#7BA832]",
              )}
              lang="ar"
            >
              {item.title}
            </h3>
          </AdminProjectDetailsLink>
          <p
            className={cn(cairo.className, "mt-1.5 line-clamp-2 text-[12px] leading-5")}
            style={{ color: T.textMuted }}
            lang="ar"
          >
            {item.description}
          </p>
          <p
            className={cn(cairo.className, "mt-2 text-[11px] font-medium")}
            style={{ color: T.textSecondary }}
            lang="ar"
          >
            {item.teamLabel}
          </p>
        </div>

        <div
          className="flex flex-col gap-2 border-t pt-3 sm:flex-row"
          style={{ borderColor: T.dividerLight }}
        >
          <AdminProjectDetailsLink
            projectId={item.id}
            source="quick-review-cta"
            className={cn(
              cairo.className,
              "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-[13px] font-semibold text-[#010B18] transition-opacity hover:opacity-90",
            )}
            style={{ backgroundColor: T.primaryGreen }}
          >
            {ADMIN_REVIEW.review}
            <ChevronLeft className="size-4 rotate-180" aria-hidden="true" />
          </AdminProjectDetailsLink>
          <AdminProjectDetailsLink
            projectId={item.id}
            source="quick-review-details"
            className={cn(
              cairo.className,
              "inline-flex h-10 flex-1 items-center justify-center rounded-full border text-[13px] font-medium text-[#010B18] transition-colors",
            )}
            style={{
              borderColor: T.divider,
              backgroundColor: "rgba(255,255,255,0.8)",
            }}
          >
            {ADMIN_REVIEW.details}
          </AdminProjectDetailsLink>
        </div>
      </div>
    </article>
  );
}
