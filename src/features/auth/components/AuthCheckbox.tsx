"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";

export interface AuthCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  align?: "center" | "start";
  labelDir?: "ltr" | "rtl";
}

export const AuthCheckbox = forwardRef<HTMLInputElement, AuthCheckboxProps>(
  ({ className, label, id, align = "center", labelDir, ...props }, ref) => {
    const inputId = id ?? "auth-checkbox";

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer gap-2.5",
          align === "start" ? "items-start" : "items-center",
        )}
        dir={labelDir}
        lang={labelDir === "rtl" ? "ar" : undefined}
      >
        <input
          ref={ref}
          id={inputId}
          type="checkbox"
          className={cn(
            "size-[18px] shrink-0 rounded-[5px] border-0 bg-[rgba(12,13,18,0.06)] accent-[#A8CF45]",
            "focus:ring-2 focus:ring-[#A8CF45]/30 focus:ring-offset-0",
            className,
          )}
          {...props}
        />
        <span className={cn(cairo.className, "text-[14px] font-medium text-[rgba(1,11,24,0.55)]")}>
          {label}
        </span>
      </label>
    );
  },
);

AuthCheckbox.displayName = "AuthCheckbox";
