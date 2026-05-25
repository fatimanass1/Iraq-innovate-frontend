import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Cairo, Outfit } from "next/font/google";
import { Container } from "@/components/shared";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const STATS = [
  { value: "500+", label: "مبتكر" },
  { value: "8", label: "مجالات" },
  { value: "18", label: "مشروع" },
] as const;

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

function HeroCTAs() {
  return (
    <div className="mb-20 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
      <Link
        href="#join"
        dir="rtl"
        lang="ar"
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
      </Link>
      <Link
        href="#track"
        dir="rtl"
        lang="ar"
        className={cn(
          outfit.className,
          "inline-flex h-[3.25rem] items-center justify-center rounded-full border border-solid border-[rgba(255,255,255,0.15)] bg-transparent px-10 text-[17px] font-medium text-white",
          "transition-all duration-300 ease-out",
          "hover:scale-[1.03] hover:bg-[#A8CF45]/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#010B18]",
        )}
      >
        تتبع مشروعك
      </Link>
    </div>
  );
}

function HeroStats() {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-3 gap-6 sm:gap-12 md:gap-16">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center">
          <p className="w-full text-center text-3xl font-extrabold text-[#A8CF45] sm:text-4xl md:text-[2.75rem] md:leading-none">
            {stat.value}
          </p>
          <p
            className={cn(
              outfit.className,
              "mt-2.5 w-full text-center text-sm text-[rgba(255,255,255,0.7)] sm:text-base",
            )}
            dir="rtl"
            lang="ar"
          >
            {stat.label}
          </p>
        </div>
      ))}
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
        <div className="flex w-full flex-col items-center">
          <HeroBadge />
          <div id="hero-title">
            <HeroTitle />
          </div>
          <HeroDescription />
          <HeroCTAs />
        </div>

        <div className="mt-auto flex w-full justify-center pt-10">
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}
