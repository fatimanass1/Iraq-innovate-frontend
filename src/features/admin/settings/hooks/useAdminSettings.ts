"use client";

import { useQuery } from "@tanstack/react-query";
import { adminSettingsService } from "../services/adminSettingsService";

export const ADMIN_SETTINGS_QUERY_KEY = ["admin", "settings"] as const;

export function useAdminSettings() {
  const profileQuery = useQuery({
    queryKey: ADMIN_SETTINGS_QUERY_KEY,
    queryFn: () => adminSettingsService.getProfile(),
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    refetch: profileQuery.refetch,
  };
}
