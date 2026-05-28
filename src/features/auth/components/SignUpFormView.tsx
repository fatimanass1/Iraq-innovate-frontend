"use client";

import Link from "next/link";
import { ArrowRight, Building2, Mail, Phone, User } from "lucide-react";
import { ROUTES } from "@/shared/constants/routes";
import { cn } from "@/shared/utils/utils";
import { SIGN_UP_CONTENT } from "../constants/auth-content";
import { cairo, outfit } from "../fonts";
import { useSignup } from "../hooks/useSignup";
import { AuthButton } from "./AuthButton";
import { AuthCheckbox } from "./AuthCheckbox";
import { AuthFormField } from "./AuthFormField";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";

export function SignUpFormView() {
  const {
    form,
    showPassword,
    showConfirmPassword,
    isSubmitting,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    onSubmit,
  } = useSignup();

  const {
    register,
    formState: { errors },
  } = form;

  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;
  const passwordRowError = passwordError ?? confirmPasswordError;

  return (
    <div className="flex w-full max-w-[420px] flex-col items-stretch">
      <div className="w-full ps-1 text-left sm:ps-0">
        <p
          className={cn(
            outfit.className,
            "text-[10px] font-bold uppercase tracking-[0.32em] text-[#A8CF45]",
          )}
        >
          {SIGN_UP_CONTENT.eyebrow}
        </p>

        <h2
          className={cn(
            outfit.className,
            "mt-3 text-[34px] font-extrabold leading-tight text-[#010B18]",
          )}
        >
          {SIGN_UP_CONTENT.title}
        </h2>
        <p
          className={cn(
            cairo.className,
            "mt-2 w-fit text-[15px] font-normal text-[rgba(1,11,24,0.45)]",
          )}
          dir="rtl"
          lang="ar"
        >
          {SIGN_UP_CONTENT.subtitle}
        </p>
      </div>

      <form className="mt-10 flex w-full flex-col gap-3" onSubmit={onSubmit} noValidate>
        <AuthFormField label={SIGN_UP_CONTENT.fullNameLabel}>
          <AuthInput
            type="text"
            variant="rtl"
            autoComplete="name"
            placeholder={SIGN_UP_CONTENT.fullNamePlaceholder}
            endAdornment={<User className="size-[18px] stroke-[1.75]" aria-hidden="true" />}
            error={errors.fullName?.message}
            {...register("fullName")}
          />
        </AuthFormField>

        <AuthFormField label={SIGN_UP_CONTENT.emailLabel}>
          <AuthInput
            type="email"
            variant="ltr"
            autoComplete="email"
            placeholder={SIGN_UP_CONTENT.emailPlaceholder}
            endAdornment={<Mail className="size-[18px] stroke-[1.75]" aria-hidden="true" />}
            error={errors.email?.message}
            {...register("email")}
          />
        </AuthFormField>

        <AuthFormField label={SIGN_UP_CONTENT.phoneLabel}>
          <AuthInput
            type="tel"
            variant="ltr"
            autoComplete="tel"
            placeholder={SIGN_UP_CONTENT.phonePlaceholder}
            inputMode="tel"
            endAdornment={<Phone className="size-[18px] stroke-[1.75]" aria-hidden="true" />}
            error={errors.phoneNumber?.message}
            {...register("phoneNumber")}
          />
        </AuthFormField>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2" dir="rtl">
          <AuthFormField label={SIGN_UP_CONTENT.passwordLabel}>
            <PasswordInput
              containerClassName="max-w-none"
              autoComplete="new-password"
              placeholder={SIGN_UP_CONTENT.passwordPlaceholder}
              showPassword={showPassword}
              onToggleVisibility={togglePasswordVisibility}
              hideError
              {...register("password")}
            />
          </AuthFormField>

          <AuthFormField label={SIGN_UP_CONTENT.confirmLabel}>
            <PasswordInput
              containerClassName="max-w-none"
              autoComplete="new-password"
              placeholder={SIGN_UP_CONTENT.confirmPlaceholder}
              showPassword={showConfirmPassword}
              onToggleVisibility={toggleConfirmPasswordVisibility}
              hideError
              {...register("confirmPassword")}
            />
          </AuthFormField>
        </div>

        {passwordRowError ? (
          <p className={cn(cairo.className, "-mt-0.5 text-right text-xs text-[rgba(220,38,38,0.75)]")}>
            {passwordRowError}
          </p>
        ) : null}

        <AuthFormField
          label={SIGN_UP_CONTENT.universityLabel}
          optional={SIGN_UP_CONTENT.universityOptional}
        >
          <AuthInput
            type="text"
            variant="rtl"
            autoComplete="organization"
            placeholder={SIGN_UP_CONTENT.universityPlaceholder}
            endAdornment={<Building2 className="size-[18px] stroke-[1.75]" aria-hidden="true" />}
            error={errors.university?.message}
            {...register("university")}
          />
        </AuthFormField>

        <div className="pt-1">
          <AuthCheckbox
            align="start"
            labelDir="rtl"
            label={SIGN_UP_CONTENT.termsLabel}
            {...register("acceptTerms")}
          />
          {errors.acceptTerms?.message ? (
            <p className={cn(cairo.className, "mt-1.5 text-right text-xs text-[rgba(220,38,38,0.75)]")}>
              {errors.acceptTerms.message}
            </p>
          ) : null}
        </div>

        <div className="mt-2 w-full">
          <AuthButton type="submit" isLoading={isSubmitting}>
            <span>{SIGN_UP_CONTENT.submit}</span>
            <ArrowRight className="size-[18px] stroke-[2]" aria-hidden="true" />
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
        {SIGN_UP_CONTENT.hasAccount}{" "}
        <Link
          href={ROUTES.SIGN_IN}
          className="font-bold text-[#A8CF45] transition-colors hover:text-[#8fb83a]"
        >
          {SIGN_UP_CONTENT.signIn}
        </Link>
      </p>
    </div>
  );
}
