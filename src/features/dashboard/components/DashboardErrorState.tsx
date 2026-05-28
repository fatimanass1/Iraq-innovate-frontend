"use client";

import { AlertCircle } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_STATES } from "../constants/dashboard-content";
import { cairo, outfit } from "../fonts";

type DashboardErrorStateProps = {
  message?: string;
  onRetry?: () => void;
  className?: string;
};

export function DashboardErrorState({
  message,
  onRetry,
  className,
}: DashboardErrorStateProps) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-[1200px] flex-col items-center justify-center px-4 py-16 sm:px-6 lg:px-8",
        className,
      )}
      role="alert"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[rgba(239,68,68,0.12)] text-[#DC2626]">
        <AlertCircle className="size-7" strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h2
        className={cn(
          cairo.className,
          "mt-4 text-center text-[18px] font-bold text-[#010B18]",
        )}
        lang="ar"
      >
        {DASHBOARD_STATES.errorTitle}
      </h2>

      {message ? (
        <p
          className={cn(
            cairo.className,
            "mt-2 max-w-md text-center text-[14px] font-medium text-[rgba(1,11,24,0.55)]",
          )}
          lang="ar"
        >
          {message}
        </p>
      ) : null}

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className={cn(
            outfit.className,
            "mt-6 inline-flex h-10 items-center justify-center rounded-full bg-[#010B18] px-6 text-[13px] font-semibold text-white",
            "transition-colors hover:bg-[rgba(1,11,24,0.9)]",
          )}
        >
          {DASHBOARD_STATES.retry}
        </button>
      ) : null}
    </div>
  );
}
