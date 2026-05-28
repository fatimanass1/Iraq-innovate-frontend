"use client";

import Link from "next/link";
import { AlertCircle, Lock, SearchX, WifiOff } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECTS_CONTENT } from "../constants/projects-content";
import {
  getProjectDetailsErrorKind,
  getProjectDetailsErrorMessage,
} from "../hooks/project.errors";

type ProjectDetailsErrorStateProps = {
  error: unknown;
  onRetry?: () => void;
  className?: string;
};

const ERROR_META = {
  unauthorized: {
    icon: Lock,
    title: "يلزم تسجيل الدخول",
    description: "سجّل الدخول لعرض تفاصيل هذا المشروع.",
  },
  forbidden: {
    icon: Lock,
    title: "لا يمكن الوصول للمشروع",
    description: "هذا المشروع لا يخص حسابك الحالي.",
  },
  not_found: {
    icon: SearchX,
    title: "المشروع غير موجود",
    description: "ربما تم حذف المشروع أو أن الرابط غير صحيح.",
  },
  network: {
    icon: WifiOff,
    title: "تعذر الاتصال",
    description: "تحقق من اتصال الإنترنت ثم أعد المحاولة.",
  },
  unknown: {
    icon: AlertCircle,
    title: "تعذر تحميل تفاصيل المشروع",
    description: "حدث خطأ غير متوقع أثناء جلب بيانات المشروع.",
  },
} as const;

export function ProjectDetailsErrorState({
  error,
  onRetry,
  className,
}: ProjectDetailsErrorStateProps) {
  const kind = getProjectDetailsErrorKind(error);
  const meta = ERROR_META[kind];
  const Icon = meta.icon;
  const apiMessage = getProjectDetailsErrorMessage(error);

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-[560px] flex-col items-center justify-center px-4 py-16 sm:px-6",
        className,
      )}
      role="alert"
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-[rgba(239,68,68,0.12)] text-[#DC2626]">
        <Icon className="size-7" strokeWidth={1.75} aria-hidden="true" />
      </div>

      <h2 className={cn(cairo.className, "mt-4 text-center text-[18px] font-bold text-[#010B18]")} lang="ar">
        {meta.title}
      </h2>

      <p
        className={cn(
          cairo.className,
          "mt-2 text-center text-[14px] font-medium text-[rgba(1,11,24,0.55)]",
        )}
        lang="ar"
      >
        {meta.description}
      </p>

      {apiMessage && kind !== "unknown" ? (
        <p
          className={cn(
            outfit.className,
            "mt-2 text-center text-[12px] text-[rgba(1,11,24,0.42)]",
          )}
        >
          {apiMessage}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className={cn(
              outfit.className,
              "inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#010B18] px-6 text-[13px] font-semibold text-white",
              "transition-colors hover:bg-[rgba(1,11,24,0.9)]",
            )}
          >
            {PROJECTS_CONTENT.retry}
          </button>
        ) : null}

        <Link
          href={ROUTES.MY_PROJECTS}
          className={cn(
            outfit.className,
            "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[rgba(1,11,24,0.12)] bg-white px-6 text-[13px] font-semibold text-[#010B18]",
            "transition-colors hover:bg-[rgba(1,11,24,0.03)]",
          )}
        >
          {PROJECTS_CONTENT.detailsBack}
        </Link>
      </div>
    </div>
  );
}
