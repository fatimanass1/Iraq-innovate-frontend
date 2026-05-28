import { z } from "zod";

const PRODUCTION_API_BASE = "https://iaict.pythonanywhere.com";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_API_URL: z.string().url().default(PRODUCTION_API_BASE),
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NODE_ENV: process.env.NODE_ENV,
});

/** Strip trailing slashes and accidental `/api` suffix from env values. */
export function normalizeApiBaseUrl(url: string): string {
  return url.replace(/\/+$/, "").replace(/\/api$/, "");
}

export const API_BASE_URL = normalizeApiBaseUrl(
  env.NEXT_PUBLIC_API_BASE_URL ?? env.NEXT_PUBLIC_API_URL,
);
