"use client";

import { AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";
import type { DashboardActivity } from "../types/dashboard.types";

const ACTIVITY_ICONS = {
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Clock3,
} as const;

const ACTIVITY_ICON_STYLES = {
  success: "bg-[rgba(34,197,94,0.12)] text-[#16A34A]",
  warning: "bg-[rgba(239,68,68,0.12)] text-[#DC2626]",
  info: "bg-[rgba(234,179,8,0.12)] text-[#CA8A04]",
} as const;

type ActivityCardProps = {
  activity: DashboardActivity;
  className?: string;
};

export function ActivityCard({ activity, className }: ActivityCardProps) {
  const Icon = ACTIVITY_ICONS[activity.type];

  return (
    <article
      className={cn(
        "flex items-center gap-4 rounded-2xl bg-white px-5 py-4",
        "shadow-[0_1px_8px_rgba(1,11,24,0.04)]",
        className,
      )}
      dir="rtl"
    >
      <span className="size-2.5 shrink-0 rounded-full bg-[#A8CF45]" aria-hidden="true" />

      <div className="min-w-0 flex-1 text-start">
        <p
          className={cn(
            cairo.className,
            "text-[15px] font-medium leading-snug text-[#010B18] sm:text-[16px]",
          )}
          lang="ar"
        >
          {activity.messageAr}
        </p>
        <p
          className={cn(
            cairo.className,
            "mt-1 text-[12px] font-medium text-[rgba(1,11,24,0.42)] sm:text-[13px]",
          )}
          lang="ar"
        >
          {activity.timeLabel}
        </p>
      </div>

      <div
        className={cn(
          "flex size-10 shrink-0 items-center justify-center rounded-full",
          ACTIVITY_ICON_STYLES[activity.type],
        )}
      >
        <Icon className="size-[18px] stroke-[1.75]" aria-hidden="true" />
      </div>
    </article>
  );
}
