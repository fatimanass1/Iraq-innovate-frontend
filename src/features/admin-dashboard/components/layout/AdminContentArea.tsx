"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_CONTENT_LAYOUT } from "../../constants/admin-dashboard-theme";

/** Shared responsive grid for admin stat cards — 2 / 3 / 4 columns */
export const ADMIN_STATS_GRID_CLASS =
  "grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-6 xl:grid-cols-4";

type AdminContentAreaProps = {
  children: ReactNode;
  className?: string;
  sectionGap?: number;
};

function resolveSectionGapClass(sectionGap?: number): string {
  if (sectionGap === 0) return "gap-0";
  if (sectionGap !== undefined && sectionGap <= 24) {
    return "gap-4 sm:gap-5 lg:gap-6";
  }
  return "gap-4 sm:gap-6 lg:gap-8";
}

/** Main scrollable content — Figma `Container` (149:4) padding & gap */
export function AdminContentArea({ children, className, sectionGap }: AdminContentAreaProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 flex-col overflow-x-hidden",
        "px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        resolveSectionGapClass(sectionGap),
        className,
      )}
      style={{
        maxWidth: ADMIN_CONTENT_LAYOUT.maxWidth,
      }}
    >
      {children}
    </div>
  );
}
