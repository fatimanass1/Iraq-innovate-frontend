import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";
import { JourneyLine } from "./JourneyLine";
import { JourneyStep } from "./JourneyStep";
import { cairo, outfit } from "./fonts";
import { JOURNEY_STEPS } from "./journeySteps";

const greenGlow = "[text-shadow:0_0_14px_rgba(168,207,69,0.14)]";

export function JourneySection() {
  return (
    <section
      id="journey"
      className="scroll-mt-32 overflow-x-hidden bg-[#F6F7F3]"
      aria-labelledby="journey-heading"
    >
      <Container className="max-w-[1400px] py-16 sm:py-20 lg:py-28">
        <header className="ml-auto flex w-full min-w-0 flex-col items-end text-right">
          <p
            className={cn(
              outfit.className,
              "mb-4 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#A8CF45] sm:mb-5",
            )}
          >
            YOUR PATH FORWARD
          </p>

          <h2
            id="journey-heading"
            className={cn(
              outfit.className,
              "max-w-full text-[clamp(1.875rem,6vw,4.5rem)] font-black leading-[0.95] tracking-tight text-[#010B18] lg:w-max lg:whitespace-nowrap lg:text-[72px]",
            )}
          >
            <span className="text-[#010B18]">The Innovation </span>
            <span className={cn("text-[#A8CF45]", greenGlow)}>Journey</span>
          </h2>

          <p
            className={cn(
              cairo.className,
              "mt-2 max-w-full text-[clamp(1.875rem,6vw,4.5rem)] font-black leading-[0.95] text-[#010B18] sm:mt-3 lg:w-max lg:whitespace-nowrap lg:text-[72px]",
            )}
            dir="rtl"
            lang="ar"
          >
            <span>رحلة </span>
            <span className={cn("text-[#A8CF45]", greenGlow)}>الاختبار</span>
          </p>

          <p
            className={cn(
              cairo.className,
              "mt-5 max-w-[520px] text-base leading-[1.75] text-[rgba(1,11,24,0.45)] sm:mt-7 sm:text-[18px]",
            )}
            dir="rtl"
            lang="ar"
          >
            خمس مراحل. مستقبل عراقي واحد.
            <br />
            من الأفكار الجريئة إلى الأثر الحقيقي.
          </p>
        </header>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          {/* Mobile & tablet: horizontal scroll */}
          <div
            className={cn(
              "-mx-6 overflow-x-auto overscroll-x-contain px-6 pb-4",
              "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
              "snap-x snap-mandatory",
              "md:-mx-4 md:px-4",
              "lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0 lg:snap-none",
            )}
          >
            <div className="relative w-max min-w-full lg:w-full lg:min-w-0">
              <JourneyLine />

              <div
                className={cn(
                  "relative z-10 flex w-max min-w-full items-start",
                  "gap-8 snap-x snap-mandatory",
                  "sm:gap-6",
                  "md:gap-5",
                  "lg:w-full lg:justify-between lg:gap-8 lg:snap-none",
                )}
              >
                {JOURNEY_STEPS.map((step) => (
                  <JourneyStep key={step.number} step={step} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
