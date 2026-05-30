"use client";

import { Link2, Mail } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import type { ProjectDetail } from "@/features/dashboard/projects/types/project.types";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectOwnerSectionProps = {
  project: ProjectDetail;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`;
}

function resolveOwnerMeta(project: ProjectDetail) {
  const ownerMember = project.teamMembers.find(
    (member) => member.name.trim() === project.owner.name.trim(),
  );
  const college = ownerMember?.college || project.teamMembers.find((m) => m.college)?.college || "";
  const linkedinUrl = ownerMember?.linkedinUrl || "";
  return { college, linkedinUrl };
}

export function AdminProjectOwnerSection({ project }: AdminProjectOwnerSectionProps) {
  const { college, linkedinUrl } = resolveOwnerMeta(project);

  return (
    <AdminReviewSectionCard title={ADMIN_PROJECT_REVIEW_CONTENT.owner} variant="sidebar">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-end gap-3">
          <div className="min-w-0 flex-1 text-end">
            <p
              className={cn(cairo.className, "font-bold text-[#010B18]")}
              style={{ fontSize: T.ownerNameSize, lineHeight: `${T.ownerNameLineHeight}px` }}
              lang="ar"
            >
              {project.owner.name}
            </p>
            {project.owner.email ? (
              <p className={cn(cairo.className, "mt-1 text-[12px]")} style={{ color: T.textMuted }} dir="ltr">
                {project.owner.email}
              </p>
            ) : null}
          </div>
          <div
            className={cn(cairo.className, "flex size-12 shrink-0 items-center justify-center rounded-2xl text-[16px] font-bold")}
            style={{
              backgroundColor: "rgba(168, 207, 69, 0.2)",
              color: T.textPrimary,
            }}
          >
            {getInitials(project.owner.name)}
          </div>
        </div>

        {college ? (
          <div className="text-end">
            <p className={cn(cairo.className, "text-[11px] font-bold")} style={{ color: T.textLabel }} lang="ar">
              {ADMIN_PROJECT_REVIEW_CONTENT.university}
            </p>
            <p className={cn(cairo.className, "mt-0.5 text-[13px] font-medium")} style={{ color: T.textSecondary }} lang="ar">
              {college}
            </p>
          </div>
        ) : null}

        <div className="flex items-center justify-end gap-2">
          {project.owner.email ? (
            <a
              href={`mailto:${project.owner.email}`}
              className="flex size-10 items-center justify-center rounded-xl transition hover:bg-[rgba(1,11,24,0.03)]"
              style={{ border: `1px solid ${T.cardBorder}` }}
              aria-label={ADMIN_PROJECT_REVIEW_CONTENT.email}
            >
              <Mail className="size-4" style={{ color: T.textMuted }} strokeWidth={1.75} />
            </a>
          ) : null}
          {linkedinUrl ? (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-10 items-center justify-center rounded-xl transition hover:bg-[rgba(1,11,24,0.03)]"
              style={{ border: `1px solid ${T.cardBorder}` }}
              aria-label={ADMIN_PROJECT_REVIEW_CONTENT.linkedIn}
            >
              <Link2 className="size-4 text-[#0A66C2]" strokeWidth={1.75} />
            </a>
          ) : null}
        </div>
      </div>
    </AdminReviewSectionCard>
  );
}
