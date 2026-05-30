"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/admin-dashboard/fonts";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";

type AdminSettingsSectionShellProps = {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function AdminSettingsSectionShell({
  title,
  icon,
  children,
  footer,
}: AdminSettingsSectionShellProps) {
  return (
    <section
      className="w-full min-w-0 border backdrop-blur-[12px]"
      style={{
        borderRadius: T.sectionRadius,
        background: T.sectionBg,
        borderColor: T.sectionBorder,
        boxShadow: T.sectionShadow,
      }}
      dir="rtl"
    >
      <header
        className="flex flex-row-reverse items-center justify-between border-b"
        style={{
          padding: T.sectionHeaderPadding,
          borderColor: T.sectionHeaderBorder,
        }}
      >
        <h2
          className={cn(cairo.className, "font-bold text-end")}
          style={{
            fontSize: T.sectionTitleSize,
            lineHeight: `${T.sectionTitleLineHeight}px`,
            color: T.textPrimary,
          }}
          lang="ar"
        >
          {title}
        </h2>
        <div style={{ color: T.sectionIconMuted }}>{icon}</div>
      </header>

      <div
        className="flex flex-col"
        style={{
          padding: T.sectionBodyPadding,
          gap: T.sectionBodyGap,
        }}
      >
        {children}
        {footer}
      </div>
    </section>
  );
}
