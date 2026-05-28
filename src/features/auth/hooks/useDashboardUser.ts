"use client";

import { useMemo } from "react";
import type { DashboardUser } from "@/features/dashboard/types/dashboard.types";
import { useAuthStore } from "../store/authStore";
import { getUserInitials } from "../utils/user.helpers";

const GUEST_USER: DashboardUser = {
  name: "Guest",
  organization: "—",
  initials: "G",
};

/** Reactive navbar user derived from auth store. */
export function useDashboardUser(): DashboardUser {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return useMemo(() => {
    if (!isAuthenticated || !user) {
      return GUEST_USER;
    }

    const name = user.name?.trim() || "مستخدم";
    const organization = user.organization?.trim() || "—";

    return {
      name,
      organization,
      initials: getUserInitials(name),
    };
  }, [isAuthenticated, user]);
}
