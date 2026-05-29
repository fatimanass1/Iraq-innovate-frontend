"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import type { ApiProjectMediaType } from "../types/api.types";
import type { BilingualMessage } from "../types/validation.types";
import type { ProjectMediaItem } from "../types/wizard.types";
import {
  canPreviewInBrowser,
  getMediaFileKind,
  type MediaFileKind,
} from "../utils/media-file";
import { resolveMediaTypeId } from "../utils/resolve-media-type-id";
import {
  isAcceptedMediaFile,
  validateMediaFile,
} from "../utils/validation";

export type MediaFileEntry = {
  id: string;
  file: File;
  kind: MediaFileKind;
  mediaTypeId: number | null;
  previewUrl: string | null;
  progress: number;
  status: "uploading" | "ready";
};

type UseMediaUploadOptions = {
  mediaItems: ProjectMediaItem[];
  onMediaChange: (items: ProjectMediaItem[]) => void;
  resolveMediaTypeIdForKind: (kind: MediaFileKind) => number | null;
  mediaTypes?: ApiProjectMediaType[];
  onFileRejected?: (message: BilingualMessage) => void;
};

function fileKey(file: File) {
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function isAcceptedFile(file: File): boolean {
  return isAcceptedMediaFile(file);
}

function buildEntry(
  file: File,
  mediaTypeId: number | null,
  status: MediaFileEntry["status"] = "ready",
): MediaFileEntry {
  const kind = getMediaFileKind(file);
  const previewUrl = canPreviewInBrowser(file) ? URL.createObjectURL(file) : null;

  return {
    id: fileKey(file),
    file,
    kind,
    mediaTypeId,
    previewUrl,
    progress: status === "ready" ? 100 : 0,
    status,
  };
}

function toProjectMediaItem(entry: MediaFileEntry): ProjectMediaItem {
  return {
    id: entry.id,
    file: entry.file,
    mediaTypeId: entry.mediaTypeId,
  };
}

export function useMediaUpload({
  mediaItems,
  onMediaChange,
  resolveMediaTypeIdForKind,
  mediaTypes,
  onFileRejected,
}: UseMediaUploadOptions) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlsRef = useRef<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [entries, setEntries] = useState<MediaFileEntry[]>(() =>
    mediaItems.map((item) => buildEntry(item.file, item.mediaTypeId, "ready")),
  );

  useEffect(() => {
    entries.forEach((entry) => {
      if (entry.previewUrl) previewUrlsRef.current.add(entry.previewUrl);
    });
  }, [entries]);

  const commitEntries = useCallback(
    (nextEntries: MediaFileEntry[]) => {
      setEntries(nextEntries);
      onMediaChange(nextEntries.map(toProjectMediaItem));
    },
    [onMediaChange],
  );

  const revokePreview = useCallback((url: string | null) => {
    if (url && previewUrlsRef.current.has(url)) {
      URL.revokeObjectURL(url);
      previewUrlsRef.current.delete(url);
    }
  }, []);

  useEffect(() => {
    const urls = previewUrlsRef.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
      urls.clear();
    };
  }, []);

  const mediaItemsKey = useMemo(
    () => mediaItems.map((item) => `${item.id}:${item.mediaTypeId}`).join("|"),
    [mediaItems],
  );

  useEffect(() => {
    setEntries((prev) => {
      const incomingIds = new Set(mediaItems.map((item) => item.id));
      const next: MediaFileEntry[] = [];

      for (const entry of prev) {
        if (incomingIds.has(entry.id)) {
          const synced = mediaItems.find((item) => item.id === entry.id);
          next.push(
            synced
              ? { ...entry, mediaTypeId: synced.mediaTypeId }
              : entry,
          );
        } else {
          revokePreview(entry.previewUrl);
        }
      }

      const existingIds = new Set(next.map((entry) => entry.id));
      for (const item of mediaItems) {
        if (existingIds.has(item.id)) continue;
        const entry = buildEntry(item.file, item.mediaTypeId, "ready");
        if (entry.previewUrl) previewUrlsRef.current.add(entry.previewUrl);
        next.push(entry);
      }

      if (
        next.length === prev.length &&
        next.every((entry, index) => entry.id === prev[index]?.id)
      ) {
        return prev;
      }

      return next;
    });
  }, [mediaItems, mediaItemsKey, revokePreview]);

  const startProgress = useCallback((entryId: string) => {
    let progress = 0;
    const interval = window.setInterval(() => {
      progress = Math.min(progress + 22, 100);
      setEntries((prev) =>
        prev.map((entry) => {
          if (entry.id !== entryId) return entry;
          if (progress >= 100) {
            return { ...entry, progress: 100, status: "ready" };
          }
          return { ...entry, progress, status: "uploading" };
        }),
      );
      if (progress >= 100) window.clearInterval(interval);
    }, 110);
  }, []);

  const addFiles = useCallback(
    (incoming: FileList | File[]) => {
      const list = Array.from(incoming);
      if (list.length === 0) return;

      const existingKeys = new Set(entries.map((entry) => entry.id));
      const accepted: File[] = [];

      for (const file of list) {
        const fileError = validateMediaFile(file, mediaTypes);
        if (fileError) {
          if (onFileRejected) {
            onFileRejected(fileError);
          } else {
            toast.error(`${fileError.ar} — ${file.name}`);
          }
          continue;
        }
        if (!isAcceptedFile(file)) {
          const message = {
            ar: `نوع الملف غير مدعوم: ${file.name}`,
            en: `Unsupported file type: ${file.name}`,
          };
          if (onFileRejected) {
            onFileRejected(message);
          } else {
            toast.error(message.ar);
          }
          continue;
        }
        const key = fileKey(file);
        if (existingKeys.has(key)) continue;
        existingKeys.add(key);
        accepted.push(file);
      }

      if (accepted.length === 0) return;

      const uploadingEntries = accepted.map((file) => {
        const kind = getMediaFileKind(file);
        const mediaTypeId = resolveMediaTypeIdForKind(kind);
        const entry = buildEntry(file, mediaTypeId, "uploading");
        if (entry.previewUrl) previewUrlsRef.current.add(entry.previewUrl);
        return entry;
      });

      commitEntries([...entries, ...uploadingEntries]);
      uploadingEntries.forEach((entry) => startProgress(entry.id));
    },
    [commitEntries, entries, mediaTypes, onFileRejected, resolveMediaTypeIdForKind, startProgress],
  );

  const removeFile = useCallback(
    (entryId: string) => {
      const removed = entries.find((entry) => entry.id === entryId);
      revokePreview(removed?.previewUrl ?? null);
      commitEntries(entries.filter((entry) => entry.id !== entryId));
    },
    [commitEntries, entries, revokePreview],
  );

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleDragEnter = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.currentTarget.contains(event.relatedTarget as Node)) return;
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (event.dataTransfer.files?.length) addFiles(event.dataTransfer.files);
    },
    [addFiles],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) addFiles(event.target.files);
      event.target.value = "";
    },
    [addFiles],
  );

  const isProcessing = entries.some((entry) => entry.status === "uploading");
  const hasUploads = entries.length > 0;

  return {
    inputRef,
    entries,
    hasUploads,
    isDragging,
    isProcessing,
    openFilePicker,
    removeFile,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    handleInputChange,
  };
}

/** Hook helper: build resolver from fetched media types */
export function createMediaTypeResolver(
  mediaTypes?: { id: number; name: string }[],
) {
  return (kind: MediaFileKind) => resolveMediaTypeId(kind, mediaTypes);
}
