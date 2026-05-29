"use client";

import { X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { scaleSoftVariants } from "@/shared/animations/variants";
import { DURATION, EASING } from "@/shared/animations/constants";
import {
  MEDIA_UPLOAD_COPY,
  MEDIA_UPLOAD_THEME as M,
} from "../../../constants/media-upload";
import type { MediaFileEntry } from "../../../hooks/useMediaUpload";
import { MediaBlobPreview } from "./MediaBlobPreview";

type MediaPreviewCardProps = {
  entry: MediaFileEntry;
  onRemove: (id: string) => void;
};

export function MediaPreviewCard({ entry, onRemove }: MediaPreviewCardProps) {
  const reduceMotion = useReducedMotion();
  const isUploading = entry.status === "uploading";

  return (
    <motion.li
      layout={!reduceMotion}
      variants={reduceMotion ? undefined : scaleSoftVariants}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.92,
              transition: { duration: DURATION.fast, ease: EASING.smooth },
            }
      }
      className="group relative isolate shrink-0 list-none overflow-hidden"
      style={{
        width: M.cardWidth,
        height: M.cardHeight,
        borderRadius: M.cardRadius,
        backgroundColor: M.cardBg,
        boxShadow: M.cardRing,
      }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              boxShadow: M.cardHoverRing,
              transition: { duration: DURATION.fast, ease: EASING.smooth },
            }
      }
    >
      <MediaBlobPreview
        file={entry.file}
        kind={entry.kind}
        url={entry.previewUrl}
        className="size-full"
      />

      {isUploading ? (
        <div
          className="pointer-events-none absolute inset-0 flex items-end bg-[rgba(1,11,24,0.08)]"
          aria-hidden="true"
        >
          <div className="h-1 w-full bg-black/5">
            <motion.div
              className="h-full"
              style={{ background: M.progressGradient }}
              initial={{ width: 0 }}
              animate={{ width: `${entry.progress}%` }}
              transition={{ duration: 0.15, ease: EASING.smooth }}
            />
          </div>
        </div>
      ) : null}

      {!isUploading ? (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ backgroundColor: M.cardHoverOverlay }}
        >
          <button
            type="button"
            onClick={() => onRemove(entry.id)}
            aria-label={`${MEDIA_UPLOAD_COPY.removeFileAria}: ${entry.file.name}`}
            className="flex items-center justify-center transition-transform duration-200 hover:scale-105"
            style={{
              width: M.deleteBtnSize,
              height: M.deleteBtnSize,
              borderRadius: M.deleteBtnRadius,
              backgroundColor: M.deleteBtnBg,
            }}
          >
            <X className="size-3.5 text-white" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      ) : null}
    </motion.li>
  );
}
