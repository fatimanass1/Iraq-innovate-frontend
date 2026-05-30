import { Suspense } from "react";
import { AdminNotificationsPage } from "@/features/admin-dashboard/notifications/page";
import { AdminNotificationsSkeleton } from "@/features/admin-dashboard/notifications/components/AdminNotificationsSkeleton";

export default function AdminNotificationsRoutePage() {
  return (
    <Suspense fallback={<AdminNotificationsSkeleton />}>
      <AdminNotificationsPage />
    </Suspense>
  );
}
