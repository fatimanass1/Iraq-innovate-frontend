"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ROUTES } from "@/shared/constants/routes";
import { authService } from "../services/authService";
import { signupSchema, type SignupFormInput } from "../validation/signupSchema";
import { applySignupFieldErrors, getAuthErrorMessage } from "./authErrors";

export function useSignup() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<SignupFormInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      university: "",
      acceptTerms: false,
    },
  });

  const mutation = useMutation({
    mutationFn: authService.signup,
    onSuccess: () => {
      toast.success("تم إنشاء الحساب بنجاح");
      router.push(ROUTES.SIGN_IN);
    },
    onError: (error: unknown) => {
      applySignupFieldErrors(form, error);
      toast.error(
        getAuthErrorMessage(error, "فشل إنشاء الحساب. يرجى المحاولة مرة أخرى."),
      );
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    showPassword,
    showConfirmPassword,
    isSubmitting: mutation.isPending,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit,
  };
}
