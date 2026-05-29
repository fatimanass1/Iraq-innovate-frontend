"use client";

import { NewProjectButton } from "@/features/dashboard/components/NewProjectButton";
import { useProtectedNavigation } from "@/features/auth/hooks/useProtectedNavigation";
import { cn } from "@/shared/utils/utils";
import { PROJECTS_THEME as P } from "../constants/projects-theme";
import { ProjectTabs } from "./ProjectTabs";
import type { ProjectFilterTab } from "../types/project.types";

type ProjectsHeaderProps = {
  activeTab: ProjectFilterTab;
  onTabChange: (tab: ProjectFilterTab) => void;
  className?: string;
};

export function ProjectsHeader({
  activeTab,
  onTabChange,
  className,
}: ProjectsHeaderProps) {
  const { navigateToProjectSubmit } = useProtectedNavigation();

  return (
    <section
      className={cn("border-b", className)}
      style={{
        borderColor: P.dividerColor,
        paddingTop: P.introPaddingTop,
        paddingBottom: P.introPaddingBottom,
      }}
    >
      <div className="relative min-h-[40px]">
        <NewProjectButton
          className="absolute left-0 top-0 sm:left-0"
          onClick={navigateToProjectSubmit}
        />
      </div>

      <ProjectTabs activeTab={activeTab} onTabChange={onTabChange} />
    </section>
  );
}
