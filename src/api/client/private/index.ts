import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { getAuthSessionToken } from "@/lib/auth/session";
import { API_CONFIG } from "@/api/core/config";
import type { ApiErrorResponse } from "@/api/core/types";

export const privateClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

privateClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAuthSessionToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

privateClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      import("@/lib/auth/session").then(({ clearAuthSession }) => clearAuthSession());
    }

    const message =
      error.response?.data?.message ?? error.message ?? "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

export type PrivateRequestConfig = InternalAxiosRequestConfig;
