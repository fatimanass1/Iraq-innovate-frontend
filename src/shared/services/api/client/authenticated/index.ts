import { authApi } from "@/features/auth/api/authApi";
import { authAuthenticatedClient } from "@/features/auth/api/authApiClient";
import { useAuthStore } from "@/features/auth/store/authStore";
import { setAccessTokenCookie } from "@/shared/utils/auth/cookies";
import { clearAuthSession } from "@/shared/utils/auth/session";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type { ApiErrorResponse } from "@/shared/services/api/core/types";

export { authApiClient, authAuthenticatedClient } from "@/features/auth/api/authApiClient";

export const authenticatedClient = authAuthenticatedClient;

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const { accessToken, refreshToken } = useAuthStore.getState();

  if (!accessToken || !refreshToken) {
    return null;
  }

  try {
    const tokens = await authApi.refreshToken({
      access: accessToken,
      refresh: refreshToken,
    });

    useAuthStore.getState().setTokens(tokens);
    setAccessTokenCookie(tokens.access);
    return tokens.access;
  } catch {
    clearAuthSession();
    return null;
  }
}

authenticatedClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccessToken = await refreshPromise;

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authenticatedClient(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export type AuthenticatedRequestConfig = InternalAxiosRequestConfig;
