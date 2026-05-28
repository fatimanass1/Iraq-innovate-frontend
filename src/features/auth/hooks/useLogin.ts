"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ROUTES } from "@/shared/constants/routes";
import { AUTH_SEARCH_PARAMS } from "@/shared/utils/auth/constants";
import { getSafeRedirectPath } from "@/shared/utils/auth/redirect";
import { authService } from "../services/authService";
import { loginSchema, type LoginSchema } from "../validation/loginSchema";
import { applyLoginFieldErrors, getAuthErrorMessage } from "./authErrors";

export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      toast.success("تم تسجيل الدخول بنجاح");
      const redirect = getSafeRedirectPath(
        searchParams.get(AUTH_SEARCH_PARAMS.redirect),
        ROUTES.DASHBOARD,
      );
      router.push(redirect);
    },
    onError: (error: unknown) => {
      applyLoginFieldErrors(form, error);
      toast.error(
        getAuthErrorMessage(error, "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى."),
      );
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    showPassword,
    isSubmitting: mutation.isPending,
    togglePasswordVisibility,
    onSubmit,
  };
}
