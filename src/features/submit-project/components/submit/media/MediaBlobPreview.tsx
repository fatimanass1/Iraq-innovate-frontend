"use client";

import { FileText, Film, Presentation } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { MEDIA_UPLOAD_THEME as M } from "../../../constants/media-upload";
import type { MediaFileKind } from "../../../utils/media-file";
import { getDocumentPreviewKind } from "../../../utils/media-file";
import { submitMono } from "../../../utils/fonts";

type MediaBlobPreviewProps = {
  file: File;
  kind: MediaFileKind;
  url: string | null;
  className?: string;
  fileNameClassName?: string;
};

function DocumentFallbackIcon({ file }: { file: File }) {
  const docKind = getDocumentPreviewKind(file);

  if (docKind === "pdf") {
    return <FileText className="size-[22px] text-[#4A7A00]" aria-hidden="true" />;
  }
  if (docKind === "docx") {
    return <FileText className="size-[22px] text-[#4A7A00]" aria-hidden="true" />;
  }
  if (docKind === "pptx") {
    return <Presentation className="size-[22px] text-[#4A7A00]" aria-hidden="true" />;
  }

  return <FileText className="size-[22px] text-[#4A7A00]" aria-hidden="true" />;
}

export function MediaBlobPreview({
  file,
  kind,
  url,
  className,
  fileNameClassName,
}: MediaBlobPreviewProps) {
  if (kind === "image" && url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={url}
        alt={file.name}
        className={cn("size-full object-cover", className)}
        draggable={false}
      />
    );
  }

  if (kind === "video" && url) {
    return (
      <video
        src={url}
        className={cn("size-full object-cover", className)}
        muted
        playsInline
        preload="metadata"
        aria-label={file.name}
      />
    );
  }

  if (kind === "video") {
    return (
      <div
        className={cn(
          "flex size-full flex-col items-center justify-center gap-2",
          className,
        )}
        style={{ backgroundColor: M.videoPlaceholderBg }}
      >
        <Film className="size-[22px] text-[#4A7A00]" aria-hidden="true" />
        <p
          className={cn(
            submitMono.className,
            "line-clamp-2 w-full px-2 text-center text-[9px] leading-tight text-[#6B7260]",
            fileNameClassName,
          )}
        >
          {file.name}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center gap-2 px-2",
        className,
      )}
      style={{ backgroundColor: M.docPlaceholderBg }}
    >
      <DocumentFallbackIcon file={file} />
      <p
        className={cn(
          submitMono.className,
          "line-clamp-2 w-full text-center text-[9px] leading-tight text-[#6B7260]",
          fileNameClassName,
        )}
      >
        {file.name}
      </p>
    </div>
  );
}
