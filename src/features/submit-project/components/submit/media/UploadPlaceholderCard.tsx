"use client";

import { ImagePlus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { scaleSoftVariants } from "@/shared/animations/variants";
import { DURATION, EASING } from "@/shared/animations/constants";
import { MEDIA_UPLOAD_COPY, MEDIA_UPLOAD_THEME as M } from "../../../constants/media-upload";

type UploadPlaceholderCardProps = {
  onClick: () => void;
};

export function UploadPlaceholderCard({ onClick }: UploadPlaceholderCardProps) {
  const reduceMotion = useReducedMotion();

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
      className="list-none"
    >
      <button
        type="button"
        onClick={onClick}
        aria-label={MEDIA_UPLOAD_COPY.addMoreAria}
        className="flex shrink-0 items-center justify-center border border-dashed transition-[box-shadow,opacity] duration-200 hover:opacity-90"
        style={{
          width: M.cardWidth,
          height: M.cardHeight,
          borderRadius: M.cardRadius,
          borderColor: M.placeholderBorder,
        }}
        onMouseEnter={(event) => {
          if (reduceMotion) return;
          event.currentTarget.style.boxShadow = M.placeholderHoverGlow;
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.boxShadow = "none";
        }}
      >
        <ImagePlus className="size-[18px] text-[#4A7A00]" strokeWidth={1.75} aria-hidden="true" />
      </button>
    </motion.li>
  );
}
