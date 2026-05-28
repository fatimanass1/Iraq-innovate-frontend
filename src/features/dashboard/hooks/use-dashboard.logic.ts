"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/shared/constants/routes";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { useAuthStore } from "@/features/auth/store/authStore";
import { ProjectsApiError } from "@/features/dashboard/projects/types/project.types";
import { dashboardService } from "../services/dashboardService";

export const DASHBOARD_QUERY_KEY = ["dashboard"] as const;

export function useDashboard() {
  const router = useRouter();
  const rawUserId = useAuthStore((state) => state.user?.id);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userId =
    rawUserId == null ? null : Number.isFinite(Number(rawUserId)) ? Number(rawUserId) : null;

  const query = useQuery({
    queryKey: [...DASHBOARD_QUERY_KEY, userId] as const,
    queryFn: () => dashboardService.getDashboard(),
    enabled: Boolean(isAuthenticated && accessToken && userId),
    retry: (failureCount, error) => {
      if (error instanceof ProjectsApiError && error.status === 401) {
        return false;
      }

      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (query.error instanceof ProjectsApiError && query.error.status === 401) {
      const params = new URLSearchParams({
        [AUTH_SEARCH_PARAMS.redirect]: ROUTES.DASHBOARD,
      });
      router.replace(`${ROUTES.SIGN_IN}?${params.toString()}`);
    }
  }, [query.error, router]);

  return query;
}
