"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { ROUTES } from "@/shared/constants/routes";
import { AdminDashboardApiError } from "../api/adminDashboardApi";
import { adminDashboardService } from "../services/adminDashboardService";

export const ADMIN_DASHBOARD_QUERY_KEY = ["admin-dashboard"] as const;

export function useAdminDashboard() {
  const router = useRouter();

  const query = useQuery({
    queryKey: ADMIN_DASHBOARD_QUERY_KEY,
    queryFn: () => adminDashboardService.getDashboard(),
    retry: (failureCount, error) => {
      if (error instanceof AdminDashboardApiError && (error.status === 401 || error.status === 403)) {
        return false;
      }
      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (query.error instanceof AdminDashboardApiError && query.error.status === 401) {
      const params = new URLSearchParams({
        [AUTH_SEARCH_PARAMS.redirect]: ROUTES.ADMIN_DASHBOARD,
      });
      router.replace(`${ROUTES.SIGN_IN}?${params.toString()}`);
    }
  }, [query.error, router]);

  return query;
}
