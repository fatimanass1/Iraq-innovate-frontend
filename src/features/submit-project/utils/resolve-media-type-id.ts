import type { ApiProjectMediaType } from "../types/api.types";
import type { MediaFileKind } from "./media-file";

/** API defaults when media-types endpoint is unavailable */
export const DEFAULT_MEDIA_TYPE_IDS = {
  image: 1,
  video: 2,
} as const;

export function resolveMediaTypeId(
  kind: MediaFileKind,
  mediaTypes?: ApiProjectMediaType[],
): number | null {
  if (kind === "image") {
    const fromApi = mediaTypes?.find((type) => /image/i.test(type.name))?.id;
    return fromApi ?? DEFAULT_MEDIA_TYPE_IDS.image;
  }

  if (kind === "video") {
    const fromApi = mediaTypes?.find((type) => /video/i.test(type.name))?.id;
    return fromApi ?? DEFAULT_MEDIA_TYPE_IDS.video;
  }

  return null;
}
