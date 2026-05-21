"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section } from "@/components/ui";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS } from "../../constants/home-content";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="heading-section mb-4">Frequently Asked Questions</h2>
        <p className="text-body">Everything you need to know about the platform architecture.</p>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={item.question} className="surface-card overflow-hidden">
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="font-medium">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 transition-transform",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-sm leading-7 text-muted-foreground">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
