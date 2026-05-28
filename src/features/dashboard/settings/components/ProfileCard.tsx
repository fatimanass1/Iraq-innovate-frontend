"use client";

import { useState, type ChangeEvent } from "react";
import { Building2, Mail, Phone, User } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { SETTINGS_FIELDS, SETTINGS_PAGE } from "../constants/settings-content";
import { SETTINGS_THEME as T } from "../constants/settings-theme";
import { settingsSchema } from "../validation/settingsSchema";
import type { SettingsFormValues, SettingsProfile } from "../types/settings.types";
import { cairo, outfit } from "@/features/dashboard/fonts";
import { SettingsActions } from "./SettingsActions";
import { SettingsInput } from "./SettingsInput";
import { UserAvatar } from "./UserAvatar";

type ProfileCardProps = {
  profile: SettingsProfile;
  onSave: (values: SettingsFormValues) => void;
  isSaving?: boolean;
  className?: string;
};

export function ProfileCard({
  profile,
  onSave,
  isSaving = false,
  className,
}: ProfileCardProps) {
  const [form, setForm] = useState<SettingsFormValues>({
    fullName: profile.fullName,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    newsLetterSubscription: profile.newsLetterSubscription,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SettingsFormValues, string>>>(
    {},
  );

  const handleChange =
    (field: keyof SettingsFormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      setForm((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };

  const handleSave = () => {
    const result = settingsSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SettingsFormValues, string>> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof SettingsFormValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    onSave(result.data);
  };

  const handleCancel = () => {
    setForm({
      fullName: profile.fullName,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      newsLetterSubscription: profile.newsLetterSubscription,
    });
    setErrors({});
  };

  return (
    <article
      className={cn("w-full", className)}
      style={{
        maxWidth: T.contentMaxWidth,
        marginInline: "auto",
        marginTop: 24,
        padding: `${T.cardPaddingY}px ${T.cardPaddingX}px`,
        borderRadius: T.cardRadius,
        backgroundColor: T.cardBg,
        border: `1px solid ${T.cardBorder}`,
        boxShadow: T.cardShadow,
      }}
    >
      <p className="text-center leading-snug">
        <span
          className={cn(cairo.className, "font-semibold")}
          style={{
            fontSize: T.profileLabelSize,
            color: `rgba(1, 11, 24, ${T.profileLabelOpacity + 0.4})`,
          }}
          lang="ar"
        >
          {SETTINGS_PAGE.profileLabelAr}
        </span>
        <span
          className={cn(outfit.className, "mx-1.5 font-medium")}
          style={{
            fontSize: T.profileLabelSize - 1,
            color: `rgba(1, 11, 24, ${T.profileLabelOpacity})`,
          }}
        >
          /
        </span>
        <span
          className={cn(outfit.className, "font-medium")}
          style={{
            fontSize: T.profileLabelSize - 1,
            color: `rgba(1, 11, 24, ${T.profileLabelOpacity})`,
          }}
        >
          {SETTINGS_PAGE.profileLabelEn}
        </span>
      </p>

      <div
        className="flex items-start gap-4"
        style={{ marginTop: T.profileSectionGap }}
        dir="rtl"
      >
        <UserAvatar initials={profile.initials} />

        <div className="min-w-0 flex-1 text-start">
          <p
            className={cn(outfit.className, "font-bold leading-tight text-[#010B18]")}
            style={{ fontSize: T.profileNameSize }}
          >
            {profile.fullName}
          </p>
          <p
            className={cn(outfit.className, "mt-1 font-medium leading-snug")}
            style={{
              fontSize: T.profileEmailSize,
              color: `rgba(1, 11, 24, ${T.profileEmailOpacity})`,
            }}
          >
            {profile.displayEmail}
          </p>
          <p
            className={cn(cairo.className, "mt-2 text-[12px] font-medium text-[rgba(1,11,24,0.5)]")}
            lang="ar"
          >
            {profile.organization}
          </p>
        </div>
      </div>

      <div className="flex flex-col" style={{ marginTop: T.profileSectionGap, gap: T.fieldGap }}>
        <SettingsInput
          labelAr={SETTINGS_FIELDS.fullName.labelAr}
          icon={User}
          value={form.fullName}
          onChange={handleChange("fullName")}
          error={errors.fullName}
        />
        <SettingsInput
          labelAr={SETTINGS_FIELDS.email.labelAr}
          icon={Mail}
          type="email"
          value={form.email}
          onChange={handleChange("email")}
          error={errors.email}
        />
        <SettingsInput
          labelAr={SETTINGS_FIELDS.phoneNumber.labelAr}
          icon={Phone}
          type="tel"
          value={form.phoneNumber}
          onChange={handleChange("phoneNumber")}
          error={errors.phoneNumber}
          dir="ltr"
        />
        <SettingsInput
          labelAr={SETTINGS_FIELDS.organization.labelAr}
          icon={Building2}
          value={profile.organization}
          readOnly
          disabled
          className="opacity-70"
        />

        <label
          className={cn(
            cairo.className,
            "flex cursor-pointer items-center justify-end gap-2 text-[13px] font-medium text-[#010B18]",
          )}
          dir="rtl"
        >
          <input
            type="checkbox"
            checked={form.newsLetterSubscription}
            onChange={handleChange("newsLetterSubscription")}
            className="size-4 rounded border-[rgba(1,11,24,0.2)] accent-[#A8CF45]"
          />
          {SETTINGS_FIELDS.newsletter.labelAr}
        </label>
      </div>

      <SettingsActions
        onSave={handleSave}
        onCancel={handleCancel}
        isSaving={isSaving}
      />
    </article>
  );
}
