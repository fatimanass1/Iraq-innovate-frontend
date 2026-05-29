import type { SubmitProjectPayload, SubmitTeamMemberPayload } from "../types/api.types";
import type { SubmitProjectWizardState } from "../types/wizard.types";
import {
  assertWebsiteUrlValidForSubmit,
  resolveWebsiteUrlForApi,
} from "./submit-form-data";

export function buildSubmitProjectPayload(
  form: SubmitProjectWizardState,
): SubmitProjectPayload {
  assertWebsiteUrlValidForSubmit(form.websiteUrl);

  const mediaForApi = form.mediaItems
    .filter(
      (item) =>
        item.mediaTypeId != null && item.file instanceof File,
    )
    .map((item) => ({
      file: item.file,
      type: item.mediaTypeId as number,
    }));

  const ownerCertificate =
    form.ownerCertificate instanceof File ? form.ownerCertificate : undefined;

  return {
    title: form.title.trim(),
    description: form.description.trim() || undefined,
    summary: form.summary.trim() || undefined,
    website_url: resolveWebsiteUrlForApi(form.websiteUrl),
    category: form.categoryId ?? undefined,
    media: mediaForApi.length > 0 ? mediaForApi : undefined,
    owner_name: form.ownerName.trim(),
    owner_birthdate: form.ownerBirthdate || undefined,
    owner_college: form.ownerCollege.trim() || undefined,
    owner_linkedin_url: form.ownerLinkedin.trim() || undefined,
    owner_graduate_certificate: ownerCertificate,
  };
}

export function buildTeamMemberPayloads(
  form: SubmitProjectWizardState,
  projectId: number,
): SubmitTeamMemberPayload[] {
  if (!form.addTeamMembersEnabled || form.teamMembers.length === 0) {
    return [];
  }

  return form.teamMembers.map((member) => ({
    projectId,
    name: member.name.trim(),
    role: member.role.trim() || undefined,
    college: member.college.trim() || undefined,
    birthdate: member.birthdate || undefined,
    linkedin_url: member.linkedinUrl.trim() || undefined,
    graduate_certificate:
      member.certificate instanceof File ? member.certificate : undefined,
  }));
}
