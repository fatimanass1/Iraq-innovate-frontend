"use client";

import { ADMIN_NOTIFICATIONS_THEME as T } from "../constants/admin-notifications-theme";

export function AdminNotificationsSkeleton() {
  return (
    <div
      className="mx-auto flex w-full min-w-0 flex-col overflow-x-hidden"
      style={{
        maxWidth: T.panelMaxWidth,
        padding: `${T.panelPaddingY}px ${T.panelPaddingX}px`,
        gap: T.panelGap,
      }}
    >
      <div className="flex flex-col gap-3 sm:flex-row-reverse sm:items-end sm:justify-between">
        <div className="h-[39px] w-[140px] animate-pulse rounded-[12px] bg-white/80" />
        <div className="h-[39px] w-[min(100%,280px)] animate-pulse rounded-[12px] bg-white/80" />
      </div>

      <div className="flex flex-col" style={{ gap: T.listGap }}>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[20px] bg-white/70"
            style={{ height: 112, padding: T.cardPadding }}
          />
        ))}
      </div>
    </div>
  );
}
