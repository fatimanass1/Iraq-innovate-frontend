"use client";

import { RevealItem, RevealStagger } from "@/shared/animations";
import type { AdminStatCard as AdminStatCardType } from "../../types/admin-dashboard.types";
import { ADMIN_STATS_GRID_CLASS } from "../layout/AdminContentArea";
import { AdminStatCard } from "./AdminStatCard";

type AdminStatsGridProps = {
  stats: AdminStatCardType[];
  onStatClick?: (statId: string) => void;
};

export function AdminStatsGrid({ stats, onStatClick }: AdminStatsGridProps) {
  return (
    <RevealStagger
      aria-label="Statistics"
      className={ADMIN_STATS_GRID_CLASS}
      stagger={0.06}
    >
      {stats.map((stat) => (
        <RevealItem key={stat.id} preset="scale-soft">
          <AdminStatCard stat={stat} onClick={onStatClick ? () => onStatClick(stat.id) : undefined} />
        </RevealItem>
      ))}
    </RevealStagger>
  );
}
