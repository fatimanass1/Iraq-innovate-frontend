"use client";

import type { ComponentType } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_BRAND, DASHBOARD_NAV } from "../constants/dashboard-content";
import { DASHBOARD_SIDEBAR_THEME as S } from "../constants/dashboard-header-theme";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { useDashboardLogout } from "../hooks/useDashboardLogout";
import { cairo, outfit } from "../fonts";
import type { DashboardNavId } from "../types/dashboard.types";

type NavItem = {
  id: DashboardNavId;
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const MAIN_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: DASHBOARD_NAV.dashboard,
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    id: "my-projects",
    label: DASHBOARD_NAV.myProjects,
    href: ROUTES.MY_PROJECTS,
    icon: FolderKanban,
  },
  {
    id: "settings",
    label: DASHBOARD_NAV.settings,
    href: ROUTES.SETTINGS,
    icon: Settings,
  },
];

const FOOTER_NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: DASHBOARD_NAV.homePortal,
    href: ROUTES.HOME,
    icon: Home,
  },
];

type DashboardSidebarProps = {
  activeNav?: DashboardNavId;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
};

function NavLink({
  item,
  activeNav,
  onClose,
}: {
  item: NavItem;
  activeNav: DashboardNavId;
  onClose?: () => void;
}) {
  const Icon = item.icon;
  const isActive = item.id === activeNav;

  return (
    <Link
      href={item.href}
      onClick={onClose}
      className={cn(
        "flex items-center transition-colors duration-150",
        cairo.className,
        "font-medium",
        !isActive && "hover:bg-[rgba(1,11,24,0.04)] hover:text-[#010B18]",
      )}
      style={{
        gap: 10,
        paddingInline: S.navItemPx,
        paddingBlock: S.navItemPy,
        borderRadius: S.navItemRadius,
        fontSize: S.navTextSize,
        backgroundColor: isActive ? DASHBOARD_THEME.activeNavBg : undefined,
        color: isActive
          ? "#010B18"
          : `rgba(1, 11, 24, ${S.inactiveTextOpacity})`,
      }}
    >
      <Icon
        className={cn(
          "size-[18px] shrink-0 stroke-[1.75]",
          isActive ? "text-[#010B18]" : "text-[rgba(1,11,24,0.4)]",
        )}
      />
      <span lang="ar">{item.label}</span>
    </Link>
  );
}

export function DashboardSidebar({
  activeNav = "dashboard",
  isOpen = false,
  onClose,
  className,
}: DashboardSidebarProps) {
  const logoutMutation = useDashboardLogout();

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-[rgba(1,11,24,0.2)] lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={cn(
          "flex shrink-0 flex-col border-l shadow-[0_2px_16px_rgba(1,11,24,0.04)]",
          "z-50 transition-transform duration-300 ease-out",
          "fixed inset-y-0 right-0 lg:sticky lg:top-0 lg:min-h-screen lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
          className,
        )}
        style={{
          width: DASHBOARD_THEME.sidebarWidth,
          backgroundColor: DASHBOARD_THEME.sidebarBg,
          borderColor: DASHBOARD_THEME.borderSubtle,
        }}
      >
        <div
          className="flex flex-col lg:min-h-screen"
          style={{
            paddingInline: S.paddingX,
            paddingBlockStart: S.paddingY,
            paddingBlockEnd: S.paddingY,
          }}
        >
          <div className="flex items-start justify-between">
            <Link
              href={ROUTES.HOME}
              className="flex items-center"
              style={{ gap: S.logoGap }}
              onClick={onClose}
            >
              <Image
                src="/logo1.png"
                alt=""
                width={36}
                height={40}
                className="shrink-0"
                style={{ height: S.logoHeight, width: "auto" }}
              />
              <div className="text-start">
                <p
                  className={cn(
                    outfit.className,
                    "font-bold uppercase tracking-[0.1em] text-[#A8CF45]",
                  )}
                  style={{ fontSize: S.brandEnSize }}
                >
                  {DASHBOARD_BRAND.titleEn}
                </p>
                <p
                  className={cn(cairo.className, "font-medium")}
                  style={{
                    fontSize: S.brandArSize,
                    color: `rgba(1, 11, 24, ${S.brandArOpacity})`,
                  }}
                  lang="ar"
                >
                  {DASHBOARD_BRAND.subtitleAr}
                </p>
              </div>
            </Link>

            {onClose ? (
              <button
                type="button"
                onClick={onClose}
                className="flex size-8 items-center justify-center rounded-lg text-[rgba(1,11,24,0.45)] lg:hidden"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </div>

          <nav
            className="flex flex-col"
            style={{ marginTop: S.navTopGap, gap: S.navItemGap }}
            aria-label="Dashboard navigation"
          >
            {MAIN_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                activeNav={activeNav}
                onClose={onClose}
              />
            ))}

            {FOOTER_NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                item={item}
                activeNav={activeNav}
                onClose={onClose}
              />
            ))}

            <div
              className="my-1 h-px w-full"
              style={{ backgroundColor: "rgba(1, 11, 24, 0.08)" }}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
              className={cn(
                "flex items-center transition-opacity hover:opacity-80 disabled:opacity-50",
                cairo.className,
                "font-medium",
              )}
              style={{
                gap: 8,
                paddingInline: S.navItemPx,
                paddingBlock: 8,
                fontSize: S.logoutTextSize,
                color: DASHBOARD_THEME.logoutColor,
              }}
            >
              <LogOut
                className="stroke-[1.75]"
                style={{ width: 16, height: 16 }}
                aria-hidden="true"
              />
              <span lang="ar">{DASHBOARD_NAV.logout}</span>
            </button>
          </nav>
        </div>
      </aside>
    </>
  );
}
