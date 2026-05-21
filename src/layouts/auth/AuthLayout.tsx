import type { ReactNode } from "react";
import { Container } from "@/components/ui";
import { Logo } from "@/components/shared";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Container className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="surface-card p-8">{children}</div>
      </Container>
    </div>
  );
}
