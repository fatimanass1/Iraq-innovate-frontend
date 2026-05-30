import { useAuthStore } from "@/features/auth/store/authStore";
import { projectsApi } from "../api/projectsApi";
import {
  mapApiProjectDetail,
  mapProjectsListResponse,
} from "../mappers/project.mapper";
import { parseProjectId } from "../hooks/project.errors";
import type { ApiProjectDetail } from "../types/project-api.types";
import type { SubmitTeamMemberPayload } from "../types/project-api.types";
import type { ProjectDetail, ProjectListItem } from "../types/project.types";
import { ProjectsApiError } from "../types/project.types";

function logProjectMediaDebug(raw: ApiProjectDetail, project: ProjectDetail): void {
  if (process.env.NODE_ENV !== "development") return;

  console.group(`[project-media] GET /api/project/${raw.id}/`);
  (raw.media ?? []).forEach((item) => {
    console.log("MEDIA ITEM", item);
    console.log("MEDIA FILE", item.file);
    console.log("MEDIA URL", item.url);
  });
  console.log(
    "mapped media URLs:",
    project.media.map((item) => ({
      id: item.id,
      typeName: item.typeName,
      fileUrl: item.fileUrl,
      url: item.url,
      renderSrc: item.fileUrl || item.url,
      isImage: item.isImage,
      isVideo: item.isVideo,
    })),
  );
  console.groupEnd();
}

export type ProjectsListResult = {
  count: number;
  projects: ProjectListItem[];
};

function assertProjectOwnership(project: ProjectDetail, userId?: number): void {
  if (userId == null || project.owner.id === 0) {
    return;
  }

  if (project.owner.id !== userId) {
    throw new ProjectsApiError("ليس لديك صلاحية لعرض هذا المشروع.", 403);
  }
}

/** Business logic — project listing & details. */
export const projectsService = {
  async getProjects(ownerId?: number): Promise<ProjectsListResult> {
    const response = await projectsApi.getProjects(ownerId);
    const filteredResults = ownerId
      ? response.results.filter((project) => project.owner?.id === ownerId)
      : response.results;

    return mapProjectsListResponse({
      ...response,
      count: filteredResults.length,
      results: filteredResults,
    });
  },

  /**
   * Fetch project detail from `GET /api/project/{id}/` and map media URLs.
   * Shared by user dashboard and admin review — no ownership check.
   */
  async fetchProjectDetailFromApi(id: string | number): Promise<ProjectDetail> {
    const parsedId = parseProjectId(id);

    if (!parsedId) {
      throw new ProjectsApiError("معرّف المشروع غير صالح.", 404);
    }

    const response = await projectsApi.getProjectById(parsedId);

    try {
      const project = mapApiProjectDetail(response);
      logProjectMediaDebug(response, project);
      return project;
    } catch {
      throw new ProjectsApiError(
        "تعذر قراءة بيانات المشروع من الخادم. يرجى المحاولة لاحقًا.",
      );
    }
  },

  async getProjectById(id: string | number): Promise<ProjectDetail> {
    const project = await this.fetchProjectDetailFromApi(id);

    const rawUserId = useAuthStore.getState().user?.id;
    const userId =
      rawUserId == null ? undefined : Number.isFinite(Number(rawUserId)) ? Number(rawUserId) : undefined;

    assertProjectOwnership(project, userId);

    return project;
  },
};

/** Business logic — team member submission on existing projects. */
export const teamMemberService = {
  async addTeamMember(payload: SubmitTeamMemberPayload): Promise<void> {
    await projectsApi.submitTeamMember(payload);
  },
};
