"use client";

import { cn } from "@/shared/utils/utils";
import { ADMIN_STATES } from "../../constants/admin-dashboard-content";
import { cairo } from "../../fonts";

type AdminDashboardErrorStateProps = {
  message?: string;
  onRetry: () => void;
};

export function AdminDashboardErrorState({
  message = ADMIN_STATES.error,
  onRetry,
}: AdminDashboardErrorStateProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className={cn(cairo.className, "text-[15px] font-medium text-[#010B18]")} lang="ar">
        {message}
      </p>
      <button
        type="button"
        onClick={onRetry}
        className={cn(
          cairo.className,
          "inline-flex h-10 items-center justify-center rounded-full bg-[#A8CF45] px-6 text-[13px] font-semibold text-[#010B18]",
        )}
        lang="ar"
      >
        {ADMIN_STATES.retry}
      </button>
    </div>
  );
}
