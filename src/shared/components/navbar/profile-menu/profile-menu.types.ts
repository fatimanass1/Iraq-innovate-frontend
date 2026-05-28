import type { RefObject } from "react";

export type ProfileMenuTheme = {
  background: string;
  primary: string;
  border: string;
  hover: string;
  text: string;
  mutedText: string;
  logoutHoverBg: string;
  logoutHoverText: string;
};

export type ProfileMenuProps = {
  className?: string;
};

export type ProfileMenuLogic = {
  isOpen: boolean;
  isLoggingOut: boolean;
  containerRef: RefObject<HTMLDivElement | null>;
  toggleMenu: () => void;
  closeMenu: () => void;
  handleLogout: () => void;
};
