/** Client-side validation limits for the submit wizard */
export const VALIDATION_RULES = {
  projectTitle: { min: 3, max: 150 },
  projectDescription: { min: 30 },
  projectSummary: { min: 10, max: 300 },
  ownerName: { min: 3 },
  ownerCollege: { max: 150 },
} as const;

export const PROJECT_INFO_FIELD_ORDER = [
  "title",
  "description",
  "summary",
  "websiteUrl",
  "category",
] as const;

export const OWNER_FIELD_ORDER = [
  "ownerName",
  "ownerBirthdate",
  "ownerCollege",
  "ownerCertificate",
  "ownerLinkedin",
] as const;

export const TEAM_MEMBER_FIELD_ORDER = [
  "name",
  "role",
  "birthdate",
  "college",
  "linkedinUrl",
  "certificate",
] as const;
