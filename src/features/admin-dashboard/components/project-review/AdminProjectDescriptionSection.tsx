"use client";

import { FileText } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_CONTENT } from "../../constants/admin-project-review-content";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";
import { AdminReviewEmptyState } from "./AdminReviewEmptyState";
import { AdminReviewSectionCard } from "./AdminReviewSectionCard";

type AdminProjectDescriptionSectionProps = {
  description: string;
};

export function AdminProjectDescriptionSection({ description }: AdminProjectDescriptionSectionProps) {
  return (
    <AdminReviewSectionCard
      title={ADMIN_PROJECT_REVIEW_CONTENT.description}
      icon={<FileText className="size-[18px]" style={{ color: T.primaryGreen }} strokeWidth={1.75} />}
    >
      {!description ? (
        <AdminReviewEmptyState message={ADMIN_PROJECT_REVIEW_CONTENT.emptyDescription} icon={FileText} />
      ) : (
        <p
          className={cn(cairo.className, "text-end text-[15px] font-normal leading-[26px]")}
          style={{ color: T.textSecondary }}
          lang="ar"
        >
          {description}
        </p>
      )}
    </AdminReviewSectionCard>
  );
}
