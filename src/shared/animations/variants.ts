import type { Variants } from "framer-motion";
import { DURATION, EASING, STAGGER, type RevealPreset } from "./constants";

const baseTransition = {
  duration: DURATION.base,
  ease: EASING.smooth,
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASING.smooth },
  },
};

export const fadeDownVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition,
  },
};

export const scaleSoftVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASING.smooth },
  },
};

export const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

export const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition,
  },
};

export const noMotionVariants: Variants = {
  hidden: {},
  visible: {},
};

export const staggerContainerVariants = (
  stagger: number = STAGGER.base,
  delayChildren = 0.04,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
});

export const staggerItemVariants: Variants = fadeUpVariants;

export const heroContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: STAGGER.relaxed,
      delayChildren: 0.08,
    },
  },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASING.smooth,
    },
  },
};

export const imageRevealVariants: Variants = scaleSoftVariants;

export const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.fast, ease: EASING.out },
  },
};

const PRESET_VARIANTS: Record<RevealPreset, Variants> = {
  "fade-up": fadeUpVariants,
  fade: fadeVariants,
  "fade-down": fadeDownVariants,
  scale: scaleVariants,
  "scale-soft": scaleSoftVariants,
  "slide-left": slideLeftVariants,
  "slide-right": slideRightVariants,
  none: noMotionVariants,
};

export function getPresetVariants(preset: RevealPreset): Variants {
  return PRESET_VARIANTS[preset];
}
