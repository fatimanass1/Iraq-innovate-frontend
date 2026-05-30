"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../../fonts";
import {
  ADMIN_NOTIFICATIONS_PAGE,
  ADMIN_NOTIFICATIONS_STATES,
} from "../constants/admin-notifications-content";
import { ADMIN_NOTIFICATIONS_THEME as T } from "../constants/admin-notifications-theme";
import type { AdminNotificationFilter, AdminNotificationItem } from "../types/admin-notification.types";
import { getEmptyMessageForFilter, type AdminNotificationEmptyKey } from "../utils/filter-notifications";
import { AdminNotificationCard } from "./AdminNotificationCard";

type AdminNotificationsListProps = {
  items: AdminNotificationItem[];
  filter: AdminNotificationFilter;
  activeId: string | null;
  hasMore: boolean;
  isFetching: boolean;
  onSelect: (id: string) => void;
  onLoadMore: () => void;
};

const EMPTY_MESSAGES: Record<AdminNotificationEmptyKey, string> = {
  empty: ADMIN_NOTIFICATIONS_STATES.empty,
  emptyUnread: ADMIN_NOTIFICATIONS_STATES.emptyUnread,
  emptyAction: ADMIN_NOTIFICATIONS_STATES.emptyAction,
};

export function AdminNotificationsList({
  items,
  filter,
  activeId,
  hasMore,
  isFetching,
  onSelect,
  onLoadMore,
}: AdminNotificationsListProps) {
  if (items.length === 0) {
    const emptyKey = getEmptyMessageForFilter(filter);
    return (
      <div
        className={cn(cairo.className, "rounded-[20px] border border-dashed px-6 py-12 text-center")}
        style={{
          borderColor: "rgba(1, 11, 24, 0.08)",
          color: "rgba(1, 11, 24, 0.45)",
          fontSize: 14,
        }}
        lang="ar"
      >
        {EMPTY_MESSAGES[emptyKey]}
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col" style={{ gap: T.listGap }}>
      {items.map((item) => (
        <AdminNotificationCard
          key={item.id}
          item={item}
          isActive={activeId === item.id}
          onSelect={onSelect}
        />
      ))}

      {hasMore ? (
        <div
          className="flex w-full justify-center"
          style={{ paddingTop: T.loadMorePaddingTop }}
        >
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isFetching}
            className={cn(
              cairo.className,
              "inline-flex items-center font-semibold transition-opacity disabled:opacity-60",
            )}
            style={{
              gap: T.loadMoreGap,
              padding: `${T.loadMoreButtonPaddingY}px ${T.loadMoreButtonPaddingX}px`,
              color: T.loadMoreText,
              fontSize: T.loadMoreFontSize,
              lineHeight: `${T.loadMoreLineHeight}px`,
            }}
            lang="ar"
          >
            {ADMIN_NOTIFICATIONS_PAGE.loadOlder}
            <ChevronDown className="size-2.5" aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
