"use client";

import Link from "next/link";
import { LogOut, Settings } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ROUTES } from "@/shared/constants/routes";
import { useDashboardLogout } from "@/features/dashboard/hooks/useDashboardLogout";
import { ADMIN_NAV } from "../../constants/admin-dashboard-content";
import { ADMIN_DASHBOARD_THEME as T } from "../../constants/admin-dashboard-theme";
import { cairo } from "../../fonts";
import type { AdminDashboardUser } from "../../types/admin-dashboard.types";

type AdminProfileMenuProps = {
  open: boolean;
  onClose: () => void;
  user: AdminDashboardUser;
};

export function AdminProfileMenu({ open, onClose, user }: AdminProfileMenuProps) {
  const logoutMutation = useDashboardLogout();

  if (!open) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close profile menu"
        className="fixed inset-0 z-[70] bg-transparent"
        onClick={onClose}
      />
      <div
        className="absolute end-0 top-[calc(100%+8px)] z-[80] w-[200px] overflow-hidden rounded-2xl border shadow-xl"
        style={{ background: "#FFFFFF", borderColor: T.cardBorder }}
        role="menu"
      >
        <div className="border-b px-4 py-3 text-end" style={{ borderColor: T.sidebarBorder }}>
          <p className={cn(cairo.className, "text-[14px] font-semibold text-[#010B18]")} lang="ar">
            {user.name}
          </p>
          <p className={cn(cairo.className, "text-[11px] text-[rgba(1,11,24,0.5)]")} lang="ar">
            {user.role}
          </p>
        </div>
        <Link
          href={ROUTES.ADMIN_DASHBOARD}
          onClick={onClose}
          className={cn(
            cairo.className,
            "flex items-center justify-end gap-2 px-4 py-3 text-[14px] hover:bg-black/5",
          )}
        >
          <span lang="ar">{ADMIN_NAV.settings}</span>
          <Settings className="size-4" />
        </Link>
        <button
          type="button"
          disabled={logoutMutation.isPending}
          onClick={() => logoutMutation.mutate()}
          className={cn(
            cairo.className,
            "flex w-full items-center justify-end gap-2 px-4 py-3 text-[14px] hover:bg-black/5 disabled:opacity-60",
          )}
          style={{ color: T.logoutColor }}
        >
          <span lang="ar">{ADMIN_NAV.logout}</span>
          <LogOut className="size-4" />
        </button>
      </div>
    </>
  );
}
