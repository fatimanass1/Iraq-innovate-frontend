import Image from "next/image";
import { cn } from "@/lib/utils";
import { cairo, outfit } from "./fonts";
import type { JourneyStepData } from "./journeySteps";

interface JourneyStepProps {
  step: JourneyStepData;
}

export function JourneyStep({ step }: JourneyStepProps) {
  return (
    <div
      className={cn(
        "flex w-[112px] shrink-0 snap-center flex-col items-center",
        "sm:w-[124px] md:w-[124px]",
        "lg:w-auto lg:max-w-[200px] lg:flex-1 lg:shrink",
      )}
    >
      <div className="relative size-[112px] shrink-0 sm:size-[124px] lg:size-[136px]">
        <div className="relative size-full overflow-hidden rounded-[22px] drop-shadow-[0_14px_32px_rgba(1,11,24,0.14)] sm:rounded-[24px] lg:rounded-[26px]">
          <Image
            src="/home/square.png"
            alt=""
            width={136}
            height={136}
            className="size-full scale-[1.18] object-cover object-center"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 flex -translate-y-2 flex-col items-center justify-center gap-2 sm:-translate-y-2.5 sm:gap-2.5">
          <span
            className={cn(
              outfit.className,
              "text-[10px] font-semibold leading-none tracking-[0.2em] text-[#A8CF45]",
            )}
          >
            {step.number}
          </span>
          <span
            className="size-[12px] shrink-0 rounded-full bg-[#A8CF45] shadow-[0_0_10px_rgba(168,207,69,0.85),0_0_22px_rgba(168,207,69,0.45),0_0_36px_rgba(168,207,69,0.2)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="mt-5 flex w-full max-w-[168px] flex-col items-center text-center sm:mt-6 lg:mt-7">
        <p
          className={cn(
            outfit.className,
            "text-[15px] font-bold leading-tight text-[#010B18] sm:text-[16px] lg:text-[17px]",
          )}
        >
          {step.titleEn}
        </p>
        <p
          className={cn(
            cairo.className,
            "mt-1.5 text-[14px] font-bold leading-snug text-[#A8CF45] sm:text-[15px] lg:text-base",
          )}
          dir="rtl"
          lang="ar"
        >
          {step.titleAr}
        </p>
        <p
          className={cn(
            cairo.className,
            "mt-2 text-[12px] leading-[1.65] text-[rgba(1,11,24,0.45)] sm:mt-2.5 sm:text-[13px] lg:text-sm",
          )}
          dir="rtl"
          lang="ar"
        >
          {step.description}
        </p>
      </div>
    </div>
  );
}
