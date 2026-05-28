import { authApi } from "../api/authApi";
import { useAuthStore } from "../store/authStore";
import type { AuthUser, UpdateUserRequest } from "../types/auth.types";
import { mapApiUserToAuthUser } from "../utils/user.helpers";

/** Business logic for current user profile — no UI code. */
export const userService = {
  async fetchCurrentUser(): Promise<AuthUser> {
    const response = await authApi.getUserInformation();
    const user = mapApiUserToAuthUser(response);
    useAuthStore.getState().setUser(user);
    return user;
  },

  async updateCurrentUser(payload: UpdateUserRequest): Promise<AuthUser> {
    const response = await authApi.updateUser(payload);
    const user = mapApiUserToAuthUser(response);
    useAuthStore.getState().setUser(user);
    return user;
  },
};
