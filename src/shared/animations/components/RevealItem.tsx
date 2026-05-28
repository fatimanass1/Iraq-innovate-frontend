"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import type { MotionElementTag, RevealPreset } from "../constants";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getPresetVariants, staggerItemVariants } from "../variants";
import { motionElements } from "./motion-elements";

export type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: MotionElementTag;
  preset?: RevealPreset;
};

/** Child item inside `RevealStagger` — inherits parent orchestration */
export function RevealItem({
  children,
  className,
  as = "div",
  preset = "fade-up",
}: RevealItemProps) {
  const shouldReduceMotion = useReducedMotion();
  const Component = motionElements[as];
  const variants = preset === "fade-up" ? staggerItemVariants : getPresetVariants(preset);

  if (shouldReduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Component className={cn(className)} variants={variants}>
      {children}
    </Component>
  );
}
