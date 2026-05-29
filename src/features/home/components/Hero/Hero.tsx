import Image from "next/image";
import { HeroCTAs } from "./HeroCTAs";
import { HeroAnimatedContent } from "./HeroAnimatedContent";
import { Cairo } from "next/font/google";
import { Container } from "@/shared/components/layout";
import { cn } from "@/shared/utils/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const FLOATING_DOTS = [
  {
    className: "top-[14%] left-[7%]",
    size: 16,
    opacity: "opacity-50",
    blur: true,
    drift: "animate-hero-dot-a",
    breatheDelay: "animate-hero-dot-breathe-delay-1",
  },
  {
    className: "top-[22%] left-[18%]",
    size: 24,
    opacity: "opacity-70",
    drift: "animate-hero-dot-b",
    breatheDelay: "animate-hero-dot-breathe-delay-3",
  },
  {
    className: "top-[12%] right-[12%]",
    size: 20,
    opacity: "opacity-60",
    blur: true,
    drift: "animate-hero-dot-c",
    breatheDelay: "animate-hero-dot-breathe-delay-2",
  },
  {
    className: "top-[28%] right-[22%]",
    size: 14,
    opacity: "opacity-45",
    drift: "animate-hero-dot-d",
    breatheDelay: "animate-hero-dot-breathe-delay-4",
  },
  {
    className: "top-[38%] left-[10%]",
    size: 18,
    opacity: "opacity-65",
    blur: true,
    drift: "animate-hero-dot-e",
    breatheDelay: "animate-hero-dot-breathe-delay-1",
  },
  {
    className: "top-[42%] right-[8%]",
    size: 26,
    opacity: "opacity-80",
    drift: "animate-hero-dot-a",
    breatheDelay: "animate-hero-dot-breathe-delay-2",
  },
  {
    className: "top-[48%] left-[28%]",
    size: 12,
    opacity: "opacity-40",
    blur: true,
    drift: "animate-hero-dot-b",
    breatheDelay: "animate-hero-dot-breathe-delay-4",
  },
  {
    className: "top-[52%] right-[30%]",
    size: 16,
    opacity: "opacity-55",
    drift: "animate-hero-dot-c",
    breatheDelay: "animate-hero-dot-breathe-delay-3",
  },
  {
    className: "top-[58%] left-[6%]",
    size: 22,
    opacity: "opacity-70",
    drift: "animate-hero-dot-d",
    breatheDelay: "animate-hero-dot-breathe-delay-1",
  },
  {
    className: "top-[62%] right-[14%]",
    size: 14,
    opacity: "opacity-50",
    blur: true,
    drift: "animate-hero-dot-e",
    breatheDelay: "animate-hero-dot-breathe-delay-2",
  },
  {
    className: "top-[68%] left-[20%]",
    size: 18,
    opacity: "opacity-60",
    drift: "animate-hero-dot-a",
    breatheDelay: "animate-hero-dot-breathe-delay-4",
  },
  {
    className: "top-[72%] right-[26%]",
    size: 20,
    opacity: "opacity-65",
    blur: true,
    drift: "animate-hero-dot-b",
    breatheDelay: "animate-hero-dot-breathe-delay-3",
  },
  {
    className: "top-[76%] left-[42%]",
    size: 12,
    opacity: "opacity-45",
    drift: "animate-hero-dot-c",
    breatheDelay: "animate-hero-dot-breathe-delay-1",
  },
  {
    className: "top-[34%] left-[48%]",
    size: 10,
    opacity: "opacity-35",
    blur: true,
    drift: "animate-hero-dot-d",
    breatheDelay: "animate-hero-dot-breathe-delay-2",
  },
] as const;

interface FloatingDotProps {
  className: string;
  size: number;
  opacity: string;
  drift: string;
  breatheDelay: string;
  blur?: boolean;
}

function FloatingDot({ className, size, opacity, drift, breatheDelay, blur }: FloatingDotProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute select-none",
        className,
        opacity,
        drift,
        blur && "blur-[1.5px]",
      )}
      aria-hidden="true"
    >
      <Image
        src="/home/dot.png"
        alt=""
        width={size}
        height={size}
        className={cn("h-auto w-auto brightness-110 animate-hero-dot-breathe", breatheDelay)}
      />
    </div>
  );
}

function HeroBackground() {
  return (
    <>
      <Image
        src="/home/HeroSection.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 bg-[#010B18]/35"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(168,207,69,0.09),transparent_68%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_100%,rgba(1,11,24,0.15),transparent_55%)]"
        aria-hidden="true"
      />
    </>
  );
}

function HeroLinesOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] select-none opacity-[0.68] mix-blend-screen">
      <Image
        src="/home/stars.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center brightness-[1.45] contrast-[1.4]"
      />
    </div>
  );
}

