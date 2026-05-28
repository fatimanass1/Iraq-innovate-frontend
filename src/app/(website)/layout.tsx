import type { Metadata } from "next";
import { WebsiteLayout } from "@/features/home/layouts";

export const metadata: Metadata = {
  title: "Home",
};

export default function WebsiteRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WebsiteLayout>{children}</WebsiteLayout>;
}
