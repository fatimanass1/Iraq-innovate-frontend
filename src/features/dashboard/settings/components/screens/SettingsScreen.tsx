"use client";

import { useState } from "react";
import { useDashboardUser } from "@/features/auth/hooks/useDashboardUser";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { DashboardErrorState } from "@/features/dashboard/components/DashboardErrorState";
import { AuthApiError } from "@/features/auth/types/auth.types";
import { SETTINGS_MESSAGES, SETTINGS_PAGE } from "../../constants/settings-content";
import { useSettings } from "../../hooks/useSettings";
import { ProfileCard } from "..";

export function SettingsScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navbarUser = useDashboardUser();
  const { isLoading: isUserLoading } = useCurrentUser();
  const { profile, isLoading, isError, error, updateProfile, isSaving, refetch } =
    useSettings();

  if (isUserLoading || isLoading || !profile) {
    return (
      <DashboardShell
        activeNav="settings"
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <div className="h-[74px] shrink-0 bg-white" aria-hidden="true" />
        <div
          className="flex min-h-[40vh] items-center justify-center"
          dir="rtl"
        >
          <div className="size-8 animate-spin rounded-full border-2 border-[#A8CF45] border-t-transparent" />
        </div>
      </DashboardShell>
    );
  }

  if (isError) {
    return (
      <DashboardShell
        activeNav="settings"
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <DashboardErrorState
          message={
            error instanceof AuthApiError
              ? error.message
              : SETTINGS_MESSAGES.loadError
          }
          onRetry={() => refetch()}
        />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      activeNav="settings"
      sidebarOpen={sidebarOpen}
      onSidebarClose={() => setSidebarOpen(false)}
    >
      <DashboardTopNavbar
        user={navbarUser}
        unreadNotifications={0}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onMenuClick={() => setSidebarOpen(true)}
        titleAr={SETTINGS_PAGE.titleAr}
        titleEn={SETTINGS_PAGE.titleEn}
      />

      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-6 sm:px-6 lg:px-8">
        <ProfileCard
          profile={profile}
          onSave={updateProfile}
          isSaving={isSaving}
        />
      </div>
    </DashboardShell>
  );
}
