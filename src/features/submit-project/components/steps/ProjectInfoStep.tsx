"use client";

import { SUBMIT_PROJECT_FIELDS } from "../../constants/submit-project-content";
import { useProjectCategories } from "../../hooks/useProjectCategories";
import type { ProjectInfoFieldErrors } from "../../types/validation.types";
import type { SubmitProjectWizardState } from "../../types/wizard.types";
import { validationFieldId, visibleFieldError } from "../../utils/validation";
import {
  SubmitGlowInput,
  SubmitGlowSelect,
  SubmitGlowTextarea,
} from "../SubmitGlowField";

type ProjectInfoFieldKey = keyof ProjectInfoFieldErrors;

type ProjectInfoStepProps = {
  form: SubmitProjectWizardState;
  errors?: ProjectInfoFieldErrors;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onChange: <K extends keyof SubmitProjectWizardState>(
    key: K,
    value: SubmitProjectWizardState[K],
  ) => void;
  onCategoryChange: (categoryId: number | null, categoryName: string | null) => void;
  onFieldBlur: (fieldId: string) => void;
  onFieldChange: () => void;
};

export function ProjectInfoStep({
  form,
  errors = {},
  shouldShowFieldFeedback,
  onChange,
  onCategoryChange,
  onFieldBlur,
  onFieldChange,
}: ProjectInfoStepProps) {
  const { data: categories = [], isLoading } = useProjectCategories();

  const handleCategorySelect = (value: string) => {
    if (!value) {
      onCategoryChange(null, null);
    } else {
      const id = Number(value);
      const selected = categories.find((category) => category.id === id);
      onCategoryChange(id, selected?.name ?? null);
    }
    onFieldChange();
  };

  const showError = (field: ProjectInfoFieldKey) =>
    visibleFieldError(
      errors[field],
      validationFieldId(1, field),
      1,
      shouldShowFieldFeedback,
    );

  return (
    <div className="flex w-full max-w-[444px] flex-col gap-3">
      <SubmitGlowInput
        fieldId={validationFieldId(1, "title")}
        label={SUBMIT_PROJECT_FIELDS.title}
        value={form.title}
        onChange={(value) => {
          onChange("title", value);
          onFieldChange();
        }}
        onBlur={() => onFieldBlur(validationFieldId(1, "title"))}
        required
        error={showError("title")}
      />
      <SubmitGlowTextarea
        fieldId={validationFieldId(1, "description")}
        label={SUBMIT_PROJECT_FIELDS.description}
        value={form.description}
        onChange={(value) => {
          onChange("description", value);
          onFieldChange();
        }}
        onBlur={() => onFieldBlur(validationFieldId(1, "description"))}
        error={showError("description")}
      />
      <SubmitGlowTextarea
        fieldId={validationFieldId(1, "summary")}
        label={SUBMIT_PROJECT_FIELDS.summary}
        value={form.summary}
        onChange={(value) => {
          onChange("summary", value);
          onFieldChange();
        }}
        onBlur={() => onFieldBlur(validationFieldId(1, "summary"))}
        error={showError("summary")}
      />
      <SubmitGlowInput
        fieldId={validationFieldId(1, "websiteUrl")}
        label={SUBMIT_PROJECT_FIELDS.website}
        value={form.websiteUrl}
        onChange={(value) => {
          onChange("websiteUrl", value);
          onFieldChange();
        }}
        onBlur={() => onFieldBlur(validationFieldId(1, "websiteUrl"))}
        type="url"
        error={showError("websiteUrl")}
      />
      <SubmitGlowSelect
        fieldId={validationFieldId(1, "category")}
        label={SUBMIT_PROJECT_FIELDS.category}
        value={form.categoryId != null ? String(form.categoryId) : ""}
        onChange={handleCategorySelect}
        onBlur={() => onFieldBlur(validationFieldId(1, "category"))}
        options={categories}
        isLoading={isLoading}
        placeholder={isLoading ? "جاري التحميل..." : undefined}
        error={showError("category")}
      />
    </div>
  );
}
