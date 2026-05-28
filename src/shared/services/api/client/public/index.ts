import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_CONFIG } from "@/shared/services/api/core/config";
import type { ApiErrorResponse } from "@/shared/services/api/core/types";

export const publicClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

publicClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const message =
      error.response?.data?.message ?? error.message ?? "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);

export type PublicRequestConfig = InternalAxiosRequestConfig;
