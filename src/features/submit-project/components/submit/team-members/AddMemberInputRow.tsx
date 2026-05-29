"use client";

import { cn } from "@/shared/utils/utils";
import { TEAM_MEMBERS_COPY, TEAM_MEMBERS_THEME as TM } from "../../../constants/team-members";
import { submitCairo, submitOutfit } from "../../../utils/fonts";
import { MemberToggleSwitch } from "./MemberToggleSwitch";

type AddMemberInputRowProps = {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
};

export function AddMemberInputRow({ enabled, onToggle }: AddMemberInputRowProps) {
  return (
    <div
      className="relative flex w-full items-center"
      style={{
        height: TM.addRowHeight,
        borderRadius: TM.addRowRadius,
        backgroundColor: TM.addRowBg,
        boxShadow: TM.addRowRing,
        padding: TM.addRowPadding,
      }}
    >
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: TM.addRowTextGap }}>
        <p
          className={cn(submitOutfit.className, "font-semibold")}
          style={{
            fontSize: TM.addTitleSize,
            lineHeight: `${TM.addTitleLineHeight}px`,
            color: "#111318",
          }}
        >
          {TEAM_MEMBERS_COPY.addRowTitle}
        </p>
        <p
          className={cn(submitCairo.className)}
          style={{
            fontSize: TM.addHelperSize,
            lineHeight: `${TM.addHelperLineHeight}px`,
            color: "#6B7260",
          }}
          dir="rtl"
        >
          {TEAM_MEMBERS_COPY.addRowHelper}
        </p>
      </div>

      <MemberToggleSwitch enabled={enabled} onChange={onToggle} />
    </div>
  );
}
