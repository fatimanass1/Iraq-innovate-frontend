"use client";

import { useState } from "react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_CONTENT_LAYOUT, ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_CHART, ADMIN_SECTIONS } from "../../constants/admin-dashboard-content";
import { cairo, outfit } from "../../fonts";
import type { AdminChartPeriod, AdminChartPoint } from "../../types/admin-dashboard.types";
import { AdminTrendsChart } from "./AdminTrendsChart";

type AdminChartSectionProps = {
  data: AdminChartPoint[];
};

const PERIODS: { id: AdminChartPeriod; label: string }[] = [
  { id: "weekly", label: ADMIN_CHART.weekly },
  { id: "monthly", label: ADMIN_CHART.monthly },
  { id: "yearly", label: ADMIN_CHART.yearly },
];

export function AdminChartSection({ data }: AdminChartSectionProps) {
  const [period, setPeriod] = useState<AdminChartPeriod>("monthly");

  return (
    <section
      className="w-full min-w-0 border backdrop-blur-[12px]"
      style={{
        padding: ADMIN_CONTENT_LAYOUT.panelPadding,
        borderRadius: ADMIN_CONTENT_LAYOUT.panelRadius,
        background: T.cardBg,
        borderColor: T.cardBorder,
        boxShadow: T.cardShadow,
      }}
      aria-label={ADMIN_SECTIONS.trends.title}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 text-end">
          <h2
            className={cn(outfit.className, "font-semibold text-[#010B18]")}
            style={{
              fontSize: T.sectionTitleSize,
              lineHeight: `${T.sectionTitleLineHeight}px`,
            }}
          >
            {ADMIN_SECTIONS.trends.title}
          </h2>
          <p
            className={cn(cairo.className, "mt-1")}
            style={{
              fontSize: T.sectionSubtitleSize,
              lineHeight: `${T.sectionSubtitleLineHeight}px`,
              color: T.textMuted,
            }}
            lang="ar"
          >
            {ADMIN_SECTIONS.trends.subtitle}
          </p>
        </div>

        <div
          className="flex shrink-0 items-center gap-1 rounded-lg p-1"
          style={{ backgroundColor: T.chartToggleBg }}
          role="tablist"
          aria-label="Chart period"
        >
          {PERIODS.map((item) => {
            const isActive = item.id === period;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setPeriod(item.id)}
                className={cn(
                  cairo.className,
                  "rounded-md px-3 py-1.5 text-[12px] font-medium transition-colors",
                  isActive ? "text-white" : "text-[rgba(1,11,24,0.6)]",
                )}
                style={{
                  backgroundColor: isActive ? T.darkNavy : "transparent",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <AdminTrendsChart data={data} />
    </section>
  );
}
