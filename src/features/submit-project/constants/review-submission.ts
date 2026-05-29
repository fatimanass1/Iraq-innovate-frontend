import type { SubmitProjectStep } from "../types/wizard.types";

/** Figma `step-5` (65:1617) */
export const REVIEW_SUBMISSION_THEME = {
  cardsGap: 16,
  cardRadius: 16,
  cardBg: "#FFFFFF",
  cardRing: "0px 0px 0px 1px rgba(0, 0, 0, 0.09)",
  cardPaddingTop: 20,
  cardPaddingX: 20,
  cardHeaderHeight: 28,
  cardBodyGap: 10,
  titleEnSize: 14,
  titleEnLineHeight: 20,
  titleArSize: 12,
  titleArLineHeight: 16,
  titleEnColor: "#111318",
  titleArColor: "#6B7260",
  editBtnWidth: 62.3,
  editBtnHeight: 28,
  editBtnRadius: 12,
  editBtnBg: "rgba(168, 207, 69, 0.1)",
  editBtnColor: "#4A7A00",
  editBtnFontSize: 12,
  rowHeight: 22.75,
  rowDescHeight: 24.75,
  labelSize: 11,
  labelLineHeight: 16.5,
  labelColor: "#8A8F80",
  valueSize: 14,
  valueLineHeight: 22.75,
  valueColor: "#3A3D4A",
  mediaThumbWidth: 95,
  mediaThumbHeight: 71.25,
  mediaThumbRadius: 12,
  mediaThumbBg: "#F0F4E8",
  teamInnerBg: "#F0F4E8",
  teamInnerRing: "0px 0px 0px 1px rgba(0, 0, 0, 0.07)",
  teamInnerRadius: 16,
  teamInnerPadding: 12,
  teamInnerGap: 8,
  teamBadgeSize: 20,
  teamBadgeBg: "rgba(163, 230, 53, 0.2)",
  teamBadgeColor: "#4A7A00",
  teamNameSize: 14,
  teamRoleSize: 11,
  submitWidth: 171,
  submitHeight: 44,
  submitRadius: 16,
  submitGradient: "linear-gradient(135deg, rgba(163, 230, 53, 1) 0%, rgba(6, 182, 212, 1) 100%)",
  submitGlow:
    "0px 0px 48px 0px rgba(6, 182, 212, 0.12), 0px 0px 24px 0px rgba(163, 230, 53, 0.3)",
  submitTextColor: "#0A0B0E",
  backBg: "rgba(0, 0, 0, 0.05)",
  backTextColor: "#6B7260",
} as const;

export const REVIEW_SUBMISSION_COPY = {
  emptyValue: "—",
  certificateNotUploaded: "Not uploaded",
  teamDisabled: "No team members added",
  edit: "Edit",
  backAr: "عودة",
  submitAr: "إرسال المشروع",
  editAria: (section: string) => `Edit ${section}`,
} as const;

export const REVIEW_SECTIONS = {
  project: {
    step: 1 as SubmitProjectStep,
    titleEn: "Project Information",
    titleAr: "معلومات المشروع",
  },
  media: {
    step: 2 as SubmitProjectStep,
    titleEn: "Project Media",
    titleAr: "وسائط المشروع",
  },
  owner: {
    step: 3 as SubmitProjectStep,
    titleEn: "Owner Information",
    titleAr: "معلومات المالك",
  },
  team: {
    step: 4 as SubmitProjectStep,
    titleEn: "Team Members",
    titleAr: "أعضاء الفريق",
  },
} as const;

export const REVIEW_PROJECT_ROWS = [
  { key: "title", label: "Title / العنوان" },
  { key: "category", label: "Category / الفئة" },
  { key: "summary", label: "Summary / الملخص", multiline: true },
  { key: "description", label: "Description / الوصف", multiline: true },
  { key: "website", label: "Website / الموقع" },
] as const;

export const REVIEW_OWNER_ROWS = [
  { key: "name", label: "Name / الاسم" },
  { key: "birthdate", label: "Birthdate / تاريخ الميلاد" },
  { key: "college", label: "College / الكلية" },
  { key: "certificate", label: "Certificate / الشهادة" },
  { key: "linkedin", label: "LinkedIn / لينكد إن" },
] as const;
