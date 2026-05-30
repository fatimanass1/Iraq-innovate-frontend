import { AdminDashboardApiError } from "../api/adminDashboardApi";

/**
 * Temporary testing mode: do not block admin UI when backend returns 403.
 *
 * TODO: Remove when backend exposes role/is_admin/user_type and enforces admin access correctly.
 */
export const TEMP_ADMIN_SKIP_FORBIDDEN_ERRORS = true;

export function isAdminForbiddenError(error: unknown): boolean {
  return error instanceof AdminDashboardApiError && error.status === 403;
}

export function isProjectsForbiddenError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    (error as { status?: number }).status === 403
  );
}
