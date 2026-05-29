"use client";

import { useQuery } from "@tanstack/react-query";
import { submitProjectService } from "../services/submitProjectService";

export const PROJECT_MEDIA_TYPES_QUERY_KEY = ["submit-project", "media-types"] as const;

export function useProjectMediaTypes() {
  return useQuery({
    queryKey: PROJECT_MEDIA_TYPES_QUERY_KEY,
    queryFn: async () => {
      const response = await submitProjectService.getMediaTypes();
      return response.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}
