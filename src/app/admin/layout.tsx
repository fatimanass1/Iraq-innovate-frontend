"use client";

import type { ReactNode } from "react";
import { AdminShellProvider } from "@/features/admin-dashboard/hooks/useAdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShellProvider>{children}</AdminShellProvider>;
}
