"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/animations/framer-variants";
import { STATS } from "../../constants/home-content";

export function StatsSection() {
  return (
    <Section id="stats">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="surface-card p-6 text-center"
          >
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="mt-2 text-sm font-medium">{stat.label}</p>
            <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
