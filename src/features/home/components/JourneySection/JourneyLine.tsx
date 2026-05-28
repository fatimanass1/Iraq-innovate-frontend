import { cn } from "@/shared/utils/utils";

interface JourneyLineProps {
  className?: string;
}

export function JourneyLine({ className }: JourneyLineProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute z-0 h-px -translate-y-1/2 bg-[#A8CF45]/55",
        "top-[56px] left-[56px] right-[56px]",
        "sm:top-[62px] sm:left-[62px] sm:right-[62px]",
        "lg:top-[68px] lg:left-[68px] lg:right-[68px]",
        className,
      )}
      aria-hidden="true"
    />
  );
}
