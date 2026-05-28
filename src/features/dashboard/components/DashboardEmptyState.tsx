"use client";

import { FolderOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_STATES } from "../constants/dashboard-content";
import { cairo, outfit } from "../fonts";

type DashboardEmptyStateProps = {
  className?: string;
};

export function DashboardEmptyState({ className }: DashboardEmptyStateProps) {
  const router = useRouter();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl bg-white px-6 py-12",
        "shadow-[0_2px_14px_rgba(1,11,24,0.05)]",
        className,
      )}
      dir="rtl"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[rgba(168,207,69,0.14)] text-[#7BA832]">
        <FolderOpen className="size-7" strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h3
        className={cn(
          cairo.className,
          "mt-4 text-center text-[16px] font-bold text-[#010B18]",
        )}
        lang="ar"
      >
        {DASHBOARD_STATES.emptyTitle}
      </h3>

      <p
        className={cn(
          cairo.className,
          "mt-2 max-w-sm text-center text-[13px] font-medium text-[rgba(1,11,24,0.5)]",
        )}
        lang="ar"
      >
        {DASHBOARD_STATES.emptyDescription}
      </p>

      <p
        className={cn(
          outfit.className,
          "mt-1 max-w-sm text-center text-[12px] font-medium text-[rgba(1,11,24,0.42)]",
        )}
      >
        {DASHBOARD_STATES.emptyDescriptionEn}
      </p>

      <button
        type="button"
        onClick={() => router.push(ROUTES.PROJECT_SUBMIT)}
        className={cn(
          outfit.className,
          "mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#A8CF45] px-6 text-[12px] font-semibold text-[#010B18]",
          "shadow-[0_4px_14px_rgba(168,207,69,0.26)] transition-all duration-150 hover:brightness-[1.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        )}
      >
        {DASHBOARD_STATES.emptyCta}
      </button>
    </div>
  );
}
