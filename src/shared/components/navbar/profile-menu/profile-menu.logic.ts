"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/routes";
import { authService } from "@/features/auth/services/authService";
import { useAuthStore } from "@/features/auth/store/authStore";
import type { ProfileMenuLogic } from "./profile-menu.types";

/** Landing navbar profile menu — dropdown state + logout (business logic via service). */
export function useProfileMenu(): ProfileMenuLogic {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const toggleMenu = useCallback(() => {
    setIsOpen((open) => !open);
  }, []);

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      closeMenu();
      router.push(ROUTES.HOME);
    },
  });

  const handleLogout = useCallback(() => {
    logoutMutation.mutate();
  }, [logoutMutation]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    isLoggingOut: logoutMutation.isPending,
    containerRef,
    toggleMenu,
    closeMenu,
    handleLogout,
  };
}

/** Whether the landing navbar should show the authenticated profile control. */
export function useLandingNavbarAuth() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  return Boolean(hasHydrated && isAuthenticated && accessToken);
}
