"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { userService } from "../services/userService";

export const CURRENT_USER_QUERY_KEY = ["auth", "current-user"] as const;

/** Fetches and syncs authenticated user profile from API. */
export function useCurrentUser() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const query = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: () => userService.fetchCurrentUser(),
    enabled: Boolean(accessToken && isAuthenticated),
    staleTime: 60_000,
  });

  return {
    user: user ?? query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
    error: query.error,
  };
}
