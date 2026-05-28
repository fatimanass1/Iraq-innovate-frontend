"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { SIGN_IN_CONTENT } from "../constants/auth-content";
import { cairo, outfit } from "../fonts";
import { useLogin } from "../hooks/useLogin";
import { AuthButton } from "./AuthButton";
import { AuthCheckbox } from "./AuthCheckbox";
import { AuthFormField } from "./AuthFormField";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";

export function SignInFormView() {
  const {
    form,
    showPassword,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  } = useLogin();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="flex w-full max-w-[420px] flex-col items-stretch">
      <div className="w-full ps-1 text-left sm:ps-0">
        <p
          className={cn(
            outfit.className,
            "text-[10px] font-bold uppercase tracking-[0.32em] text-[#A8CF45]",
          )}
        >
          {SIGN_IN_CONTENT.eyebrow}
        </p>

        <h2
          className={cn(
            outfit.className,
            "mt-3 text-[34px] font-extrabold leading-tight text-[#010B18]",
          )}
        >
          {SIGN_IN_CONTENT.title}
        </h2>
        <p
          className={cn(
            cairo.className,
            "mt-2 w-fit text-[15px] font-normal text-[rgba(1,11,24,0.45)]",
          )}
          dir="rtl"
          lang="ar"
        >
          {SIGN_IN_CONTENT.subtitle}
        </p>
      </div>

      <form className="mt-10 flex w-full flex-col gap-3" onSubmit={onSubmit} noValidate>
        <AuthFormField label={SIGN_IN_CONTENT.emailLabel}>
          <AuthInput
            type="email"
            variant="ltr"
            autoComplete="email"
            placeholder={SIGN_IN_CONTENT.emailPlaceholder}
            endAdornment={<Mail className="size-[18px] stroke-[1.75]" aria-hidden="true" />}
            error={errors.email?.message}
            {...register("email")}
          />
        </AuthFormField>

        <AuthFormField label={SIGN_IN_CONTENT.passwordLabel}>
          <PasswordInput
            autoComplete="current-password"
            placeholder={SIGN_IN_CONTENT.passwordPlaceholder}
            showPassword={showPassword}
            onToggleVisibility={togglePasswordVisibility}
            error={errors.password?.message}
            {...register("password")}
          />
        </AuthFormField>

        <div
          className="flex w-full max-w-[420px] items-center justify-between gap-4 pt-1"
          dir="ltr"
        >
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className={cn(
              cairo.className,
              "text-[14px] font-semibold text-[#A8CF45] transition-colors hover:text-[#8fb83a]",
            )}
            dir="rtl"
            lang="ar"
          >
            {SIGN_IN_CONTENT.forgotPassword}
          </Link>
          <AuthCheckbox label={SIGN_IN_CONTENT.rememberMe} {...register("rememberMe")} />
        </div>

        <div className="mt-3 w-full">
          <AuthButton type="submit" isLoading={isSubmitting}>
            {SIGN_IN_CONTENT.submit}
          </AuthButton>
        </div>
      </form>

      <p
        className={cn(
          cairo.className,
          "mt-8 text-center text-[15px] text-[rgba(1,11,24,0.5)]",
        )}
        dir="rtl"
        lang="ar"
      >
        {SIGN_IN_CONTENT.noAccount}{" "}
        <Link
          href={ROUTES.SIGN_UP}
          className="font-bold text-[#A8CF45] transition-colors hover:text-[#8fb83a]"
        >
          {SIGN_IN_CONTENT.createAccount}
        </Link>
      </p>
    </div>
  );
}
