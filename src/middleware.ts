import { NextResponse, type NextRequest } from "next/server";

// =============================================================================
// CONSTANTS
// =============================================================================

const AUTH_COOKIE_NAME = "access_token";
const REDIRECT_QUERY_PARAM = "redirect";
const DEFAULT_AUTH_REDIRECT = "/dashboard";

/** Routes only accessible to unauthenticated users. */
const AUTH_ROUTES = ["/login", "/register"] as const;

/** Route prefixes that require an authenticated session. */
const PROTECTED_ROUTE_PREFIXES = ["/dashboard"] as const;

/** Supported locale URL prefixes for future i18n routing. */
const LOCALE_PREFIXES = ["en", "ar", "ku"] as const;

const LOGIN_ROUTE = "/login";

// =============================================================================
// LOCALE UTILITIES
// =============================================================================

function getLocalePrefix(pathname: string): string | null {
  for (const locale of LOCALE_PREFIXES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

function stripLocalePrefix(pathname: string): string {
  const locale = getLocalePrefix(pathname);
  if (!locale) return pathname;
  if (pathname === `/${locale}`) return "/";
  return pathname.slice(locale.length + 1) || "/";
}

// =============================================================================
// ROUTE UTILITIES
// =============================================================================

function matchesRoute(pathname: string, route: string): boolean {
  return pathname === route || pathname.startsWith(`${route}/`);
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some((prefix) =>
    matchesRoute(pathname, prefix),
  );
}

function isAuthRoute(pathname: string): boolean {
  return AUTH_ROUTES.some((route) => matchesRoute(pathname, route));
}

function sanitizeRedirectPath(path: string | null): string | null {
  if (!path) return null;
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  return path.split("?")[0] ?? null;
}

// =============================================================================
// AUTH UTILITIES
// =============================================================================

/** Lightweight cookie-only auth check — no API calls or profile fetching. */
function hasAuthSession(request: NextRequest): boolean {
  return Boolean(request.cookies.get(AUTH_COOKIE_NAME)?.value);
}

/**
 * Future: token refresh gate.
 * Return true when a refresh flow should run before continuing the request.
 */
function shouldRefreshSession(_request: NextRequest): boolean {
  return false;
}

/**
 * Future: role-based redirect (e.g. admin-only routes).
 * Return a NextResponse to redirect, or null to continue.
 */
function getRoleBasedRedirect(
  _request: NextRequest,
  _ctx: MiddlewareContext,
): NextResponse | null {
  return null;
}

/**
 * Future: admin route protection.
 * Extend PROTECTED_ROUTE_PREFIXES or add role checks here when needed.
 */
function getAdminRouteRedirect(
  _request: NextRequest,
  _ctx: MiddlewareContext,
): NextResponse | null {
  return null;
}

// =============================================================================
// REDIRECT HELPERS
// =============================================================================

interface MiddlewareContext {
  pathname: string;
  search: string;
  normalizedPath: string;
  locale: string | null;
  isAuthenticated: boolean;
}

function createContext(request: NextRequest): MiddlewareContext {
  const { pathname, search } = request.nextUrl;

  return {
    pathname,
    search,
    normalizedPath: stripLocalePrefix(pathname),
    locale: getLocalePrefix(pathname),
    isAuthenticated: hasAuthSession(request),
  };
}

function redirectToLogin(
  request: NextRequest,
  ctx: MiddlewareContext,
): NextResponse {
  const url = request.nextUrl.clone();
  url.pathname = LOGIN_ROUTE;
  url.search = "";
  url.searchParams.set(
    REDIRECT_QUERY_PARAM,
    `${ctx.normalizedPath}${ctx.search}`,
  );
  return NextResponse.redirect(url);
}

function redirectAuthenticatedUser(
  request: NextRequest,
  _ctx: MiddlewareContext,
): NextResponse {
  const redirectParam = request.nextUrl.searchParams.get(REDIRECT_QUERY_PARAM);
  const targetPath =
    sanitizeRedirectPath(redirectParam) ?? DEFAULT_AUTH_REDIRECT;

  const url = request.nextUrl.clone();
  url.pathname = targetPath;
  url.search = "";
  return NextResponse.redirect(url);
}

function continueWithLocaleHeader(ctx: MiddlewareContext): NextResponse {
  const response = NextResponse.next();
  if (ctx.locale) {
    response.headers.set("x-locale", ctx.locale);
  }
  return response;
}

// =============================================================================
// MIDDLEWARE
// =============================================================================

export function middleware(request: NextRequest) {
  const ctx = createContext(request);

  // --- Future: refresh token handling (placeholder) ---
  if (shouldRefreshSession(request)) {
    // Implement refresh redirect/rewrite here when token strategy is defined.
  }

  // --- Protected routes: redirect unauthenticated users to login ---
  if (isProtectedRoute(ctx.normalizedPath) && !ctx.isAuthenticated) {
    return redirectToLogin(request, ctx);
  }

  // --- Auth routes: redirect authenticated users away from login/register ---
  if (isAuthRoute(ctx.normalizedPath) && ctx.isAuthenticated) {
    return redirectAuthenticatedUser(request, ctx);
  }

  // --- Future: role-based redirects (placeholder) ---
  const roleRedirect = getRoleBasedRedirect(request, ctx);
  if (roleRedirect) return roleRedirect;

  // --- Future: admin route protection (placeholder) ---
  const adminRedirect = getAdminRouteRedirect(request, ctx);
  if (adminRedirect) return adminRedirect;

  // --- Continue request with locale header ---
  return continueWithLocaleHeader(ctx);
}

// =============================================================================
// MATCHER CONFIG
// =============================================================================

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)",
  ],
};
