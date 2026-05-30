import { Suspense } from "react";
import { AdminProjectsPage } from "@/features/admin-dashboard/pages/AdminProjectsPage";
import { AdminDashboardSkeleton } from "@/features/admin-dashboard/components/states/AdminDashboardSkeleton";

export default function AdminProjectsRoutePage() {
  return (
    <Suspense fallback={<AdminDashboardSkeleton />}>
      <AdminProjectsPage />
    </Suspense>
  );
}
