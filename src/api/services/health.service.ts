import { ENDPOINTS } from "@/api/core/endpoints";
import { publicClient } from "@/api/client/public";
import type { ApiResponse } from "@/api/core/types";

export interface HealthStatus {
  status: "ok" | "degraded" | "down";
  timestamp: string;
}

export const healthService = {
  async check(): Promise<HealthStatus> {
    const { data } = await publicClient.get<ApiResponse<HealthStatus>>(
      ENDPOINTS.HEALTH.CHECK,
    );
    return data.data;
  },
};
