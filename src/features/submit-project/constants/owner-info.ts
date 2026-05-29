/** Figma `step-3` (65:1070) — owner form tokens */
export const OWNER_INFO_THEME = {
  fieldGap: 20,
  certificateHeight: 69,
  certificateRadius: 16,
  certificatePadding: 16,
  certificateInnerGap: 12,
  certificateLabelGap: 2,
  certificateLabelRowGap: 7,
  labelEnSize: 10,
  labelEnLineHeight: 15,
  labelEnLetterSpacing: "0.07em",
  labelArOpacity: 0.6,
  helperSize: 14,
  helperLineHeight: 20,
  uploadIconBoxSize: 32,
  uploadIconBoxRadius: 12,
  uploadIconBoxBg: "rgba(0, 0, 0, 0.05)",
  uploadIconSize: 14,
  labelColor: "#8A8F80",
  errorRing: "0px 0px 0px 1.5px rgba(234, 53, 53, 0.85)",
} as const;

export const OWNER_CERTIFICATE_COPY = {
  helper: "Click to upload · PDF, DOCX, PNG",
  browseAria: "Upload graduate certificate",
  removeAria: "Remove graduate certificate",
} as const;

export const OWNER_CERTIFICATE_ACCEPT = ".pdf,.docx,.png,.jpg,.jpeg";

export const OWNER_CERTIFICATE_MIME_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
] as const;

export const MAX_OWNER_CERTIFICATE_BYTES = 10 * 1024 * 1024;
