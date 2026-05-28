"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "../fonts";
import {
  AUTH_FIELD_BASE,
  AUTH_FIELD_BG,
  AUTH_FIELD_BG_FOCUS,
  AUTH_FIELD_ERROR,
  AUTH_FIELD_FOCUS,
  AUTH_FIELD_PLACEHOLDER,
} from "../constants/auth-field-styles";

export interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
  error?: string;
  variant?: "ltr" | "rtl";
  containerClassName?: string;
  hideError?: boolean;
}

export const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      className,
      endAdornment,
      startAdornment,
      error,
      variant = "rtl",
      containerClassName,
      hideError = false,
      ...props
    },
    ref,
  ) => {
    const isLtr = variant === "ltr";

    return (
      <div className="w-full">
        <div className={cn("relative w-full max-w-[420px]", containerClassName)}>
          {startAdornment ? (
            <div
              className={cn(
                "pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-[rgba(1,11,24,0.32)]",
                isLtr ? "left-4" : "right-4",
              )}
            >
              {startAdornment}
            </div>
          ) : null}
          <input
            ref={ref}
            className={cn(
              isLtr ? outfit.className : cairo.className,
              AUTH_FIELD_BASE,
              AUTH_FIELD_BG,
              AUTH_FIELD_BG_FOCUS,
              AUTH_FIELD_PLACEHOLDER,
              AUTH_FIELD_FOCUS,
              isLtr ? "px-4 pe-12 text-left" : "px-4 ps-12 pe-12 text-right",
              error && AUTH_FIELD_ERROR,
              className,
            )}
            dir={isLtr ? "ltr" : "rtl"}
            lang={isLtr ? "en" : "ar"}
            {...props}
          />
          {endAdornment ? (
            <div className="pointer-events-none absolute right-4 top-1/2 z-10 -translate-y-1/2 text-[rgba(1,11,24,0.32)]">
              {endAdornment}
            </div>
          ) : null}
        </div>
        {error && !hideError ? (
          <p className={cn(cairo.className, "mt-1.5 text-right text-xs text-[rgba(220,38,38,0.75)]")}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);

AuthInput.displayName = "AuthInput";
