"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/shared/utils/utils";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { ADMIN_CHART } from "../../constants/admin-dashboard-content";
import { cairo } from "../../fonts";
import type { AdminChartPoint } from "../../types/admin-dashboard.types";

type AdminTrendsChartProps = {
  data: AdminChartPoint[];
};

export function AdminTrendsChart({ data }: AdminTrendsChartProps) {
  return (
    <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid stroke={T.chartGrid} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: T.textPrimary, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: T.textMuted, fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: `1px solid ${T.cardBorder}`,
              background: "#FFFFFF",
              boxShadow: T.cardShadow,
            }}
            labelStyle={{ fontFamily: "inherit", color: T.textPrimary }}
          />
          <Line
            type="monotone"
            dataKey="total"
            name={ADMIN_CHART.totalSeries}
            stroke={T.chartLineTotal}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="approved"
            name={ADMIN_CHART.approvedSeries}
            stroke={T.chartLineApproved}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap items-center justify-end gap-4">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: T.chartLineTotal }} />
          <span className={cn(cairo.className, "text-[12px] text-[#010B18]")} lang="ar">
            {ADMIN_CHART.totalSeries}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full" style={{ backgroundColor: T.chartLineApproved }} />
          <span className={cn(cairo.className, "text-[12px] text-[#010B18]")} lang="ar">
            {ADMIN_CHART.approvedSeries}
          </span>
        </div>
      </div>
    </div>
  );
}
