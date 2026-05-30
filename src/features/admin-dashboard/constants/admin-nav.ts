import type { ComponentType } from "react";
import { Bell, Layers3, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { ADMIN_NAV } from "./admin-dashboard-content";
import type { AdminNavId } from "../types/admin-dashboard.types";

export type AdminSidebarNavItem = {
  id: AdminNavId | "settings" | "logout";
  label: string;
  href?: string;
  icon: ComponentType<{ className?: string }>;
  onClick?: () => void;
  tone?: "default" | "danger";
};

export const ADMIN_MAIN_NAV: AdminSidebarNavItem[] = [
  {
    id: "dashboard",
    label: ADMIN_NAV.dashboard,
    href: ROUTES.ADMIN_DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    id: "projects",
    label: ADMIN_NAV.projects,
    href: ROUTES.ADMIN_PROJECTS,
    icon: Layers3,
  },
];

export function buildAdminBottomNav(actions: { onLogout: () => void }): AdminSidebarNavItem[] {
  return [
    {
      id: "notifications",
      label: ADMIN_NAV.notifications,
      href: ROUTES.ADMIN_NOTIFICATIONS,
      icon: Bell,
    },
    {
      id: "settings",
      label: ADMIN_NAV.settings,
      href: ROUTES.ADMIN_SETTINGS,
      icon: Settings,
    },
    {
      id: "logout",
      label: ADMIN_NAV.logout,
      icon: LogOut,
      tone: "danger",
      onClick: actions.onLogout,
    },
  ];
}
