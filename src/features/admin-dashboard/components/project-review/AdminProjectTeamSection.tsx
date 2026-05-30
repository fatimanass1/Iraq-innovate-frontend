"use client";

import { ExternalLink, Users } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import type { ProjectTeamMemberItem } from "@/features/dashboard/projects/types/project.types";
import { AdminReviewEmptyState } from "./AdminReviewEmptyState";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectTeamSectionProps = {
  members: ProjectTeamMemberItem[];
};

function getInitials(name: string): string {
  return name.trim().slice(0, 1) || "؟";
}

export function AdminProjectTeamSection({ members }: AdminProjectTeamSectionProps) {
  return (
    <AdminReviewSectionCard title={ADMIN_PROJECT_REVIEW_CONTENT.team} variant="sidebar">
      {members.length === 0 ? (
        <AdminReviewEmptyState message={ADMIN_PROJECT_REVIEW_CONTENT.emptyTeam} icon={Users} />
      ) : (
        <ul className="flex flex-col" style={{ gap: 12 }}>
          {members.map((member) => (
            <li key={member.id}>
              <article
                className="flex items-start justify-end gap-3 p-3 transition hover:bg-[rgba(1,11,24,0.02)]"
                style={{
                  borderRadius: 16,
                  border: `1px solid ${T.cardBorder}`,
                  backgroundColor: T.innerCardBg,
                }}
              >
                <div className="min-w-0 flex-1 text-end">
                  <p className={cn(cairo.className, "text-[14px] font-bold text-[#010B18]")} lang="ar">
                    {member.name}
                  </p>
                  {member.role ? (
                    <p className={cn(cairo.className, "mt-0.5 text-[11px] font-medium")} style={{ color: T.textLabel }} lang="ar">
                      {member.role}
                    </p>
                  ) : null}
                  {member.college ? (
                    <p className={cn(cairo.className, "mt-1 text-[12px]")} style={{ color: T.textMuted }} lang="ar">
                      {member.college}
                    </p>
                  ) : null}
                  {member.linkedinUrl ? (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        cairo.className,
                        "mt-2 inline-flex items-center gap-1 text-[11px] font-semibold hover:underline",
                      )}
                      style={{ color: "#0A66C2" }}
                    >
                      {ADMIN_PROJECT_REVIEW_CONTENT.linkedIn}
                      <ExternalLink className="size-3" />
                    </a>
                  ) : null}
                </div>
                <div
                  className={cn(cairo.className, "flex size-10 shrink-0 items-center justify-center rounded-xl text-[14px] font-bold")}
                  style={{
                    backgroundColor: "rgba(168, 207, 69, 0.18)",
                    color: T.textPrimary,
                  }}
                >
                  {getInitials(member.name)}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </AdminReviewSectionCard>
  );
}
