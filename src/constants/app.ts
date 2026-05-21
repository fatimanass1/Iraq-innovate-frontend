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

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Stats", href: "#stats" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: "Features", href: "#services" },
    { label: "Pricing", href: "#" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#contact" },
    { label: "Careers", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
} as const;
