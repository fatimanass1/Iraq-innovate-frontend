import Image from "next/image";
import { cn } from "@/lib/utils";
import { outfit } from "./fonts";

const BADGES = ["Expert Judges", "Blind Review", "3 Rounds"] as const;

const CARD_WIDTH = 476;
const CARD_HEIGHT = 258;

export function ScoreCard() {
  return (
    <div className="relative mx-auto w-full min-w-0 max-w-[420px] md:mx-0 md:max-w-[476px]">
      <div className="relative w-full overflow-hidden max-md:min-h-[304px] md:min-h-0">
        <Image
          src="/home/Scorebg.png"
          alt=""
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          className={cn(
            "h-full w-full object-cover object-center",
            "absolute inset-0",
            "md:relative md:block md:h-auto md:min-h-0",
          )}
          sizes="(max-width: 768px) 100vw, 476px"
        />
        <div
          className={cn(
            "relative flex flex-col text-left",
            "min-h-[304px] justify-between",
            "px-7 pb-10 pt-9",
            "md:absolute md:inset-0 md:min-h-0 md:justify-start",
            "md:px-8 md:pb-7 md:pt-8",
            "lg:px-9 lg:pb-8 lg:pt-9",
          )}
        >
          <div>
            <p
              className={cn(
                outfit.className,
                "text-[52px] font-black leading-none text-[#A8CF45] md:text-[80px]",
              )}
            >
              100
            </p>
            <p
              className={cn(
                outfit.className,
                "mt-4 text-[16px] font-semibold leading-tight text-white md:mt-3 md:text-[20px]",
              )}
            >
              Maximum Score
            </p>
            <p
              className={cn(
                outfit.className,
                "mt-2.5 text-[13px] font-medium leading-relaxed text-[rgba(255,255,255,0.35)] md:mt-1 md:text-[14px]",
              )}
            >
              Across all evaluation criteria
            </p>
          </div>

          <div className="w-full pt-7 md:mt-auto md:pt-6">
            <div className="flex flex-wrap items-center justify-center gap-2 md:flex-nowrap md:justify-start md:gap-2.5">
              {BADGES.map((badge) => (
                <span
                  key={badge}
                  className={cn(
                    outfit.className,
                    "inline-flex h-[28px] w-[110px] shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-[rgba(255,255,255,0.05)] text-center text-[12px] font-medium text-[rgba(255,255,255,0.5)]",
                    "md:w-[128.66px] md:text-[13px]",
                  )}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
