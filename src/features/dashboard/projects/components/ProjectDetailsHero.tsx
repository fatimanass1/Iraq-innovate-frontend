"use client";

import { Cpu } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectDetail } from "../types/project.types";

type ProjectDetailsHeroProps = {
  project: ProjectDetail;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`.toUpperCase();
}

function HeroStat({
  label,
  value,
  align = "end",
}: {
  label: string;
  value: string | number;
  align?: "center" | "end";
}) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-xl px-2 py-2.5 sm:rounded-none sm:bg-transparent sm:p-0",
        align === "center" ? "text-center" : "text-end",
      )}
      style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
    >
      <p
        className={cn(outfit.className, "text-[17px] font-bold leading-none sm:text-[20px]")}
        style={{ color: PROJECT_DETAILS_FIGMA.textOnDark }}
      >
        {value}
      </p>
      <p
        className={cn(
          cairo.className,
          "mt-1.5 text-[10px] font-medium leading-snug sm:text-[12px]",
        )}
        style={{ color: PROJECT_DETAILS_FIGMA.textOnDarkMuted }}
      >
        {label}
      </p>
    </div>
  );
}

export function ProjectDetailsHero({ project }: ProjectDetailsHeroProps) {
  const fileCount = project.attachments.length + project.media.length;
  const excerpt = project.summary.trim() || project.description.trim();

  return (
    <article
      className="relative mt-4 overflow-hidden p-4 sm:mt-5 sm:p-6 lg:p-8"
      style={{
        backgroundColor: PROJECT_DETAILS_FIGMA.heroBg,
        borderRadius: PROJECT_DETAILS_FIGMA.heroRadius,
        boxShadow: PROJECT_DETAILS_FIGMA.shadowHero,
      }}
      dir="rtl"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:gap-8">
        <div
          className="flex size-12 shrink-0 items-center justify-center self-end sm:size-14 lg:size-16"
          style={{
            borderRadius: 16,
            backgroundColor: PROJECT_DETAILS_FIGMA.accent,
            boxShadow: `0 8px 28px ${PROJECT_DETAILS_FIGMA.accentGlow}`,
          }}
          aria-hidden="true"
        >
          <Cpu className="size-6 text-[#010B18] sm:size-7 lg:size-8" strokeWidth={1.75} />
        </div>

        <div className="min-w-0 flex-1">
          <span
            className={cn(
              cairo.className,
              "inline-flex max-w-full items-center rounded-full px-2.5 py-1 text-[10px] font-semibold sm:px-3 sm:text-[12px]",
            )}
            style={{
              border: `1px solid ${PROJECT_DETAILS_FIGMA.accent}`,
              color: PROJECT_DETAILS_FIGMA.accent,
              backgroundColor: "rgba(168,207,69,0.08)",
            }}
          >
            {project.category.name}
          </span>

          <h2
            className={cn(
              cairo.className,
              "mt-3 break-words text-[20px] font-bold leading-[1.35] sm:mt-4 sm:text-[24px] lg:text-[28px]",
            )}
            style={{ color: PROJECT_DETAILS_FIGMA.textOnDark }}
          >
            {project.title}
          </h2>

          {excerpt ? (
            <p
              className={cn(
                cairo.className,
                "mt-2 text-[12px] leading-6 sm:mt-3 sm:text-[14px] sm:leading-7",
              )}
              style={{ color: PROJECT_DETAILS_FIGMA.textOnDarkMuted }}
            >
              {excerpt}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className="mt-5 border-t pt-5 sm:mt-6 sm:pt-6 lg:grid lg:grid-cols-4 lg:items-end lg:gap-6"
        style={{ borderColor: PROJECT_DETAILS_FIGMA.heroDivider }}
      >
        <div className="flex min-w-0 items-center justify-end gap-3 rounded-2xl bg-white/5 p-3 sm:bg-transparent sm:p-0 lg:rounded-none">
          <div className="min-w-0 flex-1 text-end">
            <p
              className={cn(cairo.className, "break-words text-[13px] font-bold sm:text-[14px]")}
              style={{ color: PROJECT_DETAILS_FIGMA.textOnDark }}
            >
              {project.owner.name}
            </p>
            <p
              className={cn(
                cairo.className,
                "mt-1 break-all text-[11px] sm:text-[12px]",
              )}
              style={{ color: PROJECT_DETAILS_FIGMA.textOnDarkMuted }}
              dir="ltr"
            >
              {project.owner.email}
            </p>
          </div>
          <span
            className={cn(
              outfit.className,
              "flex size-10 shrink-0 items-center justify-center rounded-full text-[11px] font-bold sm:size-11 sm:text-[13px]",
            )}
            style={{
              backgroundColor: PROJECT_DETAILS_FIGMA.accentSoft,
              color: PROJECT_DETAILS_FIGMA.accent,
            }}
          >
            {getInitials(project.owner.name)}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3 lg:mt-0 lg:contents">
          <HeroStat
            label={PROJECT_DETAILS_CONTENT.teamCount}
            value={project.teamMembers.length}
            align="center"
          />
          <HeroStat
            label={PROJECT_DETAILS_CONTENT.filesCount}
            value={fileCount}
            align="center"
          />
          <HeroStat
            label={PROJECT_DETAILS_CONTENT.projectNumber}
            value={`#${project.id}`}
            align="center"
          />
        </div>
      </div>
    </article>
  );
}
