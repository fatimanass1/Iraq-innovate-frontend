import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/utils";

/** Single source of truth for site-wide content width and horizontal padding. */
export const layoutContainerClassName =
  "mx-auto w-full max-w-[1600px] px-6 xl:px-10 2xl:px-14";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn(layoutContainerClassName, className)} {...props}>
      {children}
    </div>
  );
}
