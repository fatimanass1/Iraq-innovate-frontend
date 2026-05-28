import { API_BASE_URL } from "@/shared/utils/env";

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30_000,
  RETRY_COUNT: 2,
} as const;
