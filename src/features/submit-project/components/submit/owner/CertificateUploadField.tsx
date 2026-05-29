"use client";

import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "@/shared/utils/utils";
import { SUBMIT_PROJECT_FIELDS } from "../../../constants/submit-project-content";
import {
  OWNER_CERTIFICATE_ACCEPT,
  OWNER_CERTIFICATE_COPY,
  OWNER_INFO_THEME as O,
} from "../../../constants/owner-info";
import type { BilingualMessage } from "../../../types/validation.types";
import { submitCairo, submitOutfit } from "../../../utils/fonts";
import { FieldValidationMessage, fieldContainerStyle } from "../../FieldValidationMessage";

type CertificateUploadFieldProps = {
  file: File | null;
  error?: BilingualMessage;
  fieldId?: string;
  onChange: (file: File | null) => void;
  onBlur?: () => void;
};

export function CertificateUploadField({
  file,
  error,
  fieldId,
  onChange,
  onBlur,
}: CertificateUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerStyle = fieldContainerStyle(error);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0] ?? null;
    onChange(selected);
    event.target.value = "";
    onBlur?.();
  };

  return (
    <div className="w-full" id={fieldId ? `${fieldId}-wrapper` : undefined}>
      <button
        id={fieldId}
        type="button"
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex w-full cursor-pointer items-center text-start transition-shadow duration-200",
          "hover:opacity-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A8CF45]/40",
        )}
        style={{
          height: O.certificateHeight,
          borderRadius: O.certificateRadius,
          backgroundColor: containerStyle.backgroundColor,
          boxShadow: containerStyle.boxShadow,
          padding: O.certificatePadding,
          gap: O.certificateInnerGap,
        }}
        aria-label={OWNER_CERTIFICATE_COPY.browseAria}
      >
        <div
          className="flex min-w-0 flex-1 flex-col"
          style={{ gap: O.certificateLabelGap }}
        >
          <div
            className="flex items-center justify-end"
            style={{ gap: O.certificateLabelRowGap }}
          >
            <span
              className={cn(submitOutfit.className, "uppercase")}
              style={{
                color: O.labelColor,
                fontSize: O.labelEnSize,
                lineHeight: `${O.labelEnLineHeight}px`,
                letterSpacing: O.labelEnLetterSpacing,
                fontWeight: 500,
              }}
            >
              {SUBMIT_PROJECT_FIELDS.ownerCertificate.en}
            </span>
            <span
              className={cn(submitCairo.className, "uppercase")}
              style={{
                color: O.labelColor,
                fontSize: O.labelEnSize,
                lineHeight: `${O.labelEnLineHeight}px`,
                letterSpacing: O.labelEnLetterSpacing,
                fontWeight: 500,
                opacity: O.labelArOpacity,
              }}
              dir="rtl"
            >
              {SUBMIT_PROJECT_FIELDS.ownerCertificate.ar}
            </span>
          </div>

          <div className="flex min-w-0 items-center justify-between gap-2">
            <p
              className={cn(
                submitOutfit.className,
                "min-w-0 flex-1 truncate font-medium",
              )}
              style={{
                color: O.labelColor,
                fontSize: O.helperSize,
                lineHeight: `${O.helperLineHeight}px`,
              }}
            >
              {file ? file.name : OWNER_CERTIFICATE_COPY.helper}
            </p>

            {file ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(null);
                  onBlur?.();
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    event.stopPropagation();
                    onChange(null);
                    onBlur?.();
                  }
                }}
                aria-label={OWNER_CERTIFICATE_COPY.removeAria}
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#6B7260] transition-colors hover:bg-black/10"
              >
                <X className="size-3.5" aria-hidden="true" />
              </span>
            ) : null}
          </div>
        </div>

        <div
          className="flex shrink-0 items-center justify-center"
          style={{
            width: O.uploadIconBoxSize,
            height: O.uploadIconBoxSize,
            borderRadius: O.uploadIconBoxRadius,
            backgroundColor: O.uploadIconBoxBg,
          }}
        >
          <Upload
            className="shrink-0"
            style={{
              width: O.uploadIconSize,
              height: O.uploadIconSize,
              color: O.labelColor,
            }}
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={OWNER_CERTIFICATE_ACCEPT}
        className="sr-only"
        onChange={handleChange}
      />

      {error ? <FieldValidationMessage message={error} /> : null}
    </div>
  );
}
