import type { ReactNode } from "react";
import { Footer, Header } from "@/components/shared";

interface WebsiteLayoutProps {
  children: ReactNode;
}

export function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#010B18] text-[#F5F7FA]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
