"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { DEFAULT_AUTH_REDIRECT, REDIRECT_QUERY_PARAM } from "@/constants/routes";
import { useAuthStore } from "@/store/auth.store";
import { loginFormSchema, type LoginFormValues } from "../validation/login.schema";

export function useLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setUser = useAuthStore((state) => state.setUser);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setUser(
      {
        id: "demo-user",
        email: values.email,
        name: "Demo User",
        role: "admin",
      },
      `demo-token-${Date.now()}`,
    );
    toast.success("Signed in successfully");

    const redirectTo = searchParams.get(REDIRECT_QUERY_PARAM) ?? DEFAULT_AUTH_REDIRECT;
    router.push(redirectTo);
    router.refresh();
  });

  return { form, onSubmit, isSubmitting: form.formState.isSubmitting };
}
