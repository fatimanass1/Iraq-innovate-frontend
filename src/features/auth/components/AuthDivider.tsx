import { cn } from "@/shared/utils/utils";
import { outfit } from "../fonts";

type AuthDividerProps = {
  label: string;
  labelClassName?: string;
};

export function AuthDivider({ label, labelClassName }: AuthDividerProps) {
  return (
    <div className={cn(outfit.className, "flex w-full max-w-[420px] items-center gap-4")}>
      <span className="h-px flex-1 bg-[rgba(1,11,24,0.06)]" aria-hidden="true" />
      <span
        className={cn(
          "shrink-0 text-[12px] font-medium text-[rgba(1,11,24,0.28)]",
          labelClassName,
        )}
        dir="ltr"
        lang="en"
      >
        {label}
      </span>
      <span className="h-px flex-1 bg-[rgba(1,11,24,0.06)]" aria-hidden="true" />
    </div>
  );
}
