"use client";

import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECTS_THEME as PM } from "../../constants/admin-projects-theme";
import { cairo } from "../../fonts";

type AdminProjectsPaginationProps = {
  page: number;
  totalPages: number;
  start: number;
  end: number;
  total: number;
  onPageChange: (page: number) => void;
};

function buildPageItems(page: number, totalPages: number): (number | "ellipsis")[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items: (number | "ellipsis")[] = [1];

  if (page > 3) items.push("ellipsis");

  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  for (let current = start; current <= end; current += 1) {
    items.push(current);
  }

  if (page < totalPages - 2) items.push("ellipsis");

  items.push(totalPages);
  return items;
}

export function AdminProjectsPagination({
  page,
  totalPages,
  start,
  end,
  total,
  onPageChange,
}: AdminProjectsPaginationProps) {
  const items = buildPageItems(page, totalPages);

  return (
    <div
      className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
      style={{ borderColor: PM.border }}
    >
      <p
        className={cn(cairo.className, "text-[12px] font-normal leading-4")}
        style={{ color: PM.textSecondary }}
        lang="ar"
      >
        عرض {start} إلى {end} من أصل {total} نتيجة
      </p>

      <div className="flex min-w-0 flex-wrap items-center justify-end gap-1">
        <PaginationButton
          ariaLabel="الصفحة السابقة"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronRight className="size-4" strokeWidth={1.75} />
        </PaginationButton>

        {items.map((item, index) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className={cn(cairo.className, "inline-flex size-8 items-center justify-center text-[12px]")}
              style={{ color: PM.textSecondary }}
            >
              ...
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              className={cn(
                cairo.className,
                "inline-flex items-center justify-center font-medium transition-colors",
              )}
              style={{
                width: PM.paginationBtnSize,
                height: PM.paginationBtnSize,
                borderRadius: PM.paginationBtnRadius,
                fontSize: 12,
                lineHeight: "16px",
                backgroundColor: item === page ? PM.tabActiveBg : PM.surface,
                color: item === page ? PM.textPrimary : PM.textSecondary,
                border: item === page ? "none" : `1px solid ${PM.border}`,
              }}
            >
              {item}
            </button>
          ),
        )}

        <PaginationButton
          ariaLabel="الصفحة التالية"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronLeft className="size-4" strokeWidth={1.75} />
        </PaginationButton>
      </div>
    </div>
  );
}

function PaginationButton({
  children,
  disabled,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      className="inline-flex items-center justify-center transition-opacity hover:opacity-80 disabled:opacity-40"
      style={{
        width: PM.paginationBtnSize,
        height: PM.paginationBtnSize,
        borderRadius: PM.paginationBtnRadius,
        border: `1px solid ${PM.border}`,
        backgroundColor: PM.surface,
        color: PM.textSecondary,
      }}
    >
      {children}
    </button>
  );
}
