"use client";

import { AlignLeft } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectSummarySectionProps = {
  summary: string;
};

export function AdminProjectSummarySection({ summary }: AdminProjectSummarySectionProps) {
  if (!summary) return null;

  return (
    <AdminReviewSectionCard
      title={ADMIN_PROJECT_REVIEW_CONTENT.summary}
      icon={<AlignLeft className="size-[18px]" style={{ color: T.primaryGreen }} strokeWidth={1.75} />}
    >
      <p
        className={cn(cairo.className, "text-end text-[14px] leading-6")}
        style={{
          color: T.textSecondary,
          padding: T.summaryBoxPadding,
          borderRadius: T.summaryBoxRadius,
          backgroundColor: T.summaryBoxBg,
          border: `1px solid ${T.summaryBoxBorder}`,
        }}
        lang="ar"
      >
        {summary}
      </p>
    </AdminReviewSectionCard>
  );
}
