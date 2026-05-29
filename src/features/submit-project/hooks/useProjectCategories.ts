"use client";

import { useQuery } from "@tanstack/react-query";
import { submitProjectService } from "../services/submitProjectService";

export const PROJECT_CATEGORIES_QUERY_KEY = ["submit-project", "categories"] as const;

export function useProjectCategories() {
  return useQuery({
    queryKey: PROJECT_CATEGORIES_QUERY_KEY,
    queryFn: async () => {
      const response = await submitProjectService.getCategories();
      return response.results;
    },
    staleTime: 5 * 60 * 1000,
  });
}
