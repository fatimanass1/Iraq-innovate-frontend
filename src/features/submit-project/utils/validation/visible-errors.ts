import type { BilingualMessage } from "../../types/validation.types";
import type { SubmitProjectStep } from "../../types/wizard.types";

export function visibleFieldError(
  error: BilingualMessage | undefined,
  fieldId: string,
  step: SubmitProjectStep,
  shouldShowFieldFeedback: (fieldId: string, step: SubmitProjectStep) => boolean,
): BilingualMessage | undefined {
  if (!error) return undefined;
  return shouldShowFieldFeedback(fieldId, step) ? error : undefined;
}

export function visibleStepError(
  error: BilingualMessage | undefined,
  fieldId: string,
  step: SubmitProjectStep,
  shouldShowFieldFeedback: (fieldId: string, step: SubmitProjectStep) => boolean,
): BilingualMessage | undefined {
  if (!error) return undefined;
  return shouldShowFieldFeedback(fieldId, step) ? error : undefined;
}
