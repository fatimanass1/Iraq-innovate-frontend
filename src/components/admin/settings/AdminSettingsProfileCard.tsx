"use client";

import { cn } from "@/shared/utils/utils";
import { ADMIN_SETTINGS_PROFILE } from "@/features/admin/settings/constants/admin-settings-content";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";
import type { AdminSettingsProfile } from "@/features/admin/settings/types/admin-settings.types";
import { cairo } from "@/features/admin-dashboard/fonts";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

type AdminSettingsProfileCardProps = {
  profile: AdminSettingsProfile;
};

export function AdminSettingsProfileCard({ profile }: AdminSettingsProfileCardProps) {
  const initials = getInitials(profile.name);

  return (
    <section
      className="relative w-full min-w-0 border p-4 backdrop-blur-[12px] sm:p-8"
      style={{
        borderRadius: T.profileCardRadius,
        background: T.profileCardBg,
        borderColor: T.profileCardBorder,
        boxShadow: T.profileCardShadow,
      }}
      dir="rtl"
    >
      <div className="mx-auto flex w-full max-w-[278px] flex-col items-center">
        <div
          className="flex items-center justify-center overflow-hidden rounded-full border font-bold"
          style={{
            width: T.profileAvatarSize,
            height: T.profileAvatarSize,
            borderWidth: T.profileAvatarBorder,
            borderColor: T.profileAvatarBorderColor,
            backgroundColor: "rgba(168, 207, 69, 0.22)",
            color: T.textPrimary,
            fontSize: 32,
          }}
        >
          {initials}
        </div>

        <div className="mt-6 flex w-full flex-col items-center text-center" style={{ gap: 4 }}>
          <h3
            className={cn(cairo.className, "font-bold")}
            style={{
              fontSize: T.profileNameSize,
              lineHeight: `${T.profileNameLineHeight}px`,
              color: T.textPrimary,
            }}
            lang="ar"
          >
            {profile.name}
          </h3>
          <p
            className={cn(cairo.className, "font-semibold")}
            style={{
              fontSize: T.profileRoleSize,
              lineHeight: `${T.profileRoleLineHeight}px`,
              color: T.profileRoleColor,
            }}
            lang="ar"
          >
            {ADMIN_SETTINGS_PROFILE.roleLabel}
          </p>
        </div>

        <div
          className="mt-6 w-full"
          style={{
            borderRadius: T.profileInfoRadius,
            backgroundColor: T.profileInfoBg,
            padding: T.profileInfoPadding,
          }}
        >
          <div className="flex flex-row-reverse items-center justify-between gap-3">
            <span
              className={cn(cairo.className, "min-w-0 truncate font-medium text-end")}
              style={{
                fontSize: T.profileInfoValueSize,
                lineHeight: `${T.profileInfoValueLineHeight}px`,
                color: T.textPrimary,
              }}
              dir="ltr"
            >
              {profile.email}
            </span>
            <span
              className={cn(cairo.className, "shrink-0")}
              style={{ fontSize: T.toggleDescSize, color: T.profileInfoLabelColor }}
              lang="ar"
            >
              {ADMIN_SETTINGS_PROFILE.emailLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
