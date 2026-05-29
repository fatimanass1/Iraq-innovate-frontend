"use client";

import { cn } from "@/shared/utils/utils";
import { REVIEW_SUBMISSION_COPY, REVIEW_SUBMISSION_THEME as R } from "../../../constants/review-submission";
import { useFilePreviewUrls } from "../../../hooks/useFilePreviewUrls";
import { MediaBlobPreview } from "../media/MediaBlobPreview";
import { submitOutfit } from "../../../utils/fonts";

type ReviewMediaPreviewProps = {
  files: File[];
};

export function ReviewMediaPreview({ files }: ReviewMediaPreviewProps) {
  const previews = useFilePreviewUrls(files);

  if (files.length === 0) {
    return (
      <div
        className="flex items-center justify-center"
        style={{
          width: R.mediaThumbWidth,
          height: R.mediaThumbHeight,
          borderRadius: R.mediaThumbRadius,
          backgroundColor: R.mediaThumbBg,
        }}
      >
        <span
          className={cn(submitOutfit.className, "text-[14px]")}
          style={{ color: R.valueColor }}
        >
          {REVIEW_SUBMISSION_COPY.emptyValue}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {previews.map((item) => (
        <div
          key={item.key}
          className="relative shrink-0 overflow-hidden"
          style={{
            width: R.mediaThumbWidth,
            height: R.mediaThumbHeight,
            borderRadius: R.mediaThumbRadius,
            backgroundColor: R.mediaThumbBg,
          }}
        >
          <MediaBlobPreview
            file={item.file}
            kind={item.kind}
            url={item.url}
            className="size-full"
            fileNameClassName="text-[8px]"
          />
        </div>
      ))}
    </div>
  );
}
