import type { UseFormReturn } from "react-hook-form";
import { toAuthApiError } from "../api/authApi";
import { AuthApiError } from "../types/auth.types";

const LOGIN_FIELD_MAP: Record<string, string> = {
  email_or_phone_number: "email",
  password: "password",
};

const SIGNUP_FIELD_MAP: Record<string, string> = {
  name: "fullName",
  email: "email",
  phone_number: "phoneNumber",
  password: "password",
  organization: "university",
  news_letter_subscription: "acceptTerms",
};

export function getAuthErrorMessage(error: unknown, fallback: string): string {
  const authError = error instanceof AuthApiError ? error : toAuthApiError(error);

  if (authError.fieldErrors) {
    const fieldMessages = Object.values(authError.fieldErrors).flat().filter(Boolean);
    if (fieldMessages.length > 0) {
      return fieldMessages.join(" • ");
    }
  }

  return authError.message || fallback;
}

export function applyAuthFieldErrors<T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  error: unknown,
  fieldMap: Record<string, string>,
) {
  const authError = error instanceof AuthApiError ? error : toAuthApiError(error);

  if (!authError.fieldErrors) {
    return;
  }

  Object.entries(authError.fieldErrors).forEach(([apiField, messages]) => {
    const formField = fieldMap[apiField] ?? apiField;
    const message = messages[0];

    if (!message) return;

    form.setError(formField as never, {
      type: "server",
      message,
    });
  });
}

export function applyLoginFieldErrors<T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  error: unknown,
) {
  applyAuthFieldErrors(form, error, LOGIN_FIELD_MAP);
}

export function applySignupFieldErrors<T extends Record<string, unknown>>(
  form: UseFormReturn<T>,
  error: unknown,
) {
  applyAuthFieldErrors(form, error, SIGNUP_FIELD_MAP);
}
