"use client";

import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";

function Block({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-[rgba(1,11,24,0.06)] ${className ?? ""}`}
      style={style}
    />
  );
}

export function AdminProjectReviewSkeleton() {
  return (
    <div className="w-full min-w-0 overflow-x-hidden" style={{ backgroundColor: T.pageBg }}>
      <div className="mx-auto flex w-full min-w-0 max-w-[1160px] flex-col gap-4 px-4 py-4 sm:gap-6 sm:px-6 sm:py-6 lg:gap-8 lg:px-8 lg:py-8">
        <Block className="min-h-[100px] sm:min-h-[120px]" style={{ borderRadius: T.heroRadius }} />

        <div
          className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] lg:gap-8"
          dir="rtl"
        >
          <div className="order-2 flex flex-col gap-4 sm:gap-6 lg:order-1">
            <Block className="min-h-[160px] sm:min-h-[200px]" />
            <Block className="min-h-[120px] sm:min-h-[140px]" />
            <Block className="min-h-[220px] sm:min-h-[300px]" />
            <Block className="min-h-[140px] sm:min-h-[160px]" />
          </div>
          <aside className="order-1 flex flex-col gap-4 sm:gap-6 lg:order-2">
            <Block className="min-h-[280px] sm:min-h-[360px]" />
            <Block className="min-h-[180px] sm:min-h-[220px]" />
            <Block className="min-h-[160px] sm:min-h-[200px]" />
            <Block className="min-h-[140px] sm:min-h-[180px]" />
          </aside>
        </div>
      </div>
    </div>
  );
}
