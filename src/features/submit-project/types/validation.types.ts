import type { SubmitProjectStep } from "./wizard.types";

export type BilingualMessage = {
  ar: string;
  en: string;
};

export type ProjectInfoFieldKey =
  | "title"
  | "description"
  | "summary"
  | "websiteUrl"
  | "category";

export type OwnerFieldKey =
  | "ownerName"
  | "ownerBirthdate"
  | "ownerCollege"
  | "ownerCertificate"
  | "ownerLinkedin";

export type TeamMemberFieldKey =
  | "name"
  | "role"
  | "birthdate"
  | "college"
  | "linkedinUrl"
  | "certificate";

export type ProjectInfoFieldErrors = Partial<Record<ProjectInfoFieldKey, BilingualMessage>>;
export type MediaStepErrors = { media?: BilingualMessage };
export type OwnerFieldErrors = Partial<Record<OwnerFieldKey, BilingualMessage>>;
export type TeamMemberFieldErrors = Record<
  string,
  Partial<Record<TeamMemberFieldKey, BilingualMessage>>
>;
export type TeamStepErrors = {
  members?: TeamMemberFieldErrors;
  toggle?: BilingualMessage;
};

export type WizardStepErrors = {
  1?: ProjectInfoFieldErrors;
  2?: MediaStepErrors;
  3?: OwnerFieldErrors;
  4?: TeamStepErrors;
  5?: BilingualMessage;
};

export type StepValidationResult = {
  ok: boolean;
  errors: WizardStepErrors[SubmitProjectStep];
  firstInvalidFieldId?: string;
};

export type AllStepsValidationResult = {
  ok: boolean;
  errors: WizardStepErrors;
  firstInvalidStep?: SubmitProjectStep;
  firstInvalidFieldId?: string;
};
