import Image from "next/image";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { cairo, outfit } from "./fonts";
import { ProgressBar } from "./ProgressBar";

export function MissionCard() {
  return (
    <div className="relative w-full max-w-[496.39px]">
      <div
        className={cn(
          "relative flex h-[326px] w-full flex-col overflow-visible rounded-3xl bg-[#010B18] p-6 pb-24 pr-6 sm:p-7 sm:pb-28 lg:w-[496.39px]",
          "shadow-[0_24px_60px_rgba(1,11,24,0.28),0_8px_24px_rgba(0,0,0,0.12)]",
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              "border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)]",
              "shadow-[0_0_24px_rgba(168,207,69,0.12)]",
            )}
          >
            <Zap className="h-5 w-5 text-[#A8CF45]" strokeWidth={2.25} aria-hidden="true" />
          </div>
          <p
            className={cn(cairo.className, "text-right text-base font-bold text-[#F5F7FA] sm:text-lg")}
            dir="rtl"
            lang="ar"
          >
            منصة الابتكار الوطنية
          </p>
        </div>

        <p
          className={cn(
            outfit.className,
            "mt-4 text-sm leading-relaxed text-[rgba(255,255,255,0.55)]",
          )}
        >
          Connecting Iraq&apos;s talent ecosystem with global opportunities and investors.
        </p>

        <div className="relative z-10 mt-auto space-y-5 pt-8 sm:space-y-6 sm:pt-10">
          <ProgressBar
            label="National Coverage"
            value={75}
            fillWidthClass="w-[75%]"
            dotPositionClass="left-[75%]"
          />
          <ProgressBar
            label="Mentor Network"
            value={88}
            fillWidthClass="w-[88%]"
            dotPositionClass="left-[88%]"
          />
        </div>

        <div className="absolute -bottom-12 -right-4 z-[1] hidden translate-x-12 translate-y-16 sm:block sm:-bottom-10 sm:-right-3 sm:translate-x-14 sm:translate-y-14">
          <Image
            src="/home/2025badge.png"
            alt=""
            width={156}
            height={138}
            className="h-[138px] w-[155.86px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.16)]"
          />
        </div>
      </div>
    </div>
  );
}
