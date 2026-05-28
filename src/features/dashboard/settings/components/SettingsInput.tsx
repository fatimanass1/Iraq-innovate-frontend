"use client";

import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { SETTINGS_THEME as T } from "../constants/settings-theme";
import { cairo, outfit } from "@/features/dashboard/fonts";

type SettingsInputProps = {
  labelAr: string;
  icon: LucideIcon;
  error?: string;
  dir?: "ltr" | "rtl";
} & InputHTMLAttributes<HTMLInputElement>;

export function SettingsInput({
  labelAr,
  icon: Icon,
  error,
  dir = "ltr",
  className,
  ...props
}: SettingsInputProps) {
  return (
    <div className="w-full" style={{ marginBottom: 0 }}>
      <label
        className={cn(cairo.className, "mb-2 block font-semibold text-[#010B18]")}
        style={{ fontSize: T.labelSize, marginBottom: T.labelGap }}
        lang="ar"
      >
        {labelAr}
      </label>
      <div className="relative w-full" dir={dir}>
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 stroke-[1.75] text-[rgba(1,11,24,0.35)]"
          aria-hidden="true"
        />
        <input
          className={cn(
            outfit.className,
            "w-full font-medium text-[#010B18] outline-none transition",
            "placeholder:text-[rgba(1,11,24,0.35)]",
            "focus:ring-1 focus:ring-[rgba(168,207,69,0.25)]",
            className,
          )}
          style={{
            height: T.inputHeight,
            borderRadius: T.inputRadius,
            paddingLeft: T.inputPaddingStart,
            paddingRight: T.inputPaddingEnd,
            fontSize: T.inputFontSize,
            backgroundColor: T.inputBg,
            border: "1px solid transparent",
          }}
          onFocus={(event) => {
            event.currentTarget.style.backgroundColor = T.inputBgFocus;
          }}
          onBlur={(event) => {
            event.currentTarget.style.backgroundColor = T.inputBg;
          }}
          {...props}
        />
      </div>
      {error ? (
        <p
          className={cn(cairo.className, "mt-1.5 text-[11px] font-medium text-red-500")}
          lang="ar"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
