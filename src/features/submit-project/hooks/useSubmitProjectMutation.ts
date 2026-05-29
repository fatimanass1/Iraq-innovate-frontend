"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { DASHBOARD_QUERY_KEY } from "@/features/dashboard/hooks/use-dashboard.logic";
import { PROJECTS_QUERY_KEY } from "@/features/dashboard/projects/hooks/useProjects";
import { SUBMIT_PROJECT_MESSAGES } from "../constants/messages";
import { submitProjectService } from "../services/submitProjectService";
import { SubmitProjectApiError } from "../types/errors";
import type { SubmitProjectWizardState } from "../types/wizard.types";
import {
  buildSubmitProjectPayload,
  buildTeamMemberPayloads,
} from "../utils/build-submit-payload";
import { formatSubmitProjectApiError } from "../utils/format-api-errors";

export function useSubmitProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: SubmitProjectWizardState) => {
      let payload;
      try {
        payload = buildSubmitProjectPayload(form);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : SUBMIT_PROJECT_MESSAGES.submitError;
        throw new SubmitProjectApiError(message);
      }

      const project = await submitProjectService.submitProject(payload);

      const memberPayloads = buildTeamMemberPayloads(form, project.id);
      for (const memberPayload of memberPayloads) {
        await submitProjectService.addTeamMember(memberPayload);
      }

      return project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(
        formatSubmitProjectApiError(error, SUBMIT_PROJECT_MESSAGES.submitError),
      );
    },
  });
}
