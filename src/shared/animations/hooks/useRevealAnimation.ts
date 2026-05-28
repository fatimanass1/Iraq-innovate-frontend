"use client";

import { useMemo } from "react";
import type { Transition, Variant } from "framer-motion";
import { VIEWPORT, type RevealPreset } from "../constants";
import { getPresetVariants } from "../variants";
import { useReducedMotion } from "./useReducedMotion";

export type UseRevealAnimationOptions = {
  preset?: RevealPreset;
  once?: boolean;
  amount?: number | "some" | "all";
  margin?: string;
  delay?: number;
  duration?: number;
};

export function useRevealAnimation(options: UseRevealAnimationOptions = {}) {
  const shouldReduceMotion = useReducedMotion();

  const {
    preset = "fade-up",
    once = VIEWPORT.once,
    amount = VIEWPORT.amount,
    margin = VIEWPORT.margin,
    delay = 0,
    duration,
  } = options;

  return useMemo(() => {
    const variants = getPresetVariants(preset);

    const transition: Transition = {
      delay,
      ...(duration !== undefined ? { duration } : {}),
    };

    const viewport = {
      once,
      amount,
      margin,
    };

    if (shouldReduceMotion) {
      return {
        shouldReduceMotion: true as const,
        variants: undefined,
        initial: false as const,
        whileInView: undefined,
        animate: undefined,
        viewport,
        transition,
      };
    }

    return {
      shouldReduceMotion: false as const,
      variants,
      initial: "hidden" as const,
      whileInView: "visible" as const,
      animate: undefined,
      viewport,
      transition,
    };
  }, [shouldReduceMotion, preset, once, amount, margin, delay, duration]);
}

export type RevealAnimationProps = ReturnType<typeof useRevealAnimation>;

/** Helper for custom child variants with optional delay override */
export function withRevealDelay(
  variants: { hidden: Variant; visible: Variant },
  delay: number,
) {
  return {
    hidden: variants.hidden,
    visible: {
      ...variants.visible,
      transition: {
        ...(typeof variants.visible === "object" && variants.visible !== null && "transition" in variants.visible
          ? (variants.visible as { transition?: Transition }).transition
          : {}),
        delay,
      },
    },
  };
}
