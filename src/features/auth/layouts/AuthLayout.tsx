import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

/** Auth route group shell — pages compose sign-in/sign-up screens. */
export function AuthLayout({ children }: AuthLayoutProps) {
  return children;
}
