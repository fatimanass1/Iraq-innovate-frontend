import { API_CONFIG } from "@/api/core/config";
import { env } from "@/lib/env";

export const APP_CONFIG = {
  NAME: "Iraq Innovate",
  DESCRIPTION: "Enterprise innovation platform for Iraq",
  DEFAULT_LOCALE: "en",
  API_URL: env.NEXT_PUBLIC_API_URL,
  APP_URL: env.NEXT_PUBLIC_APP_URL,
  TIMEOUT: API_CONFIG.TIMEOUT,
} as const;

export const NAV_LINKS = [{ label: "Contact", href: "#contact" }] as const;

export const FOOTER_LINKS = {
  product: [{ label: "Contact", href: "#contact" }],
  company: [{ label: "About", href: "#" }],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;
