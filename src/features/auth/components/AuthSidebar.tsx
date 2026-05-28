import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/utils";
import { AUTH_SIDEBAR } from "../constants/auth-content";
import { cairo, outfit } from "../fonts";

export function AuthSidebar() {
  return (
    <aside
      className={cn(
        "relative flex w-full shrink-0 flex-col overflow-hidden bg-[#DCE5CB]",
        "min-h-[380px] sm:min-h-[440px]",
        "lg:min-h-screen lg:w-[519px]",
      )}
    >
      <div className="relative z-10 flex h-full flex-col px-8 py-8 sm:px-10 lg:px-[42px] lg:py-10">
        <div className="flex items-start gap-3">
          <Link href="/" aria-label="Iraq Innovate home" className="shrink-0">
            <Image src="/logo1.png" alt="" width={64} height={70} className="h-auto w-14 sm:w-16" />
          </Link>
          <div className="pt-0.5">
            <p
              className={cn(
                outfit.className,
                "text-[11px] font-bold uppercase tracking-[0.14em] text-[#A8CF45]",
              )}
            >
              {AUTH_SIDEBAR.brandTitle}
            </p>
            <p
              className={cn(
                cairo.className,
                "mt-0.5 text-[11px] font-medium text-[rgba(1,11,24,0.45)]",
              )}
              dir="rtl"
              lang="ar"
            >
              {AUTH_SIDEBAR.brandSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-10 text-left lg:mt-12">
          <h1
            className={cn(
              outfit.className,
              "text-[30px] font-extrabold leading-[1.15] text-[#010B18]",
            )}
          >
            {AUTH_SIDEBAR.title}
          </h1>
          <p
            className={cn(
              cairo.className,
              "mt-2 w-fit text-[18px] font-medium leading-snug text-[#010B18]",
            )}
            dir="rtl"
            lang="ar"
          >
            {AUTH_SIDEBAR.subtitle}
          </p>
        </div>

        <div className="relative z-10 mt-12 sm:mt-14 lg:mt-20">
          <div className="ms-auto flex max-w-[360px] flex-col items-end gap-3 pe-1 lg:pe-4">
            <p
              className={cn(
                cairo.className,
                "w-full text-right text-[47.81px] font-extrabold leading-[1.05] text-[#010B18]",
              )}
              dir="rtl"
              lang="ar"
            >
              {AUTH_SIDEBAR.logoArabic}
            </p>
            <p
              className={cn(
                outfit.className,
                "w-full text-right text-[24px] font-bold leading-tight text-[rgba(1,11,24,0.65)]",
              )}
            >
              {AUTH_SIDEBAR.logoEnglish}
            </p>
            <p
              className={cn(
                cairo.className,
                "w-full text-right text-[14px] leading-[1.7] text-[rgba(1,11,24,0.55)]",
              )}
              dir="rtl"
              lang="ar"
            >
              {AUTH_SIDEBAR.description}
            </p>
          </div>
        </div>

        <p
          className={cn(
            outfit.className,
            "mt-auto pt-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-[rgba(1,11,24,0.4)] lg:pt-12",
          )}
        >
          {AUTH_SIDEBAR.footer}
        </p>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute right-0 z-0 max-w-none origin-bottom-right",
          "bottom-[22%] w-[460px] translate-x-1/2 translate-y-1/2 opacity-[0.1]",
          "sm:bottom-[26%] sm:w-[540px] sm:opacity-[0.11]",
          "lg:bottom-[30%] lg:w-[640px]",
        )}
        aria-hidden="true"
      >
        <Image
          src="/auth/star.png"
          alt=""
          width={640}
          height={640}
          className="h-auto w-full origin-center animate-auth-star-rotate"
        />
      </div>
    </aside>
  );
}
