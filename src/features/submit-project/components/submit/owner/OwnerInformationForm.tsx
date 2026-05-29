"use client";

import { motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants, staggerItemVariants } from "@/shared/animations/variants";
import { STAGGER } from "@/shared/animations/constants";
import { SUBMIT_PROJECT_FIELDS } from "../../../constants/submit-project-content";
import { OWNER_INFO_THEME as O } from "../../../constants/owner-info";
import type { OwnerFieldErrors } from "../../../types/validation.types";
import type { SubmitProjectWizardState } from "../../../types/wizard.types";
import { validationFieldId, visibleFieldError } from "../../../utils/validation";
import { SubmitGlowInput } from "../../SubmitGlowField";
import { CertificateUploadField } from "./CertificateUploadField";

type OwnerFieldKey = keyof OwnerFieldErrors;

type OwnerInformationFormProps = {
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

export function OwnerInformationForm({
  form,
  errors = {},
  shouldShowFieldFeedback,
  onChange,
  onFieldBlur,
  onFieldChange,
}: OwnerInformationFormProps) {
  const reduceMotion = useReducedMotion();

  const showError = (field: OwnerFieldKey) =>
    visibleFieldError(
      errors[field],
      validationFieldId(3, field),
      3,
      shouldShowFieldFeedback,
    );

  return (
    <motion.div
      className="flex w-full max-w-[444px] flex-col"
      style={{ gap: O.fieldGap }}
      variants={reduceMotion ? undefined : staggerContainerVariants(STAGGER.tight, 0.02)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <motion.div variants={reduceMotion ? undefined : staggerItemVariants}>
        <SubmitGlowInput
          fieldId={validationFieldId(3, "ownerName")}
          label={SUBMIT_PROJECT_FIELDS.ownerName}
          value={form.ownerName}
          onChange={(value) => {
            onChange("ownerName", value);
            onFieldChange();
          }}
          onBlur={() => onFieldBlur(validationFieldId(3, "ownerName"))}
          required
          error={showError("ownerName")}
        />
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItemVariants}>
        <SubmitGlowInput
          fieldId={validationFieldId(3, "ownerBirthdate")}
          label={SUBMIT_PROJECT_FIELDS.ownerBirthdate}
          value={form.ownerBirthdate}
          onChange={(value) => {
            onChange("ownerBirthdate", value);
            onFieldChange();
          }}
          onBlur={() => onFieldBlur(validationFieldId(3, "ownerBirthdate"))}
          type="date"
          error={showError("ownerBirthdate")}
        />
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItemVariants}>
        <SubmitGlowInput
          fieldId={validationFieldId(3, "ownerCollege")}
          label={SUBMIT_PROJECT_FIELDS.ownerCollege}
          value={form.ownerCollege}
          onChange={(value) => {
            onChange("ownerCollege", value);
            onFieldChange();
          }}
          onBlur={() => onFieldBlur(validationFieldId(3, "ownerCollege"))}
          error={showError("ownerCollege")}
        />
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItemVariants}>
        <CertificateUploadField
          fieldId={validationFieldId(3, "ownerCertificate")}
          file={form.ownerCertificate}
          error={showError("ownerCertificate")}
          onChange={(file) => {
            onChange("ownerCertificate", file);
            onFieldChange();
          }}
          onBlur={() => onFieldBlur(validationFieldId(3, "ownerCertificate"))}
        />
      </motion.div>

      <motion.div variants={reduceMotion ? undefined : staggerItemVariants}>
        <SubmitGlowInput
          fieldId={validationFieldId(3, "ownerLinkedin")}
          label={SUBMIT_PROJECT_FIELDS.ownerLinkedin}
          value={form.ownerLinkedin}
          onChange={(value) => {
            onChange("ownerLinkedin", value);
            onFieldChange();
          }}
          onBlur={() => onFieldBlur(validationFieldId(3, "ownerLinkedin"))}
          type="url"
          error={showError("ownerLinkedin")}
        />
      </motion.div>
    </motion.div>
  );
}
