"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";

type DetailsEmptyStateProps = {
  message: string;
  icon?: LucideIcon;
  className?: string;
};

export function DetailsEmptyState({ message, icon: Icon, className }: DetailsEmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[112px] flex-col items-center justify-center rounded-2xl px-4 py-8 text-center",
        className,
      )}
      style={{
        border: `1px dashed ${PROJECT_DETAILS_FIGMA.borderSoft}`,
        backgroundColor: "rgba(248,250,243,0.8)",
      }}
      dir="rtl"
    >
      {Icon ? (
        <span
          className="mb-3 flex size-10 items-center justify-center rounded-xl"
          style={{
            backgroundColor: PROJECT_DETAILS_FIGMA.accentSoft,
            color: PROJECT_DETAILS_FIGMA.accentDark,
          }}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      ) : null}
      <p
        className={cn(cairo.className, "max-w-sm text-[13px] font-medium")}
        style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
      >
        {message}
      </p>
    </div>
  );
}
