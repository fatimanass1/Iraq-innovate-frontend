"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants } from "@/shared/animations/variants";
import { STAGGER } from "@/shared/animations/constants";
import { DURATION, EASING } from "@/shared/animations/constants";
import { TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";
import type { TeamStepErrors } from "../../../types/validation.types";
import type { SubmitProjectWizardState, TeamMemberDraft } from "../../../types/wizard.types";
import { validationFieldId, visibleStepError } from "../../../utils/validation";
import { FieldValidationMessage } from "../../FieldValidationMessage";
import { AddMemberInputRow } from "./AddMemberInputRow";
import { AddMemberPlaceholderButton } from "./AddMemberPlaceholderButton";
import { TeamMembersList } from "./TeamMembersList";

const EMPTY_MEMBER: Omit<TeamMemberDraft, "id"> = {
  name: "",
  role: "",
  college: "",
  birthdate: "",
  linkedinUrl: "",
  certificate: null,
};

type TeamMembersStepProps = {
  form: SubmitProjectWizardState;
  errors?: TeamStepErrors;
  shouldShowFieldFeedback: (fieldId: string, step: 1 | 2 | 3 | 4 | 5) => boolean;
  onAdd: (member: Omit<TeamMemberDraft, "id">) => void;
  onUpdate: (id: string, patch: Partial<Omit<TeamMemberDraft, "id">>) => void;
  onRemove: (id: string) => void;
  onToggleEnabled: (enabled: boolean) => void;
  onFieldBlur: (fieldId: string) => void;
  onFieldChange: () => void;
};

export function TeamMembersStep({
  form,
  errors,
  shouldShowFieldFeedback,
  onAdd,
  onUpdate,
  onRemove,
  onToggleEnabled,
  onFieldBlur,
  onFieldChange,
}: TeamMembersStepProps) {
  const reduceMotion = useReducedMotion();
  const enabled = form.addTeamMembersEnabled;
  const toggleFieldId = validationFieldId(4, "toggle");
  const toggleError = visibleStepError(errors?.toggle, toggleFieldId, 4, shouldShowFieldFeedback);

  const handleAddMember = () => {
    onAdd({ ...EMPTY_MEMBER });
    onFieldChange();
  };

  return (
    <motion.div
      className="flex w-full max-w-[444px] flex-col"
      style={{ gap: TM.listGap }}
      variants={reduceMotion ? undefined : staggerContainerVariants(STAGGER.tight, 0.04)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <div id={toggleFieldId}>
        <AddMemberInputRow enabled={enabled} onToggle={onToggleEnabled} />
        {toggleError ? <FieldValidationMessage message={toggleError} /> : null}
      </div>

      <AnimatePresence initial={false}>
        {enabled ? (
          <motion.div
            key="team-members-panel"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={reduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASING.smooth }}
            className="overflow-hidden"
          >
            <div className="flex flex-col" style={{ gap: TM.listGap }}>
              {form.teamMembers.length === 0 ? (
                <AddMemberPlaceholderButton onClick={handleAddMember} />
              ) : (
                <TeamMembersList
                  members={form.teamMembers}
                  fieldErrors={errors?.members}
                  shouldShowFieldFeedback={shouldShowFieldFeedback}
                  onUpdate={(id, patch) => {
                    onUpdate(id, patch);
                    onFieldChange();
                  }}
                  onRemove={onRemove}
                  onAdd={handleAddMember}
                  onFieldBlur={onFieldBlur}
                />
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
