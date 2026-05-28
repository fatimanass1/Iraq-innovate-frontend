"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";

function SkeletonBlock({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("animate-pulse rounded-2xl bg-[rgba(1,11,24,0.06)]", className)}
      style={style}
      aria-hidden="true"
    />
  );
}

export function DashboardSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-[1200px] min-w-0 overflow-x-hidden px-4 py-4 sm:px-6 sm:py-5 lg:px-8"
      aria-busy="true"
    >
      <div className="mt-5 flex justify-end">
        <SkeletonBlock className="h-10 w-40 rounded-full" />
      </div>

      <section className="mt-5 grid w-full min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <SkeletonBlock
            key={`stat-skeleton-${index}`}
            className="h-full min-h-[132px] w-full rounded-3xl sm:min-h-[148px] md:min-h-[162px]"
          />
        ))}
      </section>

      <section className="mt-7">
        <SkeletonBlock className="mb-4 h-4 w-24" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <SkeletonBlock
              key={`project-skeleton-${index}`}
              className="min-h-[168px] rounded-3xl"
            />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <SkeletonBlock className="mb-5 h-5 w-36" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <SkeletonBlock key={`activity-skeleton-${index}`} className="h-20 rounded-2xl" />
          ))}
        </div>
      </section>

      <p className={cn(cairo.className, "sr-only")} lang="ar">
        جاري تحميل لوحة التحكم...
      </p>
    </div>
  );
}
