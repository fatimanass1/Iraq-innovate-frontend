export type ApiProjectCategory = {
  id: number;
  name: string;
};

export type ApiProjectMediaType = {
  id: number;
  name: string;
};

export type ApiProjectOwner = {
  id: number;
  name: string;
  email: string;
};

export type ApiProjectCategoryRef = {
  id: number;
  name: string;
};

/** Minimal project response after submit */
export type ApiSubmittedProject = {
  id: number;
  title: string;
  summary?: string;
  owner?: ApiProjectOwner;
  category?: ApiProjectCategoryRef;
};

export type PaginatedCategoriesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProjectCategory[];
};

export type PaginatedMediaTypesResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProjectMediaType[];
};

export type SubmitProjectMediaUpload = {
  file: File;
  type: number;
};

export type SubmitProjectPayload = {
  title: string;
  description?: string;
  summary?: string;
  website_url?: string;
  category?: number;
  media?: SubmitProjectMediaUpload[];
  owner_name: string;
  owner_birthdate?: string;
  owner_college?: string;
  owner_graduate_certificate?: File;
  owner_linkedin_url?: string;
};

export type SubmitTeamMemberPayload = {
  projectId: number;
  name: string;
  birthdate?: string;
  college?: string;
  graduate_certificate?: File;
  linkedin_url?: string;
  role?: string;
};
