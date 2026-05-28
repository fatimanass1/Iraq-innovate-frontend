import { Container } from "@/shared/components/layout";
import { Reveal, RevealItem, RevealStagger } from "@/shared/animations";
import { MissionCard } from "./MissionCard";
import { MissionContent } from "./MissionContent";

export function MissionSection() {
  return (
    <section
      id="about"
      className="-mt-px scroll-mt-32 bg-[#F6F7F3]"
      aria-labelledby="mission-heading"
    >
      <Container className="max-w-[1400px] py-20 sm:py-24 lg:py-28">
        <Reveal preset="fade-up" amount={0.12}>
          <RevealStagger className="grid items-start gap-12 lg:grid-cols-[496.39px_minmax(0,1fr)] lg:gap-20 xl:gap-24">
            <RevealItem className="justify-self-start" preset="scale-soft">
              <MissionCard />
            </RevealItem>
            <RevealItem className="justify-self-end" preset="fade-up">
              <MissionContent />
            </RevealItem>
          </RevealStagger>
        </Reveal>

        <div
          className="mx-auto mt-14 h-[2px] w-full max-w-[720px] rounded-full bg-[rgba(1,11,24,0.22)] sm:mt-16 lg:mt-20"
          aria-hidden="true"
        />
      </Container>
    </section>
  );
}
