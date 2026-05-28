"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { authService } from "@/features/auth/services/authService";
import { ROUTES } from "@/shared/constants/routes";

export function useDashboardLogout() {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      toast.success("تم تسجيل الخروج بنجاح");
      router.push(ROUTES.SIGN_IN);
    },
    onError: () => {
      toast.error("تعذر تسجيل الخروج. يرجى المحاولة مرة أخرى.");
    },
  });
}
