"use client";

import { X } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_NOTIFICATIONS } from "../../constants/admin-projects-content";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { cairo } from "../../fonts";
import type { AdminActivityItem } from "../../types/admin-dashboard.types";
import { AdminProjectDetailsLink } from "../navigation/AdminProjectDetailsLink";

type AdminNotificationsPanelProps = {
  open: boolean;
  onClose: () => void;
  activities: AdminActivityItem[];
};

export function AdminNotificationsPanel({ open, onClose, activities }: AdminNotificationsPanelProps) {
  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close notifications"
        className="fixed inset-0 z-[70] bg-[rgba(1,11,24,0.25)]"
        onClick={onClose}
      />
      <aside
        className="fixed start-4 top-20 z-[80] w-[min(100vw-2rem,360px)] rounded-2xl border p-4 shadow-xl sm:start-auto sm:end-4"
        style={{ background: T.cardBg, borderColor: T.cardBorder }}
        role="dialog"
        aria-label={ADMIN_NOTIFICATIONS.title}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="size-4" />
          </button>
          <h2 className={cn(cairo.className, "text-[16px] font-semibold text-[#010B18]")} lang="ar">
            {ADMIN_NOTIFICATIONS.title}
          </h2>
        </div>

        {activities.length === 0 ? (
          <p className={cn(cairo.className, "py-6 text-center text-[13px] text-[rgba(1,11,24,0.5)]")} lang="ar">
            {ADMIN_NOTIFICATIONS.empty}
          </p>
        ) : (
          <ul className="max-h-[320px] space-y-3 overflow-y-auto">
            {activities.slice(0, 8).map((item) => (
              <li key={item.id}>
                <AdminProjectDetailsLink
                  projectId={item.projectId}
                  source="notifications"
                  onClick={onClose}
                  className="block rounded-xl bg-white/60 p-3 hover:bg-white"
                >
                  <p className={cn(cairo.className, "text-[13px] font-medium text-[#010B18]")} lang="ar">
                    {item.titleAr}
                  </p>
                  <p className={cn(cairo.className, "mt-1 text-[11px] text-[rgba(1,11,24,0.5)]")} lang="ar">
                    {item.timeLabel}
                  </p>
                </AdminProjectDetailsLink>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </>
  );
}
