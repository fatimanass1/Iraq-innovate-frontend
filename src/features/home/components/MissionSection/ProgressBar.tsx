import { cn } from "@/lib/utils";
import { outfit } from "./fonts";

interface ProgressBarProps {
  label: string;
  value: number;
  fillWidthClass: string;
  dotPositionClass: string;
}

export function ProgressBar({ label, value, fillWidthClass, dotPositionClass }: ProgressBarProps) {
  return (
    <div className="space-y-2.5">
      <div className={cn(outfit.className, "flex items-center justify-between gap-4 text-sm")}>
        <span className="text-[rgba(255,255,255,0.55)]">{label}</span>
        <span className="font-semibold text-[#A8CF45]">{value}%</span>
      </div>
      <div className="relative h-2.5 rounded-full bg-[rgba(255,255,255,0.08)]">
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full bg-[#A8CF45]",
            "shadow-[0_0_14px_rgba(168,207,69,0.35)]",
            fillWidthClass,
          )}
        />
        <div
          className={cn(
            "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5CC6D0]",
            "shadow-[0_0_10px_rgba(92,198,208,0.75)]",
            dotPositionClass,
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
