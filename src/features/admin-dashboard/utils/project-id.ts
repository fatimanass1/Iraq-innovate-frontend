import { parseProjectId } from "@/features/dashboard/projects/hooks/project.errors";

/** Normalize `project.id` from any admin/dashboard API payload. */
export function resolveApiProjectId(raw: unknown): number | null {
  if (raw == null) return null;
  return parseProjectId(raw as string | number);
}

export function resolveApiProjectIdFromProject(project: { id: unknown }): number | null {
  return resolveApiProjectId(project.id);
}

export function formatProjectDetailRequestUrl(projectId: number): string {
  return `/api/project/${projectId}/`;
}
