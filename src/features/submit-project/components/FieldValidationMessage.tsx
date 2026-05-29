"use client";

import { cn } from "@/shared/utils/utils";
import { VALIDATION_THEME as V } from "../constants/validation-theme";
import { SUBMIT_PROJECT_THEME as T } from "../constants/submit-project-theme";
import type { BilingualMessage } from "../types/validation.types";
import { submitCairo, submitOutfit } from "../utils/fonts";

type FieldValidationMessageProps = {
  message?: BilingualMessage;
};

export function FieldValidationMessage({ message }: FieldValidationMessageProps) {
  if (!message) return null;

  return (
    <div className="mt-1.5 space-y-0.5 text-end" role="alert">
      <p
        className={cn(submitCairo.className, "text-[12px] leading-[18px]")}
        style={{ color: V.errorTextAr }}
        dir="rtl"
      >
        {message.ar}
      </p>
      <p
        className={cn(submitOutfit.className, "text-[12px] leading-[18px]")}
        style={{ color: V.errorTextEn }}
      >
        {message.en}
      </p>
    </div>
  );
}

export function fieldContainerStyle(error?: BilingualMessage): {
  boxShadow: string;
  backgroundColor: string;
} {
  if (error) {
    return {
      boxShadow: V.errorRing,
      backgroundColor: V.errorBackground,
    };
  }
  return {
    boxShadow: T.inputRing,
    backgroundColor: T.inputBg,
  };
}
