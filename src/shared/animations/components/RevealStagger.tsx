"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import type { MotionElementTag } from "../constants";
import { STAGGER } from "../constants";
import { useRevealAnimation } from "../hooks/useRevealAnimation";
import { staggerContainerVariants } from "../variants";
import { motionElements } from "./motion-elements";

export type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  as?: MotionElementTag;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
  id?: string;
  role?: string;
  "aria-label"?: string;
  dir?: "rtl" | "ltr";
};

export function RevealStagger({
  children,
  className,
  as = "div",
  stagger = STAGGER.base,
  delayChildren = 0.04,
  once,
  amount,
  margin,
  id,
  role,
  "aria-label": ariaLabel,
  dir,
}: RevealStaggerProps) {
  const animation = useRevealAnimation({ preset: "none", once, amount, margin });
  const Component = motionElements[as];
  const variants = staggerContainerVariants(stagger, delayChildren);

  if (animation.shouldReduceMotion) {
    const Tag = as;
    return (
      <Tag id={id} className={className} role={role} aria-label={ariaLabel} dir={dir}>
        {children}
      </Tag>
    );
  }

  return (
    <Component
      id={id}
      role={role}
      aria-label={ariaLabel}
      dir={dir}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={animation.viewport}
    >
      {children}
    </Component>
  );
}
