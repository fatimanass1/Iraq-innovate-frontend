"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { scaleSoftVariants } from "@/shared/animations/variants";
import {
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../../../constants/review-submission";
import { submitCairo, submitOutfit } from "../../../utils/fonts";
import type { SubmitProjectStep } from "../../../types/wizard.types";
import { EditStepButton } from "./EditStepButton";

type ReviewCardProps = {
  titleEn: string;
  titleAr: string;
  editStep: SubmitProjectStep;
  onEdit: (step: SubmitProjectStep) => void;
  children: React.ReactNode;
  className?: string;
};

export function ReviewCard({
  titleEn,
  titleAr,
  editStep,
  onEdit,
  children,
  className,
}: ReviewCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      variants={reduceMotion ? undefined : scaleSoftVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      whileHover={reduceMotion ? undefined : { boxShadow: `${R.cardRing}, 0px 8px 24px rgba(0,0,0,0.04)` }}
      className={cn("flex w-full flex-col", className)}
      style={{
        borderRadius: R.cardRadius,
        backgroundColor: R.cardBg,
        boxShadow: R.cardRing,
        padding: `${R.cardPaddingTop}px ${R.cardPaddingX}px 20px`,
        gap: R.cardsGap,
      }}
    >
      <header
        className="flex items-center justify-between"
        style={{ minHeight: R.cardHeaderHeight }}
      >
        <h3 className="min-w-0">
          <span
            className={cn(submitOutfit.className, "font-semibold")}
            style={{
              fontSize: R.titleEnSize,
              lineHeight: `${R.titleEnLineHeight}px`,
              color: R.titleEnColor,
            }}
          >
            {titleEn}
          </span>
          <span
            className={cn(submitCairo.className, "ms-1")}
            style={{
              fontSize: R.titleArSize,
              lineHeight: `${R.titleArLineHeight}px`,
              color: R.titleArColor,
            }}
            dir="rtl"
          >
            / {titleAr}
          </span>
        </h3>
        <EditStepButton
          ariaLabel={REVIEW_SUBMISSION_COPY.editAria(titleEn)}
          onClick={() => onEdit(editStep)}
        />
      </header>

      <div className="flex flex-col" style={{ gap: R.cardBodyGap }}>
        {children}
      </div>
    </motion.section>
  );
}
