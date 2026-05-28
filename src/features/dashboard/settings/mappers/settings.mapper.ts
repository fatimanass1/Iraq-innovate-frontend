import type { AuthUser, UpdateUserRequest } from "@/features/auth/types/auth.types";
import { getUserInitials } from "@/features/auth/utils/user.helpers";
import type { SettingsFormValues, SettingsProfile } from "../types/settings.types";

export function mapAuthUserToSettingsProfile(user: AuthUser): SettingsProfile {
  const fullName = user.name?.trim() || "";
  const email = user.email?.trim() || "";

  return {
    id: String(user.id ?? ""),
    fullName,
    email,
    phoneNumber: user.phone_number?.trim() || "",
    organization: user.organization?.trim() || "—",
    displayEmail: email,
    newsLetterSubscription: user.news_letter_subscription ?? false,
    initials: getUserInitials(fullName),
  };
}

export function mapSettingsFormToUpdateRequest(
  values: SettingsFormValues,
): UpdateUserRequest {
  return {
    name: values.fullName.trim(),
    email: values.email.trim(),
    phone_number: values.phoneNumber.trim(),
    news_letter_subscription: values.newsLetterSubscription,
  };
}
