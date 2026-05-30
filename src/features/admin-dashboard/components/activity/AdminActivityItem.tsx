"use client";

import { ChevronLeft, CheckCircle2, FileText, MessageSquare, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { cairo } from "../../fonts";
import type { AdminActivityItem as AdminActivityItemType } from "../../types/admin-dashboard.types";
import { AdminProjectDetailsLink } from "../navigation/AdminProjectDetailsLink";

const ICONS = {
  submission: FileText,
  approved: CheckCircle2,
  review: MessageSquare,
  rejected: XCircle,
} as const;

const ICON_STYLES = {
  submission: { bg: T.iconBgTotal, color: T.primaryGreen },
  approved: { bg: T.iconBgApproved, color: T.trendApproved },
  review: { bg: T.iconBgPending, color: T.trendPending },
  rejected: { bg: T.iconBgRejected, color: T.trendNegative },
} as const;

type AdminActivityItemProps = {
  item: AdminActivityItemType;
};

export function AdminActivityItem({ item }: AdminActivityItemProps) {
  const Icon = ICONS[item.type];
  const iconStyle = ICON_STYLES[item.type];

  return (
    <AdminProjectDetailsLink
      projectId={item.projectId}
      source="activity"
      className={cn(
        "group flex items-start gap-3 rounded-2xl border p-3 transition-colors",
        "hover:border-[rgba(168,207,69,0.25)]",
      )}
      style={{
        borderColor: T.dividerLight,
        backgroundColor: T.innerCardBg,
      }}
    >
      <div
        className="flex size-10 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconStyle.bg }}
      >
        <Icon className="size-[18px]" style={{ color: iconStyle.color }} strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1 text-end">
        <p
          className={cn(
            cairo.className,
            "text-[14px] font-semibold leading-5 text-[#010B18] transition-colors group-hover:text-[#7BA832]",
          )}
          lang="ar"
        >
          {item.titleAr}
        </p>
        <p
          className={cn(cairo.className, "mt-1 line-clamp-2 text-[12px] leading-[18px]")}
          style={{ color: T.textMuted }}
          lang="ar"
        >
          {item.descriptionAr}
        </p>
        <p
          className={cn(cairo.className, "mt-1.5 text-[11px] leading-4")}
          style={{ color: T.textSubtle }}
          lang="ar"
        >
          {item.timeLabel}
        </p>
      </div>

      <ChevronLeft
        className="mt-1 size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: T.primaryGreen }}
        aria-hidden="true"
      />
    </AdminProjectDetailsLink>
  );
}
