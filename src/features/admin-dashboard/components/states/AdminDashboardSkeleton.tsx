"use client";

import { cn } from "@/shared/utils/utils";
import { DASHBOARD_THEME } from "@/features/dashboard/constants/dashboard-theme";
import { ADMIN_STATS_GRID_CLASS } from "../layout/AdminContentArea";

function Block({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-2xl bg-black/5", className)} />;
}

export function AdminDashboardSkeleton() {
  return (
    <div
      className="mx-auto flex w-full min-w-0 max-w-[1160px] flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:gap-8 lg:px-8 lg:py-8"
      style={{ backgroundColor: DASHBOARD_THEME.background }}
    >
      <div className={ADMIN_STATS_GRID_CLASS}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Block key={index} className="min-h-[118px] sm:min-h-[146px]" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-8">
        <Block className="min-h-[280px] sm:min-h-[420px]" />
        <Block className="min-h-[240px] sm:min-h-[420px]" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
        <Block className="min-h-[240px] sm:min-h-[280px]" />
        <Block className="min-h-[240px] sm:min-h-[280px]" />
      </div>
    </div>
  );
}
