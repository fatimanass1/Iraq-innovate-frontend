import type { ReactNode } from "react";

type SubmitProjectLayoutProps = {
  children: ReactNode;
};

/** Standalone submit flow shell — no website header/footer or dashboard chrome */
export function SubmitProjectLayout({ children }: SubmitProjectLayoutProps) {
  return children;
}
