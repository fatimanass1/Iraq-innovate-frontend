import { Suspense } from "react";
import { AdminSettingsPage } from "@/features/admin/settings/page";
import { AdminSettingsSkeleton } from "@/components/admin/settings/AdminSettingsSkeleton";

export default function AdminSettingsRoutePage() {
  return (
    <Suspense fallback={<AdminSettingsSkeleton />}>
      <AdminSettingsPage />
    </Suspense>
  );
}
