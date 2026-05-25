import {
  EvaluationSection,
  FaqSection,
  FooterCTA,
  Hero,
  JourneySection,
  MissionSection,
} from "@/features/home";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MissionSection />
      <JourneySection />
      <EvaluationSection />
      <FaqSection />
      <FooterCTA />
    </>
  );
}
