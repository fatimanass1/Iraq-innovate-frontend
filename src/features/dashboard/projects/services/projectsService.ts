import { useAuthStore } from "@/features/auth/store/authStore";
import { projectsApi } from "../api/projectsApi";
import {
  mapApiProjectDetail,
  mapProjectsListResponse,
} from "../mappers/project.mapper";
import { parseProjectId } from "../hooks/project.errors";
import type { SubmitProjectPayload, SubmitTeamMemberPayload } from "../types/project-api.types";
import type { ProjectDetail, ProjectListItem } from "../types/project.types";
import { ProjectsApiError } from "../types/project.types";

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

  async getProjectById(id: string | number): Promise<ProjectDetail> {
    const parsedId = parseProjectId(id);

    if (!parsedId) {
      throw new ProjectsApiError("معرّف المشروع غير صالح.", 404);
    }

    const response = await projectsApi.getProjectById(parsedId);

    let project: ProjectDetail;

    try {
      project = mapApiProjectDetail(response);
    } catch {
      throw new ProjectsApiError(
        "تعذر قراءة بيانات المشروع من الخادم. يرجى المحاولة لاحقًا.",
      );
    }

    const rawUserId = useAuthStore.getState().user?.id;
    const userId =
      rawUserId == null ? undefined : Number.isFinite(Number(rawUserId)) ? Number(rawUserId) : undefined;

    assertProjectOwnership(project, userId);

    return project;
  },
};

/** Business logic — project submission. */
export const projectSubmitService = {
  async submitProject(payload: SubmitProjectPayload): Promise<ProjectDetail> {
    const response = await projectsApi.submitProject(payload);
    return mapApiProjectDetail(response);
  },
};

/** Business logic — team member submission. */
export const teamMemberService = {
  async addTeamMember(payload: SubmitTeamMemberPayload): Promise<void> {
    await projectsApi.submitTeamMember(payload);
  },
};
