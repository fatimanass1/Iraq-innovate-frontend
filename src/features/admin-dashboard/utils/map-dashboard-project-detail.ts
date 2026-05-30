import { mapApiProjectDetail } from "@/features/dashboard/projects/mappers/project.mapper";
import type { ApiProjectDetail } from "@/features/dashboard/projects/types/project-api.types";
import type { ProjectDetail } from "@/features/dashboard/projects/types/project.types";

/** Map a dashboard list/detail item when `GET /api/project/{id}/` is unavailable. */
export function mapDashboardProjectToDetail(raw: ApiProjectDetail): ProjectDetail {
  return mapApiProjectDetail({
    ...raw,
    description: raw.description ?? raw.summary ?? "",
    updated_at: raw.updated_at ?? raw.created_at,
    media: raw.media ?? null,
    attachments: raw.attachments ?? null,
    team_members: raw.team_members ?? null,
  });
}
