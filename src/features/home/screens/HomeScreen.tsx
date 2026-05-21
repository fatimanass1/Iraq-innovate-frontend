"use client";

import { HeroSection } from "../sections/hero/HeroSection";
import { ServicesSection } from "../sections/services/ServicesSection";
import { StatsSection } from "../sections/stats/StatsSection";
import { TestimonialsSection } from "../sections/testimonials/TestimonialsSection";
import { FaqSection } from "../sections/faq/FaqSection";
import { ContactSection } from "../sections/contact/ContactSection";

export function HomeScreen() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
    </>
  );
}
