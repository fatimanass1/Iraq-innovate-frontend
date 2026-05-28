"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { cairo, outfit } from "../fonts";
import { DashboardSidebar } from "./DashboardSidebar";
import type { DashboardNavId } from "../types/dashboard.types";

type DashboardShellProps = {
  children: ReactNode;
  activeNav?: DashboardNavId;
  sidebarOpen: boolean;
  onSidebarClose: () => void;
};

export function DashboardShell({
  children,
  activeNav = "dashboard",
  sidebarOpen,
  onSidebarClose,
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
      {/* RTL flex: first child (sidebar) sits on the physical right */}
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar
          activeNav={activeNav}
          isOpen={sidebarOpen}
          onClose={onSidebarClose}
        />

        <main className="min-h-screen min-w-0 flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}
