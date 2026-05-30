"use client";

import {
  AlertCircle,
  CheckCircle2,
  Inbox,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../../fonts";
import {
  ADMIN_NOTIFICATION_TYPE_STYLES,
  ADMIN_NOTIFICATIONS_THEME as T,
} from "../constants/admin-notifications-theme";
import type { AdminNotificationItem } from "../types/admin-notification.types";
import { AdminProjectDetailsLink } from "../../components/navigation/AdminProjectDetailsLink";

const TYPE_ICONS: Record<AdminNotificationItem["type"], LucideIcon> = {
  approved: CheckCircle2,
  pending: AlertCircle,
  received: Inbox,
  rejected: XCircle,
};

type AdminNotificationCardProps = {
  item: AdminNotificationItem;
  isActive: boolean;
  onSelect: (id: string) => void;
};

export function AdminNotificationCard({ item, isActive, onSelect }: AdminNotificationCardProps) {
  const typeStyle = ADMIN_NOTIFICATION_TYPE_STYLES[item.type];
  const Icon = TYPE_ICONS[item.type];
  const isRead = item.isRead;

  return (
    <AdminProjectDetailsLink
      projectId={item.projectId}
      source="notifications"
      onClick={() => onSelect(item.id)}
      className={cn(
        "group flex w-full min-w-0 items-start gap-3 p-4 transition-colors duration-150 sm:gap-4 sm:p-6",
        "hover:border-[rgba(168,207,69,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/40",
      )}
      style={{
        borderRadius: T.cardRadius,
        backgroundColor: isRead ? T.readCardBg : T.unreadCardBg,
        borderWidth: isRead ? 1 : 0,
        borderStyle: "solid",
        borderColor: isRead ? T.readCardBorder : "transparent",
        borderInlineStartWidth: isRead ? 1 : T.cardBorderWidth,
        borderInlineStartColor: isRead ? T.readCardBorder : typeStyle.border,
        boxShadow: isRead ? T.cardShadowRead : T.cardShadowUnread,
        opacity: isRead ? T.readCardOpacity : 1,
        outline: isActive ? `1px solid ${T.activeBorder}` : undefined,
      }}
      dir="rtl"
    >
      <div className="min-w-0 flex-1 text-end" style={{ display: "flex", flexDirection: "column", gap: T.cardContentGap }}>
        <div className="flex w-full flex-row-reverse items-start justify-between gap-3">
          <p
            className={cn(cairo.className, "min-w-0 flex-1 font-bold text-end")}
            style={{
              fontSize: T.titleFontSize,
              lineHeight: `${T.titleLineHeight}px`,
              color: isRead ? T.titleColorRead : T.titleColor,
            }}
            lang="ar"
          >
            {item.titleAr}
          </p>
          <span
            className={cn("shrink-0 whitespace-nowrap")}
            style={{
              fontSize: T.timeFontSize,
              lineHeight: `${T.timeLineHeight}px`,
              color: T.timeColor,
            }}
          >
            {item.timeLabel}
          </span>
        </div>

        <p
          className={cn(cairo.className, "text-end")}
          style={{
            fontSize: T.bodyFontSize,
            lineHeight: `${T.bodyLineHeight}px`,
            color: isRead ? T.bodyColorRead : T.bodyColor,
          }}
          lang="ar"
        >
          {item.bodyAr.includes(item.projectNameAr) ? (
            item.bodyAr
          ) : (
            <>
              {item.bodyAr}{" "}
              <strong className="font-bold">&quot;{item.projectNameAr}&quot;</strong>
            </>
          )}
        </p>
      </div>

      <div
        className="flex shrink-0 items-center justify-center"
        style={{
          width: T.cardIconSize,
          height: T.cardIconSize,
          borderRadius: T.cardIconRadius,
          backgroundColor: typeStyle.iconBg,
        }}
      >
        <Icon
          style={{ width: T.cardIconInnerSize, height: T.cardIconInnerSize, color: typeStyle.iconColor }}
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>
    </AdminProjectDetailsLink>
  );
}
