import { ProjectsApiError } from "../types/project.types";

export type ProjectDetailsErrorKind =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "network"
  | "unknown";

export function getProjectDetailsErrorKind(error: unknown): ProjectDetailsErrorKind {
  if (error instanceof ProjectsApiError) {
    if (error.status === 401) return "unauthorized";
    if (error.status === 403) return "forbidden";
    if (error.status === 404) return "not_found";
    if (!error.status) return "network";
  }

  if (error instanceof TypeError) {
    return "network";
  }

  return "unknown";
}

export function getProjectDetailsErrorMessage(error: unknown): string {
  if (error instanceof ProjectsApiError) {
    return error.message;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "تعذر تحميل تفاصيل المشروع. يرجى المحاولة مرة أخرى.";
}

export function parseProjectId(id: string | number): number | null {
  const parsed = typeof id === "number" ? id : Number.parseInt(String(id).trim(), 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}
