"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";

const variants = {
  primary: cn(
    cairo.className,
    "bg-[#A8CF45] text-[#010B18] font-bold text-[17px]",
    "shadow-[0_4px_18px_rgba(168,207,69,0.26)]",
    "hover:scale-[1.02] hover:bg-[#b5d84f] hover:shadow-[0_6px_24px_rgba(168,207,69,0.32)]",
  ),
} as const;

export interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  isLoading?: boolean;
}

export const AuthButton = forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, variant = "primary", isLoading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "flex h-12 w-full max-w-[420px] items-center justify-center gap-3 rounded-2xl transition-all duration-300 disabled:pointer-events-none disabled:opacity-60",
          variants[variant],
          className,
        )}
        {...props}
      >
        {isLoading ? "..." : children}
      </button>
    );
  },
);

AuthButton.displayName = "AuthButton";
