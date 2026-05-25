import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cairo, Outfit } from "next/font/google";
import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

function FooterCTABackground() {
  return (
    <>
      <Image
        src="/footerPic.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#010B18]/45" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_50%_45%,rgba(168,207,69,0.08),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_40%,rgba(1,11,24,0.55)_100%)]"
        aria-hidden="true"
      />
    </>
  );
}

export function FooterCTA() {
  return (
    <section
      className="relative overflow-hidden bg-[#010B18]"
      aria-labelledby="footer-cta-heading"
    >
      <div className="absolute inset-0 z-0">
        <FooterCTABackground />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center py-24 text-center sm:py-28 md:py-32 lg:py-36">
          <p
            className={cn(
              outfit.className,
              "mb-6 text-xs font-semibold tracking-[0.38em] text-[#A8CF45] sm:text-sm sm:tracking-[0.42em]",
            )}
          >
            THE TIME IS NOW
          </p>

          <h2
            id="footer-cta-heading"
            className={cn(
              outfit.className,
              "mb-8 text-[clamp(2.75rem,8vw,5.5rem)] font-black leading-[1.05] tracking-tight",
            )}
          >
            <span className="block text-[#F5F7FA]">Turn Your Idea</span>
            <span className="block text-[#A8CF45] [text-shadow:0_0_14px_rgba(168,207,69,0.12)]">
              Into Impact.
            </span>
          </h2>

          <p
            className={cn(
              cairo.className,
              "mb-10 max-w-3xl text-base leading-relaxed text-[rgba(255,255,255,0.65)] sm:text-lg sm:leading-8 md:mb-12",
            )}
            dir="rtl"
            lang="ar"
          >
            انضم إلى مئات المبتكرين العراقيين الذين يبنون المستقبل بالفعل. فكرتك تستحق منصة
            عالمية.
          </p>

          <Link
            href="#join"
            dir="rtl"
            lang="ar"
            className={cn(
              cairo.className,
              "inline-flex h-[3.25rem] items-center justify-center gap-2.5 rounded-full bg-[#A8CF45] px-10 text-[17px] font-bold text-[#010B18]",
              "shadow-[0_4px_20px_rgba(168,207,69,0.28)] transition-all duration-300 ease-out",
              "hover:scale-[1.03] hover:bg-[#b5d84f] hover:shadow-[0_6px_26px_rgba(168,207,69,0.34)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
            )}
          >
            <span>شارك مشروعك الآن</span>
            <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </Link>

          <div className="mt-8 flex justify-center sm:mt-10">
            <Image
              src="/footerdots.png"
              alt=""
              width={520}
              height={52}
              className="h-auto w-[440px] max-w-full opacity-80 sm:w-[520px]"
            />
          </div>
        </div>

        <div className="border-t border-solid border-[rgba(255,255,255,0.05)]">
          <div className="flex flex-col items-center justify-between gap-5 py-6 sm:flex-row sm:gap-6 sm:py-7">
            <div className="flex items-center gap-3 sm:justify-self-start">
              <Image
                src="/logo1.png"
                alt="Iraq Innovate logo"
                width={48}
                height={52}
                className="shrink-0"
              />
              <p className="text-sm text-[rgba(255,255,255,0.55)]">
                Innovate Iraq · العراق يبتكر
              </p>
            </div>

            <p className="text-center text-xs text-[rgba(255,255,255,0.25)] sm:text-right sm:text-sm">
              © 2025 Innovate Iraq. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
