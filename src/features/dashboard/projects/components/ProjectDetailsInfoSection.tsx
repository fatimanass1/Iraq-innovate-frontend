"use client";

import { cn } from "@/shared/utils/utils";
import { cairo } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectDetail } from "../types/project.types";
import { ProjectDetailsSectionCard } from "./ProjectDetailsSectionCard";

type ProjectDetailsInfoSectionProps = {
  project: ProjectDetail;
};

function InfoField({
  label,
  value,
  fullWidth,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div
      className={cn(
        "py-4",
        fullWidth ? "col-span-1 sm:col-span-2" : "min-w-0",
      )}
      style={{ borderBottom: `1px solid ${PROJECT_DETAILS_FIGMA.divider}` }}
    >
      <p
        className={cn(cairo.className, "text-[12px] font-medium")}
        style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
      >
        {label}
      </p>
      <p
        className={cn(
          cairo.className,
          "mt-2 break-words text-[14px] font-semibold leading-7 sm:text-[15px]",
          fullWidth && "whitespace-pre-wrap font-medium",
        )}
        style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
      >
        {value?.trim() || "—"}
      </p>
    </div>
  );
}

export function ProjectDetailsInfoSection({ project }: ProjectDetailsInfoSectionProps) {
  return (
    <ProjectDetailsSectionCard
      title={PROJECT_DETAILS_CONTENT.infoTitle}
      titleEn={PROJECT_DETAILS_CONTENT.infoTitleEn}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <InfoField label={PROJECT_DETAILS_CONTENT.projectName} value={project.title} />
        <InfoField label={PROJECT_DETAILS_CONTENT.category} value={project.category.name} />
        <InfoField
          label={PROJECT_DETAILS_CONTENT.description}
          value={project.description.trim() || PROJECT_DETAILS_CONTENT.emptyDescription}
          fullWidth
        />
        <InfoField
          label={PROJECT_DETAILS_CONTENT.summary}
          value={project.summary.trim() || PROJECT_DETAILS_CONTENT.emptySummary}
          fullWidth
        />
      </div>
    </ProjectDetailsSectionCard>
  );
}
