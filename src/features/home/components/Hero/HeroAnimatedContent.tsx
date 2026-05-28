"use client";

import type { ReactNode } from "react";
import { Reveal, RevealHero, RevealHeroItem } from "@/shared/animations";

type HeroAnimatedContentProps = {
  badge: ReactNode;
  title: ReactNode;
  description: ReactNode;
  ctas: ReactNode;
  partners: ReactNode;
};

export function HeroAnimatedContent({
  badge,
  title,
  description,
  ctas,
  partners,
}: HeroAnimatedContentProps) {
  return (
    <>
      <RevealHero className="flex w-full flex-col items-center">
        <RevealHeroItem>{badge}</RevealHeroItem>
        <RevealHeroItem>{title}</RevealHeroItem>
        <RevealHeroItem>{description}</RevealHeroItem>
        <RevealHeroItem>{ctas}</RevealHeroItem>
      </RevealHero>

      <div className="mt-auto flex w-full justify-center pt-10">
        <Reveal preset="fade" amount={0.4} duration={0.7}>
          {partners}
        </Reveal>
      </div>
    </>
  );
}
