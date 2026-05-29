"use client";

import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import type { ApiProjectMediaType } from "../types/api.types";
import type {
  BilingualMessage,
  MediaStepErrors,
  OwnerFieldErrors,
  ProjectInfoFieldErrors,
  TeamMemberFieldErrors,
  TeamStepErrors,
  WizardStepErrors,
} from "../types/validation.types";
import type { SubmitProjectStep, SubmitProjectWizardState } from "../types/wizard.types";
import { STEP_LABELS, VALIDATION_MESSAGES } from "../constants/validation-messages";
import {
  focusFirstInvalidField,
  validateAllWizardSteps,
  validateWizardStep,
} from "../utils/validation";

type UseSubmitWizardValidationOptions = {
  form: SubmitProjectWizardState;
  step: SubmitProjectStep;
  mediaTypes?: ApiProjectMediaType[];
};

function clearFlatFieldErrors<T extends Record<string, BilingualMessage | undefined>>(
  previous: Partial<T>,
  validated: Partial<T>,
): Partial<T> {
  const next = { ...previous };
  for (const key of Object.keys(previous) as (keyof T)[]) {
    if (previous[key] && !validated[key]) {
      delete next[key];
    }
  }
  return next;
}

function clearTeamStepErrors(previous: TeamStepErrors, validated: TeamStepErrors): TeamStepErrors {
  const next: TeamStepErrors = { ...previous };

  if (previous.toggle && !validated.toggle) {
    delete next.toggle;
  }

  if (previous.members) {
    const nextMembers: TeamMemberFieldErrors = { ...previous.members };

    for (const memberId of Object.keys(previous.members)) {
      const previousMemberErrors = previous.members[memberId];
      const validatedMemberErrors = validated.members?.[memberId] ?? {};
      const clearedMemberErrors = { ...previousMemberErrors };

      for (const field of Object.keys(previousMemberErrors)) {
        if (!validatedMemberErrors[field as keyof typeof validatedMemberErrors]) {
          delete clearedMemberErrors[field as keyof typeof clearedMemberErrors];
        }
      }

      if (Object.keys(clearedMemberErrors).length === 0) {
        delete nextMembers[memberId];
      } else {
        nextMembers[memberId] = clearedMemberErrors;
      }
    }

    if (Object.keys(nextMembers).length === 0) {
      delete next.members;
    } else {
      next.members = nextMembers;
    }
  }

  return next;
}

export function useSubmitWizardValidation({
  form,
  step,
  mediaTypes,
}: UseSubmitWizardValidationOptions) {
  const [step1Errors, setStep1Errors] = useState<ProjectInfoFieldErrors>({});
  const [step2Errors, setStep2Errors] = useState<MediaStepErrors>({});
  const [step3Errors, setStep3Errors] = useState<OwnerFieldErrors>({});
  const [step4Errors, setStep4Errors] = useState<TeamStepErrors>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [attemptedSteps, setAttemptedSteps] = useState<Partial<Record<SubmitProjectStep, boolean>>>(
    {},
  );

  const touchField = useCallback((fieldId: string) => {
    setTouchedFields((prev) => ({ ...prev, [fieldId]: true }));
  }, []);

  const markStepAttempted = useCallback((targetStep: SubmitProjectStep) => {
    setAttemptedSteps((prev) => ({ ...prev, [targetStep]: true }));
  }, []);

  const setErrorsForStep = useCallback(
    (targetStep: SubmitProjectStep, errors: WizardStepErrors[SubmitProjectStep]) => {
      switch (targetStep) {
        case 1:
          setStep1Errors((errors as ProjectInfoFieldErrors) ?? {});
          break;
        case 2:
          setStep2Errors((errors as MediaStepErrors) ?? {});
          break;
        case 3:
          setStep3Errors((errors as OwnerFieldErrors) ?? {});
          break;
        case 4:
          setStep4Errors((errors as TeamStepErrors) ?? {});
          break;
      }
    },
    [],
  );

  const validateStep = useCallback(
    (targetStep: SubmitProjectStep) => {
      const result = validateWizardStep(targetStep, form, mediaTypes);
      setErrorsForStep(targetStep, result.errors);
      return result;
    },
    [form, mediaTypes, setErrorsForStep],
  );

  const shouldShowFieldFeedback = useCallback(
    (fieldId: string, stepNum: SubmitProjectStep) =>
      Boolean(touchedFields[fieldId] || attemptedSteps[stepNum]),
    [attemptedSteps, touchedFields],
  );

  const validateCurrentStep = useCallback(() => {
    markStepAttempted(step);
    const result = validateStep(step);
    if (!result.ok) {
      focusFirstInvalidField(result.firstInvalidFieldId);
    }
    return result.ok;
  }, [markStepAttempted, step, validateStep]);

  const validateBeforeSubmit = useCallback(() => {
    const result = validateAllWizardSteps(form, mediaTypes);

    ([1, 2, 3, 4] as SubmitProjectStep[]).forEach((stepNum) => {
      markStepAttempted(stepNum);
    });

    if (result.errors[1]) setStep1Errors(result.errors[1]);
    if (result.errors[2]) setStep2Errors(result.errors[2] ?? {});
    if (result.errors[3]) setStep3Errors(result.errors[3] ?? {});
    if (result.errors[4]) setStep4Errors(result.errors[4] ?? {});

    if (!result.ok && result.firstInvalidStep) {
      const labels = STEP_LABELS[result.firstInvalidStep as 1 | 2 | 3 | 4];
      const message = VALIDATION_MESSAGES.stepHasErrors(labels.ar, labels.en);
      toast.error(`${message.ar}\n${message.en}`);
      focusFirstInvalidField(result.firstInvalidFieldId);
    }

    return result;
  }, [form, markStepAttempted, mediaTypes]);

  const revalidateField = useCallback(
    (targetStep: SubmitProjectStep) => {
      validateStep(targetStep);
    },
    [validateStep],
  );

  const clearResolvedFieldErrors = useCallback(
    (targetStep: SubmitProjectStep) => {
      const result = validateWizardStep(targetStep, form, mediaTypes);

      switch (targetStep) {
        case 1:
          setStep1Errors((prev) =>
            clearFlatFieldErrors(prev, result.errors as ProjectInfoFieldErrors),
          );
          break;
        case 2:
          setStep2Errors((prev) => clearFlatFieldErrors(prev, result.errors as MediaStepErrors));
          break;
        case 3:
          setStep3Errors((prev) => clearFlatFieldErrors(prev, result.errors as OwnerFieldErrors));
          break;
        case 4:
          setStep4Errors((prev) => clearTeamStepErrors(prev, result.errors as TeamStepErrors));
          break;
      }
    },
    [form, mediaTypes],
  );

  return {
    step1Errors,
    step2Errors,
    step3Errors,
    step4Errors,
    touchedFields,
    attemptedSteps,
    touchField,
    shouldShowFieldFeedback,
    validateCurrentStep,
    validateBeforeSubmit,
    revalidateField,
    clearResolvedFieldErrors,
    setStep2Errors,
  };
}
