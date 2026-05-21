export const AUTH_COOKIE_NAME = "access_token";

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/** Routes only accessible to unauthenticated users. */
export const AUTH_ROUTES = ["/login", "/register"] as const;

/** Route prefixes that require an authenticated session. */
export const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

/** Supported locale URL prefixes for future i18n routing. */
export const LOCALE_PREFIXES = ["en", "ar", "ku"] as const;

export type LocalePrefix = (typeof LOCALE_PREFIXES)[number];

export const DEFAULT_LOCALE: LocalePrefix = "en";
