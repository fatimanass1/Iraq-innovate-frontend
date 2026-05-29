"use client";

import { ChevronLeft, ChevronRight, Send } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { SUBMIT_PROJECT_ACTIONS } from "../constants/submit-project-content";
import {
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../constants/review-submission";
import { SUBMIT_PROJECT_THEME as T } from "../constants/submit-project-theme";
import { submitOutfit } from "../utils/fonts";

type SubmitProjectActionsProps = {
  canGoBack: boolean;
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
  isLoading?: boolean;
  continueDisabled?: boolean;
  variant?: "default" | "review";
};

export function SubmitProjectActions({
  canGoBack,
  onBack,
  onContinue,
  continueLabel = SUBMIT_PROJECT_ACTIONS.continue,
  isLoading = false,
  continueDisabled = false,
  variant = "default",
}: SubmitProjectActionsProps) {
  const isReview = variant === "review";
  const backLabel = isReview ? REVIEW_SUBMISSION_COPY.backAr : SUBMIT_PROJECT_ACTIONS.back;
  const submitLabel = isReview ? REVIEW_SUBMISSION_COPY.submitAr : continueLabel;

  return (
    <div className="flex w-full max-w-[444px] items-center justify-between">
      {canGoBack ? (
        <button
          type="button"
          onClick={onBack}
          className={cn(
            submitOutfit.className,
            "relative inline-flex items-center justify-center rounded-2xl text-[14px] font-medium transition-opacity hover:opacity-80",
            isReview ? "" : "min-w-[94.81px]",
          )}
          style={{
            width: isReview ? 94.81 : undefined,
            height: 44,
            backgroundColor: isReview ? R.backBg : "rgba(0, 0, 0, 0.05)",
            color: isReview ? R.backTextColor : "#6B7260",
            paddingLeft: isReview ? 0 : undefined,
            paddingRight: isReview ? 0 : undefined,
          }}
        >
          {!isReview ? (
            <ChevronLeft className="absolute left-5 size-4" aria-hidden="true" />
          ) : null}
          {backLabel}
        </button>
      ) : (
        <span className="h-11 w-[94.81px]" aria-hidden="true" />
      )}

      <button
        type="button"
        onClick={onContinue}
        disabled={isLoading || continueDisabled}
        className={cn(
          submitOutfit.className,
          "inline-flex items-center justify-center gap-2 rounded-2xl text-[14px] font-semibold transition-opacity hover:opacity-90 disabled:opacity-60",
          isReview ? "" : "h-11 min-w-[136.94px] px-7",
        )}
        style={
          isReview
            ? {
                width: R.submitWidth,
                height: R.submitHeight,
                borderRadius: R.submitRadius,
                background: R.submitGradient,
                boxShadow: R.submitGlow,
                color: R.submitTextColor,
              }
            : {
                backgroundColor: T.continueBg,
                color: T.continueText,
                boxShadow: T.continueShadow,
              }
        }
      >
        {isReview && !isLoading ? (
          <Send className="size-[14px] shrink-0" aria-hidden="true" />
        ) : null}
        {isLoading ? SUBMIT_PROJECT_ACTIONS.submitting : submitLabel}
        {!isLoading && !isReview ? (
          <ChevronRight className="size-4" aria-hidden="true" />
        ) : null}
      </button>
    </div>
  );
}
