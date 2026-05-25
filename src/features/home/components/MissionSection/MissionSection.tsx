import { Container } from "@/components/shared";
import { MissionCard } from "./MissionCard";
import { MissionContent } from "./MissionContent";

export function MissionSection() {
  return (
    <section className="-mt-px bg-[#F6F7F3]" aria-labelledby="mission-heading">
      <Container className="max-w-[1400px] py-20 sm:py-24 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-[496.39px_minmax(0,1fr)] lg:gap-20 xl:gap-24">
          <div className="justify-self-start">
            <MissionCard />
          </div>
          <div className="justify-self-end">
            <MissionContent />
          </div>
        </div>
      </Container>
    </section>
  );
}
