"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { ROUTES } from "@/shared/constants/routes";
import { useAuthStore } from "@/features/auth/store/authStore";
import { projectsService } from "@/features/dashboard/projects/services/projectsService";
import { ProjectsApiError } from "@/features/dashboard/projects/types/project.types";
import { formatProjectDetailRequestUrl, resolveApiProjectId } from "../utils/project-id";

export const adminProjectDetailsQueryKey = (id: string | number) => {
  const parsedId = resolveApiProjectId(id);
  if (!parsedId) {
    return ["admin-project", "invalid", String(id)] as const;
  }
  return ["admin-project", parsedId] as const;
};

export function useAdminProjectDetails(routeProjectId: string) {
  const router = useRouter();
  const parsedId = resolveApiProjectId(routeProjectId);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[AdminProjectDetails] route params.id", routeProjectId, "→ parsed", parsedId);
      if (parsedId) {
        console.log("[AdminProjectDetails] request URL", formatProjectDetailRequestUrl(parsedId));
      }
    }
  }, [routeProjectId, parsedId]);

  const query = useQuery({
    queryKey: adminProjectDetailsQueryKey(routeProjectId),
    queryFn: () => {
      if (!parsedId) {
        throw new ProjectsApiError(
          `معرّف المشروع غير صالح: "${routeProjectId}". تأكد من فتح المشروع من قائمة المشاريع باستخدام معرّف API الصحيح.`,
          404,
        );
      }

      return projectsService.fetchProjectDetailFromApi(parsedId);
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
      const redirectId = parsedId ?? routeProjectId;
      const params = new URLSearchParams({
        [AUTH_SEARCH_PARAMS.redirect]: ROUTES.adminProjectDetails(redirectId),
      });
      router.replace(`${ROUTES.SIGN_IN}?${params.toString()}`);
    }
  }, [parsedId, routeProjectId, query.error, router]);

  return query;
}
