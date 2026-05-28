import type { AxiosError } from "axios";
import type { ApiErrorResponse, ApiResponse } from "@/shared/services/api/core/types";
import { AUTH_ENDPOINTS } from "./authEndpoints";
import { authApiClient, authAuthenticatedClient } from "./authApiClient";
import type {
  LoginRequest,
  LoginResponse,
  TokenPair,
  LogoutRequest,
  PasswordResetRequest,
  SignUpRequest,
  SignUpResponse,
  TokenRefreshRequest,
  TokenRefreshResponse,
  TokenVerifyRequest,
  TokenVerifyResponse,
  UpdateUserRequest,
  UserInformationResponse,
} from "../types/auth.types";
import { AuthApiError } from "../types/auth.types";

function unwrap<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in payload &&
    "success" in payload
  ) {
    return (payload as ApiResponse<T>).data;
  }

  return payload as T;
}

function extractFieldErrors(data: unknown): Record<string, string[]> | undefined {
  if (!data || typeof data !== "object") {
    return undefined;
  }

  const record = data as Record<string, unknown>;
  const fieldErrors: Record<string, string[]> = {};

  Object.entries(record).forEach(([key, value]) => {
    if (key === "message" || key === "detail" || key === "success") {
      return;
    }

    if (Array.isArray(value) && value.every((item) => typeof item === "string")) {
      fieldErrors[key] = value;
    }
  });

  return Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined;
}

function formatFieldErrorsMessage(fieldErrors: Record<string, string[]>): string {
  return Object.values(fieldErrors)
    .flat()
    .filter(Boolean)
    .join(" • ");
}

function isApiFailure(payload: Record<string, unknown>): boolean {
  const success = payload.success;
  return success === false || success === "False" || success === "false";
}

