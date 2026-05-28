"use client";

import { useCurrentUser } from "../hooks/useCurrentUser";

/**
 * Loads authenticated user profile on app mount / after login.
 * Renders nothing — keeps auth store in sync with GET /api/user/information/.
 */
export function AuthUserBootstrap() {
  useCurrentUser();
  return null;
}
