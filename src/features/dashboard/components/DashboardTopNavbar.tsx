"use client";

import type { CSSProperties } from "react";
import { Bell, ChevronRight, Menu, Search } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_HEADER } from "../constants/dashboard-content";
import { DASHBOARD_TOP_NAVBAR_THEME as N } from "../constants/dashboard-top-navbar-theme";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { cairo, outfit } from "../fonts";
import type { DashboardUser } from "../types/dashboard.types";

export type DashboardTopNavbarProps = {
  user: DashboardUser;
  unreadNotifications: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick?: () => void;
  titleAr?: string;
  titleEn?: string;
  className?: string;
};

function NavbarSearch({
  value,
  onChange,
  className,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <label className={cn("relative block shrink-0", className)} style={style}>
      <span className="sr-only">Search</span>
      <Search
        className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 stroke-[1.75] text-[rgba(1,11,24,0.32)]"
        style={{ width: N.searchIconSize, height: N.searchIconSize }}
        aria-hidden="true"
      />
      <input
        type="search"
        placeholder={DASHBOARD_HEADER.searchPlaceholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          cairo.className,
          "w-full rounded-full pe-9 ps-3 text-end font-medium text-[#010B18] outline-none transition",
          "placeholder:text-[rgba(1,11,24,0.32)]",
          "focus:border-[rgba(168,207,69,0.35)] focus:ring-1 focus:ring-[rgba(168,207,69,0.1)]",
        )}
        style={{
          height: N.searchHeight,
          fontSize: N.searchTextSize,
          backgroundColor: N.searchBg,
          border: `1px solid ${N.searchBorder}`,
        }}
      />
    </label>
  );
}

function NavbarTitle({
  titleAr,
  titleEn,
  className,
}: {
  titleAr: string;
  titleEn: string;
  className?: string;
}) {
  return (
    <div className={cn("shrink-0 text-start", className)}>
      <div className="flex items-center gap-1" dir="rtl">
        <ChevronRight
          className="shrink-0 stroke-[1.75]"
          style={{
            width: N.chevronSize,
            height: N.chevronSize,
            color: `rgba(1, 11, 24, ${N.chevronOpacity})`,
          }}
          aria-hidden="true"
        />
        <h1
          className={cn(cairo.className, "font-bold leading-none text-[#010B18]")}
          style={{ fontSize: N.titleSize }}
          lang="ar"
        >
          {titleAr}
        </h1>
      </div>
      <p
        className={cn(outfit.className, "font-medium leading-none")}
        style={{
          marginTop: N.titleLineGap,
          fontSize: N.titleSubSize,
          color: `rgba(1, 11, 24, ${N.titleSubOpacity})`,
        }}
      >
        {titleEn}
      </p>
    </div>
  );
}

function NavbarActions({
  user,
  unreadNotifications,
  searchValue,
  onSearchChange,
  showSearch = true,
}: {
  user: DashboardUser;
  unreadNotifications: number;
  searchValue: string;
  onSearchChange: (value: string) => void;
  showSearch?: boolean;
}) {
  return (
    <div
      className="flex shrink-0 items-center"
      dir="ltr"
      style={{ gap: N.actionsGap }}
    >
      <div className="flex items-center" style={{ gap: N.profileGap }}>
        <div
          className={cn(
            outfit.className,
            "flex shrink-0 items-center justify-center rounded-full font-bold text-[#010B18]",
          )}
          style={{
            width: N.avatarSize,
            height: N.avatarSize,
            fontSize: N.avatarFontSize,
            backgroundColor: N.avatarBg,
          }}
          aria-hidden="true"
        >
          {user.initials}
        </div>
        <div className="hidden text-start sm:block">
          <p
            className={cn(outfit.className, "font-semibold leading-tight text-[#010B18]")}
            style={{ fontSize: N.nameSize }}
          >
            {user.name}
          </p>
          <p
            className={cn(outfit.className, "font-medium leading-tight")}
            style={{
              fontSize: N.orgSize,
              color: `rgba(1, 11, 24, ${N.orgOpacity})`,
            }}
          >
            {user.organization}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="relative flex shrink-0 items-center justify-center rounded-full transition hover:bg-[rgba(1,11,24,0.06)]"
        style={{
          width: N.bellButtonSize,
          height: N.bellButtonSize,
          backgroundColor: N.bellBg,
        }}
        aria-label="Notifications"
      >
        <Bell
          className="stroke-[1.75] text-[rgba(1,11,24,0.45)]"
          style={{ width: N.bellSize, height: N.bellSize }}
        />
        {unreadNotifications > 0 ? (
          <span
            className={cn(
              outfit.className,
              "absolute -right-0.5 -top-0.5 flex items-center justify-center rounded-full font-bold text-[#010B18]",
            )}
            style={{
              width: N.badgeSize,
              height: N.badgeSize,
              fontSize: N.badgeFontSize,
              backgroundColor: DASHBOARD_THEME.primaryGreen,
            }}
          >
            {unreadNotifications}
          </span>
        ) : null}
      </button>

      {showSearch ? (
        <NavbarSearch
          value={searchValue}
          onChange={onSearchChange}
          className="hidden md:block"
          style={{ width: N.searchWidth }}
        />
      ) : null}
    </div>
  );
}

export function DashboardTopNavbar({
  user,
  unreadNotifications,
  searchValue,
  onSearchChange,
  onMenuClick,
  titleAr = DASHBOARD_HEADER.titleAr,
  titleEn = DASHBOARD_HEADER.titleEn,
  className,
}: DashboardTopNavbarProps) {
  return (
    <header
      className={cn(
        "w-full min-w-0 shrink-0 overflow-hidden border-b bg-[#F8FAF3] lg:h-[74px]",
        className,
      )}
      style={{
        borderColor: N.borderColor,
        paddingInline: N.paddingX,
      }}
      dir="rtl"
    >
      {/* Desktop — title right · actions left */}
      <div
        className="hidden h-full items-center justify-between lg:flex"
        style={{ height: N.height }}
      >
        <NavbarTitle titleAr={titleAr} titleEn={titleEn} />
        <NavbarActions
          user={user}
          unreadNotifications={unreadNotifications}
          searchValue={searchValue}
          onSearchChange={onSearchChange}
        />
      </div>

      {/* Mobile & tablet */}
      <div className="flex flex-col justify-center gap-3 py-3 lg:hidden">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[rgba(1,11,24,0.5)] transition hover:bg-[rgba(1,11,24,0.04)]"
            aria-label="Open menu"
          >
            <Menu className="size-5 stroke-[1.75]" />
          </button>

          <NavbarTitle titleAr={titleAr} titleEn={titleEn} className="min-w-0 flex-1" />

          <NavbarActions
            user={user}
            unreadNotifications={unreadNotifications}
            searchValue={searchValue}
            onSearchChange={onSearchChange}
            showSearch={false}
          />
        </div>

        <NavbarSearch
          value={searchValue}
          onChange={onSearchChange}
          className="w-full md:hidden"
        />
      </div>
    </header>
  );
}
