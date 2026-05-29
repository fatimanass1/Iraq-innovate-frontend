"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import {
  SUBMIT_PROJECT_SIDEBAR,
  SUBMIT_PROJECT_STEPS,
} from "../constants/submit-project-content";
import { SUBMIT_SUCCESS_SIDEBAR_STEP_5 } from "../constants/submit-success";
import { SUBMIT_PROJECT_THEME as T } from "../constants/submit-project-theme";
import { submitCairo, submitMono, submitOutfit } from "../utils/fonts";
import type { SubmitProjectStep } from "../types/wizard.types";

type SubmitProjectSidebarProps = {
  currentStep: SubmitProjectStep;
  progressPercent: number;
  /** Figma success frame — 100% progress and step 5 success labels */
  isSuccess?: boolean;
};

export function SubmitProjectSidebar({
  currentStep,
  progressPercent,
  isSuccess = false,
}: SubmitProjectSidebarProps) {
  const displayProgress = isSuccess ? 100 : progressPercent;
  return (
    <aside
      className="relative flex w-full shrink-0 flex-col overflow-hidden lg:w-[519px] lg:min-h-screen"
      style={{ background: T.sidebarGradient }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -left-40 -top-40 size-[480px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(163, 230, 53, 0.12) 0%, rgba(0, 0, 0, 0) 65%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 size-[400px] translate-x-1/4 translate-y-1/4 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, rgba(0, 0, 0, 0) 65%)",
          }}
        />
        <div className="absolute bottom-[22%] right-0 w-[640px] max-w-none translate-x-1/2 opacity-[0.07]">
          <Image
            src="/auth/star.png"
            alt=""
            width={640}
            height={640}
            className="h-auto w-full animate-auth-star-rotate"
          />
        </div>
      </div>

      <div className="relative z-10 flex min-h-full flex-col px-8 py-9 sm:px-10 lg:px-10 lg:py-9">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Iraq Innovate home" className="shrink-0">
            <div
              className="flex size-10 items-center justify-center rounded-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(163, 230, 53, 0.3) 0%, rgba(6, 182, 212, 0.12) 100%)",
                boxShadow:
                  "0px 0px 14px 0px rgba(163, 230, 53, 0.12), 0px 0px 0px 1px rgba(163, 230, 53, 0.3)",
              }}
            >
              <Image src="/logo1.png" alt="" width={32} height={32} className="size-8" />
            </div>
          </Link>
          <div>
            <p
              className={cn(
                submitOutfit.className,
                "text-[11px] font-bold uppercase tracking-[0.22em]",
              )}
              style={{ color: T.brandGreen }}
            >
              {SUBMIT_PROJECT_SIDEBAR.brandTitle}
            </p>
            <p
              className={cn(submitCairo.className, "text-[11px] leading-[16.5px]")}
              style={{ color: T.titleAr }}
              dir="rtl"
            >
              {SUBMIT_PROJECT_SIDEBAR.brandSubtitle}
            </p>
          </div>
        </div>

        <div className="mt-8 text-left lg:mt-10">
          <h1
            className={cn(
              submitOutfit.className,
              "bg-clip-text text-[30px] font-extrabold leading-[37.5px] text-transparent",
            )}
            style={{
              backgroundImage:
                "linear-gradient(140deg, rgba(17, 19, 24, 1) 12%, rgba(61, 107, 0, 1) 55%, rgba(0, 115, 168, 1) 100%)",
            }}
          >
            {SUBMIT_PROJECT_SIDEBAR.title}
          </h1>
          <p
            className={cn(
              submitCairo.className,
              "mt-3.5 text-end text-[19px] leading-[26.13px]",
            )}
            style={{ color: T.brandSubtitle }}
            dir="rtl"
          >
            {SUBMIT_PROJECT_SIDEBAR.subtitle}
          </p>
          <p
            className={cn(
              submitOutfit.className,
              "mt-3.5 max-w-[322px] text-end text-[14px] leading-[22.75px]",
            )}
            style={{ color: T.titleAr }}
            dir="rtl"
          >
            {SUBMIT_PROJECT_SIDEBAR.description}
          </p>
        </div>

        <div className="mt-8 lg:mt-10">
          <div className="mb-2 flex items-center justify-between">
            <span
              className={cn(
                submitMono.className,
                "text-[10px] font-normal uppercase tracking-[0.1em]",
              )}
              style={{ color: T.progressLabel }}
            >
              {SUBMIT_PROJECT_SIDEBAR.progressLabel}
            </span>
            <span
              className={cn(submitMono.className, "text-[16px] font-medium leading-[15px]")}
              style={{ color: T.progressValue }}
            >
              {displayProgress}%
            </span>
          </div>
          <div
            className="h-[2px] w-full overflow-hidden rounded-full"
            style={{ backgroundColor: T.progressTrack }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${displayProgress}%`,
                background: T.progressFill,
                boxShadow: T.progressGlow,
              }}
            />
          </div>
        </div>

        <ol className="mt-8 space-y-0 lg:mt-10">
          {SUBMIT_PROJECT_STEPS.map((item, index) => {
            const isActive = item.id === currentStep;
            const isCompleted = item.id < currentStep;
            const isLast = index === SUBMIT_PROJECT_STEPS.length - 1;
            const titleEn =
              isSuccess && item.id === 5
                ? SUBMIT_SUCCESS_SIDEBAR_STEP_5.titleEn
                : item.titleEn;
            const titleAr =
              isSuccess && item.id === 5
                ? SUBMIT_SUCCESS_SIDEBAR_STEP_5.titleAr
                : item.titleAr;

            return (
              <li
                key={item.id}
                className={cn("flex gap-4", isLast ? "min-h-0" : "min-h-[58px]")}
              >
                <div className="flex flex-col items-center">
                  <div
                    className="flex size-7 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: isCompleted
                        ? T.completedStepBg
                        : isActive
                          ? T.activeStepBg
                          : T.inactiveStepBg,
                      boxShadow: isCompleted
                        ? T.completedStepGlow
                        : isActive
                          ? T.activeStepRing
                          : undefined,
                    }}
                  >
                    {isCompleted ? (
                      <Check className="size-3 text-[#0A0B0E]" strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <span
                        className={cn(submitMono.className, "text-[12px] font-bold leading-4")}
                        style={{
                          color: isActive ? T.progressValue : T.inactiveStepText,
                        }}
                      >
                        {item.id}
                      </span>
                    )}
                  </div>
                  {!isLast ? (
                    <div
                      className="my-1 w-px flex-1 min-h-[22px]"
                      style={{ backgroundColor: T.connector }}
                    />
                  ) : null}
                </div>
                <div className="pb-4 pt-1">
                  <p
                    className={cn(
                      submitOutfit.className,
                      "text-[16px] font-medium leading-4",
                    )}
                    style={{
                      color: isCompleted
                        ? T.completedStepText
                        : isActive
                          ? T.activeStepText
                          : T.inactiveStepText,
                    }}
                  >
                    {titleEn}
                  </p>
                  <p
                    className={cn(submitCairo.className, "mt-1.5 text-[14px] leading-[15px]")}
                    style={{
                      color: isCompleted
                        ? T.completedStepTextAr
                        : isActive
                          ? T.titleAr
                          : T.inactiveStepTextAr,
                    }}
                    dir="rtl"
                  >
                    {titleAr}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>

        <p
          className={cn(
            submitOutfit.className,
            "mt-auto border-t pt-6 text-[10px] uppercase tracking-[0.1em]",
          )}
          style={{
            borderColor: T.footerBorder,
            color: T.footerText,
          }}
        >
          {SUBMIT_PROJECT_SIDEBAR.footer}
        </p>
      </div>
    </aside>
  );
}
