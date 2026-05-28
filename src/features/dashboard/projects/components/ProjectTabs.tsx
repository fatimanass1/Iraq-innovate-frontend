"use client";

import { RevealItem, RevealStagger } from "@/shared/animations";
import { PROJECT_FILTER_TABS } from "@/features/dashboard/projects/constants/projects-content";
import { cn } from "@/shared/utils/utils";
import { PROJECTS_THEME as P } from "../constants/projects-theme";
import { cairo } from "@/features/dashboard/fonts";
import type { ProjectFilterTab } from "../types/project.types";

type ProjectTabsProps = {
  activeTab: ProjectFilterTab;
  onTabChange: (tab: ProjectFilterTab) => void;
  className?: string;
};

export function ProjectTabs({ activeTab, onTabChange, className }: ProjectTabsProps) {
  return (
    <RevealStagger
      className={cn(
        "mt-5 grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-2.5 md:grid-cols-4",
        className,
      )}
      dir="rtl"
      role="tablist"
      stagger={0.05}
      amount={0.2}
    >
      {PROJECT_FILTER_TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <RevealItem key={tab.id} as="div">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                cairo.className,
                "w-full min-w-0 whitespace-nowrap rounded-full px-2.5 py-1.5 text-center text-[11px] font-semibold transition-colors duration-150 sm:px-3 sm:py-2 sm:text-[12px] md:px-4 md:text-[13px]",
                isActive
                  ? "bg-[#010B18] text-white"
                  : "bg-white text-[rgba(1,11,24,0.55)] hover:text-[#010B18]",
              )}
              style={{
                boxShadow: isActive ? undefined : `0 0 0 1px ${P.dividerColor}`,
              }}
              aria-pressed={isActive}
            >
              {tab.labelAr}
            </button>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}