function parseUserId(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function extractTokenPair(source: Record<string, unknown>): TokenPair | null {
  if (source.token && typeof source.token === "object") {
    const token = source.token as Record<string, unknown>;
    const access = token.access;
    const refresh = token.refresh;

    if (typeof access === "string" && typeof refresh === "string") {
      return { access, refresh };
    }
  }

  const access = source.access;
  const refresh = source.refresh;

  if (typeof access === "string" && typeof refresh === "string") {
    return { access, refresh };
  }

  return null;
}

function parseLoginResponse(payload: unknown): LoginResponse {
  const unwrapped = unwrap<Record<string, unknown>>(payload);

  if (!unwrapped || typeof unwrapped !== "object") {
    throw new AuthApiError("استجابة غير صالحة من الخادم.");
  }

  if (isApiFailure(unwrapped)) {
    throw new AuthApiError(
      extractErrorMessage(unwrapped, "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى."),
      extractFieldErrors(unwrapped),
    );
  }

  const source =
    unwrapped.data && typeof unwrapped.data === "object"
      ? (unwrapped.data as Record<string, unknown>)
      : unwrapped;

  const tokens = extractTokenPair(source);
  const userId = parseUserId(source.user_id);

  if (!tokens) {
    throw new AuthApiError("لم يتم استلام رموز المصادقة من الخادم.");
  }

  if (userId === undefined) {
    throw new AuthApiError("لم يتم استلام معرف المستخدم من الخادم.");
  }

  return { userId, tokens };
}

function extractErrorMessage(data: unknown, fallback: string): string {
  if (!data || typeof data !== "object") {
    return fallback;
  }

  const record = data as Record<string, unknown>;

  const fieldErrors = extractFieldErrors(data);
  if (fieldErrors) {
    const combined = formatFieldErrorsMessage(fieldErrors);
    if (combined) {
      return combined;
    }
  }

  if (typeof record.message === "string" && record.message.trim()) {
    return record.message;
  }

  if (typeof record.detail === "string" && record.detail.trim()) {
    return record.detail;
  }

  if (Array.isArray(record.detail)) {
    return record.detail.filter((item) => typeof item === "string").join("، ");
  }

  return fallback;
}

export function toAuthApiError(error: unknown): AuthApiError {
  if (error instanceof AuthApiError) {
    return error;
  }

  const axiosError = error as AxiosError<ApiErrorResponse | Record<string, unknown>>;

  if (axiosError.code === "ERR_NETWORK" || !axiosError.response) {
    return new AuthApiError(
      "تعذر الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت والمحاولة مرة أخرى.",
      undefined,
      undefined,
    );
  }

  const responseData = axiosError.response.data;
  const fieldErrors =
    (responseData &&
      typeof responseData === "object" &&
      "errors" in responseData &&
      typeof responseData.errors === "object" &&
      responseData.errors
        ? (responseData.errors as Record<string, string[]>)
        : undefined) ?? extractFieldErrors(responseData);

  return new AuthApiError(
    extractErrorMessage(responseData, "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."),
    fieldErrors,
    axiosError.response.status,
  );
}

async function post<TResponse, TPayload>(
  url: string,
  payload: TPayload,
  authenticated = false,
): Promise<TResponse> {
  const client = authenticated ? authAuthenticatedClient : authApiClient;

  try {
    const { data } = await client.post<ApiResponse<TResponse> | TResponse>(
      url,
      payload,
    );
    return unwrap<TResponse>(data);
  } catch (error) {
    throw toAuthApiError(error);
  }
}

async function getAuthenticated<TResponse>(url: string): Promise<TResponse> {
  try {
    const { data } = await authAuthenticatedClient.get<ApiResponse<TResponse> | TResponse>(
      url,
    );
    return unwrap<TResponse>(data);
  } catch (error) {
    throw toAuthApiError(error);
  }
}

async function patchAuthenticated<TResponse, TPayload>(
  url: string,
  payload: TPayload,
): Promise<TResponse> {
  try {
    const { data } = await authAuthenticatedClient.patch<
      ApiResponse<TResponse> | TResponse
    >(url, payload);
    return unwrap<TResponse>(data);
  } catch (error) {
    throw toAuthApiError(error);
  }
}

/** Raw API calls only — no UI or store logic. */
export const authApi = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const body: LoginRequest = {
      email_or_phone_number: payload.email_or_phone_number,
      password: payload.password,
    };

    try {
      const { data, status } = await authApiClient.post<unknown>(
        AUTH_ENDPOINTS.LOGIN,
        body,
      );

      if (process.env.NODE_ENV === "development") {
        console.log("[login] response status", status);
        console.log("[login] response data", data);
      }

      return parseLoginResponse(data);
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const axiosError = error as AxiosError<ApiErrorResponse | Record<string, unknown>>;
        console.error("[login] response status", axiosError.response?.status);
        console.error("[login] response data", axiosError.response?.data);
      }

      throw toAuthApiError(error);
    }
  },

  signup(payload: SignUpRequest) {
    return post<SignUpResponse, SignUpRequest>(AUTH_ENDPOINTS.SIGNUP, payload);
  },

  logout(payload: LogoutRequest) {
    return post<void, LogoutRequest>(AUTH_ENDPOINTS.LOGOUT, payload, true);
  },

  passwordReset(payload: PasswordResetRequest) {
    return post<void, PasswordResetRequest>(AUTH_ENDPOINTS.PASSWORD_RESET, payload);
  },

  refreshToken(payload: TokenRefreshRequest) {
    return post<TokenRefreshResponse, TokenRefreshRequest>(
      AUTH_ENDPOINTS.TOKEN_REFRESH,
      payload,
    );
  },

  verifyToken(payload: TokenVerifyRequest) {
    return post<TokenVerifyResponse, TokenVerifyRequest>(
      AUTH_ENDPOINTS.TOKEN_VERIFY,
      payload,
      true,
    );
  },

  getUserInformation() {
    return getAuthenticated<UserInformationResponse>(AUTH_ENDPOINTS.USER_INFORMATION);
  },

  updateUser(payload: UpdateUserRequest) {
    return patchAuthenticated<UserInformationResponse, UpdateUserRequest>(
      AUTH_ENDPOINTS.USER_UPDATE,
      payload,
    );
  },
};
