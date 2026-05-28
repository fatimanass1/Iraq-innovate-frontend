/** Normalized status used across UI layers. */
export type NormalizedProjectStatus = "pending" | "approved" | "rejected";

export type ApiProjectCategory = {
  id: number;
  name: string;
};

export type ApiProjectOwner = {
  id: number;
  name: string;
  email: string;
};

export type ApiProjectMediaType = {
  id: number;
  name: string;
};

export type ApiProjectMedia = {
  id: number;
  type: ApiProjectMediaType;
  file: string;
  url: string;
  created_at: string;
};

export type ApiProjectAttachment = {
  id: number;
  label: string;
  file: string;
  created_at: string;
};

export type ApiProjectTeamMember = {
  id: number;
  name: string;
  role: string;
  college: string;
  linkedin_url: string;
};

/** List item from `GET /project/`. */
export type ApiProjectListItem = {
  id: number;
  title: string;
  summary: string;
  website_url: string;
  category: ApiProjectCategory;
  owner: ApiProjectOwner;
  status: string;
  status_id: string;
  created_at: string;
};

/** Full project from `GET /project/{id}/`. */
export type ApiProjectDetail = ApiProjectListItem & {
  description: string;
  media?: ApiProjectMedia[] | null;
  attachments?: ApiProjectAttachment[] | null;
  team_members?: ApiProjectTeamMember[] | null;
  updated_at: string;
};

export type PaginatedProjectsApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ApiProjectListItem[];
};

export type SubmitProjectPayload = {
  title: string;
  description?: string;
  summary?: string;
  website_url?: string;
  category?: number;
  media?: File[];
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
