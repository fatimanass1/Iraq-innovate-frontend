"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants } from "@/shared/animations/variants";
import { STAGGER } from "@/shared/animations/constants";
import { TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";
import type { TeamMemberFieldErrors } from "../../../types/validation.types";
import type { TeamMemberDraft } from "../../../types/wizard.types";
import { AddMemberPlaceholderButton } from "./AddMemberPlaceholderButton";
import { TeamMemberCard } from "./TeamMemberCard";

type TeamMembersListProps = {
  members: TeamMemberDraft[];
  fieldErrors?: TeamMemberFieldErrors;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onUpdate: (id: string, patch: Partial<Omit<TeamMemberDraft, "id">>) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
  onFieldBlur: (fieldId: string) => void;
};

export function TeamMembersList({
  members,
  fieldErrors = {},
  shouldShowFieldFeedback,
  onUpdate,
  onRemove,
  onAdd,
  onFieldBlur,
}: TeamMembersListProps) {
  const reduceMotion = useReducedMotion();

  if (members.length === 0) return null;

  return (
    <motion.div
      className="flex w-full flex-col"
      style={{ gap: TM.listGap }}
      variants={reduceMotion ? undefined : staggerContainerVariants(STAGGER.tight, 0.02)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <AnimatePresence mode="popLayout">
        {members.map((member, index) => (
          <TeamMemberCard
            key={member.id}
            member={member}
            index={index}
            errors={fieldErrors[member.id]}
            shouldShowFieldFeedback={shouldShowFieldFeedback}
            onChange={(patch) => onUpdate(member.id, patch)}
            onRemove={() => onRemove(member.id)}
            onFieldBlur={onFieldBlur}
          />
        ))}
      </AnimatePresence>

      <AddMemberPlaceholderButton onClick={onAdd} />
    </motion.div>
  );
}
