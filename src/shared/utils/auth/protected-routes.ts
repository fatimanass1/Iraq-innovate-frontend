import { ROUTES } from "@/shared/constants/routes";

/** Route prefixes that require authentication */
export const PROTECTED_ROUTE_PREFIXES = [
  ROUTES.DASHBOARD,
  ROUTES.MY_PROJECTS,
  ROUTES.PROJECT_SUBMIT,
  ROUTES.SUBMIT_PROJECT,
  "/dashboard/projects",
  "/projects",
  "/admin",
] as const;

export function isProtectedPath(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function buildSignInRedirectUrl(
  requestUrl: string,
  requestedPath: string,
): URL {
  const signInUrl = new URL(ROUTES.SIGN_IN, requestUrl);
  signInUrl.searchParams.set("redirect", requestedPath);
  return signInUrl;
}
