"use client";

import Link from "next/link";
import { Calendar, ExternalLink, Globe, Mail, Shield, User } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectDetail } from "../types/project.types";
import { formatProjectDate } from "../utils/project.helpers";
import { ProjectDetailsStatusPill } from "./ProjectDetailsStatusPill";

type ProjectDetailsSidebarProps = {
  project: ProjectDetail;
};

function SidebarRow({
  icon: Icon,
  label,
  value,
  valueDir,
}: {
  icon: typeof User;
  label: string;
  value: string;
  valueDir?: "rtl" | "ltr";
}) {
  if (!value?.trim()) return null;

  return (
    <div
      className="flex items-start justify-between gap-3 rounded-2xl px-3.5 py-3"
      style={{
        backgroundColor: "rgba(248,250,243,0.9)",
        border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
      }}
    >
      <div className="min-w-0 flex-1 text-end">
        <p
          className={cn(cairo.className, "text-[11px] font-medium")}
          style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
        >
          {label}
        </p>
        <p
          className={cn(cairo.className, "mt-1 break-words text-[13px] font-semibold")}
          style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
          dir={valueDir}
        >
          {value}
        </p>
      </div>
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-xl"
        style={{
          backgroundColor: PROJECT_DETAILS_FIGMA.accentSoft,
          color: PROJECT_DETAILS_FIGMA.accentDark,
        }}
        aria-hidden="true"
      >
        <Icon className="size-4" />
      </span>
    </div>
  );
}

export function ProjectDetailsSidebar({ project }: ProjectDetailsSidebarProps) {
  return (
    <aside
      className="w-full min-w-0 p-5 sm:p-6"
      style={{
        backgroundColor: PROJECT_DETAILS_FIGMA.cardBg,
        borderRadius: PROJECT_DETAILS_FIGMA.cardRadius,
        boxShadow: PROJECT_DETAILS_FIGMA.shadowCard,
        border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
      }}
      dir="rtl"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="text-end">
          <p
            className={cn(cairo.className, "text-[14px] font-bold")}
            style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
          >
            {PROJECT_DETAILS_CONTENT.statusTitle}
          </p>
          <p
            className={cn(outfit.className, "mt-0.5 text-[11px] font-medium")}
            style={{ color: PROJECT_DETAILS_FIGMA.textMuted }}
          >
            {PROJECT_DETAILS_CONTENT.statusTitleEn}
          </p>
        </div>
        <Shield
          className="size-5 shrink-0"
          style={{ color: PROJECT_DETAILS_FIGMA.accentDark }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-4">
        <ProjectDetailsStatusPill status={project.status} size="lg" className="w-full justify-center" />
      </div>

      <div className="mt-5 space-y-3">
        <p
          className={cn(cairo.className, "text-[12px] font-bold")}
          style={{ color: PROJECT_DETAILS_FIGMA.textPrimary }}
        >
          {PROJECT_DETAILS_CONTENT.ownerTitle}
        </p>
        <SidebarRow icon={User} label={PROJECT_DETAILS_CONTENT.ownerTitle} value={project.owner.name} />
        <SidebarRow
          icon={Mail}
          label="البريد الإلكتروني"
          value={project.owner.email}
          valueDir="ltr"
        />
        <SidebarRow
          icon={Calendar}
          label={PROJECT_DETAILS_CONTENT.createdAt}
          value={formatProjectDate(project.createdAt)}
        />
        <SidebarRow
          icon={Calendar}
          label={PROJECT_DETAILS_CONTENT.updatedAt}
          value={formatProjectDate(project.updatedAt)}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {project.websiteUrl ? (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              outfit.className,
              "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl text-[13px] font-semibold transition-all hover:brightness-105",
            )}
            style={{
              backgroundColor: PROJECT_DETAILS_FIGMA.accent,
              color: PROJECT_DETAILS_FIGMA.textPrimary,
              boxShadow: `0 6px 22px ${PROJECT_DETAILS_FIGMA.accentGlow}`,
            }}
          >
            <Globe className="size-4" aria-hidden="true" />
            {PROJECT_DETAILS_CONTENT.visitWebsite}
            <ExternalLink className="size-3.5 opacity-60" aria-hidden="true" />
          </a>
        ) : null}

        <Link
          href={ROUTES.MY_PROJECTS}
          className={cn(
            cairo.className,
            "inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl text-[13px] font-semibold transition-colors",
          )}
          style={{
            backgroundColor: "rgba(220,229,203,0.35)",
            color: PROJECT_DETAILS_FIGMA.textPrimary,
            border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
          }}
        >
          {PROJECT_DETAILS_CONTENT.back}
        </Link>
      </div>
    </aside>
  );
}
