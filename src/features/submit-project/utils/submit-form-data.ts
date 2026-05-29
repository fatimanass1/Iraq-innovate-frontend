import type { SubmitProjectPayload } from "../types/api.types";
import { appendSubmitMediaToFormData } from "./append-submit-media";
import { logSubmitProjectRequestDebug } from "./submit-debug-log";

/**
 * Returns a normalized absolute URL for the API, or undefined when empty/invalid.
 */
export function resolveWebsiteUrlForApi(raw: string | undefined): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return undefined;
    }
    if (!parsed.hostname) return undefined;
    return parsed.toString();
  } catch {
    return undefined;
  }
}

export function assertWebsiteUrlValidForSubmit(websiteUrl: string): void {
  const trimmed = websiteUrl.trim();
  if (!trimmed) return;

  if (!resolveWebsiteUrlForApi(trimmed)) {
    throw new Error("أدخِل رابطًا صحيحًا للموقع.");
  }
}

export function appendFileToFormData(
  formData: FormData,
  key: string,
  file: File | null | undefined,
): void {
  if (!(file instanceof File)) return;
  formData.append(key, file, file.name);
}

function appendIfDefined(formData: FormData, key: string, value: string | undefined) {
  if (value?.trim()) {
    formData.append(key, value.trim());
  }
}

export function buildSubmitProjectFormData(payload: SubmitProjectPayload): FormData {
  const formData = new FormData();

  formData.append("title", payload.title.trim());
  formData.append("owner_name", payload.owner_name.trim());

  appendIfDefined(formData, "description", payload.description);
  appendIfDefined(formData, "summary", payload.summary);

  const websiteUrl = resolveWebsiteUrlForApi(payload.website_url);
  if (websiteUrl) {
    formData.append("website_url", websiteUrl);
  }

  appendIfDefined(formData, "owner_birthdate", payload.owner_birthdate);
  appendIfDefined(formData, "owner_college", payload.owner_college);
  appendIfDefined(formData, "owner_linkedin_url", payload.owner_linkedin_url);

  if (payload.category != null) {
    formData.append("category", String(payload.category));
  }

  appendSubmitMediaToFormData(formData, payload.media);

  appendFileToFormData(formData, "owner_graduate_certificate", payload.owner_graduate_certificate);

  return formData;
}

export function buildTeamMemberFormData(payload: {
  name: string;
  birthdate?: string;
  college?: string;
  linkedin_url?: string;
  role?: string;
  graduate_certificate?: File;
}): FormData {
  const formData = new FormData();

  formData.append("name", payload.name.trim());
  appendIfDefined(formData, "birthdate", payload.birthdate);
  appendIfDefined(formData, "college", payload.college);
  appendIfDefined(formData, "linkedin_url", payload.linkedin_url);
  appendIfDefined(formData, "role", payload.role);
  appendFileToFormData(formData, "graduate_certificate", payload.graduate_certificate);

  return formData;
}

export function logSubmitProjectRequest(
  payload: SubmitProjectPayload,
  formData: FormData,
): void {
  logSubmitProjectRequestDebug(payload, formData);
}

export function logTeamMemberRequest(projectId: number, formData: FormData): void {
  console.group(`[submit-project] POST /api/project/${projectId}/members/submit/`);
  console.log("FormData entries:");
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`  ${key}:`, {
        File: true,
        name: value.name,
        size: value.size,
        type: value.type,
      });
    } else {
      console.log(`  ${key}:`, value);
    }
  }
  console.groupEnd();
}
