"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { DURATION, EASING, VIEWPORT } from "../constants";

export type AnimatedProgressProps = {
  value: number;
  className?: string;
  once?: boolean;
  amount?: number;
  delay?: number;
  duration?: number;
  "aria-label"?: string;
  "aria-valuenow"?: number;
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
};

export function AnimatedProgress({
  value,
  className,
  once = VIEWPORT.once,
  amount = 0.35,
  delay = 0,
  duration = DURATION.progress,
  "aria-label": ariaLabel,
  "aria-valuenow": ariaValueNow,
  "aria-valuemin": ariaValueMin = 0,
  "aria-valuemax": ariaValueMax = 100,
}: AnimatedProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));

  if (shouldReduceMotion) {
    return (
      <div
        className={cn("h-full rounded-full", className)}
        style={{ width: `${clamped}%` }}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuenow={ariaValueNow ?? clamped}
        aria-valuemin={ariaValueMin}
        aria-valuemax={ariaValueMax}
      />
    );
  }

  return (
    <motion.div
      className={cn("h-full rounded-full", className)}
      initial={{ width: 0 }}
      whileInView={{ width: `${clamped}%` }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: EASING.smooth }}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={ariaValueNow ?? clamped}
      aria-valuemin={ariaValueMin}
      aria-valuemax={ariaValueMax}
    />
  );
}
