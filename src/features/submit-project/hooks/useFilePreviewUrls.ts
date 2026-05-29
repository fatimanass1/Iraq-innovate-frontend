"use client";

import { useEffect, useMemo, useRef } from "react";
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

  const previews = useMemo(() => {
    return files.map((file) => {
      const key = fileKey(file);
      const kind = getMediaFileKind(file);

      let url: string | null = null;
      if (canPreviewInBrowser(file)) {
        const cached = cacheRef.current.get(key);
        if (cached) {
          url = cached;
        } else {
          url = URL.createObjectURL(file);
          cacheRef.current.set(key, url);
        }
      }

      return { key, file, kind, url };
    });
  }, [files]);

  useEffect(() => {
    const activeKeys = new Set(previews.map((item) => item.key));
    for (const [key, url] of cacheRef.current.entries()) {
      if (!activeKeys.has(key)) {
        URL.revokeObjectURL(url);
        cacheRef.current.delete(key);
      }
    }
  }, [previews]);

  useEffect(() => {
    const cache = cacheRef.current;
    return () => {
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  return previews;
}
