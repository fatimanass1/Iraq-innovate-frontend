export class SubmitProjectApiError extends Error {
  status?: number;
  fieldErrors?: Record<string, string[]>;
  responseBody?: unknown;

  constructor(
    message: string,
    status?: number,
    fieldErrors?: Record<string, string[]>,
    responseBody?: unknown,
  ) {
    super(message);
    this.name = "SubmitProjectApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
    this.responseBody = responseBody;
  }
}
