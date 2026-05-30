"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminDashboardApiError } from "../api/adminDashboardApi";
import { AdminActivitySection } from "../components/activity/AdminActivitySection";
import { AdminChartSection } from "../components/chart/AdminChartSection";
import { AdminQuickReviewSection } from "../components/review/AdminQuickReviewSection";
import { AdminStatsGrid } from "../components/stats/AdminStatsGrid";
import { AdminEvaluationsTable } from "../components/table/AdminEvaluationsTable";
import { AdminDashboardErrorState } from "../components/states/AdminDashboardErrorState";
import { AdminDashboardSkeleton } from "../components/states/AdminDashboardSkeleton";
import { AdminChromeHeader } from "../components/layout/AdminChromeHeader";
import { AdminContentArea } from "../components/layout/AdminContentArea";
import { ADMIN_HEADER, ADMIN_STATES } from "../constants/admin-dashboard-content";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useAdminShell } from "../hooks/useAdminShell";
import { cn } from "@/shared/utils/utils";
import { AdminDashboardShell } from "../layouts/AdminDashboardShell";
import { cairo } from "../fonts";
import { adminProjectsListUrlFromStatId } from "../utils/admin-routes";

export function AdminDashboardPage() {
  const router = useRouter();
  const shell = useAdminShell();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError, error, refetch } = useAdminDashboard();

  const filtered = useMemo(() => {
    if (!data) return null;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return data;

    const match = (value: string) => value.toLowerCase().includes(query);

    return {
      ...data,
      evaluations: data.evaluations.filter(
        (row) => match(row.title) || match(row.category) || match(row.statusLabelAr),
      ),
      quickReviews: data.quickReviews.filter(
        (item) => match(item.title) || match(item.description) || match(item.teamLabel),
      ),
      activities: data.activities.filter(
        (item) => match(item.titleAr) || match(item.descriptionAr),
      ),
    };
  }, [data, searchQuery]);

  const shellProps = {
    activeNav: "dashboard" as const,
    sidebarOpen: shell.sidebarOpen,
    onSidebarClose: shell.closeSidebar,
  };

  if (isLoading) {
    return (
      <AdminDashboardShell {...shellProps}>
        <div className="h-[74px] shrink-0" aria-hidden="true" />
        <AdminDashboardSkeleton />
      </AdminDashboardShell>
    );
  }

  if (isError) {
    const message =
      error instanceof AdminDashboardApiError ? error.message : ADMIN_STATES.error;

    return (
      <AdminDashboardShell {...shellProps}>
        <AdminDashboardErrorState message={message} onRetry={() => refetch()} />
      </AdminDashboardShell>
    );
  }

  if (!filtered) {
    return (
      <AdminDashboardShell {...shellProps}>
        <AdminDashboardSkeleton />
      </AdminDashboardShell>
    );
  }

  const isEmpty = filtered.totalCount === 0;

  return (
    <AdminDashboardShell {...shellProps}>
      <AdminChromeHeader
        user={filtered.user}
        titleAr={ADMIN_HEADER.titleAr}
        titleEn={ADMIN_HEADER.titleEn}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch
        onMenuClick={shell.openSidebar}
        profileOpen={shell.profileOpen}
        onProfileToggle={shell.toggleProfile}
        onProfileClose={shell.closeProfile}
      />

      <AdminContentArea>
        {isEmpty ? (
          <p
            className={cn(cairo.className, "rounded-[20px] border p-8 text-center text-[14px]")}
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              borderColor: "rgba(255, 255, 255, 0.6)",
              color: "rgba(1,11,24,0.5)",
            }}
            lang="ar"
          >
            {ADMIN_STATES.emptyProjects}
          </p>
        ) : null}

        <AdminStatsGrid
          stats={filtered.stats}
          onStatClick={(statId) => router.push(adminProjectsListUrlFromStatId(statId))}
        />

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <AdminChartSection data={filtered.chartSeries} />
          <AdminActivitySection activities={filtered.activities} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
          <AdminQuickReviewSection items={filtered.quickReviews} />
          <AdminEvaluationsTable rows={filtered.evaluations} />
        </div>
      </AdminContentArea>
    </AdminDashboardShell>
  );
}
