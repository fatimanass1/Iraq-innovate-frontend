import type { AxiosError } from "axios";
import { authenticatedClient } from "@/shared/services/api/client/authenticated";
import type { PaginatedCategoriesResponse } from "@/features/submit-project/types/api.types";
import { AdminDashboardApiError } from "./adminDashboardApi";

const CATEGORIES_ENDPOINT = "/api/project/categories/";

export const adminProjectsApi = {
  async getCategories(): Promise<PaginatedCategoriesResponse> {
    try {
      const { data } = await authenticatedClient.get<PaginatedCategoriesResponse>(CATEGORIES_ENDPOINT);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ detail?: string; message?: string }>;
      const status = axiosError.response?.status ?? 500;
      const message =
        axiosError.response?.data?.detail ??
        axiosError.response?.data?.message ??
        "تعذر تحميل الفئات.";
      throw new AdminDashboardApiError(message, status);
    }
  },
};
