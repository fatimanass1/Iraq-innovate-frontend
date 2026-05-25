"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { cairo } from "./fonts";

interface FaqItemProps {
  question: string;
}

export function FaqItem({ question }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <article
      className={cn(
        "w-full max-w-[720px] overflow-hidden rounded-[24px]",
        "bg-[rgba(255,255,255,0.45)] transition-[background-color] duration-300",
        "hover:bg-[rgba(255,255,255,0.65)]",
      )}
      style={{ border: "1px solid rgba(7, 8, 12, 0.035)" }}
    >
      <button
        type="button"
        className={cn(
          cairo.className,
          "flex h-[76px] w-full items-center justify-between gap-4 px-6 text-right sm:px-8",
          "outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0",
        )}
        dir="rtl"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="flex-1 text-[17px] font-semibold leading-snug text-[#010B18] sm:text-[18px]">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-[#A8CF45] transition-transform duration-300 ease-out",
            isOpen && "rotate-180",
          )}
          strokeWidth={2.25}
          aria-hidden="true"
        />
      </button>

      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            role="region"
            aria-hidden={!isOpen}
            className="px-6 pb-6 pt-5 sm:px-8"
            style={{ borderTop: "1px solid rgba(7, 8, 12, 0.04)" }}
            dir="rtl"
          >
            {/* Answer area intentionally empty */}
            <div className="min-h-[48px]" aria-hidden="true" />
          </div>
        </div>
      </div>
    </article>
  );
}
