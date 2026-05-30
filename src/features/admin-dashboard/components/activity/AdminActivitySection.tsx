"use client";

import Link from "next/link";
import { cn } from "@/shared/utils/utils";
import { ROUTES } from "@/shared/constants/routes";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_SECTIONS, ADMIN_STATES } from "../../constants/admin-dashboard-content";
import { cairo } from "../../fonts";
import type { AdminActivityItem } from "../../types/admin-dashboard.types";
import { AdminPanelShell } from "../shared/AdminPanelShell";
import { AdminActivityItem as AdminActivityItemRow } from "./AdminActivityItem";

type AdminActivitySectionProps = {
  activities: AdminActivityItem[];
};

export function AdminActivitySection({ activities }: AdminActivitySectionProps) {
  return (
    <AdminPanelShell
      title={ADMIN_SECTIONS.recentActivity}
      ariaLabel={ADMIN_SECTIONS.recentActivity}
      className="h-full min-h-[360px]"
      headerStart={
        <Link
          href={ROUTES.ADMIN_NOTIFICATIONS}
          className={cn(
            cairo.className,
            "rounded-full px-3 py-1 text-[12px] font-medium transition-colors hover:bg-[rgba(168,207,69,0.12)]",
          )}
          style={{ color: T.primaryGreen }}
          lang="ar"
        >
          {ADMIN_SECTIONS.viewAll}
        </Link>
      }
    >
      {activities.length === 0 ? (
        <p
          className={cn(cairo.className, "py-10 text-center text-[14px]")}
          style={{ color: T.textMuted }}
          lang="ar"
        >
          {ADMIN_STATES.emptyActivity}
        </p>
      ) : (
        <div className="admin-soft-scrollbar flex max-h-[420px] flex-col gap-2.5 overflow-y-auto overscroll-contain ps-1">
          {activities.map((activity) => (
            <AdminActivityItemRow key={activity.id} item={activity} />
          ))}
        </div>
      )}
    </AdminPanelShell>
  );
}
