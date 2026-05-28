import { NextResponse, type NextRequest } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  USER_ID_COOKIE,
} from "@/shared/utils/auth/constants";
import {
  buildSignInRedirectUrl,
  isProtectedPath,
} from "@/shared/utils/auth/protected-routes";

const LOCALE_PREFIXES = ["en", "ar", "ku"] as const;

function getLocalePrefix(pathname: string): string | null {
  for (const locale of LOCALE_PREFIXES) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const requestedPath = `${pathname}${search}`;
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const userId = request.cookies.get(USER_ID_COOKIE)?.value;
  const isAuthenticated = Boolean((accessToken || refreshToken) && userId);

  if (isProtectedPath(pathname) && !isAuthenticated) {
    return NextResponse.redirect(buildSignInRedirectUrl(request.url, requestedPath));
  }

  const locale = getLocalePrefix(pathname);
  const response = NextResponse.next();

  if (locale) {
    response.headers.set("x-locale", locale);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?|ttf|eot)$).*)",
  ],
};
