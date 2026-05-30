import type { AxiosError } from "axios";
import { authenticatedClient } from "@/shared/services/api/client/authenticated";
import type {
  AdminDashboardApiResponse,
  AdminDashboardStatusesResponse,
} from "../types/admin-dashboard-api.types";
import { ADMIN_DASHBOARD_ENDPOINTS } from "./adminDashboardEndpoints";

export class AdminDashboardApiError extends Error {
  readonly status: number;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(message: string, status: number, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "AdminDashboardApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

function extractFieldErrors(data: unknown): Record<string, string[]> | undefined {
  if (!data || typeof data !== "object") return undefined;

  const fieldErrors: Record<string, string[]> = {};

  Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
    if (key === "message" || key === "detail" || key === "success") return;

    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      fieldErrors[key] = value;
    }
  });

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

function extractDetailMessage(data: Record<string, unknown> | undefined): string {
  if (!data) return "حدث خطأ غير متوقع.";

  const detail = data.detail;
  if (typeof detail === "string" && detail.trim()) return detail;

  if (typeof data.message === "string" && data.message.trim()) return data.message;

  return "حدث خطأ غير متوقع.";
}

function toAdminDashboardApiError(error: unknown): AdminDashboardApiError {
  if (error instanceof AdminDashboardApiError) return error;

  const axiosError = error as AxiosError<Record<string, unknown>>;
  const status = axiosError.response?.status ?? 500;
  const data = axiosError.response?.data;

  return new AdminDashboardApiError(
    extractDetailMessage(data),
    status,
    extractFieldErrors(data),
  );
}

export const adminDashboardApi = {
  async getDashboard(): Promise<AdminDashboardApiResponse> {
    try {
      const { data } = await authenticatedClient.get<AdminDashboardApiResponse>(
        ADMIN_DASHBOARD_ENDPOINTS.DASHBOARD,
      );
      return data;
    } catch (error) {
      throw toAdminDashboardApiError(error);
    }
  },

  async getStatuses(): Promise<AdminDashboardStatusesResponse> {
    try {
      const { data } = await authenticatedClient.get<AdminDashboardStatusesResponse>(
        ADMIN_DASHBOARD_ENDPOINTS.STATUSES,
      );
      return data;
    } catch (error) {
      throw toAdminDashboardApiError(error);
    }
  },

  async updateProjectStatus(id: string | number, statusId: number): Promise<void> {
    const payload = { status_id: statusId };

    try {
      await authenticatedClient.patch(ADMIN_DASHBOARD_ENDPOINTS.projectStatus(id), payload, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      throw toAdminDashboardApiError(error);
    }
  },
};
