"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, Section } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/animations/framer-variants";
import { TESTIMONIALS } from "../../constants/home-content";

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-muted/30">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="heading-section mb-4">Trusted by Innovators</h2>
        <p className="text-body">Teams building the future across Iraq and the region.</p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {TESTIMONIALS.map((item) => (
          <motion.div key={item.name} variants={fadeInUp}>
            <Card className="h-full">
              <CardContent className="space-y-4 pt-6">
                <p className="text-sm leading-7 text-muted-foreground">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <CardDescription>{item.role}</CardDescription>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
