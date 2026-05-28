"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";

/** Returns true when the user prefers reduced motion. */
export function useReducedMotion(): boolean {
  return useFramerReducedMotion() ?? false;
}
