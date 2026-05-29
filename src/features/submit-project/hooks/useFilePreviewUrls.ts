"use client";

import { useEffect, useRef, useState } from "react";
import { canPreviewInBrowser, getMediaFileKind, type MediaFileKind } from "../utils/media-file";

export type FilePreviewItem = {
  key: string;
  file: File;
  kind: MediaFileKind;
  url: string | null;
};

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

export function useFilePreviewUrls(files: File[]): FilePreviewItem[] {
  const cacheRef = useRef<Map<string, string>>(new Map());
  const [previews, setPreviews] = useState<FilePreviewItem[]>([]);

  useEffect(() => {
    const cache = cacheRef.current;
    const activeKeys = new Set<string>();

    const next = files.map((file) => {
      const key = fileKey(file);
      activeKeys.add(key);
      const kind = getMediaFileKind(file);

      let url: string | null = null;
      if (canPreviewInBrowser(file)) {
        const cached = cache.get(key);
        if (cached) {
          url = cached;
        } else {
          url = URL.createObjectURL(file);
          cache.set(key, url);
        }
      }

      return { key, file, kind, url };
    });

    for (const [key, url] of cache.entries()) {
      if (!activeKeys.has(key)) {
        URL.revokeObjectURL(url);
        cache.delete(key);
      }
    }

    setPreviews(next);
  }, [files]);

  useEffect(() => {
    const cache = cacheRef.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  return previews;
}
