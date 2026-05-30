"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "../../fonts";
import {
  ADMIN_NOTIFICATIONS_FILTERS,
  ADMIN_NOTIFICATIONS_PAGE,
} from "../constants/admin-notifications-content";
import { ADMIN_NOTIFICATIONS_THEME as T } from "../constants/admin-notifications-theme";
import type { AdminNotificationFilter } from "../types/admin-notification.types";

const FILTER_OPTIONS: { id: AdminNotificationFilter; label: string }[] = [
  { id: "all", label: ADMIN_NOTIFICATIONS_FILTERS.all },
  { id: "unread", label: ADMIN_NOTIFICATIONS_FILTERS.unread },
  { id: "action_required", label: ADMIN_NOTIFICATIONS_FILTERS.actionRequired },
];

type AdminNotificationsToolbarProps = {
  filter: AdminNotificationFilter;
  onFilterChange: (filter: AdminNotificationFilter) => void;
  onMarkAllAsRead: () => void;
  isMarkingAll: boolean;
};

export function AdminNotificationsToolbar({
  filter,
  onFilterChange,
  onMarkAllAsRead,
  isMarkingAll,
}: AdminNotificationsToolbarProps) {
  return (
    <div
      className="flex w-full min-w-0 flex-col gap-3 sm:flex-row-reverse sm:items-end sm:justify-between"
      dir="rtl"
    >
      <button
        type="button"
        onClick={onMarkAllAsRead}
        disabled={isMarkingAll}
        className={cn(
          cairo.className,
          "inline-flex w-full shrink-0 items-center justify-center font-semibold transition-opacity disabled:opacity-60 sm:w-auto",
        )}
        style={{
          padding: `${T.markAllReadPaddingY}px ${T.markAllReadPaddingX}px`,
          borderRadius: T.markAllReadRadius,
          backgroundColor: T.markAllReadBg,
          border: `1px solid ${T.markAllReadBorder}`,
          boxShadow: T.markAllReadShadow,
          color: T.markAllReadText,
          fontSize: T.markAllReadFontSize,
          lineHeight: `${T.markAllReadLineHeight}px`,
        }}
        lang="ar"
      >
        {ADMIN_NOTIFICATIONS_PAGE.markAllRead}
      </button>

      <div
        className="admin-soft-scrollbar flex w-full min-w-0 flex-row-reverse flex-nowrap items-center overflow-x-auto sm:w-auto sm:flex-wrap sm:overflow-visible"
        style={{
          padding: T.filterGroupPadding,
          borderRadius: T.filterGroupRadius,
          backgroundColor: T.filterGroupBg,
          border: `1px solid ${T.filterGroupBorder}`,
          boxShadow: T.filterGroupShadow,
          gap: 0,
        }}
      >
        {FILTER_OPTIONS.map((option) => {
          const isActive = filter === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onFilterChange(option.id)}
              className={cn(cairo.className, "shrink-0 transition-colors")}
              style={{
                padding: `${T.filterTabPaddingY}px ${T.filterTabPaddingX}px`,
                borderRadius: T.filterTabRadius,
                backgroundColor: isActive ? T.filterTabActiveBg : "transparent",
                color: isActive ? T.filterTabActiveText : T.filterTabInactiveText,
                fontSize: isActive ? T.filterTabActiveFontSize : T.filterTabInactiveFontSize,
                lineHeight: `${isActive ? T.filterTabActiveLineHeight : T.filterTabInactiveLineHeight}px`,
                fontWeight: isActive ? 700 : 500,
              }}
              lang="ar"
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
