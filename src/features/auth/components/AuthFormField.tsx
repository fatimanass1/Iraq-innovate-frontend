import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { cairo } from "../fonts";

type AuthFormFieldProps = {
  label: string;
  optional?: string;
  children: ReactNode;
  className?: string;
};

export function AuthFormField({ label, optional, children, className }: AuthFormFieldProps) {
  return (
    <div className={cn("w-full", className)} dir="rtl" lang="ar">
      <label className={cn(cairo.className, "mb-2 block text-right text-[14px] font-medium text-[rgba(1,11,24,0.4)]")}>
        {label}
        {optional ? (
          <span className="ms-1 font-normal text-[rgba(1,11,24,0.45)]">{optional}</span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
