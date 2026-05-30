"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "@/features/dashboard/components/DashboardShell";
import { useDashboardLogout } from "@/features/dashboard/hooks/useDashboardLogout";
import { ADMIN_MAIN_NAV, buildAdminBottomNav } from "../constants/admin-nav";
import type { AdminNavId } from "../types/admin-dashboard.types";
type AdminDashboardShellProps = {
  children: ReactNode;
  activeNav: AdminNavId;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
};

export function AdminDashboardShell({
  children,
  activeNav,
  sidebarOpen,
  onSidebarClose,
}: AdminDashboardShellProps) {
  const logoutMutation = useDashboardLogout();

  const bottomNav = buildAdminBottomNav({
    onLogout: () => logoutMutation.mutate(),
  });

  return (
    <DashboardShell
      activeNav={activeNav}
      sidebarOpen={sidebarOpen}
      onSidebarClose={onSidebarClose}
      mainNavItems={ADMIN_MAIN_NAV}
      bottomNavItems={bottomNav}
      showHomeLink={false}
    >
      {children}
    </DashboardShell>
  );
}
