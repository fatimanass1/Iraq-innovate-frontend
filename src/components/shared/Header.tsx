"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "./Container";
import { SECTION_NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 12;

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
}

function CTAButtons({ className, onAction }: CTAButtonsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Link
        href="#track"
        onClick={onAction}
        dir="rtl"
        lang="ar"
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-full border-2 border-solid border-[#A8CF45] bg-transparent px-5 text-sm font-medium text-white",
          "shadow-[0_0_0_1px_#A8CF45] transition-all duration-300 ease-out",
          "hover:scale-[1.03]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        )}
      >
        تتبع المشروع
      </Link>
      <Link
        href="#join"
        onClick={onAction}
        dir="rtl"
        lang="ar"
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-full bg-[#A8CF45] px-5 text-sm font-semibold text-[#010B18]",
          "shadow-[0_4px_14px_rgba(168,207,69,0.35)] transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:bg-[#b5d84f] hover:shadow-[0_6px_20px_rgba(168,207,69,0.45)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        )}
      >
        شارك الآن
      </Link>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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

  return (
    <>
      <div
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-0 z-40 bg-[#010B18]/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={onClose}
      />

      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        aria-hidden={!isOpen}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-white/8 bg-[rgba(1,11,24,0.92)] p-6 shadow-[-8px_0_32px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="mb-8 flex items-center justify-between">
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
        </div>

        <nav aria-label="Mobile primary navigation" className="flex flex-col gap-5">
          {SECTION_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              onClick={onClose}
              className="text-base text-[#F5F7FA]/80"
            />
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 pt-10">
          <CTAButtons className="flex-col [&>a]:w-full" onAction={onClose} />
        </div>
      </aside>
    </>
  );
}

export function Header() {
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
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
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
          <div className="pointer-events-auto flex items-center gap-10">
            {SECTION_NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </nav>

        <div className="flex items-center justify-end justify-self-end gap-3">
          <CTAButtons className="hidden lg:flex" />

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full text-[#F5F7FA] lg:hidden",
              "transition-colors duration-300 hover:bg-white/8",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
            )}
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
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
