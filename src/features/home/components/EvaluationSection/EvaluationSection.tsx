import { Container } from "@/shared/components/layout";
import { Reveal, RevealItem, RevealStagger } from "@/shared/animations";
import { cn } from "@/shared/utils/utils";
import { ScoreBar } from "./ScoreBar";
import { ScoreCard } from "./ScoreCard";
import { cairo, outfit } from "./fonts";
import { SCORING_CRITERIA } from "./scoringCriteria";

const greenGlow = "[text-shadow:0_0_14px_rgba(168,207,69,0.14)]";

export function EvaluationSection() {
  return (
    <section className="overflow-x-hidden bg-[#010B18]" aria-labelledby="evaluation-heading">
      <Container className="max-w-[1400px] py-20 pl-4 pr-6 sm:py-24 sm:pl-5 sm:pr-8 lg:py-28 xl:pl-5 xl:pr-12 2xl:pl-6">
        <div className="flex flex-col gap-12 xl:flex-row xl:items-start xl:justify-start xl:gap-16 2xl:gap-24">
          <Reveal className="order-2 min-w-0 w-full shrink-0 xl:order-1 xl:w-[593px] xl:max-w-[593px]" preset="fade-up">
            <RevealStagger className="space-y-8 xl:space-y-9 xl:pt-4" stagger={0.08}>
              {SCORING_CRITERIA.map((criterion) => (
                <RevealItem key={criterion.labelEn}>
                  <ScoreBar criterion={criterion} />
                </RevealItem>
              ))}
            </RevealStagger>
          </Reveal>

          <div className="relative order-1 flex min-w-0 w-full flex-col items-end text-right xl:order-2 xl:ml-auto xl:max-w-[540px] xl:shrink-0">
            <Reveal preset="fade-up" amount={0.15}>
              <div className="relative w-full min-w-0">
                <div className="flex flex-col items-end space-y-8">
                  <p
                    className={cn(
                      outfit.className,
                      "text-[12px] font-semibold uppercase tracking-[0.32em] text-[#A8CF45]",
                    )}
                  >
                    SCORING SYSTEM
                  </p>

                  <h2
                    id="evaluation-heading"
                    className={cn(
                      outfit.className,
                      "text-[clamp(2rem,4.5vw,64px)] font-black leading-[0.95] tracking-tight text-white lg:text-[64px] xl:whitespace-nowrap",
                    )}
                  >
                    <span className="text-white">How We </span>
                    <span className={cn("text-[#A8CF45]", greenGlow)}>Evaluate</span>
                  </h2>

                  <p
                    className={cn(
                      cairo.className,
                      "text-[clamp(2rem,4.5vw,64px)] font-black leading-[0.95] text-white lg:text-[64px] xl:whitespace-nowrap",
                    )}
                    dir="rtl"
                    lang="ar"
                  >
                    <span className="text-white">كيف نقوم </span>
                    <span className={cn("text-[#A8CF45]", greenGlow)}>بالتقييم</span>
                  </p>
                </div>

                <p
                  className={cn(
                    cairo.className,
                    "mt-11 text-[18px] leading-[1.75] text-[rgba(255,255,255,0.45)] sm:mt-12",
                  )}
                  dir="rtl"
                  lang="ar"
                >
                  يضمن إطار عملنا متعدد الأبعاد تقييم كل فكرة بشكل عادل من قبل لجنة من خبراء المجال
                  وقادة الصناعة.
                </p>
              </div>
            </Reveal>

            <Reveal
              className="relative mt-16 flex w-full min-w-0 justify-center sm:mt-20 md:justify-end xl:mt-24"
              preset="scale-soft"
            >
              <ScoreCard />
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
