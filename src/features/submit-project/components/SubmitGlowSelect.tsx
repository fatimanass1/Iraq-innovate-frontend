"use client";

import { cn } from "@/shared/utils/utils";
import { CustomSelect } from "@/shared/components/ui/CustomSelect";
import type { BilingualMessage } from "../types/validation.types";
import { submitCairo, submitOutfit } from "../utils/fonts";
import { FieldValidationMessage } from "./FieldValidationMessage";

type FieldLabel = { en: string; ar: string };

type SubmitGlowSelectProps = {
  label: FieldLabel;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: { id: number; name: string }[];
  placeholder?: string;
  isLoading?: boolean;
  disabled?: boolean;
  error?: BilingualMessage;
  fieldId?: string;
};

export function SubmitGlowSelect({
  label,
  value,
  onChange,
  onBlur,
  options,
  placeholder,
  isLoading = false,
  disabled = false,
  error,
  fieldId,
}: SubmitGlowSelectProps) {
  const displayPlaceholder = placeholder ?? `${label.en} / ${label.ar}`;
  const selectOptions = options.map((option) => ({
    value: String(option.id),
    label: option.name,
  }));

  return (
    <div id={fieldId ? `${fieldId}-wrapper` : undefined}>
      <div className="mb-2 flex items-center justify-end gap-1">
        <span
          className={cn(submitOutfit.className, "text-[12px] leading-4")}
          style={{ color: "#8A8F80" }}
        >
          {label.en}
        </span>
        <span
          className={cn(submitCairo.className, "text-[12px] leading-4 opacity-60")}
          style={{ color: "#8A8F80" }}
          dir="rtl"
        >
          {label.ar}
        </span>
      </div>

      <CustomSelect
        id={fieldId}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        options={selectOptions}
        placeholder={displayPlaceholder}
        isLoading={isLoading}
        disabled={disabled}
        error={Boolean(error)}
        variant="form"
        menuMode="inline"
        fontClassName={submitOutfit.className}
        emptyMessage="لا توجد فئات متاحة"
        dir="ltr"
      />

      {error ? <FieldValidationMessage message={error} /> : null}
    </div>
  );
}
