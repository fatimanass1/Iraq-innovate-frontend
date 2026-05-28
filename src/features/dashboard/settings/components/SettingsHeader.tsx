"use client";

import { cn } from "@/shared/utils/utils";
import { SETTINGS_PAGE } from "../constants/settings-content";
import { SETTINGS_THEME as T } from "../constants/settings-theme";
import { cairo, outfit } from "@/features/dashboard/fonts";

type SettingsHeaderProps = {
  className?: string;
};

export function SettingsHeader({ className }: SettingsHeaderProps) {
  return (
    <header className={cn("text-start", className)} style={{ paddingTop: T.pagePaddingTop }}>
      <h1
        className={cn(cairo.className, "font-bold leading-tight text-[#010B18]")}
        style={{ fontSize: T.pageTitleSize }}
        lang="ar"
      >
        {SETTINGS_PAGE.titleAr}
      </h1>
      <p
        className={cn(outfit.className, "mt-1 font-medium leading-none text-[#010B18]")}
        style={{ fontSize: T.pageTitleSubSize }}
      >
        {SETTINGS_PAGE.titleEn}
      </p>
    </header>
  );
}
