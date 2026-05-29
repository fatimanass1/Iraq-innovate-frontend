"use client";

import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import {
  SUBMIT_SUCCESS_COPY,
  SUBMIT_SUCCESS_THEME as S,
} from "../../../constants/submit-success";
import { submitCairo, submitMono, submitOutfit } from "../../../utils/fonts";

type SubmitSuccessStepProps = {
  projectId: number;
};

export function SubmitSuccessStep({ projectId }: SubmitSuccessStepProps) {
  return (
    <div
      className="flex w-full flex-col items-center"
      style={{ gap: S.contentGap, maxWidth: S.contentMaxWidth }}
    >
      <div className="flex w-full flex-col items-center text-center">
        <div
          className="relative flex items-center justify-center"
          style={{ width: S.iconSize, height: S.iconSize, marginTop: 64 }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: S.iconOuterRing, opacity: 0.199 }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 115.55,
              height: 115.55,
              backgroundColor: S.iconMiddleRing,
              opacity: 0.14,
            }}
          />
          <div
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: S.iconSize,
              height: S.iconSize,
              backgroundColor: S.iconInnerBg,
              boxShadow: S.iconInnerGlow,
            }}
          >
            <Image
              src="/submit-project/success-check-icon.svg"
              alt=""
              width={44}
              height={44}
              aria-hidden
            />
          </div>
        </div>

        <h2
          className={cn(
            submitOutfit.className,
            "mt-10 text-[30px] font-extrabold leading-9",
          )}
          style={{ color: S.titleEn }}
        >
          {SUBMIT_SUCCESS_COPY.titleEn}
        </h2>

        <p
          className={cn(submitCairo.className, "mt-2 text-[20px] leading-7")}
          style={{ color: S.titleAr }}
          dir="rtl"
        >
          {SUBMIT_SUCCESS_COPY.titleAr}
        </p>

        <p
          className={cn(
            submitOutfit.className,
            "mt-5 max-w-[384px] text-[14px] leading-[22.75px]",
          )}
          style={{ color: S.description }}
          dir="rtl"
        >
          {SUBMIT_SUCCESS_COPY.description}
        </p>

        <div
          className="mt-7 inline-flex h-10 items-center gap-3 rounded-2xl px-5"
          style={{
            backgroundColor: S.idBadgeBg,
            boxShadow: S.idBadgeRing,
          }}
        >
          <span
            className={cn(submitOutfit.className, "text-[12px] leading-4")}
            style={{ color: S.idLabel }}
          >
            {SUBMIT_SUCCESS_COPY.projectIdLabel}
          </span>
          <span
            className={cn(submitMono.className, "text-[14px] font-medium leading-5")}
            style={{ color: S.idValue }}
          >
            {projectId}
          </span>
        </div>
      </div>

      <div
        className="flex items-center justify-center"
        style={{ gap: S.buttonGap, height: S.buttonHeight }}
      >
        <Link
          href={ROUTES.HOME}
          className={cn(
            submitOutfit.className,
            "flex items-center justify-center gap-2.5 rounded-2xl px-0 py-3 text-[14px] font-medium leading-5 transition-opacity hover:opacity-80",
          )}
          style={{
            width: S.buttonWidth,
            backgroundColor: S.buttonBg,
            color: S.buttonText,
          }}
        >
          <Image
            src="/submit-project/success-home-icon.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
          />
          {SUBMIT_SUCCESS_COPY.home}
        </Link>

        <Link
          href={ROUTES.DASHBOARD}
          className={cn(
            submitOutfit.className,
            "flex items-center justify-center gap-2.5 rounded-2xl px-0 py-3 text-[14px] font-medium leading-5 transition-opacity hover:opacity-80",
          )}
          style={{
            width: S.buttonWidth,
            backgroundColor: S.buttonBg,
            color: S.buttonText,
          }}
        >
          {SUBMIT_SUCCESS_COPY.dashboard}
          <Image
            src="/submit-project/success-dashboard-icon.svg"
            alt=""
            width={16}
            height={16}
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
