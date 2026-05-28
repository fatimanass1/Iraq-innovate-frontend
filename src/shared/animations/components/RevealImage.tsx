"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { Reveal } from "./Reveal";

export type RevealImageProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
};

/** Soft zoom + fade for images and media blocks */
export function RevealImage({ children, className, delay, once }: RevealImageProps) {
  return (
    <Reveal
      as="div"
      preset="scale-soft"
      className={cn("will-change-transform", className)}
      delay={delay}
      once={once}
      amount={0.15}
    >
      {children}
    </Reveal>
  );
}
