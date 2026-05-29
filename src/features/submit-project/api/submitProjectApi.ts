import { authenticatedClient } from "@/shared/services/api/client/authenticated";
import type {
  ApiSubmittedProject,
  PaginatedCategoriesResponse,
  PaginatedMediaTypesResponse,
  SubmitProjectPayload,
  SubmitTeamMemberPayload,
} from "../types/api.types";
import { toSubmitProjectApiError } from "../utils/api-error";
import { multipartFormConfig } from "../utils/multipart-config";
import {
  buildSubmitProjectFormData,
  buildTeamMemberFormData,
  logSubmitProjectRequest,
  logTeamMemberRequest,
} from "../utils/submit-form-data";
import { logSubmitProjectErrorDebug } from "../utils/submit-debug-log";
import { SUBMIT_PROJECT_ENDPOINTS } from "./submitProjectEndpoints";

export const submitProjectApi = {
  async submitProject(payload: SubmitProjectPayload): Promise<ApiSubmittedProject> {
    const formData = buildSubmitProjectFormData(payload);
    logSubmitProjectRequest(payload, formData);

    try {
      const { data } = await authenticatedClient.post<ApiSubmittedProject>(
        SUBMIT_PROJECT_ENDPOINTS.SUBMIT,
        formData,
        multipartFormConfig(),
      );
      return data;
    } catch (error) {
      logSubmitProjectErrorDebug(error);
      throw toSubmitProjectApiError(error);
    }
  },

  async submitTeamMember(payload: SubmitTeamMemberPayload): Promise<void> {
    const formData = buildTeamMemberFormData(payload);
    logTeamMemberRequest(payload.projectId, formData);

    try {
      await authenticatedClient.post(
        SUBMIT_PROJECT_ENDPOINTS.TEAM_MEMBER_SUBMIT(payload.projectId),
        formData,
        multipartFormConfig(),
      );
    } catch (error) {
      throw toSubmitProjectApiError(error);
    }
  },

  async getCategories(): Promise<PaginatedCategoriesResponse> {
    try {
      const { data } = await authenticatedClient.get<PaginatedCategoriesResponse>(
        SUBMIT_PROJECT_ENDPOINTS.CATEGORIES,
      );
      return data;
    } catch (error) {
      throw toSubmitProjectApiError(error);
    }
  },

  async getMediaTypes(): Promise<PaginatedMediaTypesResponse> {
    try {
      const { data } = await authenticatedClient.get<PaginatedMediaTypesResponse>(
        SUBMIT_PROJECT_ENDPOINTS.MEDIA_TYPES,
      );
      return data;
    } catch (error) {
      throw toSubmitProjectApiError(error);
    }
  },
};
