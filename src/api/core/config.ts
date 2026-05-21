import { env } from "@/lib/env";

export const API_CONFIG = {
  BASE_URL: env.NEXT_PUBLIC_API_URL,
  TIMEOUT: 30_000,
  RETRY_COUNT: 2,
} as const;
