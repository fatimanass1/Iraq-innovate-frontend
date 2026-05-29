"use client";

import type { SubmitProjectWizardState } from "../../../types/wizard.types";
import type { OwnerFieldErrors } from "../../../types/validation.types";
import { OwnerInformationForm } from "./OwnerInformationForm";

type OwnerInformationStepProps = {
  form: SubmitProjectWizardState;
  errors?: OwnerFieldErrors;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onChange: <K extends keyof SubmitProjectWizardState>(
    key: K,
    value: SubmitProjectWizardState[K],
  ) => void;
  onFieldBlur: (fieldId: string) => void;
  onFieldChange: () => void;
};

export function OwnerInformationStep({
  form,
  errors,
  shouldShowFieldFeedback,
  onChange,
  onFieldBlur,
  onFieldChange,
}: OwnerInformationStepProps) {
  return (
    <OwnerInformationForm
      form={form}
      errors={errors}
      shouldShowFieldFeedback={shouldShowFieldFeedback}
      onChange={onChange}
      onFieldBlur={onFieldBlur}
      onFieldChange={onFieldChange}
    />
  );
}
