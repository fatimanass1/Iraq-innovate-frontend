"use client";

import type { ReactNode } from "react";
import { Reveal, type RevealProps } from "./Reveal";

export type RevealSectionProps = Omit<RevealProps, "as"> & {
  children: ReactNode;
  id?: string;
};

/** Full-width section reveal — fade-up by default */
export function RevealSection({
  children,
  preset = "fade-up",
  className,
  ...props
}: RevealSectionProps) {
  return (
    <Reveal as="section" preset={preset} className={className} {...props}>
      {children}
    </Reveal>
  );
}
