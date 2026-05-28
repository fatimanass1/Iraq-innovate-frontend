"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ROUTES } from "@/shared/constants/routes";
import { PROJECTS_CONTENT } from "../constants/projects-content";
import { DASHBOARD_QUERY_KEY } from "@/features/dashboard/hooks/use-dashboard.logic";
import { PROJECTS_QUERY_KEY } from "./useProjects";
import { projectSubmitService } from "../services/projectsService";
import type { SubmitProjectPayload } from "../types/project-api.types";
import { ProjectsApiError } from "../types/project.types";

export function useSubmitProject() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitProjectPayload) =>
      projectSubmitService.submitProject(payload),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: DASHBOARD_QUERY_KEY });
      toast.success(PROJECTS_CONTENT.submitSuccess);
      router.push(ROUTES.projectDetails(project.id));
    },
    onError: (error: unknown) => {
      const message =
        error instanceof ProjectsApiError
          ? error.message
          : PROJECTS_CONTENT.submitError;
      toast.error(message);
    },
  });
}
