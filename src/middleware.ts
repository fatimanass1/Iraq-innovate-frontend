import { NextResponse, type NextRequest } from "next/server";

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
  const locale = getLocalePrefix(request.nextUrl.pathname);
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
