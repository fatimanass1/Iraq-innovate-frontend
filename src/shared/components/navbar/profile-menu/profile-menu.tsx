"use client";

import { LogOut, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/shared/utils/utils";
import { useProfileMenu } from "./profile-menu.logic";
import { profileMenuStyles } from "./profile-menu.styles";
import type { ProfileMenuProps } from "./profile-menu.types";

export function ProfileMenu({ className }: ProfileMenuProps) {
  const { isOpen, isLoggingOut, containerRef, toggleMenu, handleLogout } =
    useProfileMenu();

  return (
    <div ref={containerRef} className={profileMenuStyles.root(className)}>
      <button
        type="button"
        onClick={toggleMenu}
        aria-label="Profile menu"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className={cn(profileMenuStyles.trigger, isOpen && profileMenuStyles.triggerOpen)}
      >
        <User className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            role="menu"
            aria-label="Profile actions"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={profileMenuStyles.dropdown}
          >
            <button
              type="button"
              role="menuitem"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className={profileMenuStyles.logoutButton}
            >
              <LogOut className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>{isLoggingOut ? "Logging out…" : "Log out"}</span>
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
