"use client";

import { DashboardTopNavbar } from "@/features/dashboard/components/DashboardTopNavbar";
import { ADMIN_HEADER } from "../../constants/admin-dashboard-content";
import { AdminProfileMenu } from "../shell/AdminProfileMenu";
import type { AdminDashboardUser } from "../../types/admin-dashboard.types";
import { mapAdminUserToDashboardUser } from "../../utils/map-admin-user";

type AdminChromeHeaderProps = {
  user: AdminDashboardUser;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onMenuClick: () => void;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  profileOpen: boolean;
  onProfileToggle: () => void;
  onProfileClose: () => void;
};

export function AdminChromeHeader({
  user,
  searchValue,
  onSearchChange,
  onMenuClick,
  titleAr,
  titleEn,
  descriptionAr,
  showSearch = false,
  searchPlaceholder = ADMIN_HEADER.searchPlaceholder,
  profileOpen,
  onProfileToggle,
  onProfileClose,
}: AdminChromeHeaderProps) {
  const dashboardUser = mapAdminUserToDashboardUser(user);

  return (
    <DashboardTopNavbar
      user={dashboardUser}
      unreadNotifications={0}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onMenuClick={onMenuClick}
      onProfileClick={onProfileToggle}
      profileMenu={<AdminProfileMenu open={profileOpen} onClose={onProfileClose} user={user} />}
      titleAr={titleAr}
      titleEn={titleEn}
      descriptionAr={descriptionAr}
      searchPlaceholder={searchPlaceholder}
      showSearch={showSearch}
      showNotifications={false}
    />
  );
}
