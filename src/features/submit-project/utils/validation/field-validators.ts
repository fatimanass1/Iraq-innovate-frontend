import {
  ACCEPTED_MEDIA_EXTENSIONS,
  ACCEPTED_MEDIA_MIME_TYPES,
  MAX_MEDIA_FILE_SIZE_BYTES,
} from "../../constants/media-upload";
import {
  MAX_OWNER_CERTIFICATE_BYTES,
  OWNER_CERTIFICATE_MIME_TYPES,
} from "../../constants/owner-info";
import { VALIDATION_RULES } from "../../constants/validation-rules";
import {
  FIELD_LABELS,
  VALIDATION_MESSAGES,
} from "../../constants/validation-messages";
import type { ApiProjectMediaType } from "../../types/api.types";
import type { BilingualMessage } from "../../types/validation.types";
import type { SubmitProjectWizardState, TeamMemberDraft } from "../../types/wizard.types";
import { getMediaFileKind } from "../media-file";
import { resolveMediaTypeId } from "../resolve-media-type-id";

const CERTIFICATE_EXTENSIONS = [".pdf", ".docx", ".png", ".jpg", ".jpeg"];

export function validationFieldId(step: number, field: string, memberId?: string): string {
  if (memberId) return `submit-field-step4-${memberId}-${field}`;
  return `submit-field-step${step}-${field}`;
}

export function formatBytesLabel(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${Math.round(bytes / (1024 * 1024))} MB`;
}

export function isStrictHttpUrl(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;

  if (/\s/.test(trimmed)) return false;

  const lower = trimmed.toLowerCase();
  if (lower === "www" || lower === "http://" || lower === "https://") return false;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    if (!/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/.*)?$/.test(candidate)) {
      return false;
    }
    candidate = `https://${candidate}`;
  }

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return false;

    const hostname = parsed.hostname.toLowerCase();
    if (!hostname || hostname === "www") return false;

    const labels = hostname.split(".").filter(Boolean);
    if (labels.length < 2) return false;

    const tld = labels[labels.length - 1];
    if (tld.length < 2 || !/^[a-zA-Z]{2,}$/.test(tld)) return false;

    return true;
  } catch {
    return false;
  }
}

/** @deprecated Use isStrictHttpUrl for form validation */
export function isValidHttpUrl(value: string): boolean {
  return isStrictHttpUrl(value);
}

export function isFutureDate(value: string): boolean {
  if (!value.trim()) return false;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return date.getTime() > today.getTime();
}

export function validateRequiredText(
  value: string,
  labels: { ar: string; en: string },
): BilingualMessage | undefined {
  if (!value.trim()) {
    return VALIDATION_MESSAGES.required(labels.ar, labels.en);
  }
  return undefined;
}

export function validateMinLength(
  value: string,
  min: number,
  labels: { ar: string; en: string },
): BilingualMessage | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (trimmed.length < min) {
    return VALIDATION_MESSAGES.minLength(labels.ar, labels.en, min);
  }
  return undefined;
}

export function validateMaxLength(
  value: string,
  max: number,
  labels: { ar: string; en: string },
): BilingualMessage | undefined {
  if (value.trim().length > max) {
    return VALIDATION_MESSAGES.maxLength(labels.ar, labels.en, max);
  }
  return undefined;
}

export function isAcceptedMediaFile(file: File): boolean {
  const lowerName = file.name.toLowerCase();
  const hasExtension = ACCEPTED_MEDIA_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
  const hasMime =
    file.type.length > 0 &&
    (ACCEPTED_MEDIA_MIME_TYPES as readonly string[]).includes(file.type);
  return hasExtension || hasMime;
}

export function isAcceptedCertificate(file: File): boolean {
  const lower = file.name.toLowerCase();
  const hasExtension = CERTIFICATE_EXTENSIONS.some((ext) => lower.endsWith(ext));
  const hasMime =
    file.type.length > 0 &&
    (OWNER_CERTIFICATE_MIME_TYPES as readonly string[]).includes(file.type);
  return hasExtension || hasMime;
}

export function validateMediaFile(
  file: File,
  mediaTypes?: ApiProjectMediaType[],
): BilingualMessage | undefined {
  if (!isAcceptedMediaFile(file)) {
    return VALIDATION_MESSAGES.unsupportedMediaType;
  }

  if (file.size > MAX_MEDIA_FILE_SIZE_BYTES) {
    return VALIDATION_MESSAGES.mediaFileTooLarge(formatBytesLabel(MAX_MEDIA_FILE_SIZE_BYTES));
  }

  const kind = getMediaFileKind(file);
  if (kind === "image" || kind === "video") {
    const typeId = resolveMediaTypeId(kind, mediaTypes);
    if (typeId == null) {
      return VALIDATION_MESSAGES.unsupportedMediaType;
    }
  }

  return undefined;
}

export function validateCertificateFile(file: File): BilingualMessage | undefined {
  if (!isAcceptedCertificate(file)) {
    return VALIDATION_MESSAGES.unsupportedCertificateType;
  }
  if (file.size > MAX_OWNER_CERTIFICATE_BYTES) {
    return VALIDATION_MESSAGES.mediaFileTooLarge(formatBytesLabel(MAX_OWNER_CERTIFICATE_BYTES));
  }
  return undefined;
}

