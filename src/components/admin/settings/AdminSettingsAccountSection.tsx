"use client";

import { UserRound } from "lucide-react";
import {
  ADMIN_SETTINGS_FIELDS,
  ADMIN_SETTINGS_SECTIONS,
} from "@/features/admin/settings/constants/admin-settings-content";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";
import type { AdminSettingsProfile } from "@/features/admin/settings/types/admin-settings.types";
import { AdminSettingsField } from "./AdminSettingsField";
import { AdminSettingsSectionShell } from "./AdminSettingsSectionShell";

type AdminSettingsAccountSectionProps = {
  profile: AdminSettingsProfile;
};

export function AdminSettingsAccountSection({ profile }: AdminSettingsAccountSectionProps) {
  return (
    <AdminSettingsSectionShell
      title={ADMIN_SETTINGS_SECTIONS.account}
      icon={<UserRound className="size-5" aria-hidden="true" />}
    >
      <div
        className="grid w-full min-w-0 grid-cols-1 sm:grid-cols-2"
        style={{ gap: T.fieldGridGap }}
      >
        <AdminSettingsField label={ADMIN_SETTINGS_FIELDS.fullName} value={profile.name} />
        <AdminSettingsField label={ADMIN_SETTINGS_FIELDS.email} value={profile.email} />
        <AdminSettingsField
          label={ADMIN_SETTINGS_FIELDS.phone}
          value={profile.phoneNumber || "—"}
        />
        <AdminSettingsField
          label={ADMIN_SETTINGS_FIELDS.organization}
          value={profile.organization || "—"}
        />
      </div>
    </AdminSettingsSectionShell>
  );
}
