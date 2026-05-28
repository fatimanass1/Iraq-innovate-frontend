import { Container } from "@/shared/components/layout";
import { Reveal, RevealItem, RevealStagger } from "@/shared/animations";
import { cn } from "@/shared/utils/utils";
import { FaqItem } from "./FaqItem";
import { FAQ_ITEMS } from "./faqQuestions";
import { outfit } from "./fonts";

const greenGlow = "[text-shadow:0_0_14px_rgba(168,207,69,0.14)]";

export function FaqSection() {
  return (
    <section id="faq" className="scroll-mt-32 bg-[#F6F7F3]" aria-labelledby="faq-heading">
      <Container className="max-w-[1400px] py-20 sm:py-24 lg:py-28">
        <Reveal preset="fade-up" amount={0.25}>
          <header className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <p
              className={cn(
                outfit.className,
                "mb-5 text-[12px] font-semibold uppercase tracking-[0.32em] text-[#A8CF45]",
              )}
            >
              FREQUENTLY ASKED
            </p>

            <h2
              id="faq-heading"
              className={cn(
                outfit.className,
                "text-[clamp(2rem,5.5vw,64px)] font-black leading-[0.95] tracking-tight text-[#010B18] lg:text-[64px]",
              )}
            >
              <span>Got </span>
              <span className={cn("text-[#A8CF45]", greenGlow)}>Questions?</span>
            </h2>
          </header>
        </Reveal>

        <RevealStagger
          className="mx-auto mt-12 flex w-full max-w-[720px] flex-col items-center gap-4 sm:mt-14 sm:gap-5 md:max-w-[680px] lg:mt-16 lg:max-w-[720px]"
          stagger={0.07}
        >
          {FAQ_ITEMS.map((item) => (
            <RevealItem key={item.question} className="w-full" preset="fade-up">
              <FaqItem question={item.question} answer={item.answer} />
            </RevealItem>
          ))}
        </RevealStagger>
      </Container>
    </section>
  );
}
