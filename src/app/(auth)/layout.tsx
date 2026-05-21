import type { Metadata } from "next";
import { AuthLayout } from "@/layouts/auth";

export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
