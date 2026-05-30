"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/admin-dashboard/fonts";
import { ADMIN_SETTINGS_THEME as T } from "@/features/admin/settings/constants/admin-settings-theme";

type AdminSettingsFieldProps = {
  label: string;
  value: string;
  readOnly?: boolean;
};

export function AdminSettingsField({ label, value, readOnly = true }: AdminSettingsFieldProps) {
  return (
    <div className="flex min-w-0 flex-col" style={{ gap: T.fieldGap }}>
      <label
        className={cn(cairo.className, "text-end font-medium")}
        style={{
          fontSize: T.labelSize,
          lineHeight: `${T.labelLineHeight}px`,
          color: T.labelColor,
        }}
        lang="ar"
      >
        {label}
      </label>
      <div
        className="flex min-w-0 items-center border"
        style={{
          padding: T.inputPadding,
          borderRadius: T.inputRadius,
          backgroundColor: T.inputBg,
          borderColor: T.inputBorder,
        }}
      >
        <input
          readOnly={readOnly}
          disabled={readOnly}
          value={value}
          className={cn(cairo.className, "w-full min-w-0 bg-transparent text-end outline-none")}
          style={{
            fontSize: T.inputTextSize,
            lineHeight: `${T.inputTextLineHeight}px`,
            color: T.textPrimary,
          }}
          dir="rtl"
          lang="ar"
        />
      </div>
    </div>
  );
}
