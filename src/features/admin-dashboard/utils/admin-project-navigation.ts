import { ROUTES } from "@/shared/constants/routes";
import { formatProjectDetailRequestUrl, resolveApiProjectId } from "./project-id";

export type AdminProjectNavSource =
  | "projects-table"
  | "projects-table-mobile"
  | "quick-review"
  | "quick-review-cta"
  | "quick-review-details"
  | "quick-review-title"
  | "evaluations-table"
  | "activity"
  | "notifications";

/**
 * Single source of truth for admin project details navigation.
 * Always uses the numeric `project.id` from the API — never index, status id, or list position.
 */
export function getAdminProjectDetailsHref(
  projectId: unknown,
  source: AdminProjectNavSource,
): string | null {
  const parsed = resolveApiProjectId(projectId);

  if (process.env.NODE_ENV === "development") {
    console.log(`[AdminNav:${source}] raw project.id`, projectId, "→ parsed", parsed);
  }

  if (!parsed) {
    console.warn(
      `[AdminNav:${source}] Invalid project id — navigation blocked. Expected API project.id, received:`,
      projectId,
    );
    return null;
  }

  const href = ROUTES.adminProjectDetails(parsed);

  if (process.env.NODE_ENV === "development") {
    console.log(`[AdminNav:${source}] href`, href, "→", formatProjectDetailRequestUrl(parsed));
  }

  return href;
}

export function logAdminProjectDetailsOpen(
  source: AdminProjectNavSource,
  projectId: unknown,
  href: string | null,
) {
  const parsed = resolveApiProjectId(projectId);
  console.log(`[AdminNav:${source}] navigate`, {
    rawProjectId: projectId,
    parsedProjectId: parsed,
    href,
    requestUrl: parsed ? formatProjectDetailRequestUrl(parsed) : null,
  });
}
