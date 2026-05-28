"use client";

import { createElement, type ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import type { MotionElementTag, RevealPreset } from "../constants";
import { useRevealAnimation, type UseRevealAnimationOptions } from "../hooks/useRevealAnimation";
import { motionElements } from "./motion-elements";

export type RevealProps = UseRevealAnimationOptions & {
  children: ReactNode;
  className?: string;
  as?: MotionElementTag;
  id?: string;
  "aria-label"?: string;
};

export function Reveal({
  children,
  className,
  as = "div",
  preset,
  once,
  amount,
  margin,
  delay,
  duration,
  id,
  "aria-label": ariaLabel,
}: RevealProps) {
  const animation = useRevealAnimation({ preset, once, amount, margin, delay, duration });
  const Component = motionElements[as];

  if (animation.shouldReduceMotion) {
    return createElement(as, { id, className, "aria-label": ariaLabel }, children);
  }

  return (
    <Component
      id={id}
      aria-label={ariaLabel}
      className={cn(className)}
      variants={animation.variants}
      initial={animation.initial}
      whileInView={animation.whileInView}
      viewport={animation.viewport}
      transition={animation.transition}
    >
      {children}
    </Component>
  );
}
