import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  id?: string;
  containerClassName?: string;
}

export function Section({
  className,
  containerClassName,
  children,
  id,
  ...props
}: SectionProps) {
  return (
    <section id={id} className={cn("section-padding", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
