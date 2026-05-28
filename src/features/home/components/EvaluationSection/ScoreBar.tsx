"use client";

import { AnimatedProgress } from "@/shared/animations";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "./fonts";
import type { ScoringCriterion } from "./scoringCriteria";

interface ScoreBarProps {
  criterion: ScoringCriterion;
}

export function ScoreBar({ criterion }: ScoreBarProps) {
  const fillPercent = Math.round((criterion.score / criterion.scoreMax) * 100);

  return (
    <div className="w-full space-y-3">
      <div className="flex w-full items-center justify-between gap-4 sm:gap-6 xl:w-[593px] xl:pe-14">
        <div className="flex min-w-0 items-baseline gap-2.5 whitespace-nowrap">
          <span
            className={cn(outfit.className, "text-[16px] font-semibold leading-none text-white")}
          >
            {criterion.labelEn}
          </span>
          <span
            className={cn(
              cairo.className,
              "text-[14px] font-medium leading-none text-[rgba(255,255,255,0.4)]",
            )}
            dir="rtl"
            lang="ar"
          >
            {criterion.labelAr}
          </span>
        </div>

        <div
          className={cn(
            outfit.className,
            "flex shrink-0 items-baseline gap-2 whitespace-nowrap tabular-nums",
          )}
        >
          <span className="text-[15px] font-bold text-[#A8CF45]">{criterion.weight}%</span>
          <span className="text-[14px] font-medium text-[rgba(255,255,255,0.3)]">
            {criterion.score}/{criterion.scoreMax}
          </span>
        </div>
      </div>

      <div className="h-[8px] w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)] xl:w-[593px]">
        <AnimatedProgress
          value={fillPercent}
          className="bg-[#A8CF45] shadow-[0_0_12px_rgba(168,207,69,0.32)]"
          aria-label={criterion.labelEn}
          aria-valuenow={criterion.score}
          aria-valuemin={0}
          aria-valuemax={criterion.scoreMax}
        />
      </div>
    </div>
  );
}
