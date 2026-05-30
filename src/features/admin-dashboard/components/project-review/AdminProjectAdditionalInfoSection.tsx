"use client";

import { ExternalLink, Info } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { formatProjectDate } from "@/features/dashboard/projects/utils/project.helpers";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import type { ProjectDetail } from "@/features/dashboard/projects/types/project.types";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectAdditionalInfoSectionProps = {
  project: ProjectDetail;
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-end gap-1 border-b py-3 last:border-b-0" style={{ borderColor: T.dividerLight }}>
      <span className={cn(cairo.className, "text-[11px] font-bold")} style={{ color: T.textLabel }} lang="ar">
        {label}
      </span>
      <span className={cn(cairo.className, "text-[13px] font-semibold text-[#010B18]")} lang="ar">
        {value}
      </span>
    </div>
  );
}

export function AdminProjectAdditionalInfoSection({ project }: AdminProjectAdditionalInfoSectionProps) {
  const ownerCollege =
    project.teamMembers.find((member) => member.name.trim() === project.owner.name.trim())?.college ||
    project.teamMembers.find((member) => member.college)?.college ||
    "—";

  return (
    <AdminReviewSectionCard
      title={ADMIN_PROJECT_REVIEW_CONTENT.additionalInfo}
      icon={<Info className="size-[18px]" style={{ color: T.primaryGreen }} strokeWidth={1.75} />}
      variant="sidebar"
    >
      <div className="flex flex-col">
        <InfoRow label={ADMIN_PROJECT_REVIEW_CONTENT.projectId} value={String(project.id)} />
        <InfoRow label={ADMIN_PROJECT_REVIEW_CONTENT.submissionDate} value={project.date} />
        {project.updatedAt ? (
          <InfoRow
            label={ADMIN_PROJECT_REVIEW_CONTENT.lastUpdated}
            value={formatProjectDate(project.updatedAt)}
          />
        ) : null}
        <InfoRow label={ADMIN_PROJECT_REVIEW_CONTENT.university} value={ownerCollege} />
      </div>

      {project.websiteUrl ? (
        <a
          href={project.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            cairo.className,
            "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-[12px] font-semibold transition hover:bg-[rgba(1,11,24,0.02)]",
          )}
          style={{ borderColor: T.cardBorder, color: T.primaryGreen }}
          dir="ltr"
        >
          {project.websiteUrl}
          <ExternalLink className="size-3.5 shrink-0" />
        </a>
      ) : null}
    </AdminReviewSectionCard>
  );
}
