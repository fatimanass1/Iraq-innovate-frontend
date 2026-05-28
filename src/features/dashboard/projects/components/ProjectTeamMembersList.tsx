"use client";

import { ExternalLink, GraduationCap, Link2, Users } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectTeamMemberItem } from "../types/project.types";
import { DetailsEmptyState } from "./DetailsEmptyState";
import { ProjectDetailsSectionCard } from "./ProjectDetailsSectionCard";

type ProjectTeamMembersListProps = {
  members: ProjectTeamMemberItem[];
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

export function ProjectTeamMembersList({ members }: ProjectTeamMembersListProps) {
  return (
    <ProjectDetailsSectionCard
      title={PROJECT_DETAILS_CONTENT.teamTitle}
      titleEn={PROJECT_DETAILS_CONTENT.teamTitleEn}
    >
      {members.length === 0 ? (
        <DetailsEmptyState message={PROJECT_DETAILS_CONTENT.emptyTeamMembers} icon={Users} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {members.map((member) => (
            <article
              key={member.id}
              className="p-4 transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(1,11,24,0.07)]"
              style={{
                borderRadius: 16,
                border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
                backgroundColor: "rgba(248,250,243,0.65)",
              }}
              dir="rtl"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    outfit.className,
                    "flex size-11 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold",
                  )}
                  style={{
                    backgroundColor: PROJECT_DETAILS_FIGMA.accentSoft,
                    color: PROJECT_DETAILS_FIGMA.accentDark,
                  }}
                >
                  {getInitials(member.name)}
                </span>
                <div className="min-w-0 flex-1 text-end">
                  <h3 className={cn(cairo.className, "text-[15px] font-bold")}>
                    {member.name}
                  </h3>
                  {member.role ? (
                    <p
                      className={cn(outfit.className, "mt-1 text-[11px] font-semibold uppercase")}
                      style={{ color: PROJECT_DETAILS_FIGMA.accentDark }}
                    >
                      {member.role}
                    </p>
                  ) : null}
                  {member.college ? (
                    <p
                      className={cn(
                        cairo.className,
                        "mt-2 flex items-start justify-end gap-1.5 text-[12px] leading-6",
                      )}
                      style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
                    >
                      <span className="min-w-0 break-words">{member.college}</span>
                      <GraduationCap className="mt-0.5 size-3.5 shrink-0" />
                    </p>
                  ) : null}
                </div>
              </div>

              {member.linkedinUrl ? (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    outfit.className,
                    "mt-4 inline-flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-xl text-[12px] font-semibold",
                  )}
                  style={{
                    border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
                    backgroundColor: PROJECT_DETAILS_FIGMA.cardBg,
                    color: PROJECT_DETAILS_FIGMA.textPrimary,
                  }}
                >
                  <Link2 className="size-3.5 text-[#0A66C2]" />
                  {PROJECT_DETAILS_CONTENT.linkedIn}
                  <ExternalLink className="size-3 opacity-50" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </ProjectDetailsSectionCard>
  );
}
