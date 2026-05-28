import { cn } from "@/shared/utils/utils";
import type { ProfileMenuTheme } from "./profile-menu.types";

export const PROFILE_MENU_THEME: ProfileMenuTheme = {
  background: "#010B18",
  primary: "#A8CF45",
  border: "rgba(255,255,255,0.08)",
  hover: "rgba(168,207,69,0.12)",
  text: "#FFFFFF",
  mutedText: "rgba(255,255,255,0.65)",
  logoutHoverBg: "rgba(239,68,68,0.12)",
  logoutHoverText: "#f87171",
};

export const profileMenuStyles = {
  root: (className?: string) => cn("relative", className),

  trigger: cn(
    "inline-flex size-10 shrink-0 items-center justify-center rounded-full",
    "border border-[rgba(255,255,255,0.08)] bg-transparent",
    "text-white transition-all duration-300 ease-out",
    "hover:border-[#A8CF45]/60 hover:bg-[rgba(168,207,69,0.12)]",
    "hover:shadow-[0_0_20px_rgba(168,207,69,0.35)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
  ),

  triggerOpen: "border-[#A8CF45]/70 bg-[rgba(168,207,69,0.12)] shadow-[0_0_20px_rgba(168,207,69,0.35)]",

  dropdown: cn(
    "absolute end-0 top-[calc(100%+10px)] z-[60] w-[220px] overflow-hidden rounded-[20px]",
    "border border-[rgba(255,255,255,0.08)] bg-[rgba(1,11,24,0.88)]",
    "shadow-[0_16px_48px_rgba(0,0,0,0.45)] backdrop-blur-xl",
  ),

  logoutButton: cn(
    "flex w-full items-center gap-3 px-4 py-3 text-start text-[15px] font-medium text-white",
    "transition-colors duration-200",
    "hover:bg-[rgba(239,68,68,0.12)] hover:text-[#f87171]",
    "focus-visible:outline-none focus-visible:bg-[rgba(239,68,68,0.12)]",
    "disabled:pointer-events-none disabled:opacity-60",
  ),
};
