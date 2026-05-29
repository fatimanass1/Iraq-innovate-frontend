"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import {
  DURATION,
  EASING,
  RevealNav,
  RevealNavItem,
  STAGGER,
  staggerContainerVariants,
  staggerItemVariants,
} from "@/shared/animations";
import { ProfileMenu, useLandingNavbarAuth } from "@/shared/components/navbar/profile-menu";
import { Container } from "./Container";
import { SECTION_NAV_ITEMS } from "@/shared/constants/navigation";
import { useProtectedNavigation } from "@/features/auth/hooks/useProtectedNavigation";
import { cn } from "@/shared/utils/utils";

const SCROLL_THRESHOLD = 12;
/** Above every other layer in the app (header z-50, profile dropdown z-60). */
const MOBILE_MENU_Z_INDEX = 9999;

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
  className?: string;
}

function NavLink({ href, label, onClick, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-[15px] font-medium text-[#F5F7FA]/70 transition-colors duration-300",
        "hover:text-[#A8CF45] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        className,
      )}
    >
      {label}
    </Link>
  );
}

interface CTAButtonsProps {
  className?: string;
  onAction?: () => void;
  fullWidth?: boolean;
}

function CTAButtons({ className, onAction, fullWidth = false }: CTAButtonsProps) {
  const { navigateToDashboard, navigateToProjectSubmit } = useProtectedNavigation();

  const handleTrackClick = () => {
    onAction?.();
    navigateToDashboard();
  };

  const handleSubmitClick = () => {
    onAction?.();
    navigateToProjectSubmit();
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        type="button"
        onClick={handleTrackClick}
        dir="rtl"
        lang="ar"
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-full border-2 border-solid border-[#A8CF45] bg-transparent px-5 text-sm font-medium text-white",
          "shadow-[0_0_0_1px_#A8CF45] transition-all duration-300 ease-out",
          "hover:scale-[1.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
          widthClass,
        )}
      >
        تتبع المشروع
      </button>
      <button
        type="button"
        onClick={handleSubmitClick}
        dir="rtl"
        lang="ar"
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-full bg-[#A8CF45] px-5 text-sm font-semibold text-[#010B18]",
          "shadow-[0_4px_14px_rgba(168,207,69,0.35)] transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:bg-[#b5d84f] hover:shadow-[0_6px_20px_rgba(168,207,69,0.45)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
          widthClass,
        )}
      >
        شارك الآن
      </button>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function subscribeToClientMount() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    subscribeToClientMount,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!mounted) {
    return null;
  }

  const panelTransition = reduceMotion
    ? { duration: 0 }
    : { duration: DURATION.fast, ease: EASING.smooth };

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mobile-navigation"
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          className="fixed inset-0 flex flex-col bg-[#010B18] lg:hidden"
          style={{
            zIndex: MOBILE_MENU_Z_INDEX,
            width: "100vw",
            height: "100dvh",
          }}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={reduceMotion ? undefined : { opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={panelTransition}
        >
          <header className="flex shrink-0 items-center justify-between px-6 pb-4 pt-6">
            <Link
              href="/"
              onClick={onClose}
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]"
              aria-label="Iraq Innovate home"
            >
              <Image src="/logo1.png" alt="Iraq Innovate logo" width={92} height={100} priority />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#F5F7FA]",
                "transition-colors duration-300 hover:bg-white/8",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
              )}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <motion.nav
              aria-label="Mobile primary navigation"
              className="flex flex-col gap-6 py-2"
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
              variants={staggerContainerVariants(STAGGER.tight, 0.06)}
            >
              {SECTION_NAV_ITEMS.map((item) => (
                <motion.div key={item.href} variants={staggerItemVariants}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    onClick={onClose}
                    className="block text-lg text-[#F5F7FA]/85"
                  />
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="mt-auto flex flex-col gap-3 pt-10"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: DURATION.fast, ease: EASING.smooth, delay: 0.12 }
              }
            >
              <CTAButtons className="flex-col" fullWidth onAction={onClose} />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function Header() {
  const isAuthenticated = useLandingNavbarAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((open) => !open);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const { style } = document.body;
    const previous = {
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      overflow: style.overflow,
    };

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";

    return () => {
      style.position = previous.position;
      style.top = previous.top;
      style.left = previous.left;
      style.right = previous.right;
      style.width = previous.width;
      style.overflow = previous.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-[rgba(1,11,24,0.72)] backdrop-blur-xl"
          : "bg-transparent backdrop-blur-none",
      )}
    >
      <Container className="relative grid h-20 grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_1fr]">
        <Link
          href="/"
          className="inline-flex items-center justify-self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]"
          aria-label="Iraq Innovate home"
        >
          <Image src="/logo1.png" alt="Iraq Innovate logo" width={92} height={100} priority />
        </Link>

        <nav
          aria-label="Primary navigation"
          className="pointer-events-none absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 lg:flex"
        >
          <RevealNav className="pointer-events-auto flex items-center gap-10" as="div">
            {SECTION_NAV_ITEMS.map((item) => (
              <RevealNavItem key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </RevealNavItem>
            ))}
          </RevealNav>
        </nav>

        <div className="flex items-center justify-end justify-self-end gap-3">
          <CTAButtons className="hidden lg:flex" />
          {isAuthenticated ? <ProfileMenu /> : null}

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#F5F7FA] lg:hidden",
              "transition-colors duration-300 hover:bg-white/8",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
              isMobileMenuOpen && "pointer-events-none opacity-0",
            )}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            tabIndex={isMobileMenuOpen ? -1 : 0}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </Container>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </header>
  );
}
