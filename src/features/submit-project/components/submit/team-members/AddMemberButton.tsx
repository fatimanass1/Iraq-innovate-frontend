"use client";

import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { TEAM_MEMBERS_COPY, TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";

type AddMemberButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export function AddMemberButton({ onClick, disabled }: AddMemberButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={TEAM_MEMBERS_COPY.addButtonAria}
      className="flex shrink-0 items-center justify-center rounded-full pe-0.5 disabled:opacity-50"
      style={{
        width: TM.addButtonWidth,
        height: TM.addButtonHeight,
        backgroundColor: TM.addButtonBg,
        boxShadow: TM.addButtonGlow,
      }}
      whileHover={reduceMotion || disabled ? undefined : { scale: 1.06 }}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.94 }}
      transition={{ duration: 0.2 }}
    >
      <span
        className="flex items-center justify-center rounded-full"
        style={{
          width: TM.addButtonInnerSize,
          height: TM.addButtonInnerSize,
          backgroundColor: TM.addButtonInnerBg,
        }}
      >
        <Plus className="size-3 text-white" strokeWidth={2.5} aria-hidden="true" />
      </span>
    </motion.button>
  );
}
