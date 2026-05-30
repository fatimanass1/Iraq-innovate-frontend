"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_CONTENT_LAYOUT, ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { outfit } from "../../fonts";

type AdminPanelShellProps = {
  title: string;
  ariaLabel: string;
  headerStart?: ReactNode;
  headerEnd?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function AdminPanelShell({
  title,
  ariaLabel,
  headerStart,
  headerEnd,
  children,
  className,
}: AdminPanelShellProps) {
  return (
    <section
      className={cn("flex w-full min-w-0 flex-col border backdrop-blur-[12px]", className)}
      style={{
        padding: ADMIN_CONTENT_LAYOUT.panelPadding,
        borderRadius: ADMIN_CONTENT_LAYOUT.panelRadius,
        background: T.cardBg,
        borderColor: T.cardBorder,
        boxShadow: T.cardShadow,
      }}
      aria-label={ariaLabel}
    >
      <div
        className="mb-5 flex items-center justify-between gap-3 border-b pb-4"
        style={{ borderColor: T.dividerLight }}
      >
        <h2
          className={cn(outfit.className, "min-w-0 font-semibold text-[#010B18]")}
          style={{ fontSize: T.sectionTitleSize, lineHeight: `${T.sectionTitleLineHeight}px` }}
          lang="ar"
        >
          {title}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {headerStart}
          {headerEnd}
        </div>
      </div>
      {children}
    </section>
  );
}
