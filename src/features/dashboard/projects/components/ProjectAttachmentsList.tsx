"use client";

import { Calendar, Download, FileText } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectAttachmentItem } from "../types/project.types";
import { formatProjectDate } from "../utils/project.helpers";
import { DetailsEmptyState } from "./DetailsEmptyState";
import { ProjectDetailsSectionCard } from "./ProjectDetailsSectionCard";

type ProjectAttachmentsListProps = {
  items: ProjectAttachmentItem[];
};

export function ProjectAttachmentsList({ items }: ProjectAttachmentsListProps) {
  return (
    <ProjectDetailsSectionCard
      title={PROJECT_DETAILS_CONTENT.attachmentsTitle}
      titleEn={PROJECT_DETAILS_CONTENT.attachmentsTitleEn}
    >
      {items.length === 0 ? (
        <DetailsEmptyState message={PROJECT_DETAILS_CONTENT.emptyAttachments} icon={FileText} />
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((attachment) => (
            <li key={attachment.id}>
              <article
                className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderRadius: 16,
                  border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
                  backgroundColor: "rgba(248,250,243,0.65)",
                }}
                dir="rtl"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span
                    className="flex size-11 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: PROJECT_DETAILS_FIGMA.accentSoft,
                      color: PROJECT_DETAILS_FIGMA.accentDark,
                    }}
                  >
                    <FileText className="size-5" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 text-end">
                    <p className={cn(cairo.className, "break-words text-[14px] font-bold")}>
                      {attachment.label}
                    </p>
                    <p
                      className={cn(
                        cairo.className,
                        "mt-1 flex items-center justify-end gap-1.5 text-[12px]",
                      )}
                      style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
                    >
                      <Calendar className="size-3.5" />
                      {formatProjectDate(attachment.createdAt)}
                    </p>
                  </div>
                </div>

                {attachment.fileUrl ? (
                  <a
                    href={attachment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className={cn(
                      outfit.className,
                      "inline-flex min-h-[44px] w-full shrink-0 items-center justify-center gap-2 rounded-2xl text-[12px] font-semibold transition-all hover:brightness-105 sm:w-auto sm:min-w-[148px]",
                    )}
                    style={{
                      backgroundColor: PROJECT_DETAILS_FIGMA.accent,
                      color: PROJECT_DETAILS_FIGMA.textPrimary,
                      boxShadow: `0 4px 16px ${PROJECT_DETAILS_FIGMA.accentGlow}`,
                    }}
                  >
                    <Download className="size-4" />
                    {PROJECT_DETAILS_CONTENT.download}
                  </a>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      )}
    </ProjectDetailsSectionCard>
  );
}