function HeroBottomShadow() {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-52 sm:h-60 md:h-68">
        <Image
          src="/home/whiteshadow.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_78%]"
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-28 bg-gradient-to-b from-transparent via-[#F6F7F3]/85 to-[#F6F7F3] sm:h-32"
        aria-hidden="true"
      />
    </>
  );
}

function HeroBadge() {
  return (
    <div
      className={cn(
        "mb-10 inline-flex items-center gap-2.5 rounded-full border border-solid border-[rgba(168,207,69,0.25)]",
        "bg-[rgba(168,207,69,0.08)] px-5 py-2",
      )}
    >
      <span className="h-2 w-2 shrink-0 rounded-full bg-[#A8CF45]" aria-hidden="true" />
      <span
        className={cn(cairo.className, "text-sm font-medium text-[#A8CF45] md:text-[15px]")}
        dir="rtl"
        lang="ar"
      >
        المنصة الوطنية للابتكار العراقي
      </span>
    </div>
  );
}

function HeroTitle() {
  return (
    <div className="mb-9 space-y-12">
      <h1
        dir="rtl"
        lang="ar"
        className={cn(
          cairo.className,
          "text-[clamp(3.25rem,10.5vw+0.5rem,8.5rem)] font-black leading-[0.95] tracking-tight antialiased",
        )}
      >
        <span className="text-[#F5F7FA] [text-shadow:0_2px_18px_rgba(0,0,0,0.28)]">
          العراق{" "}
        </span>
        <span
          className={cn(
            "text-[#A8CF45]",
            "[text-shadow:0_0_12px_rgba(168,207,69,0.28),0_0_28px_rgba(168,207,69,0.16),0_0_52px_rgba(168,207,69,0.09)]",
          )}
        >
          يبتكر
        </span>
      </h1>
      <p className="text-sm font-medium tracking-[0.42em] text-[rgba(255,255,255,0.35)] sm:text-base md:tracking-[0.48em]">
        INNOVATE IRAQ
      </p>
    </div>
  );
}

function HeroDescription() {
  return (
    <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed text-[rgba(255,255,255,0.55)] sm:text-lg sm:leading-8">
      A national platform uniting Iraq&apos;s brightest minds — innovators, startups, and
      visionaries — to build tomorrow&apos;s solutions today.
    </p>
  );
}

function HeroPartners() {
  return (
    <div
    className={cn(
      "mx-auto -mt-16 flex w-full max-w-[620px] items-center justify-center gap-1 px-2",
      "sm:-mt-20 sm:max-w-[700px] sm:gap-2",
      "md:-mt-24 md:max-w-[780px] md:gap-3",
    )}
      aria-label="Hero partners"
    >
      <div className="relative h-[44px] w-[176px] sm:h-[52px] sm:w-[220px] md:h-[64px] md:w-[286px]">
        <Image
          src="/home/SasLogo.png"
          alt="Simple Applicable Solutions"
          fill
          sizes="(max-width: 640px) 176px, (max-width: 768px) 220px, 286px"
          className="object-contain opacity-90 drop-shadow-[0_0_12px_rgba(255,255,255,0.12)]"
        />
      </div>

      <div className="relative h-[42px] w-[18px] sm:h-[52px] sm:w-[20px] md:h-[64px] md:w-[22px]">
        <Image
          src="/home/lines.png"
          alt=""
          fill
          sizes="22px"
          className="object-contain opacity-80 mix-blend-screen"
        />
      </div>

      <div className="relative h-[44px] w-[176px] sm:h-[52px] sm:w-[220px] md:h-[64px] md:w-[286px]">
        <Image
          src="/home/iraqLogo.png"
          alt="Innovate Iraq"
          fill
          sizes="(max-width: 640px) 176px, (max-width: 768px) 220px, 286px"
          className="object-contain opacity-92 drop-shadow-[0_0_14px_rgba(168,207,69,0.2)]"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="innovation-areas"
      className="relative min-h-[920px] scroll-mt-32 overflow-hidden bg-[#010B18]"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      <HeroLinesOverlay />

      <div className="absolute inset-0 z-[3]" aria-hidden="true">
        {FLOATING_DOTS.map((dot, index) => (
          <FloatingDot key={index} {...dot} />
        ))}
      </div>

      <HeroBottomShadow />

      <Container className="relative z-10 flex min-h-[920px] flex-col items-center pb-36 pt-28 text-center sm:pt-32 md:pb-40">
        <HeroAnimatedContent
          badge={<HeroBadge />}
          title={
            <div id="hero-title">
              <HeroTitle />
            </div>
          }
          description={<HeroDescription />}
          ctas={<HeroCTAs />}
          partners={<HeroPartners />}
        />
      </Container>
    </section>
  );
}
