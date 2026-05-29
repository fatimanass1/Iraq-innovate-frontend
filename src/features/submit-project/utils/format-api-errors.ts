import { SubmitProjectApiError } from "../types/errors";

export function formatSubmitProjectApiError(error: unknown, fallback: string): string {
  if (!(error instanceof SubmitProjectApiError)) {
    return fallback;
  }

  if (error.responseBody) {
    console.error(
      "[submit-project] Submission failed — backend response (JSON.stringify):",
      JSON.stringify(error.responseBody, null, 2),
    );
  }

  if (error.fieldErrors) {
    const fieldMessages = Object.values(error.fieldErrors)
      .flat()
      .filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join("، ");
    }
  }

  return error.message || fallback;
}
