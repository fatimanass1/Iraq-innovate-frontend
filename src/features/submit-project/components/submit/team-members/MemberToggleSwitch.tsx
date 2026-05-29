"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";

type MemberToggleSwitchProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

export function MemberToggleSwitch({ enabled, onChange }: MemberToggleSwitchProps) {
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative shrink-0 rounded-full transition-colors",
        enabled ? "ps-[26px] pe-0.5" : "ps-0.5 pe-[26px]",
      )}
      style={{
        width: TM.toggleWidth,
        height: TM.toggleHeight,
        paddingTop: 2,
        backgroundColor: enabled ? TM.toggleTrackOn : TM.toggleTrackOff,
        boxShadow: enabled ? TM.toggleTrackOnGlow : undefined,
      }}
    >
      <motion.span
        layout={!reduceMotion}
        className="block rounded-full"
        style={{
          width: 20,
          height: 20,
          backgroundColor: enabled ? TM.toggleThumbOn : TM.toggleThumbOff,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 32 }}
      />
    </button>
  );
}
