"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { useAuthStore } from "../store/authStore";

type ProtectedNavigationOptions = {
  /** Destination when the user is authenticated */
  authenticatedPath: string;
};

export function useProtectedNavigation() {
  const router = useRouter();
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isAuthed = Boolean(isAuthenticated && accessToken);

  const navigateProtected = useCallback(
    ({ authenticatedPath }: ProtectedNavigationOptions) => {
      if (!isAuthed) {
        const params = new URLSearchParams({
          [AUTH_SEARCH_PARAMS.redirect]: authenticatedPath,
        });
        router.push(`${ROUTES.SIGN_IN}?${params.toString()}`);
        return;
      }

      router.push(authenticatedPath);
    },
    [isAuthed, router],
  );

  const navigateToProjectSubmit = useCallback(() => {
    navigateProtected({ authenticatedPath: ROUTES.PROJECT_SUBMIT });
  }, [navigateProtected]);

  const navigateToDashboard = useCallback(() => {
    navigateProtected({ authenticatedPath: ROUTES.DASHBOARD });
  }, [navigateProtected]);

  return {
    isAuthed,
    navigateProtected,
    navigateToProjectSubmit,
    navigateToDashboard,
  };
}
