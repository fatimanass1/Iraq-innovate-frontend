"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge, Button, Section } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { fadeInUp, staggerContainer } from "@/animations/framer-variants";
import { HERO_CONTENT } from "../../constants/home-content";

export function HeroSection() {
  return (
    <Section className="relative overflow-hidden !pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(20,184,166,0.15),transparent_55%)]" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-4xl text-center"
      >
        <motion.div variants={fadeInUp}>
          <Badge className="mb-6">{HERO_CONTENT.badge}</Badge>
        </motion.div>
        <motion.h1 variants={fadeInUp} className="heading-display mb-6">
          {HERO_CONTENT.title}{" "}
          <span className="text-gradient">{HERO_CONTENT.highlight}</span>
        </motion.h1>
        <motion.p variants={fadeInUp} className="text-body mx-auto mb-8 max-w-2xl text-lg">
          {HERO_CONTENT.description}
        </motion.p>
        <motion.div
          variants={fadeInUp}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="#contact">
            <Button size="lg">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={ROUTES.DASHBOARD}>
            <Button variant="secondary" size="lg">
              <Sparkles className="h-4 w-4" />
              Explore Dashboard
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </Section>
  );
}
