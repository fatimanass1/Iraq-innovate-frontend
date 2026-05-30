"use client";

import { Download, Filter, Search } from "lucide-react";
import { CustomSelect } from "@/shared/components/ui/CustomSelect";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECTS_FILTERS_COPY, ADMIN_PROJECTS_TABS } from "../../constants/admin-projects-content";
import { ADMIN_PROJECTS_THEME as PM } from "../../constants/admin-projects-theme";
import { cairo } from "../../fonts";
import type { AdminProjectsFilters, AdminStatusFilter } from "../../types/admin-projects.types";

type AdminProjectsFilterBarProps = {
  filters: AdminProjectsFilters;
  onFiltersChange: (patch: Partial<AdminProjectsFilters>) => void;
  onApply: () => void;
  onExport: () => void;
  categories: { id: number; name: string }[];
  universities: string[];
  tabCounts: Record<Exclude<AdminStatusFilter, "draft">, number>;
};

const TABS: { id: AdminStatusFilter; label: string }[] = [
  { id: "all", label: ADMIN_PROJECTS_TABS.all },
  { id: "pending", label: ADMIN_PROJECTS_TABS.pending },
  { id: "approved", label: ADMIN_PROJECTS_TABS.approved },
  { id: "rejected", label: ADMIN_PROJECTS_TABS.rejected },
];

const fieldClass = cn(
  cairo.className,
  "w-full rounded-xl border text-[13px] text-[#010B18] outline-none transition",
  "focus:border-[rgba(168,207,69,0.35)] focus:ring-1 focus:ring-[rgba(168,207,69,0.12)]",
);

