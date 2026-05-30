"use client";

import { CheckCircle2, Clock3, FolderKanban, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { AnimatedCounter } from "@/shared/animations";
import {
  ADMIN_PM_STAT_CARD_STYLES,
  ADMIN_PROJECTS_THEME as PM,
} from "../../constants/admin-projects-theme";
import { cairo, outfit } from "../../fonts";
import type { AdminStatCard } from "../../types/admin-dashboard.types";

const ICONS = {
  total: FolderKanban,
  approved: CheckCircle2,
  pending: Clock3,
  rejected: XCircle,
} as const;

type AdminManagementStatCardProps = {
  stat: AdminStatCard;
  active?: boolean;
  onClick?: () => void;
};

export function AdminManagementStatCard({ stat, active, onClick }: AdminManagementStatCardProps) {
  const Icon = ICONS[stat.icon];
  const style = ADMIN_PM_STAT_CARD_STYLES[stat.icon];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full min-w-0 items-center justify-between gap-2 border text-start transition-all sm:gap-4",
        "min-h-[88px] px-3 py-3 sm:min-h-[104px] sm:px-4",
        "hover:shadow-[0px_10px_28px_rgba(1,11,24,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8CF45]",
        active && "ring-2 ring-[#A8CF45]/45",
      )}
      style={{
        borderRadius: PM.statRadius,
        background: style.cardBg,
        borderColor: PM.border,
        boxShadow: PM.shadow,
      }}
    >
      <div
        className="flex shrink-0 items-center justify-center border"
        style={{
          width: PM.statIconSize,
          height: PM.statIconSize,
          borderRadius: PM.statIconRadius,
          backgroundColor: style.iconBg,
          borderColor: style.iconBorder,
        }}
      >
        <Icon className="size-5" style={{ color: style.valueColor }} strokeWidth={1.75} />
      </div>

      <div className="min-w-0 flex-1 text-end">
        <p
          className={cn(cairo.className, "font-normal")}
          style={{
            fontSize: PM.statLabelSize,
            lineHeight: `${PM.statLabelLineHeight}px`,
            color: PM.textSecondary,
          }}
          lang="ar"
        >
          {stat.labelAr}
        </p>
        <p
          className={cn(outfit.className, "font-bold text-[22px] leading-7 sm:text-[26px] sm:leading-8")}
          style={{ color: style.valueColor }}
        >
          <AnimatedCounter value={stat.value} />
        </p>
      </div>
    </button>
  );
}
