import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cairo, outfit } from "@/features/dashboard/fonts";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className={`${cairo.className} ${outfit.className}`}>{children}</div>;
}
