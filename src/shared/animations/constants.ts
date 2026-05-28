/** Premium easing curves — smooth, minimal, startup-style */
export const EASING = {
  smooth: [0.22, 1, 0.36, 1] as const,
  out: [0.16, 1, 0.3, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
};

export const DURATION = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
  counter: 1.15,
  progress: 1,
} as const;

export const STAGGER = {
  tight: 0.06,
  base: 0.09,
  relaxed: 0.12,
} as const;

export const VIEWPORT = {
  once: true,
  amount: 0.2,
  /** Positive bottom margin so elements near the page end can still intersect. */
  margin: "0px 0px 10% 0px",
} as const;

/** Last sections / footer blocks at the document bottom */
export const VIEWPORT_PAGE_END = {
  once: true,
  amount: 0.08,
  margin: "0px 0px 20% 0px",
} as const;

export type RevealPreset =
  | "fade-up"
  | "fade"
  | "fade-down"
  | "scale"
  | "scale-soft"
  | "slide-left"
  | "slide-right"
  | "none";

export type MotionElementTag =
  | "div"
  | "section"
  | "article"
  | "header"
  | "footer"
  | "ul"
  | "ol"
  | "li"
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "nav"
  | "main"
  | "aside";
