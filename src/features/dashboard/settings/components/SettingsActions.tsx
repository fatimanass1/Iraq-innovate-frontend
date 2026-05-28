"use client";

import { cn } from "@/shared/utils/utils";
import { DASHBOARD_THEME } from "@/features/dashboard/constants/dashboard-theme";
import { SETTINGS_ACTIONS } from "../constants/settings-content";
import { SETTINGS_THEME as T } from "../constants/settings-theme";
import { cairo } from "@/features/dashboard/fonts";

type SettingsActionsProps = {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  className?: string;
};

export function SettingsActions({
  onSave,
  onCancel,
  isSaving = false,
  className,
}: SettingsActionsProps) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-start gap-4", className)}
      style={{ marginTop: T.actionsTopGap, gap: T.actionsGap }}
      dir="rtl"
    >
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving}
        className={cn(
          cairo.className,
          "inline-flex items-center justify-center rounded-full font-semibold text-[#010B18]",
          "transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60",
        )}
        style={{
          height: T.saveHeight,
          paddingInline: T.savePaddingX,
          fontSize: T.saveFontSize,
          backgroundColor: DASHBOARD_THEME.primaryGreen,
          boxShadow: T.saveShadow,
        }}
      >
        <span lang="ar">{isSaving ? "جاري الحفظ..." : SETTINGS_ACTIONS.save}</span>
      </button>

      <button
        type="button"
        onClick={onCancel}
        disabled={isSaving}
        className={cn(
          cairo.className,
          "font-medium transition-opacity hover:opacity-80 disabled:opacity-50",
        )}
        style={{
          fontSize: T.cancelFontSize,
          color: `rgba(1, 11, 24, ${T.cancelOpacity})`,
        }}
      >
        <span lang="ar">{SETTINGS_ACTIONS.cancel}</span>
      </button>
    </div>
  );
}
