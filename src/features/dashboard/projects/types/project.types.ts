import type { NormalizedProjectStatus } from "./project-api.types";

export type ProjectStatus = NormalizedProjectStatus;

export type ProjectFilterTab = "all" | ProjectStatus;

export type ProjectTab = {
  id: ProjectFilterTab;
  labelAr: string;
};

export type ProjectCategory = {
  id: number;
  name: string;
};

export type ProjectOwner = {
  id: number;
  name: string;
  email: string;
};

export type ProjectListItem = {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  category: string;
  date: string;
  createdAt: string;
  imageUrl: string | null;
};

/** Dashboard list card alias */
export type Project = ProjectListItem;

/** Full read-only project from `GET /project/{id}/`. */
export type ProjectDetail = {
  id: string;
  title: string;
  description: string;
  summary: string;
  websiteUrl: string;
  category: ProjectCategory;
  owner: ProjectOwner;
  status: ProjectStatus;
  statusRaw: string;
  statusId: string;
  createdAt: string;
  updatedAt: string;
  date: string;
  media: ProjectMediaItem[];
  attachments: ProjectAttachmentItem[];
  teamMembers: ProjectTeamMemberItem[];
};

export type ProjectMediaItem = {
  id: number;
  typeName: string;
  url: string;
  fileUrl: string;
  createdAt: string;
  isImage: boolean;
  isVideo: boolean;
};

export type ProjectAttachmentItem = {
  id: number;
  label: string;
  fileUrl: string;
  createdAt: string;
};

export type ProjectTeamMemberItem = {
  id: number;
  name: string;
  role: string;
  college: string;
  linkedinUrl: string;
};

export class ProjectsApiError extends Error {
  readonly status?: number;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(
    message: string,
    status?: number,
    fieldErrors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = "ProjectsApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}
