export class AuthApiError extends Error {
  readonly fieldErrors?: Record<string, string[]>;
  readonly status?: number;

  constructor(message: string, fieldErrors?: Record<string, string[]>, status?: number) {
    super(message);
    this.name = "AuthApiError";
    this.fieldErrors = fieldErrors;
    this.status = status;
  }
}

export type AuthUser = {
  id?: string | number;
  name?: string;
  email?: string;
  phone_number?: string;
  organization?: string;
  news_letter_subscription?: boolean;
};

/** Response from `GET /api/user/information/`. */
export type UserInformationResponse = {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  organization: string;
  news_letter_subscription: boolean;
};

/** Body for `PATCH /api/user/update/`. */
export type UpdateUserRequest = {
  name: string;
  email: string;
  phone_number: string;
  news_letter_subscription: boolean;
};

export type TokenPair = {
  access: string;
  refresh: string;
};

export type AuthSession = {
  user: AuthUser | null;
  tokens: TokenPair;
};

// --- API request payloads ---

export type LoginRequest = {
  email_or_phone_number: string;
  password: string;
};

export type LogoutRequest = {
  refresh_token: string;
};

/** Matches backend `UserSignUp` schema (OpenAPI). */
export type SignUpRequest = {
  name: string;
  email: string;
  phone_number: string;
  password: string;
  organization?: string | null;
  news_letter_subscription?: boolean;
};

export type PasswordResetRequest = {
  email: string;
};

export type TokenRefreshRequest = {
  access: string;
  refresh: string;
};

export type TokenVerifyRequest = {
  token: string;
};

// --- API responses ---

/** Raw backend login payload. */
export type LoginApiResponse = {
  user_id: number;
  token: TokenPair;
};

/** Normalized login result from the API layer. */
export type LoginResponse = {
  userId: number;
  tokens: TokenPair;
};

export type SignUpResponse = {
  user?: AuthUser;
  message?: string;
};

export type TokenRefreshResponse = TokenPair;

export type TokenVerifyResponse = {
  valid: boolean;
};

// --- Form values (UI layer) ---

export type LoginFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type SignUpFormValues = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  university?: string;
  acceptTerms: boolean;
};
