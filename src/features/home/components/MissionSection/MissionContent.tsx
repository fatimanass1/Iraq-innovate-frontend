import Image from "next/image";
import { cn } from "@/lib/utils";
import { cairo, outfit } from "./fonts";

const FEATURES = [
  "وصول وطني يشمل جميع المحافظات الـ18",
  "إرشاد من الخبراء وقادة الابتكار العالميين",
  "مسارات الاستثمار المباشر للمشاريع الناشئة",
] as const;

const greenGlow = "[text-shadow:0_0_14px_rgba(168,207,69,0.14)]";

export function MissionContent() {
  return (
    <div
      id="mission-heading"
      className="flex w-full max-w-xl flex-col justify-center lg:ml-auto lg:max-w-lg"
    >
      <p
        className={cn(
          outfit.className,
          "mb-5 text-xs font-semibold tracking-[0.32em] text-[#A8CF45] sm:text-sm lg:-ml-20 xl:-ml-28",
        )}
      >
        OUR MISSION
      </p>

      <h2
        className={cn(
          cairo.className,
          "mb-5 flex flex-col gap-3 text-right text-[clamp(1.875rem,4vw,3rem)] font-black leading-[1.4] text-[#010B18]",
        )}
        dir="rtl"
        lang="ar"
      >
        <span>بُني من العراق،</span>
        <span className={cn("text-[#A8CF45]", greenGlow)}>ولأجل العراق.</span>
      </h2>

      <h3
        className={cn(
          outfit.className,
          "mb-7 text-[clamp(2.25rem,8vw,5.5rem)] font-black leading-[0.95] tracking-tight text-[#010B18] lg:-ml-20 lg:text-[88px] xl:-ml-28",
        )}
      >
        <span className="block">Built by Iraq,</span>
        <span className={cn("block text-[#A8CF45]", greenGlow)}>for Iraq.</span>
      </h3>

      <p
        className={cn(
          cairo.className,
          "mb-9 ml-auto max-w-[34rem] text-right text-[20px] leading-[1.85] text-[rgba(1,11,24,0.55)]",
        )}
        dir="rtl"
        lang="ar"
      >
        يملك جيل العراق القادم القدرة على إعادة التشكيل، ومنصة &ldquo;العراق يبتكر&rdquo; هي المكان
        الذي تُدرك فيه هذه القدرة، وتُعززها، وتُطلقها على الساحة العالمية.
      </p>

      <ul className="ml-auto max-w-[34rem] space-y-5" dir="rtl">
        {FEATURES.map((item) => (
          <li key={item} className="flex items-start gap-3.5 text-right">
            <Image
              src="/home/CountDot.png"
              alt=""
              width={18}
              height={18}
              className="mt-1.5 size-[18px] shrink-0"
            />
            <span
              className={cn(
                cairo.className,
                "flex-1 text-[18px] font-medium leading-[1.75] text-[rgba(1,11,24,0.65)]",
              )}
              lang="ar"
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
