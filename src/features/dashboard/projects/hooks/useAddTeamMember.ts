"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PROJECTS_CONTENT } from "../constants/projects-content";
import { teamMemberService } from "../services/projectsService";
import type { SubmitTeamMemberPayload } from "../types/project-api.types";
import { ProjectsApiError } from "../types/project.types";
import { projectDetailsQueryKey } from "./useProjectDetails";

export function useAddTeamMember(projectId: number | string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<SubmitTeamMemberPayload, "projectId">) =>
      teamMemberService.addTeamMember({ ...payload, projectId: Number(projectId) }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectDetailsQueryKey(projectId) });
      toast.success(PROJECTS_CONTENT.teamMemberSuccess);
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ProjectsApiError
          ? error.message
          : PROJECTS_CONTENT.teamMemberError;
      toast.error(message);
    },
  });
}
