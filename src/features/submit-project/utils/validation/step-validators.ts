import {
  OWNER_FIELD_ORDER,
  PROJECT_INFO_FIELD_ORDER,
  TEAM_MEMBER_FIELD_ORDER,
} from "../../constants/validation-rules";
import { VALIDATION_MESSAGES } from "../../constants/validation-messages";
import type { ApiProjectMediaType } from "../../types/api.types";
import type {
  AllStepsValidationResult,
  MediaStepErrors,
  OwnerFieldErrors,
  ProjectInfoFieldErrors,
  StepValidationResult,
  TeamMemberFieldErrors,
  TeamStepErrors,
} from "../../types/validation.types";
import type { SubmitProjectStep, SubmitProjectWizardState } from "../../types/wizard.types";
import {
  validateCategory,
  validateCertificateFile,
  validateLinkedinUrl,
  validateMediaFile,
  validateOwnerBirthdate,
  validateOwnerCollege,
  validateOwnerName,
  validateProjectDescription,
  validateProjectSummary,
  validateProjectTitle,
  validateTeamMember,
  validateWebsiteUrl,
  validationFieldId,
} from "./field-validators";

function firstFieldIdFromOrder(
  step: number,
  errors: Record<string, unknown>,
  order: readonly string[],
  memberId?: string,
): string | undefined {
  for (const field of order) {
    if (errors[field]) {
      return validationFieldId(step, field, memberId);
    }
  }
  return undefined;
}

export function validateProjectInfoStep(
  form: SubmitProjectWizardState,
): StepValidationResult {
  const errors: ProjectInfoFieldErrors = {};

  const titleError = validateProjectTitle(form.title);
  if (titleError) errors.title = titleError;

  const descriptionError = validateProjectDescription(form.description);
  if (descriptionError) errors.description = descriptionError;

  const summaryError = validateProjectSummary(form.summary);
  if (summaryError) errors.summary = summaryError;

  const websiteError = validateWebsiteUrl(form.websiteUrl);
  if (websiteError) errors.websiteUrl = websiteError;

  const categoryError = validateCategory(form.categoryId);
  if (categoryError) errors.category = categoryError;

  const firstInvalidFieldId = firstFieldIdFromOrder(1, errors, PROJECT_INFO_FIELD_ORDER);

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    firstInvalidFieldId,
  };
}

export function validateMediaStep(
  form: SubmitProjectWizardState,
  mediaTypes?: ApiProjectMediaType[],
): StepValidationResult {
  const errors: MediaStepErrors = {};

  if (form.mediaItems.length === 0) {
    errors.media = VALIDATION_MESSAGES.mediaRequired;
    return {
      ok: false,
      errors,
      firstInvalidFieldId: validationFieldId(2, "media"),
    };
  }

  for (const item of form.mediaItems) {
    const fileError = validateMediaFile(item.file, mediaTypes);
    if (fileError) {
      errors.media = fileError;
      return {
        ok: false,
        errors,
        firstInvalidFieldId: validationFieldId(2, "media"),
      };
    }
  }

  return { ok: true, errors: {}, firstInvalidFieldId: undefined };
}

export function validateOwnerInfoStep(form: SubmitProjectWizardState): StepValidationResult {
  const errors: OwnerFieldErrors = {};

  const nameError = validateOwnerName(form.ownerName);
  if (nameError) errors.ownerName = nameError;

  const birthdateError = validateOwnerBirthdate(form.ownerBirthdate);
  if (birthdateError) errors.ownerBirthdate = birthdateError;

  const collegeError = validateOwnerCollege(form.ownerCollege);
  if (collegeError) errors.ownerCollege = collegeError;

  const linkedinError = validateLinkedinUrl(form.ownerLinkedin);
  if (linkedinError) errors.ownerLinkedin = linkedinError;

  if (form.ownerCertificate) {
    const certificateError = validateCertificateFile(form.ownerCertificate);
    if (certificateError) errors.ownerCertificate = certificateError;
  }

  const mappedErrors: Record<string, unknown> = {
    ownerName: errors.ownerName,
    ownerBirthdate: errors.ownerBirthdate,
    ownerCollege: errors.ownerCollege,
    ownerCertificate: errors.ownerCertificate,
    ownerLinkedin: errors.ownerLinkedin,
  };

  const firstInvalidFieldId = firstFieldIdFromOrder(3, mappedErrors, OWNER_FIELD_ORDER);

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    firstInvalidFieldId,
  };
}

export function validateTeamMembersStep(form: SubmitProjectWizardState): StepValidationResult {
  if (!form.addTeamMembersEnabled) {
    return { ok: true, errors: {}, firstInvalidFieldId: undefined };
  }

  const errors: TeamStepErrors = {};

  if (form.teamMembers.length === 0) {
    errors.toggle = VALIDATION_MESSAGES.teamMembersRequired;
    return {
      ok: false,
      errors,
      firstInvalidFieldId: validationFieldId(4, "toggle"),
    };
  }

  const memberErrors: TeamMemberFieldErrors = {};

  for (const member of form.teamMembers) {
    const fieldErrors = validateTeamMember(member);
    if (Object.keys(fieldErrors).length > 0) {
      memberErrors[member.id] = fieldErrors;
    }
  }

  if (Object.keys(memberErrors).length > 0) {
    errors.members = memberErrors;

    for (const member of form.teamMembers) {
      const memberFieldErrors = memberErrors[member.id];
      if (!memberFieldErrors) continue;
      const firstFieldId = firstFieldIdFromOrder(
        4,
        memberFieldErrors as Record<string, unknown>,
        TEAM_MEMBER_FIELD_ORDER,
        member.id,
      );
      if (firstFieldId) {
        return { ok: false, errors, firstInvalidFieldId: firstFieldId };
      }
    }
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    firstInvalidFieldId: undefined,
  };
}

export function validateWizardStep(
  step: SubmitProjectStep,
  form: SubmitProjectWizardState,
  mediaTypes?: ApiProjectMediaType[],
): StepValidationResult {
  switch (step) {
    case 1:
      return validateProjectInfoStep(form);
    case 2:
      return validateMediaStep(form, mediaTypes);
    case 3:
      return validateOwnerInfoStep(form);
    case 4:
      return validateTeamMembersStep(form);
    default:
      return { ok: true, errors: {}, firstInvalidFieldId: undefined };
  }
}

export function validateAllWizardSteps(
  form: SubmitProjectWizardState,
  mediaTypes?: ApiProjectMediaType[],
): AllStepsValidationResult {
  const errors: AllStepsValidationResult["errors"] = {};
  const steps: SubmitProjectStep[] = [1, 2, 3, 4];

  for (const step of steps) {
    const result = validateWizardStep(step, form, mediaTypes);
    if (!result.ok) {
      errors[step] = result.errors as never;
    }
  }

  for (const step of steps) {
    const result = validateWizardStep(step, form, mediaTypes);
    if (!result.ok) {
      return {
        ok: false,
        errors,
        firstInvalidStep: step,
        firstInvalidFieldId: result.firstInvalidFieldId,
      };
    }
  }

  return { ok: true, errors: {} };
}
