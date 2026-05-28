"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { CURRENT_USER_QUERY_KEY } from "@/features/auth/hooks/useCurrentUser";
import { useAuthStore } from "@/features/auth/store/authStore";
import { SETTINGS_MESSAGES } from "../constants/settings-content";
import { settingsService } from "../services/settingsService";
import type { SettingsFormValues } from "../types/settings.types";
import { AuthApiError } from "@/features/auth/types/auth.types";

export const SETTINGS_QUERY_KEY = ["settings", "profile"] as const;

export function useSettings() {
  const userId = useAuthStore((state) => state.user?.id);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: [...SETTINGS_QUERY_KEY, userId ?? "guest"],
    queryFn: () => settingsService.getProfile(),
    enabled: Boolean(accessToken && isAuthenticated),
  });

  const updateMutation = useMutation({
    mutationFn: (values: SettingsFormValues) => settingsService.updateProfile(values),
    onSuccess: (data) => {
      queryClient.setQueryData([...SETTINGS_QUERY_KEY, userId ?? "guest"], data);
      queryClient.invalidateQueries({ queryKey: CURRENT_USER_QUERY_KEY });
      toast.success(SETTINGS_MESSAGES.saveSuccess);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof AuthApiError
          ? error.message
          : SETTINGS_MESSAGES.saveError;
      toast.error(message);
    },
  });

  return {
    profile: profileQuery.data,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    updateProfile: updateMutation.mutate,
    isSaving: updateMutation.isPending,
    saveError: updateMutation.error,
    refetch: profileQuery.refetch,
  };
}
