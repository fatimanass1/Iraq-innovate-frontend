"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";
import {
  AUTH_FIELD_BASE,
  AUTH_FIELD_BG,
  AUTH_FIELD_BG_FOCUS,
  AUTH_FIELD_ERROR,
  AUTH_FIELD_FOCUS,
  AUTH_FIELD_PLACEHOLDER,
} from "../constants/auth-field-styles";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  showPassword: boolean;
  onToggleVisibility: () => void;
  error?: string;
  containerClassName?: string;
  hideError?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      showPassword,
      onToggleVisibility,
      error,
      containerClassName,
      hideError = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        <div className={cn("relative w-full max-w-[420px]", containerClassName)}>
          <input
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={cn(
              cairo.className,
              AUTH_FIELD_BASE,
              AUTH_FIELD_BG,
              AUTH_FIELD_BG_FOCUS,
              AUTH_FIELD_PLACEHOLDER,
              AUTH_FIELD_FOCUS,
              "px-12 text-right",
              error && AUTH_FIELD_ERROR,
              className,
            )}
            dir="rtl"
            lang="ar"
            {...props}
          />
          <button
            type="button"
            onClick={onToggleVisibility}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-[rgba(1,11,24,0.32)] transition-colors hover:text-[#010B18]"
            aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
          >
            {showPassword ? (
              <EyeOff className="size-[18px] stroke-[1.75]" />
            ) : (
              <Eye className="size-[18px] stroke-[1.75]" />
            )}
          </button>
          <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[rgba(1,11,24,0.32)]">
            <Lock className="size-[18px] stroke-[1.75]" aria-hidden="true" />
          </div>
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

PasswordInput.displayName = "PasswordInput";

/** @deprecated Use PasswordInput */
export const AuthPasswordInput = PasswordInput;
