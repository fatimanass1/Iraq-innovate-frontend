import type { AxiosError } from "axios";
import { SubmitProjectApiError } from "../types/errors";

function flattenFieldErrors(data: unknown, prefix = ""): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  if (!data || typeof data !== "object") return result;

  for (const [key, value] of Object.entries(data as Record<string, unknown>)) {
    if (key === "message" || key === "detail" || key === "success") continue;

    const fieldKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      result[fieldKey] = value;
      continue;
    }

    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(result, flattenFieldErrors(value, fieldKey));
    }
  }

  return result;
}

function extractDetailMessage(data: Record<string, unknown> | undefined): string | undefined {
  if (!data) return undefined;

  const detail = data.detail;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail)) {
    const parts = detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "detail" in item) {
          const nested = (item as { detail?: unknown }).detail;
          return typeof nested === "string" ? nested : undefined;
        }
        return undefined;
      })
      .filter(Boolean);

    if (parts.length > 0) {
      return parts.join("، ");
    }
  }

  return undefined;
}

function getStatusFallbackMessage(status: number): string {
  switch (status) {
    case 401:
      return "يجب تسجيل الدخول للوصول إلى هذا المورد.";
    case 403:
      return "ليس لديك صلاحية للوصول إلى هذا المورد.";
    case 404:
      return "المشروع غير موجود.";
    default:
      return "حدث خطأ أثناء معالجة الطلب.";
  }
}

export function toSubmitProjectApiError(error: unknown): SubmitProjectApiError {
  const axiosError = error as AxiosError<Record<string, unknown>>;

  if (axiosError.code === "ERR_NETWORK" || !axiosError.response) {
    return new SubmitProjectApiError(
      "تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.",
    );
  }

  const status = axiosError.response.status;
  const data = axiosError.response.data;

  const fieldErrors = flattenFieldErrors(data);
  const flatMessages = Object.values(fieldErrors).flat().filter(Boolean);

  const message =
    flatMessages.length > 0
      ? flatMessages.join("، ")
      : (typeof data?.message === "string" && data.message) ||
        extractDetailMessage(data) ||
        getStatusFallbackMessage(status);

  return new SubmitProjectApiError(
    message,
    status,
    Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
    data,
  );
}
