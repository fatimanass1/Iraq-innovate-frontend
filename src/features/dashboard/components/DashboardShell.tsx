"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { cairo, outfit } from "../fonts";
import { DashboardSidebar, type DashboardSidebarNavItem } from "./DashboardSidebar";

type DashboardShellProps = {
  children: ReactNode;
  activeNav?: string;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
  mainNavItems?: DashboardSidebarNavItem[];
  bottomNavItems?: DashboardSidebarNavItem[];
  showHomeLink?: boolean;
};

export function DashboardShell({
  children,
  activeNav = "dashboard",
  sidebarOpen,
  onSidebarClose,
  mainNavItems,
  bottomNavItems,
  showHomeLink,
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        cairo.className,
        outfit.className,
        "min-h-screen overflow-x-hidden text-[#010B18]",
      )}
      style={{ backgroundColor: DASHBOARD_THEME.background, direction: "rtl" }}
      dir="rtl"
    >
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar
          activeNav={activeNav}
          isOpen={sidebarOpen}
          onClose={onSidebarClose}
          mainNavItems={mainNavItems}
          bottomNavItems={bottomNavItems}
          showHomeLink={showHomeLink}
        />

        <main className="min-h-screen min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
