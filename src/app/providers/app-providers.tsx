"use client";

import { MotionConfig } from "framer-motion";
import { type ReactNode } from "react";
import { AuthCookieSync } from "@/features/auth/components/AuthCookieSync";
import { AuthUserBootstrap } from "@/features/auth/components/AuthUserBootstrap";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <MotionConfig reducedMotion="user">
          <AuthCookieSync />
          <AuthUserBootstrap />
          {children}
          <ToastProvider />
        </MotionConfig>
      </ThemeProvider>
    </QueryProvider>
  );
}
