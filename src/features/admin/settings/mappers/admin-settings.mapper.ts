import type { UserInformationResponse } from "@/features/auth/types/auth.types";
import type { AdminSettingsProfile } from "../types/admin-settings.types";

export function mapUserInformationToAdminProfile(
  response: UserInformationResponse,
): AdminSettingsProfile {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    phoneNumber: response.phone_number,
    organization: response.organization,
  };
}
