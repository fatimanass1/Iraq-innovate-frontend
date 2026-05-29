"use client";

import { Upload } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { MEDIA_UPLOAD_COPY, MEDIA_UPLOAD_THEME as M } from "../../../constants/media-upload";
import { VALIDATION_THEME as V } from "../../../constants/validation-theme";
import { submitCairo, submitMono, submitOutfit } from "../../../utils/fonts";

type MediaDropzoneProps = {
  isDragging: boolean;
  isProcessing: boolean;
  hasUploads: boolean;
  hasError?: boolean;
  onBrowse: () => void;
  onDragEnter: (event: React.DragEvent) => void;
  onDragLeave: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  onDrop: (event: React.DragEvent) => void;
};

export function MediaDropzone({
  isDragging,
  isProcessing,
  hasUploads,
  hasError = false,
  onBrowse,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
}: MediaDropzoneProps) {
  const active = isDragging || isProcessing;

  return (
    <button
      type="button"
      onClick={onBrowse}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      disabled={isProcessing}
      aria-label={MEDIA_UPLOAD_COPY.browseAria}
      className={cn(
        "relative flex w-full flex-col items-center justify-center border-2 border-dashed transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/50",
        isProcessing ? "cursor-wait" : "cursor-pointer",
      )}
      style={{
        height: M.zoneHeight,
        borderRadius: M.zoneRadius,
        backgroundColor: active ? M.zoneBgDrag : M.zoneBg,
        borderColor: hasError && !active
          ? V.errorBorderColor
          : active
            ? M.zoneBorderDrag
            : M.zoneBorder,
      }}
    >
      <div
        className="flex flex-col items-center"
        style={{ gap: 20, paddingTop: 42, paddingBottom: 42 }}
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: M.iconBoxSize,
            height: M.iconBoxSize,
            borderRadius: M.iconBoxRadius,
            backgroundColor: M.iconBoxBg,
          }}
        >
          <Upload
            className="size-[26px]"
            style={{ color: M.iconColor }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>

        <div className="flex w-full max-w-[360px] flex-col items-center gap-1 px-[42px]">
          <p
            className={cn(submitOutfit.className, "text-center text-[14px] font-semibold leading-5")}
            style={{ color: M.titleColor }}
          >
            {MEDIA_UPLOAD_COPY.dropTitle}
          </p>
          <p
            className={cn(submitCairo.className, "text-center text-[12px] leading-4")}
            style={{ color: M.subtitleColor }}
            dir="rtl"
          >
            {MEDIA_UPLOAD_COPY.dropTitleAr}
          </p>
          <p
            className={cn(
              submitMono.className,
              "mt-2 text-center text-[12px] leading-4",
            )}
            style={{ color: M.formatsColor }}
          >
            {hasUploads ? MEDIA_UPLOAD_COPY.formatsWithVideo : MEDIA_UPLOAD_COPY.formats}
          </p>
        </div>
      </div>

      {isProcessing ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 overflow-hidden rounded-b-[14px]"
          aria-hidden="true"
        >
          <div
            className="h-full animate-pulse rounded-b-[14px]"
            style={{ background: M.progressGradient }}
          />
        </div>
      ) : null}
    </button>
  );
}
