import { API_BASE_URL } from "@/shared/utils/env";

/** Turn API-relative media paths into absolute URLs the browser can load. */
export function resolveAssetUrl(path: string | null | undefined): string | null {
  if (!path?.trim()) return null;

  const trimmed = path.trim();

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }

  const base = API_BASE_URL.replace(/\/$/, "");
  const pathname = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;

  return `${base}${pathname}`;
}

const IMAGE_EXTENSIONS = new Set([
  "jpg",
  "jpeg",
  "png",
  "gif",
  "webp",
  "svg",
  "bmp",
  "avif",
]);

const VIDEO_EXTENSIONS = new Set(["mp4", "webm", "mov", "avi", "mkv", "m4v"]);

function getExtension(url: string): string {
  const path = url.split("?")[0] ?? url;
  const parts = path.split(".");
  return (parts[parts.length - 1] ?? "").toLowerCase();
}

export function isImageMedia(typeName: string, url: string): boolean {
  const type = typeName.trim().toLowerCase();
  if (type.includes("image") || type.includes("photo") || type.includes("صورة")) {
    return true;
  }
  return IMAGE_EXTENSIONS.has(getExtension(url));
}

export function isVideoMedia(typeName: string, url: string): boolean {
  const type = typeName.trim().toLowerCase();
  if (type.includes("video") || type.includes("فيديو")) {
    return true;
  }
  return VIDEO_EXTENSIONS.has(getExtension(url));
}
