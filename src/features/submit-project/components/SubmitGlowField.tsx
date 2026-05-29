"use client";

import { cn } from "@/shared/utils/utils";
import { SUBMIT_PROJECT_THEME as T } from "../constants/submit-project-theme";
import type { BilingualMessage } from "../types/validation.types";
import { submitCairo, submitOutfit } from "../utils/fonts";
import { FieldValidationMessage, fieldContainerStyle } from "./FieldValidationMessage";

type FieldLabel = { en: string; ar: string };

type SubmitGlowInputProps = {
  label: FieldLabel;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  error?: BilingualMessage;
  fieldId?: string;
};

export function SubmitGlowInput({
  label,
  value,
  onChange,
  onBlur,
  type = "text",
  required,
  error,
  fieldId,
}: SubmitGlowInputProps) {
  const containerStyle = fieldContainerStyle(error);

  return (
    <div className="w-full" id={fieldId ? `${fieldId}-wrapper` : undefined}>
      <div
        className="relative w-full transition-colors duration-200"
        style={{
          height: T.inputHeight,
          borderRadius: T.inputRadius,
          boxShadow: containerStyle.boxShadow,
          backgroundColor: containerStyle.backgroundColor,
        }}
      >
        <div className="pointer-events-none absolute inset-x-4 top-[17px] flex items-center justify-end gap-[3px]">
          <span
            className={cn(submitOutfit.className, "text-[14px] leading-[21px]")}
            style={{ color: T.labelEn }}
          >
            {label.en}
          </span>
          <span
            className={cn(submitCairo.className, "text-[14px] leading-[21px] opacity-50")}
            style={{ color: T.labelEn }}
            dir="rtl"
          >
            {label.ar}
          </span>
        </div>
        <input
          id={fieldId}
          type={type}
          value={value}
          required={required}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          className={cn(
            submitOutfit.className,
            "absolute inset-0 w-full rounded-[16px] bg-transparent px-4 pb-3 pt-[38px] text-[14px] text-[#010B18] outline-none",
          )}
        />
      </div>
      {error ? <FieldValidationMessage message={error} /> : null}
    </div>
  );
}

type SubmitGlowTextareaProps = {
  label: FieldLabel;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: BilingualMessage;
  fieldId?: string;
};

export function SubmitGlowTextarea({
  label,
  value,
  onChange,
  onBlur,
  error,
  fieldId,
}: SubmitGlowTextareaProps) {
  const containerStyle = fieldContainerStyle(error);

  return (
    <div className="w-full" id={fieldId ? `${fieldId}-wrapper` : undefined}>
      <div
        className="relative w-full transition-colors duration-200"
        style={{
          height: T.textareaHeight,
          borderRadius: T.inputRadius,
          boxShadow: containerStyle.boxShadow,
          backgroundColor: containerStyle.backgroundColor,
        }}
      >
        <div className="pointer-events-none absolute inset-x-4 top-[17px] flex items-center justify-end gap-[3px]">
          <span
            className={cn(submitOutfit.className, "text-[14px] leading-[21px]")}
            style={{ color: T.labelEn }}
          >
            {label.en}
          </span>
          <span
            className={cn(submitCairo.className, "text-[14px] leading-[21px] opacity-50")}
            style={{ color: T.labelEn }}
            dir="rtl"
          >
            {label.ar}
          </span>
        </div>
        <textarea
          id={fieldId}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={onBlur}
          aria-invalid={error ? true : undefined}
          className={cn(
            submitOutfit.className,
            "absolute inset-0 w-full resize-none rounded-[16px] bg-transparent px-4 pb-4 pt-[38px] text-[14px] leading-[21px] text-[#010B18] outline-none",
          )}
        />
      </div>
      {error ? <FieldValidationMessage message={error} /> : null}
    </div>
  );
}

export { SubmitGlowSelect } from "./SubmitGlowSelect";

type SubmitGlowFileProps = {
  label: FieldLabel;
  accept?: string;
  multiple?: boolean;
  fileName?: string | null;
  onChange: (files: FileList | null) => void;
  height?: number;
};

export function SubmitGlowFile({
  label,
  accept,
  multiple,
  fileName,
  onChange,
  height = T.inputHeight,
}: SubmitGlowFileProps) {
  return (
    <label
      className="relative flex w-full cursor-pointer flex-col justify-center"
      style={{
        minHeight: height,
        borderRadius: T.inputRadius,
        boxShadow: T.inputRing,
        backgroundColor: T.inputBg,
      }}
    >
      <div className="flex items-center justify-end gap-[3px] px-4 pt-4">
        <span
          className={cn(submitOutfit.className, "text-[14px] leading-[21px]")}
          style={{ color: T.labelEn }}
        >
          {label.en}
        </span>
        <span
          className={cn(submitCairo.className, "text-[14px] leading-[21px] opacity-50")}
          style={{ color: T.labelEn }}
          dir="rtl"
        >
          {label.ar}
        </span>
      </div>
      <span
        className={cn(
          submitCairo.className,
          "px-4 pb-4 pt-2 text-end text-[12px] text-[rgba(1,11,24,0.55)]",
        )}
        dir="rtl"
      >
        {fileName ?? "اختر ملفًا"}
      </span>
      <input
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        onChange={(event) => onChange(event.target.files)}
      />
    </label>
  );
}
