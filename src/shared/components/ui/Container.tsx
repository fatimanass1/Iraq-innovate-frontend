import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/utils/utils";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div className={cn("container-app", className)} {...props}>
      {children}
    </div>
  );
}
