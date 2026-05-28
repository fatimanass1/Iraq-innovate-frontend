import type { AuthUser } from "../types/auth.types";
import type { UserInformationResponse } from "../types/auth.types";

export function getUserInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function mapApiUserToAuthUser(apiUser: UserInformationResponse): AuthUser {
  return {
    id: apiUser.id,
    name: apiUser.name,
    email: apiUser.email,
    phone_number: apiUser.phone_number,
    organization: apiUser.organization,
    news_letter_subscription: apiUser.news_letter_subscription,
  };
}
