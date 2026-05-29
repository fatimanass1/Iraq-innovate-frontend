import type { ReactNode } from "react";
import { AuthHomeLink } from "./AuthHomeLink";
import { AuthSidebar } from "./AuthSidebar";

type AuthScreenShellProps = {
  children: ReactNode;
};

export function AuthScreenShell({ children }: AuthScreenShellProps) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[#F6F7F3] lg:flex-row lg:items-stretch">
      <AuthSidebar />

      <main className="relative flex flex-1 items-center justify-center px-6 py-12 sm:px-10 lg:min-h-[730px] lg:px-16 lg:py-16">
        <AuthHomeLink />
        {children}
      </main>
    </div>
  );
}
