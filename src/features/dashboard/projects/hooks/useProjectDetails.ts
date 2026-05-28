"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ROUTES } from "@/shared/constants/routes";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { useAuthStore } from "@/features/auth/store/authStore";
import { projectsService } from "../services/projectsService";
import { ProjectsApiError } from "../types/project.types";
import { parseProjectId } from "./project.errors";

export function projectDetailsQueryKey(id: string | number) {
  const parsedId = parseProjectId(id);
  return ["projects", "detail", parsedId ?? String(id)] as const;
}

export function useProjectDetails(projectId: string | number) {
  const router = useRouter();
  const parsedId = parseProjectId(projectId);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const query = useQuery({
    queryKey: projectDetailsQueryKey(projectId),
    queryFn: () => {
      if (!parsedId) {
        throw new ProjectsApiError("معرّف المشروع غير صالح.", 404);
      }

      return projectsService.getProjectById(parsedId);
    },
    enabled: Boolean(parsedId && isAuthenticated && accessToken),
    retry: (failureCount, error) => {
      if (error instanceof ProjectsApiError) {
        if (error.status === 401 || error.status === 403 || error.status === 404) {
          return false;
        }
      }

      return failureCount < 2;
    },
  });

  useEffect(() => {
    if (query.error instanceof ProjectsApiError && query.error.status === 401) {
      const redirectPath = parsedId
        ? ROUTES.projectDetails(parsedId)
        : ROUTES.MY_PROJECTS;

      const params = new URLSearchParams({
        [AUTH_SEARCH_PARAMS.redirect]: redirectPath,
      });

      router.replace(`${ROUTES.SIGN_IN}?${params.toString()}`);
    }
  }, [parsedId, query.error, router]);

  return query;
}
