"use client";

import { Pencil } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../../../constants/review-submission";
import { submitOutfit } from "../../../utils/fonts";

type EditStepButtonProps = {
  ariaLabel: string;
  onClick: () => void;
};

export function EditStepButton({ ariaLabel, onClick }: EditStepButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        submitOutfit.className,
        "inline-flex items-center gap-1.5 transition-opacity hover:opacity-80",
      )}
      style={{
        width: R.editBtnWidth,
        height: R.editBtnHeight,
        borderRadius: R.editBtnRadius,
        backgroundColor: R.editBtnBg,
        color: R.editBtnColor,
        fontSize: R.editBtnFontSize,
        lineHeight: "16px",
        fontWeight: 500,
        paddingLeft: 12,
        paddingRight: 10,
      }}
    >
      <Pencil className="size-[11px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {REVIEW_SUBMISSION_COPY.edit}
    </button>
  );
}
