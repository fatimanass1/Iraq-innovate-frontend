"use client";

import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { DASHBOARD_ACTIONS } from "@/features/dashboard/constants/dashboard-content";
import { getCategoryColor } from "@/features/dashboard/constants/project-status";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { cn } from "@/shared/utils/utils";
import type { Project } from "../types/project.types";
import { ProjectStatusBadge } from "./ProjectStatusBadge";

type ProjectCardProps = {
  project: Project;
  onViewDetails?: (projectId: string) => void;
  className?: string;
};

export function ProjectCard({
  project,
  onViewDetails,
  className,
}: ProjectCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(project.id);
      return;
    }
    router.push(ROUTES.projectDetails(project.id));
  };

  return (
    <article
      className={cn(
        "flex min-h-[168px] flex-col rounded-3xl bg-white px-4 py-3.5",
        "shadow-[0_2px_14px_rgba(1,11,24,0.05)] transition-shadow duration-200",
        "hover:shadow-[0_4px_18px_rgba(1,11,24,0.07)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1 text-end">
          <h3
            className={cn(
              outfit.className,
              "truncate text-[13px] font-semibold leading-snug text-[#010B18]",
            )}
          >
            {project.title}
          </h3>
          {project.summary ? (
            <p
              className={cn(
                cairo.className,
                "mt-0.5 line-clamp-2 text-[11px] font-medium text-[rgba(1,11,24,0.45)]",
              )}
              lang="ar"
            >
              {project.summary}
            </p>
          ) : null}
        </div>

        <ProjectStatusBadge status={project.status} />
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[rgba(1,11,24,0.4)]">
          <Clock3 className="size-3 stroke-[1.75]" aria-hidden="true" />
          <span className={cn(outfit.className, "text-[10px] font-medium")}>
            {project.date}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={cn("size-1.5 shrink-0 rounded-full", getCategoryColor(project.category))}
            aria-hidden="true"
          />
          <span
            className={cn(
              outfit.className,
              "text-[10px] font-medium text-[rgba(1,11,24,0.5)]",
            )}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="mt-auto pt-3.5">
        <button
          type="button"
          onClick={handleViewDetails}
          className={cn(
            outfit.className,
            "flex h-[38px] w-full items-center justify-center rounded-2xl bg-[#010B18] text-[12px] font-semibold text-white",
            "transition-colors duration-150 hover:bg-[rgba(1,11,24,0.9)]",
          )}
        >
          {DASHBOARD_ACTIONS.viewDetails}
        </button>
      </div>
    </article>
  );
}
