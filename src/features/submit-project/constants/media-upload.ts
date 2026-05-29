/** Figma `step-2` (65:1936) — upload zone tokens & validation */
export const MEDIA_UPLOAD_COPY = {
  dropTitle: "Drop files here or click to browse",
  dropTitleAr: "اسحب الملفات هنا أو انقر للتصفح",
  formats: "PNG · JPG · PDF · DOCX · PPTX",
  formatsWithVideo: "PNG · JPG · PDF · Video",
  browseAria: "Browse project media files",
  addMoreAria: "Add more media files",
  removeFileAria: "Remove file",
} as const;

/** Figma `step-2-1` UploadZone + preview cards (65:2055, component 80:4527) */
export const MEDIA_UPLOAD_THEME = {
  uploadZoneGap: 16,
  zoneHeight: 236,
  zoneRadius: 16,
  zoneBg: "rgba(240, 244, 235, 0.7)",
  zoneBorder: "rgba(0, 0, 0, 0.1)",
  zoneBgDrag: "rgba(232, 245, 210, 0.95)",
  zoneBorderDrag: "rgba(163, 230, 53, 0.65)",
  iconBoxSize: 64,
  iconBoxRadius: 16,
  iconBoxBg: "rgba(163, 230, 53, 0.12)",
  iconColor: "#4A7A00",
  titleColor: "#111318",
  subtitleColor: "#6B7260",
  formatsColor: "#B0B8A8",
  previewRowMinHeight: 115,
  cardWidth: 113,
  cardHeight: 105,
  cardRadius: 16,
  cardGap: 12,
  cardBg: "#FFFFFF",
  cardRing: "0px 0px 0px 1px rgba(0, 0, 0, 0.09)",
  cardHoverRing:
    "0px 0px 0px 1px rgba(0, 0, 0, 0.09), 0px 0px 18px 0px rgba(163, 230, 53, 0.22)",
  cardHoverOverlay: "rgba(1, 11, 24, 0.74)",
  deleteBtnSize: 20,
  deleteBtnBg: "#EA3535",
  deleteBtnRadius: 4,
  placeholderBorder: "#A8CF45",
  placeholderHoverGlow: "0px 0px 16px 0px rgba(163, 230, 53, 0.28)",
  docPlaceholderBg: "rgba(240, 244, 235, 0.9)",
  videoPlaceholderBg: "rgba(232, 238, 248, 0.95)",
  progressGradient:
    "linear-gradient(90deg, rgba(163, 230, 53, 1) 0%, rgba(6, 182, 212, 1) 100%)",
} as const;

export const ACCEPTED_MEDIA_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".pdf",
  ".docx",
  ".pptx",
  ".mp4",
  ".webm",
  ".mov",
] as const;

export const ACCEPTED_MEDIA_MIME_TYPES = [
  "image/png",
  "image/jpeg",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
] as const;

/** 10 MB per file — adjust if API documents a different limit */
export const MAX_MEDIA_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const MEDIA_UPLOAD_ACCEPT = ACCEPTED_MEDIA_EXTENSIONS.join(",");
