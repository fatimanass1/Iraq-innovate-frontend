import type { Metadata } from "next";
import { DashboardLayout } from "@/layouts/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
