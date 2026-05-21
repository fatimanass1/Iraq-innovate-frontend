"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { FormField, TextInput } from "@/components/forms";
import { ROUTES } from "@/constants/routes";
import { useLoginForm } from "../hooks/use-login-form";

export function LoginScreen() {
  const { form, onSubmit, isSubmitting } = useLoginForm();
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to access your dashboard workspace.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="Email" htmlFor="email" error={errors.email?.message}>
          <TextInput
            id="email"
            type="email"
            placeholder="you@company.com"
            {...register("email")}
          />
        </FormField>
        <FormField label="Password" htmlFor="password" error={errors.password?.message}>
          <TextInput
            id="password"
            type="password"
            placeholder="••••••••"
            {...register("password")}
          />
        </FormField>
        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Demo auth flow. Continue to{" "}
        <Link href={ROUTES.DASHBOARD} className="font-medium text-primary hover:underline">
          dashboard
        </Link>
        .
      </p>
    </div>
  );
}
