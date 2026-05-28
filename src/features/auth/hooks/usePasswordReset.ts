"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { authService } from "../services/authService";
import { applyLoginFieldErrors } from "./authErrors";

const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("يرجى إدخال بريد إلكتروني صالح"),
});

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>;

export function usePasswordReset() {
  const form = useForm<PasswordResetSchema>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (values: PasswordResetSchema) =>
      authService.requestPasswordReset(values.email),
    onSuccess: () => {
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني");
      form.reset();
    },
    onError: (error: Error) => {
      applyLoginFieldErrors(form, error);
      toast.error(error.message || "فشل إرسال طلب إعادة تعيين كلمة المرور.");
    },
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate(values));

  return {
    form,
    isSubmitting: mutation.isPending,
    onSubmit,
  };
}
