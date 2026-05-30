"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ArrowRight, Download, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { cn } from "@/shared/utils/utils";
import { ROUTES } from "@/shared/constants/routes";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import type { AdminProjectStatus } from "../../types/admin-projects.types";
import type { ProjectDetail } from "@/features/dashboard/projects/types/project.types";
import { AdminStatusBadge } from "../projects/AdminStatusBadge";

type AdminProjectHeroCardProps = {
  project: ProjectDetail;
  status: AdminProjectStatus;
  statusLabelAr: string;
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "؟";
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0] ?? ""}${parts[1][0] ?? ""}`;
}

export function AdminProjectHeroCard({ project, status, statusLabelAr }: AdminProjectHeroCardProps) {
  const handleShare = useCallback(async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: project.title, url });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success(ADMIN_PROJECT_REVIEW_CONTENT.shareCopied);
    } catch {
      toast.info(ADMIN_PROJECT_REVIEW_CONTENT.shareUnsupported);
    }
  }, [project.title]);

  const handleDownloadPdf = useCallback(() => {
    toast.info(ADMIN_PROJECT_REVIEW_CONTENT.pdfHint);
    window.print();
  }, []);

  return (
    <article
      dir="rtl"
      className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
      style={{
        borderRadius: T.heroRadius,
        backgroundColor: T.cardBg,
        border: `1px solid ${T.cardBorder}`,
        boxShadow: T.cardShadow,
      }}
    >
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <div
          className={cn(cairo.className, "flex shrink-0 items-center justify-center rounded-2xl text-[18px] font-bold")}
          style={{
            width: T.heroAvatarSize,
            height: T.heroAvatarSize,
            backgroundColor: "rgba(168, 207, 69, 0.22)",
            color: T.textPrimary,
          }}
        >
          {getInitials(project.owner.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-start gap-2.5">
            <h1
              className={cn(cairo.className, "font-bold text-[#010B18] text-[18px] leading-7 sm:text-[22px] sm:leading-[30px]")}
              style={{ letterSpacing: "-0.02em" }}
              lang="ar"
            >
              {project.title}
            </h1>
            <AdminStatusBadge status={status} label={statusLabelAr} />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-start gap-2">
            <span
              className={cn(cairo.className, "rounded-md px-2 py-0.5 text-[12px] font-medium")}
              style={{ backgroundColor: T.categoryChipBg, color: T.textMuted }}
              lang="ar"
            >
              {project.category.name}
            </span>
            <span className={cn(cairo.className, "text-[12px] font-medium")} style={{ color: T.textMuted }} lang="ar">
              {ADMIN_PROJECT_REVIEW_CONTENT.submissionDate}: {project.date}
            </span>
            <span className={cn(cairo.className, "text-[12px] font-medium")} style={{ color: T.textMuted }}>
              {ADMIN_PROJECT_REVIEW_CONTENT.projectId}: {project.id}
            </span>
          </div>

          <p className={cn(cairo.className, "mt-1.5 text-[13px] font-medium")} style={{ color: T.textSecondary }} lang="ar">
            {project.owner.name}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-start gap-2 sm:w-auto lg:shrink-0">
        <Link
          href={ROUTES.ADMIN_PROJECTS}
          className={cn(
            cairo.className,
            "inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-semibold transition hover:bg-[rgba(1,11,24,0.02)]",
          )}
          style={{ borderColor: T.cardBorder, color: T.textPrimary }}
        >
          <ArrowRight className="size-4" style={{ color: T.textMuted }} />
          {ADMIN_PROJECT_REVIEW_CONTENT.back}
        </Link>
        <button
          type="button"
          onClick={handleDownloadPdf}
          className={cn(
            cairo.className,
            "inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-[13px] font-semibold transition hover:bg-[rgba(1,11,24,0.02)]",
          )}
          style={{ borderColor: T.cardBorder, color: T.textPrimary }}
        >
          <Download className="size-4" style={{ color: T.textMuted }} />
          {ADMIN_PROJECT_REVIEW_CONTENT.downloadPdf}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className={cn(
            cairo.className,
            "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-[13px] font-bold transition hover:opacity-90",
          )}
          style={{ backgroundColor: T.primaryGreen, color: T.textPrimary }}
        >
          <Share2 className="size-4" />
          {ADMIN_PROJECT_REVIEW_CONTENT.share}
        </button>
      </div>
    </article>
  );
}
