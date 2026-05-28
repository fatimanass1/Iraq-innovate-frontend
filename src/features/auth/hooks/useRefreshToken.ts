"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authService } from "../services/authService";

export function useRefreshToken() {
  const mutation = useMutation({
    mutationFn: authService.refreshTokens,
    onError: (error: Error) => {
      toast.error(error.message || "فشل تحديث الجلسة.");
    },
  });

  return {
    refreshTokens: () => mutation.mutate(),
    isRefreshing: mutation.isPending,
    refreshAsync: mutation.mutateAsync,
  };
}
