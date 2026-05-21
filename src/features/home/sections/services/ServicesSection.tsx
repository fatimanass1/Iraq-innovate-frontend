"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Section } from "@/components/ui";
import { fadeInUp, staggerContainer } from "@/animations/framer-variants";
import { SERVICES } from "../../constants/home-content";

export function ServicesSection() {
  return (
    <Section id="services" className="bg-muted/30">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="heading-section mb-4">Enterprise Services</h2>
        <p className="text-body">
          Modular capabilities designed to scale from landing pages to full admin systems.
        </p>
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {SERVICES.map((service) => (
          <motion.div key={service.title} variants={fadeInUp}>
            <Card className="h-full">
              <CardHeader>
                <service.icon className="h-8 w-8 text-primary" />
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {service.features.map((feature) => (
                    <li key={feature}>• {feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
