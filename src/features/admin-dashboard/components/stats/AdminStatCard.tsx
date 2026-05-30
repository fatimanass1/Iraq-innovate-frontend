"use client";

import { CheckCircle2, Clock3, Rocket, XCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { AnimatedCounter } from "@/shared/animations";
import { ADMIN_CONTENT_LAYOUT, ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { cairo, outfit } from "../../fonts";
import type { AdminStatCard as AdminStatCardType } from "../../types/admin-dashboard.types";

const ICONS = {
  total: Rocket,
  approved: CheckCircle2,
  pending: Clock3,
  rejected: XCircle,
} as const;

const ICON_BG: Record<AdminStatCardType["icon"], string> = {
  total: T.iconBgTotal,
  approved: T.iconBgApproved,
  pending: T.iconBgPending,
  rejected: T.iconBgRejected,
};

type AdminStatCardProps = {
  stat: AdminStatCardType;
  className?: string;
  onClick?: () => void;
  active?: boolean;
};

export function AdminStatCard({ stat, className, onClick, active }: AdminStatCardProps) {
  const Icon = ICONS[stat.icon];
  const isHighlight = stat.variant === "highlight";

  return (
    <article
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={cn(
        "flex w-full min-w-0 flex-col justify-between border backdrop-blur-[12px] transition-shadow duration-200",
        "min-h-[118px] p-4 sm:min-h-[146px] sm:p-6",
        onClick &&
          "cursor-pointer hover:shadow-[0px_12px_28px_rgba(1,11,24,0.06)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#A8CF45]",
        active && "ring-2 ring-[#A8CF45]/60",
        className,
      )}
      style={{
        gap: ADMIN_CONTENT_LAYOUT.statsCardGap,
        borderRadius: ADMIN_CONTENT_LAYOUT.statsCardRadius,
        background: isHighlight ? T.highlightCardBg : T.cardBg,
        borderColor: isHighlight ? "transparent" : T.cardBorder,
        boxShadow: T.cardShadow,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <p
            className={cn(cairo.className, "font-medium")}
            style={{
              fontSize: T.statLabelSize,
              lineHeight: `${T.statLabelLineHeight}px`,
              color: isHighlight ? T.highlightLabel : T.textSecondary,
            }}
            lang="ar"
          >
            {stat.labelAr}
          </p>
          <p
            className={cn(outfit.className, "font-bold text-[22px] leading-7 sm:text-[30px] sm:leading-9")}
            style={{
              color: isHighlight ? T.highlightCardText : T.textPrimary,
            }}
          >
            <AnimatedCounter value={stat.value} />
          </p>
        </div>

        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            width: ADMIN_CONTENT_LAYOUT.statsIconSize,
            height: ADMIN_CONTENT_LAYOUT.statsIconSize,
            borderRadius: ADMIN_CONTENT_LAYOUT.statsIconRadius,
            backgroundColor: isHighlight ? "rgba(184, 255, 44, 0.12)" : ICON_BG[stat.icon],
          }}
        >
          <Icon
            className="size-5"
            style={{ color: isHighlight ? T.accentLime : T.primaryGreen }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      </div>
    </article>
  );
}
