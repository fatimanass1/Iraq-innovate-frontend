import type { AxiosError } from "axios";
import { authenticatedClient } from "@/shared/services/api/client/authenticated";
import type {
  ApiProjectDetail,
  PaginatedProjectsApiResponse,
  SubmitTeamMemberPayload,
} from "../types/project-api.types";
import { ProjectsApiError } from "../types/project.types";
import { PROJECTS_ENDPOINTS } from "./projectsEndpoints";

function extractFieldErrors(data: unknown): Record<string, string[]> | undefined {
  if (!data || typeof data !== "object") return undefined;

  const fieldErrors: Record<string, string[]> = {};

  Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
    if (key === "message" || key === "detail" || key === "success") return;

    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      fieldErrors[key] = value;
    }
  });

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

function extractDetailMessage(data: Record<string, unknown> | undefined): string | undefined {
  if (!data) return undefined;

  const detail = data.detail;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "detail" in item) {
          const nested = (item as { detail?: unknown }).detail;
          return typeof nested === "string" ? nested : undefined;
        }
        return undefined;
      })
      .filter(Boolean);

    if (parts.length > 0) {
      return parts.join("، ");
    }
  }

  return undefined;
}

function getStatusFallbackMessage(status: number): string {
  switch (status) {
    case 401:
      return "يجب تسجيل الدخول للوصول إلى هذا المورد.";
    case 403:
      return "ليس لديك صلاحية للوصول إلى هذا المورد.";
    case 404:
      return "المشروع غير موجود.";
    default:
      return "حدث خطأ أثناء معالجة الطلب.";
  }
}

function toProjectsApiError(error: unknown): ProjectsApiError {
  const axiosError = error as AxiosError<Record<string, unknown>>;

  if (axiosError.code === "ERR_NETWORK" || !axiosError.response) {
    return new ProjectsApiError(
      "تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.",
    );
  }

  const status = axiosError.response.status;
  const data = axiosError.response.data;
  const fieldErrors = extractFieldErrors(data);
  const message =
    (typeof data?.message === "string" && data.message) ||
    extractDetailMessage(data) ||
    getStatusFallbackMessage(status);

  return new ProjectsApiError(message, status, fieldErrors);
}

function appendIfDefined(formData: FormData, key: string, value: string | undefined) {
  if (value?.trim()) {
    formData.append(key, value.trim());
  }
}

function buildTeamMemberFormData(payload: SubmitTeamMemberPayload): FormData {
  const formData = new FormData();

  formData.append("name", payload.name.trim());
  appendIfDefined(formData, "birthdate", payload.birthdate);
  appendIfDefined(formData, "college", payload.college);
  appendIfDefined(formData, "linkedin_url", payload.linkedin_url);
  appendIfDefined(formData, "role", payload.role);

  if (payload.graduate_certificate) {
    formData.append("graduate_certificate", payload.graduate_certificate);
  }

  return formData;
}

/** Raw projects HTTP calls — listing, details, team members on existing projects. */
export const projectsApi = {
  async getProjects(ownerId?: number): Promise<PaginatedProjectsApiResponse> {
    try {
      const { data } = await authenticatedClient.get<PaginatedProjectsApiResponse>(
        PROJECTS_ENDPOINTS.LIST,
        {
          params: ownerId ? { owner: ownerId } : undefined,
        },
      );
      return data;
    } catch (error) {
      throw toProjectsApiError(error);
    }
  },

  async getProjectById(id: number | string): Promise<ApiProjectDetail> {
    try {
      const { data } = await authenticatedClient.get<ApiProjectDetail>(
        PROJECTS_ENDPOINTS.DETAIL(id),
      );
      return data;
    } catch (error) {
      throw toProjectsApiError(error);
    }
  },

  async submitTeamMember(payload: SubmitTeamMemberPayload): Promise<void> {
    try {
      await authenticatedClient.post(
        PROJECTS_ENDPOINTS.TEAM_MEMBER_SUBMIT(payload.projectId),
        buildTeamMemberFormData(payload),
      );
    } catch (error) {
      throw toProjectsApiError(error);
    }
  },
};
