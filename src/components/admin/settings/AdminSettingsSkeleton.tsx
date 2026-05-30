"use client";

import type { CSSProperties } from "react";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";

function PulseBlock({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-[12px] bg-white/80 ${className ?? ""}`}
      style={style}
    />
  );
}

export function AdminSettingsSkeleton() {
  return (
    <div
      className="mx-auto flex w-full min-w-0 flex-col overflow-x-hidden lg:flex-row-reverse"
      style={{
        maxWidth: T.contentMaxWidth,
        padding: `${T.contentPaddingY}px clamp(16px, 4vw, ${T.contentPaddingX}px)`,
        gap: T.columnGap,
      }}
    >
      <PulseBlock
        className="w-full shrink-0 lg:w-[344px]"
        style={{ minHeight: 320, borderRadius: T.profileCardRadius }}
      />

      <PulseBlock className="min-w-0 flex-1" style={{ height: 280, borderRadius: T.sectionRadius }} />
    </div>
  );
}
