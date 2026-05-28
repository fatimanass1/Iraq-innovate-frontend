"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ROUTES } from "@/shared/constants/routes";
import { authService } from "../services/authService";

export function useLogout() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      toast.success("تم تسجيل الخروج بنجاح");
      router.push(ROUTES.SIGN_IN);
    },
    onError: (error: Error) => {
      toast.error(error.message || "فشل تسجيل الخروج.");
    },
  });

  return {
    logout: () => mutation.mutate(),
    isLoggingOut: mutation.isPending,
  };
}
