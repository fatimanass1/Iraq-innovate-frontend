"use client";

import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { scaleSoftVariants } from "@/shared/animations/variants";
import { TEAM_MEMBERS_COPY, TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";
import { submitOutfit } from "../../../utils/fonts";

type AddMemberPlaceholderButtonProps = {
  onClick: () => void;
};

export function AddMemberPlaceholderButton({ onClick }: AddMemberPlaceholderButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      variants={reduceMotion ? undefined : scaleSoftVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      className={cn(
        submitOutfit.className,
        "flex w-full items-center justify-center gap-2 border-2 border-dashed transition-opacity hover:opacity-90",
      )}
      style={{
        height: TM.placeholderHeight,
        borderRadius: TM.cardRadius,
        borderColor: TM.placeholderBorder,
        color: "#5A8F00",
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      <Plus className="size-4" strokeWidth={2} aria-hidden="true" />
      <span>{TEAM_MEMBERS_COPY.addMemberCta}</span>
    </motion.button>
  );
}
