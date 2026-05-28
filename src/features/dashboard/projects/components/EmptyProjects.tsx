"use client";

import { FolderOpen } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { PROJECTS_THEME as P } from "../constants/projects-theme";
import { cairo } from "@/features/dashboard/fonts";

type EmptyProjectsProps = {
  className?: string;
  message?: string;
};

export function EmptyProjects({ className, message }: EmptyProjectsProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        className,
      )}
      style={{ paddingTop: P.emptyTopGap, paddingBottom: P.emptyTopGap }}
    >
      <div
        className="mb-3 flex size-12 items-center justify-center rounded-2xl"
        style={{ backgroundColor: "rgba(168, 207, 69, 0.18)" }}
      >
        <FolderOpen
          className="size-5 stroke-[1.75] text-[rgba(1,11,24,0.45)]"
          aria-hidden="true"
        />
      </div>
      <p
        className={cn(cairo.className, "text-[14px] font-bold text-[#010B18]")}
        lang="ar"
      >
        لا توجد مشاريع مطابقة
      </p>
      <p
        className={cn(
          cairo.className,
          "mt-1 max-w-xs text-[12px] font-medium text-[rgba(1,11,24,0.45)]",
        )}
        lang="ar"
      >
        {message ?? "جرّب تغيير الفلتر أو البحث عن مشروع آخر."}
      </p>
    </div>
  );
}
