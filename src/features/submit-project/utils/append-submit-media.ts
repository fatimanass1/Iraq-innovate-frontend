import type { SubmitProjectMediaUpload } from "../types/api.types";

/** OpenAPI/Swagger shape: `media=[{"type":0,"file":"string","url":"string"}]` */
export type SubmitMediaJsonItem = {
  type: number;
  file?: string;
  url?: string;
};

/** Separate multipart key for the binary file at a given media index (DRF dot notation). */
export function submitMediaFileFieldKey(index: number): string {
  return `media.${index}.file`;
}

/**
 * Serializes media for POST /api/project/submit/
 *
 * 1. `media` — JSON array string (types only, per Swagger curl shape)
 * 2. `media.{index}.file` — actual File blobs, separate from the JSON field
 */
export function appendSubmitMediaToFormData(
  formData: FormData,
  media: SubmitProjectMediaUpload[] | undefined,
): SubmitMediaJsonItem[] {
  const validItems = media?.filter((item) => item.file instanceof File) ?? [];
  if (validItems.length === 0) return [];

  const mediaJsonPayload: SubmitMediaJsonItem[] = validItems.map((item) => ({
    type: item.type,
  }));

  formData.append("media", JSON.stringify(mediaJsonPayload));

  validItems.forEach((item, index) => {
    formData.append(submitMediaFileFieldKey(index), item.file, item.file.name);
  });

  return mediaJsonPayload;
}
