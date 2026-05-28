import Image from "next/image";
import { cn } from "@/shared/utils/utils";
import { outfit } from "./fonts";

const BADGES = ["Expert Judges", "Blind Review", "3 Rounds"] as const;

const CARD_WIDTH = 476;
const CARD_HEIGHT = 258;

export function ScoreCard() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[476px]">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl sm:rounded-[1.25rem]",
          "min-h-[220px] sm:min-h-[236px] md:min-h-[258px]",
        )}
      >
        <Image
          src="/home/Scorebg.png"
          alt=""
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 420px, 476px"
        />

        <div
          className={cn(
            "relative flex min-h-[inherit] w-full min-w-0 flex-col",
            "items-center text-center",
            "gap-6 px-5 py-6",
            "sm:gap-7 sm:px-6 sm:py-7",
            "md:items-start md:text-left",
            "md:gap-0 md:px-8 md:py-8",
            "lg:px-9 lg:py-9",
          )}
        >
          <div className="w-full min-w-0 space-y-2 sm:space-y-2.5 md:space-y-1">
            <p
              className={cn(
                outfit.className,
                "text-[clamp(2.75rem,14vw,5rem)] font-black leading-none tracking-tight text-[#A8CF45]",
                "md:text-[64px] lg:text-[80px]",
              )}
            >
              100
            </p>
            <p
              className={cn(
                outfit.className,
                "text-[15px] font-semibold leading-tight text-white sm:text-[16px] md:text-[20px]",
              )}
            >
              Maximum Score
            </p>
            <p
              className={cn(
                outfit.className,
                "mx-auto max-w-[16rem] text-[12px] font-medium leading-relaxed text-[rgba(255,255,255,0.35)] sm:max-w-none sm:text-[13px] md:mx-0 md:text-[14px]",
              )}
            >
              Across all evaluation criteria
            </p>
          </div>

          <div className="w-full min-w-0 md:mt-auto md:pt-5 lg:pt-6">
            <ul
              className={cn(
                "flex flex-wrap items-center justify-center gap-2",
                "sm:gap-2.5",
                "md:justify-start",
              )}
              aria-label="Evaluation highlights"
            >
              {BADGES.map((badge) => (
                <li key={badge}>
                  <span
                    className={cn(
                      outfit.className,
                      "inline-flex min-h-[28px] items-center justify-center whitespace-nowrap rounded-full",
                      "bg-[rgba(255,255,255,0.05)] px-3.5 text-[11px] font-medium text-[rgba(255,255,255,0.5)]",
                      "sm:min-h-[30px] sm:px-4 sm:text-[12px]",
                      "md:px-5 md:text-[13px]",
                    )}
                  >
                    {badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
