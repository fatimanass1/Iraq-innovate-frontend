"use client";

import { AnimatedCounter } from "@/shared/animations";
import { CheckCircle2, Clock3, FileText, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { cairo, outfit } from "../fonts";
import type { DashboardStat } from "../types/dashboard.types";

const STAT_ICONS = {
  file: FileText,
  check: CheckCircle2,
  clock: Clock3,
  x: XCircle,
} as const;

type StatsCardProps = {
  stat: DashboardStat;
  className?: string;
};

export function StatsCard({ stat, className }: StatsCardProps) {
  const Icon = STAT_ICONS[stat.icon];
  const isHighlight = stat.variant === "highlight";

  return (
    <article
      className={cn(
        "flex h-full min-h-[132px] w-full min-w-0 flex-col justify-between rounded-3xl px-3 py-3 sm:min-h-[148px] sm:px-4 sm:py-4 md:min-h-[162px]",
        "shadow-[0_2px_12px_rgba(1,11,24,0.04)] transition-shadow duration-200",
        "hover:shadow-[0_4px_16px_rgba(1,11,24,0.06)]",
        className,
      )}
      style={{
        background: isHighlight
          ? DASHBOARD_THEME.statsHighlightBg
          : DASHBOARD_THEME.statsDefaultBg,
      }}
    >
      <div className="flex justify-start">
        <div
          className={cn(
            "flex size-8 items-center justify-center rounded-xl sm:size-9",
            isHighlight
              ? "bg-[rgba(168,207,69,0.22)] text-[#7BA832]"
              : "bg-white/80 text-[rgba(1,11,24,0.4)]",
          )}
        >
          <Icon className="size-[14px] stroke-[1.75] sm:size-[16px]" aria-hidden="true" />
        </div>
      </div>

      <div className="min-w-0">
        <p
          className={cn(
            outfit.className,
            "text-[24px] font-bold leading-none text-[#010B18] sm:text-[28px] md:text-[32px]",
          )}
        >
          <AnimatedCounter value={stat.value} />
        </p>
        {stat.labelEn ? (
          <p
            className={cn(
              outfit.className,
              "mt-1 truncate text-[11px] font-medium text-[rgba(1,11,24,0.48)] sm:text-[12px]",
            )}
          >
            {stat.labelEn}
          </p>
        ) : null}
        <p
          className={cn(
            cairo.className,
            "mt-0.5 truncate text-[10px] font-medium text-[rgba(1,11,24,0.52)] sm:text-[11px]",
          )}
          lang="ar"
        >
          {stat.label}
        </p>
      </div>
    </article>
  );
}
