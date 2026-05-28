"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";

function Block({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl", className)}
      style={{ backgroundColor: "rgba(1,11,24,0.06)" }}
      aria-hidden="true"
    />
  );
}

export function ProjectDetailsSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-[1280px] min-w-0 overflow-x-hidden px-4 py-5 sm:px-6 lg:px-8"
      style={{ backgroundColor: PROJECT_DETAILS_FIGMA.pageBg }}
      aria-busy="true"
    >
      <Block className="h-12 w-full max-w-2xl" />
      <Block className="mt-5 h-[280px] w-full rounded-3xl sm:h-[300px]" />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          <Block className="h-[320px] w-full" />
          <Block className="h-[200px] w-full" />
          <Block className="h-[160px] w-full" />
        </div>
        <Block className="h-[420px] w-full" />
      </div>

      <p className={cn(cairo.className, "sr-only")} lang="ar">
        جاري تحميل تفاصيل المشروع...
      </p>
    </div>
  );
}
