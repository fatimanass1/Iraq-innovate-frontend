"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/utils/utils";
import { ADMIN_PROJECT_REVIEW_THEME as T } from "../../constants/admin-project-review-theme";
import { cairo } from "../../fonts";

type AdminReviewSectionCardProps = {
  title: string;
  icon?: ReactNode;
  accentBorder?: boolean;
  variant?: "main" | "sidebar";
  children: ReactNode;
  className?: string;
};

export function AdminReviewSectionCard({
  title,
  icon,
  accentBorder = false,
  variant = "main",
  children,
  className,
}: AdminReviewSectionCardProps) {
  const isSidebar = variant === "sidebar";

  return (
    <section
      className={cn("flex w-full min-w-0 flex-col", className)}
      style={{
        gap: T.cardGap,
        padding: T.cardPadding,
        borderRadius: T.cardRadius,
        backgroundColor: T.cardBg,
        border: `1px solid ${accentBorder ? T.cardBorderAccent : T.cardBorder}`,
        boxShadow: T.cardShadow,
      }}
    >
      <header className="flex items-center justify-end gap-2">
        {icon}
        <h2
          className={cn(cairo.className, "font-bold text-[#010B18]")}
          style={
            isSidebar
              ? {
                  fontSize: T.sidebarLabelSize,
                  lineHeight: `${T.sidebarLabelLineHeight}px`,
                  letterSpacing: "0.04em",
                  color: T.textLabel,
                }
              : {
                  fontSize: T.sectionTitleSize,
                  lineHeight: `${T.sectionTitleLineHeight}px`,
                }
          }
          lang="ar"
        >
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}
