"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";

type ProjectDetailsSectionCardProps = {
  title: string;
  titleEn?: string;
  children: ReactNode;
  className?: string;
};

export function ProjectDetailsSectionCard({
  title,
  titleEn,
  children,
  className,
}: ProjectDetailsSectionCardProps) {
  return (
    <section
      className={cn(
        "w-full min-w-0 bg-white p-5 sm:p-6",
        className,
      )}
      style={{
        borderRadius: PROJECT_DETAILS_FIGMA.cardRadius,
        boxShadow: PROJECT_DETAILS_FIGMA.shadowCard,
        border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
      }}
      dir="rtl"
    >
      <header className="relative mb-5 flex items-start justify-end gap-3 pe-4">
        <span
          className="absolute end-0 top-1 h-7 w-1 rounded-full"
          style={{ backgroundColor: PROJECT_DETAILS_FIGMA.accent }}
          aria-hidden="true"
        />
        <div className="text-end">
          <h2
            className={cn(cairo.className, "text-[16px] font-bold sm:text-[17px]")}
            style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
          >
            {title}
          </h2>
          {titleEn ? (
            <p
              className={cn(outfit.className, "mt-1 text-[11px] font-medium")}
              style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
            >
              {titleEn}
            </p>
          ) : null}
        </div>
      </header>
      {children}
    </section>
  );
}
