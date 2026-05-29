"use client";

import { Trash2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { scaleSoftVariants } from "@/shared/animations/variants";
import { SUBMIT_PROJECT_FIELDS } from "../../../constants/submit-project-content";
import { TEAM_MEMBERS_COPY, TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";
import type { BilingualMessage, TeamMemberFieldKey } from "../../../types/validation.types";
import type { TeamMemberDraft } from "../../../types/wizard.types";
import { validationFieldId, visibleFieldError } from "../../../utils/validation";
import { submitCairo, submitMono, submitOutfit } from "../../../utils/fonts";
import { SubmitGlowInput } from "../../SubmitGlowField";
import { CertificateUploadField } from "../owner/CertificateUploadField";

type TeamMemberCardProps = {
  member: TeamMemberDraft;
  index: number;
  errors?: Partial<Record<keyof TeamMemberDraft, BilingualMessage>>;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onChange: (patch: Partial<Omit<TeamMemberDraft, "id">>) => void;
  onRemove: () => void;
  onFieldBlur: (fieldId: string) => void;
};

function memberFieldId(memberId: string, field: TeamMemberFieldKey) {
  return validationFieldId(4, field, memberId);
}

export function TeamMemberCard({
  member,
  index,
  errors = {},
  shouldShowFieldFeedback,
  onChange,
  onRemove,
  onFieldBlur,
}: TeamMemberCardProps) {
  const reduceMotion = useReducedMotion();

  const showError = (field: TeamMemberFieldKey) =>
    visibleFieldError(
      errors[field],
      memberFieldId(member.id, field),
      4,
      shouldShowFieldFeedback,
    );

  return (
    <motion.article
      variants={reduceMotion ? undefined : scaleSoftVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      layout={!reduceMotion}
      className="flex w-full flex-col"
      style={{
        borderRadius: TM.cardRadius,
        backgroundColor: TM.cardBg,
        boxShadow: TM.cardRing,
        padding: `${TM.cardPaddingTop}px ${TM.cardPaddingX}px 20px`,
        gap: TM.cardFieldGap,
      }}
    >
      <header
        className="flex items-center justify-between"
        style={{ minHeight: TM.cardHeaderHeight }}
      >
        <button
          type="button"
          onClick={onRemove}
          aria-label={TEAM_MEMBERS_COPY.removeMemberAria}
          className="flex items-center justify-center transition-opacity hover:opacity-80"
          style={{
            width: TM.deleteBtnSize,
            height: TM.deleteBtnSize,
            borderRadius: TM.deleteBtnRadius,
            backgroundColor: TM.deleteBtnBg,
          }}
        >
          <Trash2
            className="size-[13px]"
            style={{ color: TM.deleteIconColor }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </button>

        <div className="flex items-center gap-2">
          <span
            className={cn(submitCairo.className, "text-[12px] leading-4 text-[#6B7260]")}
            dir="rtl"
          >
            {TEAM_MEMBERS_COPY.cardTitleAr}
          </span>
          <span
            className={cn(submitOutfit.className, "text-[14px] font-medium leading-5 text-[#111318]")}
          >
            {TEAM_MEMBERS_COPY.cardTitle}
          </span>
          <span
            className={cn(
              submitMono.className,
              "flex items-center justify-center text-[11px] font-bold leading-[16.5px]",
            )}
            style={{
              width: TM.badgeSize,
              height: TM.badgeSize,
              borderRadius: 9999,
              backgroundColor: TM.badgeBg,
              color: TM.badgeText,
            }}
          >
            {index + 1}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SubmitGlowInput
          fieldId={memberFieldId(member.id, "name")}
          label={SUBMIT_PROJECT_FIELDS.memberName}
          value={member.name}
          onChange={(value) => onChange({ name: value })}
          onBlur={() => onFieldBlur(memberFieldId(member.id, "name"))}
          error={showError("name")}
        />
        <SubmitGlowInput
          fieldId={memberFieldId(member.id, "birthdate")}
          label={SUBMIT_PROJECT_FIELDS.memberBirthdate}
          value={member.birthdate}
          onChange={(value) => onChange({ birthdate: value })}
          onBlur={() => onFieldBlur(memberFieldId(member.id, "birthdate"))}
          type="date"
          error={showError("birthdate")}
        />
        <SubmitGlowInput
          fieldId={memberFieldId(member.id, "college")}
          label={SUBMIT_PROJECT_FIELDS.memberCollege}
          value={member.college}
          onChange={(value) => onChange({ college: value })}
          onBlur={() => onFieldBlur(memberFieldId(member.id, "college"))}
          error={showError("college")}
        />
        <SubmitGlowInput
          fieldId={memberFieldId(member.id, "role")}
          label={SUBMIT_PROJECT_FIELDS.memberRole}
          value={member.role}
          onChange={(value) => onChange({ role: value })}
          onBlur={() => onFieldBlur(memberFieldId(member.id, "role"))}
          error={showError("role")}
        />
      </div>

      <SubmitGlowInput
        fieldId={memberFieldId(member.id, "linkedinUrl")}
        label={SUBMIT_PROJECT_FIELDS.memberLinkedin}
        value={member.linkedinUrl}
        onChange={(value) => onChange({ linkedinUrl: value })}
        onBlur={() => onFieldBlur(memberFieldId(member.id, "linkedinUrl"))}
        type="url"
        error={showError("linkedinUrl")}
      />

      <CertificateUploadField
        fieldId={memberFieldId(member.id, "certificate")}
        file={member.certificate}
        error={showError("certificate")}
        onChange={(file) => onChange({ certificate: file })}
        onBlur={() => onFieldBlur(memberFieldId(member.id, "certificate"))}
      />
    </motion.article>
  );
}
