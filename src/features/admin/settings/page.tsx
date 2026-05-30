"use client";

import { AdminChromeHeader } from "@/features/admin-dashboard/components/layout/AdminChromeHeader";
import { AdminContentArea } from "@/features/admin-dashboard/components/layout/AdminContentArea";
import { AdminDashboardErrorState } from "@/features/admin-dashboard/components/states/AdminDashboardErrorState";
import { useAdminDashboard } from "@/features/admin-dashboard/hooks/useAdminDashboard";
import { useAdminShell } from "@/features/admin-dashboard/hooks/useAdminShell";
import { AdminDashboardShell } from "@/features/admin-dashboard/layouts/AdminDashboardShell";
import { AdminSettingsAccountSection } from "@/components/admin/settings/AdminSettingsAccountSection";
import { AdminSettingsProfileCard } from "@/components/admin/settings/AdminSettingsProfileCard";
import { AdminSettingsSkeleton } from "@/components/admin/settings/AdminSettingsSkeleton";
import {
  ADMIN_SETTINGS_PAGE,
  ADMIN_SETTINGS_STATES,
} from "@/features/admin/settings/constants/admin-settings-content";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";
import { useAdminSettings } from "@/features/admin/settings/hooks/useAdminSettings";

export function AdminSettingsPage() {
  const shell = useAdminShell();
  const overviewQuery = useAdminDashboard();
  const settings = useAdminSettings();

  const layoutProps = {
    activeNav: "settings" as const,
    sidebarOpen: shell.sidebarOpen,
    onSidebarClose: shell.closeSidebar,
  };

  const user = overviewQuery.data?.user ?? {
    name: "مدير النظام",
    role: "مدير النظام",
    initials: "م",
  };

  if (settings.isLoading) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <div className="h-[74px]" aria-hidden="true" />
        <AdminSettingsSkeleton />
      </AdminDashboardShell>
    );
  }

  if (settings.isError) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminChromeHeader
          user={user}
          titleAr={ADMIN_SETTINGS_PAGE.titleAr}
          titleEn={ADMIN_SETTINGS_PAGE.titleEn}
          descriptionAr={ADMIN_SETTINGS_PAGE.subtitleAr}
          searchValue=""
          onSearchChange={() => undefined}
          showSearch={false}
          onMenuClick={shell.openSidebar}
          profileOpen={shell.profileOpen}
          onProfileToggle={shell.toggleProfile}
          onProfileClose={shell.closeProfile}
        />
        <AdminDashboardErrorState
          message={ADMIN_SETTINGS_STATES.error}
          onRetry={() => settings.refetch()}
        />
      </AdminDashboardShell>
    );
  }

  if (!settings.profile) {
    return (
      <AdminDashboardShell {...layoutProps}>
        <AdminChromeHeader
          user={user}
          titleAr={ADMIN_SETTINGS_PAGE.titleAr}
          titleEn={ADMIN_SETTINGS_PAGE.titleEn}
          descriptionAr={ADMIN_SETTINGS_PAGE.subtitleAr}
          searchValue=""
          onSearchChange={() => undefined}
          showSearch={false}
          onMenuClick={shell.openSidebar}
          profileOpen={shell.profileOpen}
          onProfileToggle={shell.toggleProfile}
          onProfileClose={shell.closeProfile}
        />
        <AdminDashboardErrorState
          message={ADMIN_SETTINGS_STATES.empty}
          onRetry={() => settings.refetch()}
        />
      </AdminDashboardShell>
    );
  }

  return (
    <AdminDashboardShell {...layoutProps}>
      <AdminChromeHeader
        user={user}
        titleAr={ADMIN_SETTINGS_PAGE.titleAr}
        titleEn={ADMIN_SETTINGS_PAGE.titleEn}
        descriptionAr={ADMIN_SETTINGS_PAGE.subtitleAr}
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
          className="mx-auto flex w-full min-w-0 flex-col overflow-x-hidden lg:flex-row-reverse"
          style={{
            maxWidth: T.contentMaxWidth,
            padding: `${T.contentPaddingY}px clamp(16px, 4vw, ${T.contentPaddingX}px)`,
            gap: T.columnGap,
          }}
        >
          <div
            className="w-full shrink-0 lg:w-[344px]"
            style={{ maxWidth: T.profileColumnWidth }}
          >
            <AdminSettingsProfileCard profile={settings.profile} />
          </div>

          <div className="min-w-0 flex-1">
            <AdminSettingsAccountSection profile={settings.profile} />
          </div>
        </div>
      </AdminContentArea>
    </AdminDashboardShell>
  );
}
