"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import {
  useCounterAnimation,
  type UseCounterAnimationOptions,
} from "../hooks/useCounterAnimation";

export type AnimatedCounterProps = UseCounterAnimationOptions & {
  value: string | number;
  className?: string;
  children?: (displayText: string) => ReactNode;
};

export function AnimatedCounter({
  value,
  className,
  duration,
  delay,
  once,
  amount,
  enabled,
  children,
}: AnimatedCounterProps) {
  const { ref, text } = useCounterAnimation(value, {
    duration,
    delay,
    once,
    amount,
    enabled,
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {children ? children(text) : text}
    </span>
  );
}
