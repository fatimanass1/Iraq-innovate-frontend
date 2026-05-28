"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AnimatedProgress } from "@/shared/animations";
import { cn } from "@/shared/utils/utils";
import { outfit } from "./fonts";

interface ProgressBarProps {
  label: string;
  value: number;
}

export function ProgressBar({ label, value }: ProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="space-y-2.5">
      <div className={cn(outfit.className, "flex items-center justify-between gap-4 text-sm")}>
        <span className="text-[rgba(255,255,255,0.55)]">{label}</span>
        <span className="font-semibold text-[#A8CF45]">{value}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[rgba(255,255,255,0.08)]">
        <AnimatedProgress
          value={clamped}
          className="absolute inset-y-0 left-0 bg-[#A8CF45] shadow-[0_0_14px_rgba(168,207,69,0.35)]"
          amount={0.4}
        />
        {shouldReduceMotion ? (
          <div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5CC6D0] shadow-[0_0_10px_rgba(92,198,208,0.75)]"
            style={{ left: `${clamped}%` }}
            aria-hidden="true"
          />
        ) : (
          <motion.div
            className="absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5CC6D0] shadow-[0_0_10px_rgba(92,198,208,0.75)]"
            initial={{ left: 0 }}
            whileInView={{ left: `${clamped}%` }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
