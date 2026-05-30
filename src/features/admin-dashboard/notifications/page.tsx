"use client";

import { AdminChromeHeader } from "../components/layout/AdminChromeHeader";
import { AdminContentArea } from "../components/layout/AdminContentArea";
import { AdminDashboardErrorState } from "../components/states/AdminDashboardErrorState";
import { useAdminDashboard } from "../hooks/useAdminDashboard";
import { useAdminShell } from "../hooks/useAdminShell";
import { AdminDashboardShell } from "../layouts/AdminDashboardShell";
import { AdminNotificationsList } from "./components/AdminNotificationsList";
import { AdminNotificationsSkeleton } from "./components/AdminNotificationsSkeleton";
import { AdminNotificationsToolbar } from "./components/AdminNotificationsToolbar";
import {
  ADMIN_NOTIFICATIONS_PAGE,
  ADMIN_NOTIFICATIONS_STATES,
} from "./constants/admin-notifications-content";
import { ADMIN_NOTIFICATIONS_THEME as T } from "./constants/admin-notifications-theme";
import { useAdminNotifications } from "./hooks/useAdminNotifications";

export function AdminNotificationsPage() {
  const shell = useAdminShell();
  const overviewQuery = useAdminDashboard();
  const notifications = useAdminNotifications();

  const layoutProps = {
    activeNav: "notifications" as const,
    sidebarOpen: shell.sidebarOpen,
    onSidebarClose: shell.closeSidebar,
  };

  const user = overviewQuery.data?.user ?? {
    name: "مدير النظام",
    role: "مدير النظام",
    initials: "م",
  };

  if (notifications.isLoading) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <div className="h-[74px]" aria-hidden="true" />
        <AdminNotificationsSkeleton />
      </AdminDashboardShell>
    );
  }

  if (notifications.isError) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminChromeHeader
          user={user}
          titleAr={ADMIN_NOTIFICATIONS_PAGE.titleAr}
          titleEn={ADMIN_NOTIFICATIONS_PAGE.titleEn}
          descriptionAr={ADMIN_NOTIFICATIONS_PAGE.subtitleAr}
          searchValue=""
          onSearchChange={() => undefined}
          showSearch={false}
          onMenuClick={shell.openSidebar}
          profileOpen={shell.profileOpen}
          onProfileToggle={shell.toggleProfile}
          onProfileClose={shell.closeProfile}
        />
        <AdminDashboardErrorState
          message={ADMIN_NOTIFICATIONS_STATES.error}
          onRetry={() => notifications.refetch()}
        />
      </AdminDashboardShell>
    );
  }

  return (
    <AdminDashboardShell {...layoutProps}>
      <AdminChromeHeader
        user={user}
        titleAr={ADMIN_NOTIFICATIONS_PAGE.titleAr}
        titleEn={ADMIN_NOTIFICATIONS_PAGE.titleEn}
        descriptionAr={ADMIN_NOTIFICATIONS_PAGE.subtitleAr}
        searchValue=""
        onSearchChange={() => undefined}
        showSearch={false}
        onMenuClick={shell.openSidebar}
        profileOpen={shell.profileOpen}
        onProfileToggle={shell.toggleProfile}
        onProfileClose={shell.closeProfile}
      />

      <AdminContentArea sectionGap={0} className="!p-0 pb-8 pt-0 sm:pb-12">
        <div
          className="mx-auto flex w-full min-w-0 flex-col overflow-x-hidden"
          style={{
            maxWidth: T.panelMaxWidth,
            padding: `${T.panelPaddingY}px clamp(16px, 4vw, ${T.panelPaddingX}px)`,
            gap: T.panelGap,
          }}
        >
          <AdminNotificationsToolbar
            filter={notifications.filter}
            onFilterChange={notifications.setFilter}
            onMarkAllAsRead={notifications.markAllAsRead}
            isMarkingAll={notifications.isMarkingAll}
          />

          <AdminNotificationsList
            items={notifications.items}
            filter={notifications.filter}
            activeId={notifications.activeId}
            hasMore={notifications.hasMore}
            isFetching={notifications.isFetching}
            onSelect={notifications.handleSelect}
            onLoadMore={notifications.loadMore}
          />
        </div>
      </AdminContentArea>
    </AdminDashboardShell>
  );
}