export function AdminProjectsFilterBar({
  filters,
  onFiltersChange,
  onApply,
  onExport,
  categories,
  universities,
  tabCounts,
}: AdminProjectsFilterBarProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-col gap-3 rounded-[20px] border p-1.5 sm:p-1.5"
        style={{ background: PM.surface, borderColor: PM.border }}
      >
        <div className="flex flex-col gap-3 px-3 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="admin-soft-scrollbar -mx-1 flex flex-nowrap items-center justify-end gap-1.5 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible">
            {TABS.map((tab) => {
              const isActive = filters.status === tab.id;
              const count = tabCounts[tab.id as keyof typeof tabCounts] ?? 0;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onFiltersChange({ status: tab.id })}
                  className={cn(
                    cairo.className,
                    "inline-flex shrink-0 items-center gap-2 font-semibold transition-colors",
                    isActive ? "text-[#010B18]" : "text-[#70706B]",
                  )}
                  style={{
                    padding: `${PM.tabPaddingY}px ${PM.tabPaddingX}px`,
                    borderRadius: PM.tabRadius,
                    backgroundColor: isActive ? PM.tabActiveBg : PM.tabInactiveBg,
                    fontSize: isActive ? 14 : 14,
                    lineHeight: "20px",
                  }}
                >
                  <span lang="ar">{tab.label}</span>
                  <span
                    className="rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-4"
                    style={{
                      backgroundColor: isActive ? "rgba(1,11,24,0.08)" : PM.tabCountBg,
                      color: isActive ? PM.textPrimary : PM.textSecondary,
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onExport}
            className={cn(
              cairo.className,
              "inline-flex items-center justify-center gap-2 self-end rounded-xl border bg-white/90 px-3 py-2 text-[12px] font-normal leading-4 text-[#70706B] transition hover:bg-white",
            )}
            style={{ borderColor: PM.border }}
          >
            <Download className="size-3.5" strokeWidth={1.75} />
            <span lang="ar">{ADMIN_PROJECTS_FILTERS_COPY.export}</span>
          </button>
        </div>
      </div>

      <div
        className="flex flex-col gap-4 rounded-[20px] border p-4"
        style={{ background: PM.surface, borderColor: PM.border }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(0,1.4fr)_repeat(4,minmax(0,1fr))_auto] xl:items-end">
          <label className="relative block min-w-0 xl:col-span-1">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2"
              style={{ color: "rgba(1,11,24,0.32)" }}
            />
            <input
              type="search"
              value={filters.search}
              onChange={(event) => onFiltersChange({ search: event.target.value })}
              placeholder={ADMIN_PROJECTS_FILTERS_COPY.searchPlaceholder}
              className={cn(fieldClass, "pe-3 ps-10")}
              style={{
                height: PM.filterFieldHeight,
                borderColor: PM.border,
                backgroundColor: PM.pageBg,
              }}
              dir="rtl"
              lang="ar"
            />
          </label>

          <CustomSelect
            label={
              <span lang="ar" className={cairo.className}>
                {ADMIN_PROJECTS_FILTERS_COPY.category}
              </span>
            }
            value={filters.category}
            onChange={(value) => onFiltersChange({ category: value })}
            placeholder={ADMIN_PROJECTS_FILTERS_COPY.all}
            options={[
              { value: "all", label: ADMIN_PROJECTS_FILTERS_COPY.all },
              ...categories.map((category) => ({
                value: String(category.id),
                label: category.name,
              })),
            ]}
            variant="admin"
            fontClassName={cairo.className}
          />

          <CustomSelect
            label={
              <span lang="ar" className={cairo.className}>
                {ADMIN_PROJECTS_FILTERS_COPY.university}
              </span>
            }
            value={filters.university}
            onChange={(value) => onFiltersChange({ university: value })}
            placeholder={ADMIN_PROJECTS_FILTERS_COPY.all}
            options={[
              { value: "all", label: ADMIN_PROJECTS_FILTERS_COPY.all },
              ...universities.map((university) => ({
                value: university,
                label: university,
              })),
            ]}
            variant="admin"
            fontClassName={cairo.className}
          />

          <div className="block min-w-0">
            <span
              className={cn(cairo.className, "mb-1.5 block text-end text-[12px] leading-4")}
              style={{ color: PM.textSecondary }}
              lang="ar"
            >
              {ADMIN_PROJECTS_FILTERS_COPY.dateRange}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(event) => onFiltersChange({ dateFrom: event.target.value })}
                className={fieldClass}
                style={{
                  height: PM.filterFieldHeight,
                  borderColor: PM.border,
                  backgroundColor: PM.pageBg,
                }}
              />
              <input
                type="date"
                value={filters.dateTo}
                onChange={(event) => onFiltersChange({ dateTo: event.target.value })}
                className={fieldClass}
                style={{
                  height: PM.filterFieldHeight,
                  borderColor: PM.border,
                  backgroundColor: PM.pageBg,
                }}
              />
            </div>
          </div>

          <CustomSelect
            label={
              <span lang="ar" className={cairo.className}>
                {ADMIN_PROJECTS_FILTERS_COPY.sort}
              </span>
            }
            value={filters.sort}
            onChange={(value) => onFiltersChange({ sort: value as AdminProjectsFilters["sort"] })}
            options={[
              { value: "newest", label: ADMIN_PROJECTS_FILTERS_COPY.sortNewest },
              { value: "oldest", label: ADMIN_PROJECTS_FILTERS_COPY.sortOldest },
              { value: "updated", label: ADMIN_PROJECTS_FILTERS_COPY.sortUpdated },
            ]}
            variant="admin"
            fontClassName={cairo.className}
          />

          <button
            type="button"
            onClick={onApply}
            className={cn(
              cairo.className,
              "inline-flex w-full items-center justify-center gap-2 font-bold text-white xl:w-auto",
            )}
            style={{
              height: PM.filterFieldHeight,
              paddingInline: 16,
              borderRadius: PM.applyButtonRadius,
              backgroundColor: PM.applyButtonBg,
              fontSize: 12,
              lineHeight: "16px",
            }}
          >
            <Filter className="size-4" strokeWidth={1.75} />
            <span lang="ar">{ADMIN_PROJECTS_FILTERS_COPY.apply}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
