"use client";

import { motion, useReducedMotion } from "framer-motion";
import { STAGGER } from "@/shared/animations/constants";
import { staggerContainerVariants } from "@/shared/animations/variants";
import {
  REVIEW_OWNER_ROWS,
  REVIEW_PROJECT_ROWS,
  REVIEW_SECTIONS,
  REVIEW_SUBMISSION_COPY,
  REVIEW_SUBMISSION_THEME as R,
} from "../../../constants/review-submission";
import type {
  SubmitProjectStep,
  SubmitProjectWizardState,
} from "../../../types/wizard.types";
import { ReviewCard } from "./ReviewCard";
import { ReviewMediaPreview } from "./ReviewMediaPreview";
import { ReviewRow } from "./ReviewRow";
import { ReviewTeamMembers } from "./ReviewTeamMembers";

type ReviewSubmissionStepProps = {
  form: SubmitProjectWizardState;
  onEditStep: (step: SubmitProjectStep) => void;
};

function formatDisplayDate(value: string): string {
  if (!value.trim()) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function ReviewSubmissionStep({ form, onEditStep }: ReviewSubmissionStepProps) {
  const reduceMotion = useReducedMotion();

  const projectValues: Record<string, string> = {
    title: form.title,
    category: form.categoryName ?? "",
    summary: form.summary,
    description: form.description,
    website: form.websiteUrl,
  };

  const ownerValues: Record<string, string> = {
    name: form.ownerName,
    birthdate: formatDisplayDate(form.ownerBirthdate),
    college: form.ownerCollege,
    certificate: form.ownerCertificate
      ? form.ownerCertificate.name
      : REVIEW_SUBMISSION_COPY.certificateNotUploaded,
    linkedin: form.ownerLinkedin,
  };

  const previewFiles = form.mediaItems.map((item) => item.file);

  return (
    <motion.div
      className="flex w-full max-w-[444px] flex-col"
      style={{ gap: R.cardsGap }}
      variants={reduceMotion ? undefined : staggerContainerVariants(STAGGER.tight, 0.04)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <ReviewCard
        titleEn={REVIEW_SECTIONS.project.titleEn}
        titleAr={REVIEW_SECTIONS.project.titleAr}
        editStep={REVIEW_SECTIONS.project.step}
        onEdit={onEditStep}
      >
        {REVIEW_PROJECT_ROWS.map((row) => (
          <ReviewRow
            key={row.key}
            label={row.label}
            value={projectValues[row.key] ?? ""}
            multiline={"multiline" in row && row.multiline}
          />
        ))}
      </ReviewCard>

      <ReviewCard
        titleEn={REVIEW_SECTIONS.media.titleEn}
        titleAr={REVIEW_SECTIONS.media.titleAr}
        editStep={REVIEW_SECTIONS.media.step}
        onEdit={onEditStep}
      >
        <ReviewMediaPreview files={previewFiles} />
      </ReviewCard>

      <ReviewCard
        titleEn={REVIEW_SECTIONS.owner.titleEn}
        titleAr={REVIEW_SECTIONS.owner.titleAr}
        editStep={REVIEW_SECTIONS.owner.step}
        onEdit={onEditStep}
      >
        {REVIEW_OWNER_ROWS.map((row) => (
          <ReviewRow key={row.key} label={row.label} value={ownerValues[row.key] ?? ""} />
        ))}
      </ReviewCard>

      <ReviewCard
        titleEn={REVIEW_SECTIONS.team.titleEn}
        titleAr={REVIEW_SECTIONS.team.titleAr}
        editStep={REVIEW_SECTIONS.team.step}
        onEdit={onEditStep}
      >
        <ReviewTeamMembers
          members={form.addTeamMembersEnabled ? form.teamMembers : []}
          emptyLabel={
            form.addTeamMembersEnabled
              ? REVIEW_SUBMISSION_COPY.emptyValue
              : REVIEW_SUBMISSION_COPY.teamDisabled
          }
        />
      </ReviewCard>
    </motion.div>
  );
}
