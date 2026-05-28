import type { HTMLAttributes } from "react";
import { cn } from "@/shared/utils/utils";

const variants = {
  default: "bg-primary/10 text-primary",
  secondary: "bg-muted text-muted-foreground",
  outline: "border border-border text-foreground",
} as const;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
