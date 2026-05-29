"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { AUTH_COMMON } from "../constants/auth-content";

const HOME_LINK_RING = "0px 0px 0px 1px rgba(0, 0, 0, 0.1)";

export function AuthHomeLink() {
  return (
    <Link
      href={ROUTES.HOME}
      aria-label={AUTH_COMMON.homeAria}
      className="absolute end-6 top-6 z-10 flex size-10 items-center justify-center rounded-2xl bg-white/80 transition-opacity hover:opacity-80 lg:end-12 lg:top-10"
      style={{ boxShadow: HOME_LINK_RING }}
    >
      <Home className="size-6 text-[rgba(1,11,24,0.7)]" aria-hidden="true" />
    </Link>
  );
}
