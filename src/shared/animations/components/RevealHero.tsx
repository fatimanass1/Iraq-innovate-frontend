"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { heroContainerVariants, heroItemVariants } from "../variants";
import { motionElements } from "./motion-elements";

export type RevealHeroProps = {
  children: ReactNode;
  className?: string;
};

/** Hero block — animates on first mount (not scroll) */
export function RevealHero({ children, className }: RevealHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motionElements.div
      className={cn(className)}
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motionElements.div>
  );
}

export type RevealHeroItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealHeroItem({ children, className }: RevealHeroItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motionElements.div className={cn(className)} variants={heroItemVariants}>
      {children}
    </motionElements.div>
  );
}
