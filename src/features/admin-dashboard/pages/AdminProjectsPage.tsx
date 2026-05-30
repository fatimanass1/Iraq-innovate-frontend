"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { AdminDashboardApiError } from "../api/adminDashboardApi";
import { AdminChromeHeader } from "../components/layout/AdminChromeHeader";
import { AdminContentArea } from "../components/layout/AdminContentArea";
import { AdminProjectsFilterBar } from "../components/projects/AdminProjectsFilterBar";
import { AdminProjectsPagination } from "../components/projects/AdminProjectsPagination";
import { AdminProjectsTable } from "../components/projects/AdminProjectsTable";
import { AdminManagementStatCard } from "../components/stats/AdminManagementStatCard";
import { ADMIN_STATS_GRID_CLASS } from "../components/layout/AdminContentArea";
import { AdminDashboardErrorState } from "../components/states/AdminDashboardErrorState";
import { AdminDashboardSkeleton } from "../components/states/AdminDashboardSkeleton";
import { ADMIN_PROJECTS_HEADER } from "../constants/admin-projects-content";
import { ADMIN_STATES } from "../constants/admin-dashboard-content";
import {
  DEFAULT_ADMIN_PROJECTS_FILTERS,
  useAdminProjectsList,
} from "../hooks/useAdminProjectsList";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useAdminShell } from "../hooks/useAdminShell";
import { AdminDashboardShell } from "../layouts/AdminDashboardShell";
import type { AdminProjectsFilters, AdminStatusFilter } from "../types/admin-projects.types";
import { filterAdminProjectRows } from "../utils/filter-admin-projects";

function parseStatus(value: string | null): AdminStatusFilter {
  if (value === "pending" || value === "approved" || value === "rejected" || value === "draft") {
    return value;
  }
  return "all";
}

export function AdminProjectsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shell = useAdminShell();
  const overviewQuery = useAdminDashboard();

  const [localFilters, setLocalFilters] = useState<Omit<AdminProjectsFilters, "status">>(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars -- omit status from URL-driven filters
    const { status, ...rest } = DEFAULT_ADMIN_PROJECTS_FILTERS;
    return rest;
  });

  const status = parseStatus(searchParams.get("status"));
  const page = Number(searchParams.get("page")) || 1;

  const filters = useMemo<AdminProjectsFilters>(
    () => ({ ...localFilters, status }),
    [localFilters, status],
  );

  const { data, isLoading, isError, error, refetch } = useAdminProjectsList({ filters, page });

  const updateQuery = useCallback(
    (patch: { status?: AdminStatusFilter; page?: number }) => {
      const params = new URLSearchParams(searchParams.toString());
      if (patch.status !== undefined) {
        if (patch.status === "all") params.delete("status");
        else params.set("status", patch.status);
      }
      if (patch.page !== undefined) {
        if (patch.page <= 1) params.delete("page");
        else params.set("page", String(patch.page));
      }
      router.replace(`${ROUTES.ADMIN_PROJECTS}?${params.toString()}`);
    },
    [router, searchParams],
  );

  const handleFiltersChange = useCallback(
    (patch: Partial<AdminProjectsFilters>) => {
      if (patch.status !== undefined) {
        updateQuery({ status: patch.status, page: 1 });
        return;
      }

      setLocalFilters((prev) => ({ ...prev, ...patch }));
      updateQuery({ page: 1 });
    },
    [updateQuery],
  );

  const handleStatClick = (statId: string) => {
    const statusMap: Record<string, AdminStatusFilter> = {
      total: "all",
      approved: "approved",
      pending: "pending",
      rejected: "rejected",
    };
    handleFiltersChange({ status: statusMap[statId] ?? "all" });
  };

  const handleExport = () => {
    if (!data) return;
    const rows = filterAdminProjectRows(data.projects, filters);
    const header = ["id", "title", "owner", "category", "status", "created_at"];
    const csv = [
      header.join(","),
      ...rows.map((row) =>
        [row.id, row.title, row.ownerName, row.category, row.status, row.createdAt]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-projects.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const layoutProps = {
    activeNav: "projects" as const,
    sidebarOpen: shell.sidebarOpen,
    onSidebarClose: shell.closeSidebar,
  };

  if (isLoading) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <div className="h-[74px]" aria-hidden="true" />
        <AdminDashboardSkeleton />
      </AdminDashboardShell>
    );
  }

  if (isError) {
    const message = error instanceof AdminDashboardApiError ? error.message : ADMIN_STATES.error;
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminDashboardErrorState message={message} onRetry={() => refetch()} />
      </AdminDashboardShell>
    );
  }

  if (!data) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminDashboardSkeleton />
      </AdminDashboardShell>
    );
  }

  const user = overviewQuery.data?.user ?? {
    name: "مدير النظام",
    role: "مدير النظام",
    initials: "م",
  };

  return (
    <AdminDashboardShell {...layoutProps}>
      <AdminChromeHeader
        user={user}
        titleAr={ADMIN_PROJECTS_HEADER.titleAr}
        titleEn={ADMIN_PROJECTS_HEADER.titleEn}
        descriptionAr={ADMIN_PROJECTS_HEADER.subtitle}
        searchValue=""
        onSearchChange={() => undefined}
        showSearch={false}
        onMenuClick={shell.openSidebar}
        profileOpen={shell.profileOpen}
        onProfileToggle={shell.toggleProfile}
        onProfileClose={shell.closeProfile}
      />

      <AdminContentArea sectionGap={24}>
        <div className={ADMIN_STATS_GRID_CLASS}>
          {data.stats.map((stat) => (
            <AdminManagementStatCard
              key={stat.id}
              stat={stat}
              active={
                (stat.id === "total" && filters.status === "all") ||
                stat.id === filters.status
              }
              onClick={() => handleStatClick(stat.id)}
            />
          ))}
        </div>

        <AdminProjectsFilterBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onApply={() => updateQuery({ page: 1 })}
          onExport={handleExport}
          categories={data.categories}
          universities={data.universities}
          tabCounts={data.tabCounts}
        />

        <div className="flex flex-col">
          <AdminProjectsTable rows={data.filteredRows} />

          <AdminProjectsPagination
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            start={data.pagination.start}
            end={data.pagination.end}
            total={data.pagination.total}
            onPageChange={(nextPage) => updateQuery({ page: nextPage })}
          />
        </div>
      </AdminContentArea>
    </AdminDashboardShell>
  );
}
