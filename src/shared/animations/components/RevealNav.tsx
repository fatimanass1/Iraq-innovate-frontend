"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { navItemVariants, staggerContainerVariants } from "../variants";
import { STAGGER } from "../constants";
import { motionElements } from "./motion-elements";

export type RevealNavProps = {
  children: ReactNode;
  className?: string;
  as?: "nav" | "div";
};

/** Subtle stagger for navbar items — animates on mount */
export function RevealNav({ children, className, as = "nav" }: RevealNavProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motionElements[as];

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component
      className={cn(className)}
      variants={staggerContainerVariants(STAGGER.tight, 0.1)}
      initial="hidden"
      animate="visible"
    >
      {children}
    </Component>
  );
}

export type RevealNavItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealNavItem({ children, className }: RevealNavItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motionElements.span className={cn("inline-flex", className)} variants={navItemVariants}>
      {children}
    </motionElements.span>
  );
}
