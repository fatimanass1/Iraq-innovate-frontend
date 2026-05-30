"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { ProjectDetail } from "@/features/dashboard/projects/types/project.types";
import { adminDashboardApi, AdminDashboardApiError } from "../api/adminDashboardApi";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../constants/admin-project-review-content";
import { extractStatusesFromResponse } from "../mappers/admin-dashboard.mapper";
import { resolveAdminStatus } from "../utils/resolve-admin-status-id";
import { resolveApiProjectId } from "../utils/project-id";
import type { AdminReviewStatusUpdate } from "../types/admin-projects.types";
import { adminProjectDetailsQueryKey } from "./useAdminProjectDetails";
import { ADMIN_PROJECTS_QUERY_KEY } from "./useAdminProjectsList";

export type { AdminReviewStatusUpdate };

type UpdateStatusVariables = {
  status: AdminReviewStatusUpdate;
};

const SUCCESS_MESSAGES: Record<AdminReviewStatusUpdate, string> = {
  approved: ADMIN_PROJECT_REVIEW_CONTENT.approveSuccess,
  rejected: ADMIN_PROJECT_REVIEW_CONTENT.rejectSuccess,
  changes_requested: ADMIN_PROJECT_REVIEW_CONTENT.changesSuccess,
};

export const ADMIN_DASHBOARD_STATUSES_QUERY_KEY = ["admin-dashboard", "statuses"] as const;

export function useAdminUpdateProjectStatus(projectId: string) {
  const queryClient = useQueryClient();
  const parsedId = resolveApiProjectId(projectId);
  const queryKeyId = parsedId ?? projectId;

  return useMutation({
    mutationFn: async ({ status }: UpdateStatusVariables) => {
      if (!parsedId) {
        throw new AdminDashboardApiError("معرّف المشروع غير صالح.", 404);
      }

      const statusesResponse = await queryClient.fetchQuery({
        queryKey: ADMIN_DASHBOARD_STATUSES_QUERY_KEY,
        queryFn: () => adminDashboardApi.getStatuses(),
      });

      const statuses = extractStatusesFromResponse(statusesResponse);
      const selectedStatus = resolveAdminStatus(status, statuses);

      console.log("Selected status:", selectedStatus);
      console.log("Sending status_id:", selectedStatus.id);

      await adminDashboardApi.updateProjectStatus(parsedId, selectedStatus.id);

      return {
        selectedStatus,
        uiStatus: status,
      };
    },
    onSuccess: ({ selectedStatus, uiStatus }) => {
      toast.success(SUCCESS_MESSAGES[uiStatus]);

      queryClient.setQueryData<ProjectDetail>(adminProjectDetailsQueryKey(queryKeyId), (current) => {
        if (!current) return current;
        return {
          ...current,
          statusRaw: uiStatus,
          statusId: String(selectedStatus.id),
        };
      });

      void queryClient.invalidateQueries({ queryKey: ADMIN_PROJECTS_QUERY_KEY });
    },
    onError: (error) => {
      const message =
        error instanceof AdminDashboardApiError
          ? error.message
          : ADMIN_PROJECT_REVIEW_CONTENT.updateError;
      toast.error(message);
    },
  });
}
