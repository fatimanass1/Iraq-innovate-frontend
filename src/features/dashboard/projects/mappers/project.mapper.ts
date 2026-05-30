import type {
  ApiProjectDetail,
  ApiProjectListItem,
  PaginatedProjectsApiResponse,
} from "../types/project-api.types";
import type { ProjectDetail, ProjectListItem } from "../types/project.types";
import {
  formatProjectDate,
  normalizeProjectStatus,
} from "../utils/project.helpers";
import { isImageMedia, isVideoMedia, resolveAssetUrl } from "../utils/media.helpers";

export function mapApiProjectListItem(project: ApiProjectListItem): ProjectListItem {
  return {
    id: String(project.id),
    title: project.title,
    summary: project.summary?.trim() || "",
    status: normalizeProjectStatus(project.status),
    category: project.category?.name ?? "—",
    date: formatProjectDate(project.created_at),
    createdAt: project.created_at,
    imageUrl: null,
  };
}

export function mapApiProjectDetail(project: ApiProjectDetail): ProjectDetail {
  const listItem = mapApiProjectListItem(project);
  const mediaItems = Array.isArray(project.media) ? project.media : [];
  const attachmentItems = Array.isArray(project.attachments) ? project.attachments : [];
  const teamMemberItems = Array.isArray(project.team_members) ? project.team_members : [];

  return {
    ...listItem,
    description: project.description?.trim() || "",
    summary: project.summary?.trim() || "",
    websiteUrl: project.website_url?.trim() || "",
    category: {
      id: project.category?.id ?? 0,
      name: project.category?.name ?? "—",
    },
    owner: {
      id: project.owner?.id ?? 0,
      name: project.owner?.name ?? "—",
      email: project.owner?.email ?? "",
    },
    statusRaw: project.status,
    statusId: project.status_id,
    updatedAt: project.updated_at,
    media: mediaItems.map((item) => {
      const fileUrl = resolveAssetUrl(item.file) ?? "";
      const url = resolveAssetUrl(item.url) ?? "";
      const src = fileUrl || url;
      const typeName = item.type?.name ?? "Media";

      if (process.env.NODE_ENV === "development") {
        console.log("MEDIA ITEM", item);
        console.log("MEDIA FILE", item.file);
        console.log("MEDIA URL", item.url);
        console.log("MEDIA RESOLVED SRC", src);
      }

      return {
        id: item.id,
        typeName,
        url,
        fileUrl,
        createdAt: item.created_at,
        isImage: Boolean(src && isImageMedia(typeName, src)),
        isVideo: Boolean(src && isVideoMedia(typeName, src)),
      };
    }),
    attachments: attachmentItems.map((item) => ({
      id: item.id,
      label: item.label?.trim() || "مرفق",
      fileUrl: resolveAssetUrl(item.file) ?? "",
      createdAt: item.created_at,
    })),
    teamMembers: teamMemberItems.map((member) => ({
      id: member.id,
      name: member.name,
      role: member.role?.trim() || "",
      college: member.college?.trim() || "",
      linkedinUrl: member.linkedin_url?.trim() || "",
    })),
  };
}

export function mapProjectsListResponse(response: PaginatedProjectsApiResponse): {
  count: number;
  projects: ProjectListItem[];
} {
  return {
    count: response.count,
    projects: response.results.map(mapApiProjectListItem),
  };
}
