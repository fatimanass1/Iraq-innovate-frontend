import { userService } from "@/features/auth/services/userService";
import {
  mapAuthUserToSettingsProfile,
  mapSettingsFormToUpdateRequest,
} from "../mappers/settings.mapper";
import type { SettingsFormValues, SettingsProfile } from "../types/settings.types";

/** Business logic — settings profile from real user API. */
export const settingsService = {
  async getProfile(): Promise<SettingsProfile> {
    const user = await userService.fetchCurrentUser();
    return mapAuthUserToSettingsProfile(user);
  },

  async updateProfile(values: SettingsFormValues): Promise<SettingsProfile> {
    const payload = mapSettingsFormToUpdateRequest(values);
    const user = await userService.updateCurrentUser(payload);
    return mapAuthUserToSettingsProfile(user);
  },
};
