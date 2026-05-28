"use client";

import { Plus } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { DASHBOARD_ACTIONS } from "../constants/dashboard-content";
import { DASHBOARD_THEME } from "../constants/dashboard-theme";
import { cairo } from "../fonts";

type NewProjectButtonProps = {
  onClick?: () => void;
  className?: string;
};

export function NewProjectButton({ onClick, className }: NewProjectButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full px-5 sm:w-auto",
        "text-[13px] font-semibold text-[#010B18]",
        "shadow-[0_2px_14px_rgba(168,207,69,0.3)] transition-all duration-150 hover:brightness-[1.04]",
        cairo.className,
        className,
      )}
      style={{ backgroundColor: DASHBOARD_THEME.primaryGreen }}
    >
      <Plus className="size-[16px] stroke-[2.25]" aria-hidden="true" />
      <span lang="ar">{DASHBOARD_ACTIONS.newProject}</span>
    </button>
  );
}
