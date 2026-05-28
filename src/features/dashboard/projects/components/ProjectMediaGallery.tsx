"use client";

import Image from "next/image";
import { ExternalLink, Film, ImageIcon } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { PROJECT_DETAILS_CONTENT } from "../constants/project-details-content";
import { PROJECT_DETAILS_FIGMA } from "../constants/project-details-figma-theme";
import type { ProjectMediaItem } from "../types/project.types";
import { DetailsEmptyState } from "./DetailsEmptyState";
import { ProjectDetailsSectionCard } from "./ProjectDetailsSectionCard";

type ProjectMediaGalleryProps = {
  items: ProjectMediaItem[];
};

export function ProjectMediaGallery({ items }: ProjectMediaGalleryProps) {
  return (
    <ProjectDetailsSectionCard
      title={PROJECT_DETAILS_CONTENT.mediaTitle}
      titleEn={PROJECT_DETAILS_CONTENT.mediaTitleEn}
    >
      {items.length === 0 ? (
        <DetailsEmptyState message={PROJECT_DETAILS_CONTENT.emptyMedia} icon={ImageIcon} />
      ) : (
        <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const href = item.url || item.fileUrl;

            return (
              <article
                key={item.id}
                className="group overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_24px_rgba(1,11,24,0.08)]"
                style={{
                  borderRadius: 16,
                  border: `1px solid ${PROJECT_DETAILS_FIGMA.borderSoft}`,
                  backgroundColor: "rgba(248,250,243,0.65)",
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[rgba(220,229,203,0.2)]">
                  {item.isImage && href ? (
                    <Image
                      src={href}
                      alt={item.typeName}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      unoptimized
                      referrerPolicy="no-referrer"
                    />
                  ) : item.isVideo && href ? (
                    <video
                      src={href}
                      controls
                      className="h-full w-full object-cover"
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 px-3">
                      <Film className="size-8" style={{ color: PROJECT_DETAILS_FIGMA.accentDark }} />
                      {href ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            outfit.className,
                            "inline-flex min-h-[40px] items-center gap-1.5 rounded-full px-4 text-[12px] font-semibold",
                          )}
                          style={{
                            backgroundColor: PROJECT_DETAILS_FIGMA.accent,
                            color: PROJECT_DETAILS_FIGMA.textPrimary,
                          }}
                        >
                          فتح
                          <ExternalLink className="size-3.5" />
                        </a>
                      ) : null}
                    </div>
                  )}
                </div>
                <div
                  className="flex items-center justify-between gap-2 px-3 py-2.5"
                  style={{ borderTop: `1px solid ${PROJECT_DETAILS_FIGMA.divider}` }}
                >
                  <p className={cn(cairo.className, "truncate text-[12px] font-semibold")}>
                    {item.typeName}
                  </p>
                  {href && (item.isImage || item.isVideo) ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        outfit.className,
                        "shrink-0 text-[11px] font-semibold hover:underline",
                      )}
                      style={{ color: PROJECT_DETAILS_FIGMA.accentDark }}
                    >
                      عرض
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </ProjectDetailsSectionCard>
  );
}
