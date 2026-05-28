"use client";

import { useEffect } from "react";
import {
  clearAuthCookies,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setUserIdCookie,
} from "@/shared/utils/auth/cookies";
import { useAuthStore } from "../store/authStore";

/**
 * Keeps auth cookies in sync with persisted auth state
 * so middleware can read them after a full page load.
 */
export function AuthCookieSync() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const userId = useAuthStore((state) => state.user?.id);

  useEffect(() => {
    if (accessToken && refreshToken) {
      setAccessTokenCookie(accessToken);
      setRefreshTokenCookie(refreshToken);

      if (userId != null) {
        setUserIdCookie(Number(userId));
      }

      return;
    }

    clearAuthCookies();
  }, [accessToken, refreshToken, userId]);

  return null;
}
