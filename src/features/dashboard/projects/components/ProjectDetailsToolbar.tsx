"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectDetail } from "../types/project.types";
import { formatProjectDate } from "../utils/project.helpers";
import { ProjectDetailsStatusPill } from "./ProjectDetailsStatusPill";

type ProjectDetailsToolbarProps = {
  project: ProjectDetail;
};

export function ProjectDetailsToolbar({ project }: ProjectDetailsToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:gap-4" dir="rtl">
      <div className="flex flex-col gap-3 min-[480px]:flex-row min-[480px]:items-start min-[480px]:justify-between">
        <div className="flex min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
          <Link
            href={ROUTES.MY_PROJECTS}
            className={cn(
              cairo.className,
              "inline-flex min-h-[40px] shrink-0 items-center gap-2 rounded-xl px-3.5 text-[12px] font-semibold transition-colors sm:min-h-[42px] sm:px-4 sm:text-[13px]",
            )}
            style={{
              border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
              color: PROJECT_DETAILS_FIGMA.textPrimary,
              backgroundColor: PROJECT_DETAILS_FIGMA.cardBg,
            }}
          >
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
            {PROJECT_DETAILS_CONTENT.back}
          </Link>

          <div className="min-w-0 flex-1 text-end">
            <h1
              className={cn(
                cairo.className,
                "text-[16px] font-bold leading-tight sm:text-[18px] md:text-[20px]",
              )}
              style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
            >
              {PROJECT_DETAILS_CONTENT.pageTitleAr}
            </h1>
            <p
              className={cn(outfit.className, "mt-0.5 text-[11px] font-medium sm:text-[12px]")}
              style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
            >
              {PROJECT_DETAILS_CONTENT.pageTitleEn}
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2 min-[480px]:items-end sm:max-w-[50%]">
          <ProjectDetailsStatusPill
            status={project.status}
            size="lg"
            className="w-full justify-center min-[480px]:w-auto min-[480px]:justify-start"
          />
          <p
            className={cn(
              cairo.className,
              "text-center text-[11px] font-medium min-[480px]:text-end sm:text-[12px] md:text-[13px]",
            )}
            style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
          >
            {PROJECT_DETAILS_CONTENT.submissionDate}:{" "}
            <span className="font-semibold" style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}>
              {formatProjectDate(project.createdAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
