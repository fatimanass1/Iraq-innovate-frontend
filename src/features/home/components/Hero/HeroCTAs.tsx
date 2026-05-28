"use client";

import { ArrowRight } from "lucide-react";
import { Cairo, Outfit } from "next/font/google";
import { useProtectedNavigation } from "@/features/auth/hooks/useProtectedNavigation";
import { cn } from "@/shared/utils/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export function HeroCTAs() {
  const { navigateToDashboard, navigateToProjectSubmit } = useProtectedNavigation();

  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
      <button
        type="button"
        dir="rtl"
        lang="ar"
        onClick={navigateToProjectSubmit}
        className={cn(
          outfit.className,
          "inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-[#A8CF45] px-10 text-[17px] font-semibold text-[#010B18]",
          "shadow-[0_4px_20px_rgba(168,207,69,0.4)] transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:bg-[#b5d84f] hover:shadow-[0_6px_28px_rgba(168,207,69,0.5)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        )}
      >
        <span>شارك مشروعك</span>
        <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      </button>

      <button
        type="button"
        dir="rtl"
        lang="ar"
        onClick={navigateToDashboard}
        className={cn(
          cairo.className,
          outfit.className,
          "inline-flex h-[3.25rem] items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.15)] bg-transparent px-10 text-[17px] font-medium text-white",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:bg-[#A8CF45]/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        )}
      >
        تتبع مشروعك
      </button>
    </div>
  );
}
