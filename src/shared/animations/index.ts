export { EASING, DURATION, STAGGER, VIEWPORT, VIEWPORT_PAGE_END } from "./constants";
export type { RevealPreset, MotionElementTag } from "./constants";
export * from "./variants";

export { useReducedMotion } from "./hooks/useReducedMotion";
export { useRevealAnimation, withRevealDelay } from "./hooks/useRevealAnimation";
export type { UseRevealAnimationOptions } from "./hooks/useRevealAnimation";
export {
  useCounterAnimation,
  parseCounterDisplayValue,
} from "./hooks/useCounterAnimation";
export type { UseCounterAnimationOptions, ParsedCounterValue } from "./hooks/useCounterAnimation";

export { Reveal } from "./components/Reveal";
export type { RevealProps } from "./components/Reveal";
export { RevealSection } from "./components/RevealSection";
export { RevealStagger } from "./components/RevealStagger";
export { RevealItem } from "./components/RevealItem";
export { RevealImage } from "./components/RevealImage";
export { RevealHero, RevealHeroItem } from "./components/RevealHero";
export { AnimatedCounter } from "./components/AnimatedCounter";
export { AnimatedProgress } from "./components/AnimatedProgress";
export { RevealNav, RevealNavItem } from "./components/RevealNav";
