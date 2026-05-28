"use client";

import { cn } from "@/shared/utils/utils";
import { SETTINGS_THEME as T } from "../constants/settings-theme";
import { outfit } from "@/features/dashboard/fonts";

type UserAvatarProps = {
  initials: string;
  size?: number;
  radius?: number;
  className?: string;
};

export function UserAvatar({
  initials,
  size = T.profileAvatarSize,
  radius = T.profileAvatarRadius,
  className,
}: UserAvatarProps) {
  return (
    <div
      className={cn(
        outfit.className,
        "flex shrink-0 items-center justify-center font-bold text-[#010B18]",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        fontSize: size * 0.28,
        backgroundColor: T.profileAvatarBg,
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}