export function validateProjectTitle(value: string): BilingualMessage | undefined {
  return (
    validateRequiredText(value, FIELD_LABELS.title) ??
    validateMinLength(value, VALIDATION_RULES.projectTitle.min, FIELD_LABELS.title) ??
    validateMaxLength(value, VALIDATION_RULES.projectTitle.max, FIELD_LABELS.title)
  );
}

export function validateProjectDescription(value: string): BilingualMessage | undefined {
  return (
    validateRequiredText(value, FIELD_LABELS.description) ??
    validateMinLength(value, VALIDATION_RULES.projectDescription.min, FIELD_LABELS.description)
  );
}

export function validateProjectSummary(value: string): BilingualMessage | undefined {
  return (
    validateRequiredText(value, FIELD_LABELS.summary) ??
    validateMinLength(value, VALIDATION_RULES.projectSummary.min, FIELD_LABELS.summary) ??
    validateMaxLength(value, VALIDATION_RULES.projectSummary.max, FIELD_LABELS.summary)
  );
}

export function validateWebsiteUrl(value: string): BilingualMessage | undefined {
  if (!value.trim()) return undefined;
  if (!isStrictHttpUrl(value)) return VALIDATION_MESSAGES.invalidUrl;
  return undefined;
}

export function validateCategory(categoryId: number | null): BilingualMessage | undefined {
  if (categoryId == null) return VALIDATION_MESSAGES.categoryRequired;
  return undefined;
}

export function validateOwnerName(value: string): BilingualMessage | undefined {
  return (
    validateRequiredText(value, FIELD_LABELS.ownerName) ??
    validateMinLength(value, VALIDATION_RULES.ownerName.min, FIELD_LABELS.ownerName)
  );
}

export function validateOwnerBirthdate(value: string): BilingualMessage | undefined {
  if (!value.trim()) return undefined;
  if (isFutureDate(value)) return VALIDATION_MESSAGES.futureDate;
  return undefined;
}

export function validateOwnerCollege(value: string): BilingualMessage | undefined {
  return validateMaxLength(value, VALIDATION_RULES.ownerCollege.max, FIELD_LABELS.ownerCollege);
}

export function validateLinkedinUrl(value: string): BilingualMessage | undefined {
  if (!value.trim()) return undefined;
  if (!isStrictHttpUrl(value)) return VALIDATION_MESSAGES.invalidUrl;
  return undefined;
}

export function validateTeamMemberName(value: string): BilingualMessage | undefined {
  return validateRequiredText(value, FIELD_LABELS.memberName);
}

export function validateTeamMemberRole(value: string): BilingualMessage | undefined {
  return validateRequiredText(value, FIELD_LABELS.memberRole);
}

export function validateTeamMember(member: TeamMemberDraft): Partial<
  Record<keyof TeamMemberDraft, BilingualMessage>
> {
  const errors: Partial<Record<keyof TeamMemberDraft, BilingualMessage>> = {};

  const nameError = validateTeamMemberName(member.name);
  if (nameError) errors.name = nameError;

  const roleError = validateTeamMemberRole(member.role);
  if (roleError) errors.role = roleError;

  const birthdateError = member.birthdate.trim()
    ? isFutureDate(member.birthdate)
      ? VALIDATION_MESSAGES.futureDate
      : undefined
    : undefined;
  if (birthdateError) errors.birthdate = birthdateError;

  const collegeError = validateMaxLength(member.college, VALIDATION_RULES.ownerCollege.max, {
    ar: FIELD_LABELS.memberCollege.ar,
    en: FIELD_LABELS.memberCollege.en,
  });
  if (collegeError) errors.college = collegeError;

  const linkedinError = validateLinkedinUrl(member.linkedinUrl);
  if (linkedinError) errors.linkedinUrl = linkedinError;

  if (member.certificate) {
    const certificateError = validateCertificateFile(member.certificate);
    if (certificateError) errors.certificate = certificateError;
  }

  return errors;
}

export function isProjectInfoFieldValid(
  field: keyof SubmitProjectWizardState,
  form: SubmitProjectWizardState,
): boolean {
  switch (field) {
    case "title":
      return !validateProjectTitle(form.title);
    case "description":
      return !validateProjectDescription(form.description);
    case "summary":
      return !validateProjectSummary(form.summary);
    case "websiteUrl":
      return !validateWebsiteUrl(form.websiteUrl);
    case "categoryId":
      return !validateCategory(form.categoryId);
    default:
      return false;
  }
}

export function isOwnerFieldValid(
  field: keyof SubmitProjectWizardState,
  form: SubmitProjectWizardState,
): boolean {
  switch (field) {
    case "ownerName":
      return !validateOwnerName(form.ownerName);
    case "ownerBirthdate":
      return !validateOwnerBirthdate(form.ownerBirthdate);
    case "ownerCollege":
      return !validateOwnerCollege(form.ownerCollege);
    case "ownerLinkedin":
      return !validateLinkedinUrl(form.ownerLinkedin);
    case "ownerCertificate":
      return !form.ownerCertificate || !validateCertificateFile(form.ownerCertificate);
    default:
      return false;
  }
}
