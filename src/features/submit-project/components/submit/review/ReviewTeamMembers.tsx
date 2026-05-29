"use client";

import { cn } from "@/shared/utils/utils";
import {
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../../../constants/review-submission";
import { submitMono, submitOutfit } from "../../../utils/fonts";
import type { TeamMemberDraft } from "../../../types/wizard.types";

type ReviewTeamMembersProps = {
  members: TeamMemberDraft[];
  emptyLabel?: string;
};

export function ReviewTeamMembers({
  members,
  emptyLabel = REVIEW_SUBMISSION_COPY.emptyValue,
}: ReviewTeamMembersProps) {
  if (members.length === 0) {
    return (
      <div
        className="w-full"
        style={{
          borderRadius: R.teamInnerRadius,
          backgroundColor: R.teamInnerBg,
          boxShadow: R.teamInnerRing,
          padding: R.teamInnerPadding,
        }}
      >
        <div className="flex items-center gap-2" style={{ height: 20 }}>
          <span
            className={cn(
              submitMono.className,
              "flex shrink-0 items-center justify-center text-[10px] font-bold leading-[15px]",
            )}
            style={{
              width: R.teamBadgeSize,
              height: R.teamBadgeSize,
              borderRadius: 9999,
              backgroundColor: R.teamBadgeBg,
              color: R.teamBadgeColor,
            }}
          >
            1
          </span>
          <span
            className={cn(submitOutfit.className, "font-medium")}
            style={{
              fontSize: R.teamNameSize,
              lineHeight: "20px",
              color: R.titleEnColor,
            }}
          >
            {emptyLabel}
          </span>
        </div>
        <div className="mt-2" style={{ minHeight: 16.5 }}>
          <span
            className={cn(submitOutfit.className)}
            style={{
              fontSize: R.teamRoleSize,
              lineHeight: `${R.labelLineHeight}px`,
              color: R.labelColor,
            }}
          >
            {emptyLabel}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col" style={{ gap: R.teamInnerGap }}>
      {members.map((member, index) => (
        <div
          key={member.id}
          className="w-full"
          style={{
            borderRadius: R.teamInnerRadius,
            backgroundColor: R.teamInnerBg,
            boxShadow: R.teamInnerRing,
            padding: R.teamInnerPadding,
          }}
        >
          <div className="flex items-center gap-2" style={{ minHeight: 20 }}>
            <span
              className={cn(
                submitMono.className,
                "flex shrink-0 items-center justify-center text-[10px] font-bold leading-[15px]",
              )}
              style={{
                width: R.teamBadgeSize,
                height: R.teamBadgeSize,
                borderRadius: 9999,
                backgroundColor: R.teamBadgeBg,
                color: R.teamBadgeColor,
              }}
            >
              {index + 1}
            </span>
            <span
              className={cn(submitOutfit.className, "min-w-0 flex-1 truncate font-medium")}
              style={{
                fontSize: R.teamNameSize,
                lineHeight: "20px",
                color: R.titleEnColor,
              }}
            >
              {member.name.trim() || REVIEW_SUBMISSION_COPY.emptyValue}
            </span>
          </div>
          <div className="mt-2" style={{ minHeight: 16.5 }}>
            <span
              className={cn(submitOutfit.className)}
              style={{
                fontSize: R.teamRoleSize,
                lineHeight: `${R.labelLineHeight}px`,
                color: R.labelColor,
              }}
            >
              {member.role.trim() || member.college.trim() || REVIEW_SUBMISSION_COPY.emptyValue}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
