export type SubmitProjectStep = 1 | 2 | 3 | 4 | 5;

export type TeamMemberDraft = {
  id: string;
  name: string;
  role: string;
  college: string;
  birthdate: string;
  linkedinUrl: string;
  certificate: File | null;
};

export type ProjectMediaItem = {
  id: string;
  file: File;
  mediaTypeId: number | null;
};

export type SubmitProjectWizardState = {
  title: string;
  description: string;
  summary: string;
  websiteUrl: string;
  categoryId: number | null;
  categoryName: string | null;
  mediaItems: ProjectMediaItem[];
  ownerName: string;
  ownerBirthdate: string;
  ownerCollege: string;
  ownerLinkedin: string;
  ownerCertificate: File | null;
  addTeamMembersEnabled: boolean;
  teamMembers: TeamMemberDraft[];
};

export const INITIAL_SUBMIT_PROJECT_STATE: SubmitProjectWizardState = {
  title: "",
  description: "",
  summary: "",
  websiteUrl: "",
  categoryId: null,
  categoryName: null,
  mediaItems: [],
  ownerName: "",
  ownerBirthdate: "",
  ownerCollege: "",
  ownerLinkedin: "",
  ownerCertificate: null,
  addTeamMembersEnabled: false,
  teamMembers: [],
};
