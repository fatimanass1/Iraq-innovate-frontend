"use client";

import { cn } from "@/shared/utils/utils";
import {
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../../../constants/review-submission";
import { submitOutfit } from "../../../utils/fonts";

type ReviewRowProps = {
  label: string;
  value: string;
  multiline?: boolean;
};

export function ReviewRow({ label, value, multiline }: ReviewRowProps) {
  const display = value.trim() || REVIEW_SUBMISSION_COPY.emptyValue;

  return (
    <div
      className="relative w-full"
      style={{
        minHeight: multiline ? R.rowDescHeight : R.rowHeight,
      }}
    >
      <span
        className={cn(submitOutfit.className, "absolute start-0")}
        style={{
          top: multiline ? 3 : 4,
          fontSize: R.labelSize,
          lineHeight: `${R.labelLineHeight}px`,
          color: R.labelColor,
        }}
      >
        {label}
      </span>
      <span
        className={cn(
          submitOutfit.className,
          "absolute end-0 max-w-[calc(100%-132px)] text-end",
          multiline ? "whitespace-pre-wrap" : "truncate",
        )}
        style={{
          top: multiline ? 0.25 : 0,
          fontSize: R.valueSize,
          lineHeight: `${R.valueLineHeight}px`,
          color: R.valueColor,
        }}
      >
        {display}
      </span>
    </div>
  );
}
