import { submitProjectApi } from "../api/submitProjectApi";
import type { SubmitProjectPayload, SubmitTeamMemberPayload } from "../types/api.types";

export const submitProjectService = {
  submitProject: (payload: SubmitProjectPayload) =>
    submitProjectApi.submitProject(payload),

  addTeamMember: (payload: SubmitTeamMemberPayload) =>
    submitProjectApi.submitTeamMember(payload),

  getCategories: () => submitProjectApi.getCategories(),

  getMediaTypes: () => submitProjectApi.getMediaTypes(),
};
