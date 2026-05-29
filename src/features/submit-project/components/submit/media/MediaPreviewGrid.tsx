"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { staggerContainerVariants } from "@/shared/animations/variants";
import { STAGGER } from "@/shared/animations/constants";
import { MEDIA_UPLOAD_THEME as M } from "../../../constants/media-upload";
import type { MediaFileEntry } from "../../../hooks/useMediaUpload";
import { MediaPreviewCard } from "./MediaPreviewCard";
import { UploadPlaceholderCard } from "./UploadPlaceholderCard";

type MediaPreviewGridProps = {
  entries: MediaFileEntry[];
  onRemove: (id: string) => void;
  onAddMore: () => void;
};

export function MediaPreviewGrid({ entries, onRemove, onAddMore }: MediaPreviewGridProps) {
  const reduceMotion = useReducedMotion();

  if (entries.length === 0) return null;

  return (
    <motion.ul
      role="list"
      className="flex w-full flex-wrap content-start"
      style={{
        gap: M.cardGap,
        minHeight: M.previewRowMinHeight,
      }}
      variants={reduceMotion ? undefined : staggerContainerVariants(STAGGER.tight, 0.02)}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion ? undefined : "visible"}
    >
      <AnimatePresence mode="popLayout">
        {entries.map((entry) => (
          <MediaPreviewCard key={entry.id} entry={entry} onRemove={onRemove} />
        ))}
        <UploadPlaceholderCard key="upload-placeholder" onClick={onAddMore} />
      </AnimatePresence>
    </motion.ul>
  );
}
