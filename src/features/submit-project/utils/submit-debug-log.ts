import type { AxiosError } from "axios";
import type { SubmitProjectPayload } from "../types/api.types";
import { submitMediaFileFieldKey } from "./append-submit-media";
import { resolveWebsiteUrlForApi } from "./submit-form-data";

const SUBMIT_DEBUG_PREFIX = "[submit-project]";

type FormDataEntryLog = {
  key: string;
  valueType: "string" | "File" | "Blob" | "unknown";
  value: string | Record<string, unknown>;
};

function describeFormDataValue(value: FormDataEntryValue): FormDataEntryLog["value"] {
  if (value instanceof File) {
    return {
      File: true,
      name: value.name,
      size: value.size,
      mimeType: value.type,
      lastModified: value.lastModified,
    };
  }

  if (typeof value === "string") {
    return value;
  }

  return String(value);
}

function getFormDataValueType(value: FormDataEntryValue): FormDataEntryLog["valueType"] {
  if (value instanceof File) return "File";
  return "string";
}

export function collectFormDataEntries(formData: FormData): FormDataEntryLog[] {
  const entries: FormDataEntryLog[] = [];
  for (const [key, value] of formData.entries()) {
    entries.push({
      key,
      valueType: getFormDataValueType(value),
      value: describeFormDataValue(value),
    });
  }
  return entries;
}

function buildMediaPayloadSummary(payload: SubmitProjectPayload) {
  return (
    payload.media?.map((item, index) => ({
      index,
      type: item.type,
      isFileInstance: item.file instanceof File,
      fileName: item.file instanceof File ? item.file.name : null,
      fileSize: item.file instanceof File ? item.file.size : null,
      mimeType: item.file instanceof File ? item.file.type : null,
    })) ?? []
  );
}

function buildMediaFormDataKeys(formData: FormData): string[] {
  const keys: string[] = [];
  for (const [key] of formData.entries()) {
    if (key === "media" || key.startsWith("media[") || key.startsWith("media.")) {
      keys.push(key);
    }
  }
  return keys;
}

function buildSwaggerComparison(payload: SubmitProjectPayload) {
  const swaggerExample =
    '-F \'media=[{"type":0,"file":"string","url":"string"}]\'';

  const validItems = payload.media?.filter((item) => item.file instanceof File) ?? [];

  const mediaJsonPayload = validItems.map((item) => ({
    type: item.type,
  }));

  const separateFileFields = validItems.map(
    (_, index) => `${submitMediaFileFieldKey(index)} = <File>`,
  );

  const swaggerFullShapeExample = JSON.stringify(
    validItems.map((item) => ({
      type: item.type,
      file: item.file instanceof File ? item.file.name : "string",
      url: "",
    })),
    null,
    2,
  );

  return {
    swaggerCurlField: swaggerExample,
    currentImplementation:
      "JSON `media` field + separate indexed file parts (types in JSON only)",
    mediaJsonField: {
      key: "media",
      value: JSON.stringify(mediaJsonPayload),
    },
    separateFileFields,
    swaggerFullShapeExample,
    note:
      "Types are sent inside JSON.stringify(media). Binary files are appended separately as media.{index}.file (DRF dot notation).",
  };
}

export function logSubmitProjectRequestDebug(
  payload: SubmitProjectPayload,
  formData: FormData,
): void {
  const formDataEntries = collectFormDataEntries(formData);
  const mediaKeys = buildMediaFormDataKeys(formData);
  const swaggerComparison = buildSwaggerComparison(payload);

  console.group(`${SUBMIT_DEBUG_PREFIX} POST /api/project/submit/ — request debug`);

  console.log(
    `${SUBMIT_DEBUG_PREFIX} payload (JSON):`,
    JSON.stringify(
      {
        title: payload.title,
        description: payload.description,
        summary: payload.summary,
        website_url: resolveWebsiteUrlForApi(payload.website_url),
        category: payload.category,
        owner_name: payload.owner_name,
        owner_birthdate: payload.owner_birthdate,
        owner_college: payload.owner_college,
        owner_linkedin_url: payload.owner_linkedin_url,
        owner_graduate_certificate:
          payload.owner_graduate_certificate instanceof File
            ? {
                name: payload.owner_graduate_certificate.name,
                size: payload.owner_graduate_certificate.size,
                type: payload.owner_graduate_certificate.type,
              }
            : null,
        media: buildMediaPayloadSummary(payload),
      },
      null,
      2,
    ),
  );

  console.log(
    `${SUBMIT_DEBUG_PREFIX} media serialization:`,
    JSON.stringify(
      {
        itemCount: payload.media?.length ?? 0,
        formDataMediaKeys: mediaKeys,
        mediaJsonField: (() => {
          for (const [key, value] of formData.entries()) {
            if (key === "media" && typeof value === "string") {
              try {
                return { key, parsed: JSON.parse(value) };
              } catch {
                return { key, raw: value };
              }
            }
          }
          return null;
        })(),
        separateFileFields: payload.media
          ?.filter((item) => item.file instanceof File)
          .map((item, index) => ({
            index,
            fileField: submitMediaFileFieldKey(index),
            fileName: item.file instanceof File ? item.file.name : null,
            fileSize: item.file instanceof File ? item.file.size : null,
          })),
      },
      null,
      2,
    ),
  );

  console.log(
    `${SUBMIT_DEBUG_PREFIX} Swagger comparison:`,
    JSON.stringify(swaggerComparison, null, 2),
  );

  console.log(
    `${SUBMIT_DEBUG_PREFIX} FormData entries (JSON):`,
    JSON.stringify(formDataEntries, null, 2),
  );

  console.groupEnd();
}

function extractMediaErrors(data: unknown): unknown {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  return record.media ?? null;
}

export function logSubmitProjectErrorDebug(error: unknown): void {
  const axiosError = error as AxiosError<unknown>;
  const status = axiosError.response?.status;
  const data = axiosError.response?.data;

  console.group(`${SUBMIT_DEBUG_PREFIX} POST /api/project/submit/ — error debug`);

  console.error(`${SUBMIT_DEBUG_PREFIX} HTTP status:`, status ?? "no response");

  console.error(
    `${SUBMIT_DEBUG_PREFIX} FULL backend response body (JSON.stringify):`,
    JSON.stringify(data, null, 2),
  );

  const mediaErrors = extractMediaErrors(data);
  console.error(
    `${SUBMIT_DEBUG_PREFIX} media validation errors (full):`,
    JSON.stringify(mediaErrors, null, 2),
  );

  if (mediaErrors && typeof mediaErrors === "object") {
    if (Array.isArray(mediaErrors)) {
      mediaErrors.forEach((item, index) => {
        console.error(
          `${SUBMIT_DEBUG_PREFIX} media[${index}]:`,
          JSON.stringify(item, null, 2),
        );
      });
    } else {
      const mediaRecord = mediaErrors as Record<string, unknown>;
      if (mediaRecord.non_field_errors) {
        console.error(
          `${SUBMIT_DEBUG_PREFIX} media.non_field_errors:`,
          JSON.stringify(mediaRecord.non_field_errors, null, 2),
        );
      }
      for (const [key, value] of Object.entries(mediaRecord)) {
        if (key === "non_field_errors") continue;
        console.error(
          `${SUBMIT_DEBUG_PREFIX} media.${key}:`,
          JSON.stringify(value, null, 2),
        );
      }
    }
  }

  console.groupEnd();
}
