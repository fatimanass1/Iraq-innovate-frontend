import { authApi } from "@/features/auth/api/authApi";
import { mapUserInformationToAdminProfile } from "../mappers/admin-settings.mapper";
import type { AdminSettingsProfile } from "../types/admin-settings.types";

export const adminSettingsService = {
  async getProfile(): Promise<AdminSettingsProfile> {
    const response = await authApi.getUserInformation();
    return mapUserInformationToAdminProfile(response);
  },
};
