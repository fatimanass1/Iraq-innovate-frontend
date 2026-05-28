import { applyAuthSession, clearAuthSession } from "@/shared/utils/auth/session";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/shared/utils/auth/cookies";
import { authApi, toAuthApiError } from "../api/authApi";
import { userService } from "./userService";
import { normalizeIraqiPhone } from "../validation/phone.utils";
import { useAuthStore } from "../store/authStore";
import type {
  AuthSession,
  LoginFormValues,
  LoginRequest,
  PasswordResetRequest,
  SignUpFormValues,
  SignUpRequest,
  TokenPair,
} from "../types/auth.types";

/** Maps UI form values to backend `UserLogin` contract (email or phone + password only). */
function mapLoginPayload(values: LoginFormValues): LoginRequest {
  const identifier = values.email.trim();
  const email_or_phone_number = identifier.includes("@")
    ? identifier
    : normalizeIraqiPhone(identifier);

  return {
    email_or_phone_number,
    password: values.password,
  };
}

/** Maps validated form values to backend `UserSignUp` contract. */
function mapSignupPayload(values: SignUpFormValues): SignUpRequest {
  const organization = values.university?.trim();

  return {
    name: values.fullName.trim(),
    email: values.email.trim(),
    phone_number: normalizeIraqiPhone(values.phoneNumber),
    password: values.password,
    organization: organization ? organization : null,
    news_letter_subscription: values.acceptTerms ?? false,
  };
}

/** Business logic layer — no UI code. */
export const authService = {
  async login(values: LoginFormValues): Promise<AuthSession> {
    const payload = mapLoginPayload(values);

    if (process.env.NODE_ENV === "development") {
      console.log("[login] request payload", {
        ...payload,
        password: "[redacted]",
      });
    }

    try {
      const response = await authApi.login(payload);

      if (process.env.NODE_ENV === "development") {
        console.log("[login] response", {
          userId: response.userId,
          access: response.tokens.access ? "[present]" : undefined,
          refresh: response.tokens.refresh ? "[present]" : undefined,
        });
      }

      const session: AuthSession = {
        user: {
          id: response.userId,
          email: values.email.trim(),
        },
        tokens: response.tokens,
      };

      applyAuthSession(session);

      try {
        await userService.fetchCurrentUser();
      } catch (profileError) {
        if (process.env.NODE_ENV === "development") {
          console.error("[login] failed to load user profile", profileError);
        }
      }

      return session;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const authError = toAuthApiError(error);
        console.error("[login] API error", {
          message: authError.message,
          fieldErrors: authError.fieldErrors,
          status: authError.status,
        });
      }
      throw error;
    }
  },

  async signup(values: SignUpFormValues) {
    const payload = mapSignupPayload(values);

    if (process.env.NODE_ENV === "development") {
      console.log("[signup] request payload", {
        ...payload,
        password: "[redacted]",
      });
    }

    try {
      const response = await authApi.signup(payload);

      if (process.env.NODE_ENV === "development") {
        console.log("[signup] response", response);
      }

      if (response.user) {
        useAuthStore.getState().setUser(response.user);
      }

      return response;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        const authError = toAuthApiError(error);
        console.error("[signup] API error", {
          message: authError.message,
          fieldErrors: authError.fieldErrors,
          status: authError.status,
        });
      }
      throw error;
    }
  },

  async logout() {
    const refreshToken = useAuthStore.getState().refreshToken;

    try {
      if (refreshToken) {
        await authApi.logout({ refresh_token: refreshToken });
      }
    } finally {
      clearAuthSession();
    }
  },

  async requestPasswordReset(email: string) {
    const payload: PasswordResetRequest = { email: email.trim() };
    await authApi.passwordReset(payload);
  },

  async refreshTokens(): Promise<TokenPair | null> {
    const { accessToken, refreshToken } = useAuthStore.getState();

    if (!accessToken || !refreshToken) {
      return null;
    }

    const tokens = await authApi.refreshToken({
      access: accessToken,
      refresh: refreshToken,
    });

    useAuthStore.getState().setTokens(tokens);
    setAccessTokenCookie(tokens.access);
    setRefreshTokenCookie(tokens.refresh);
    return tokens;
  },

  async verifyAccessToken() {
    const accessToken = useAuthStore.getState().accessToken;

    if (!accessToken) {
      return { valid: false };
    }

    return authApi.verifyToken({ token: accessToken });
  },
};
