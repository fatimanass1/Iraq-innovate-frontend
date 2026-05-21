"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button, Container } from "@/components/ui";
import { NAV_LINKS } from "@/constants/app";
import { ROUTES } from "@/constants/routes";
import { useUiStore } from "@/store/ui.store";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const { isMobileMenuOpen, setMobileMenuOpen, toggleMobileMenu } = useUiStore();

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={ROUTES.LOGIN}>
            <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
              Sign in
            </Button>
          </Link>
          <Link href={ROUTES.DASHBOARD}>
            <Button size="sm" className="hidden sm:inline-flex">
              Dashboard
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </Container>

      {isMobileMenuOpen && (
        <div className="border-t border-border md:hidden">
          <Container className="flex flex-col gap-3 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href={ROUTES.LOGIN} onClick={() => setMobileMenuOpen(false)}>
              Sign in
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
