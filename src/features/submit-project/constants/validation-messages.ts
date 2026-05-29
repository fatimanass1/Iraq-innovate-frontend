import type { BilingualMessage } from "../types/validation.types";

export const VALIDATION_MESSAGES = {
  required: (fieldAr: string, fieldEn: string): BilingualMessage => ({
    ar: `${fieldAr} مطلوب`,
    en: `${fieldEn} is required`,
  }),
  minLength: (fieldAr: string, fieldEn: string, min: number): BilingualMessage => ({
    ar: `${fieldAr} يجب أن يكون ${min} أحرف على الأقل`,
    en: `${fieldEn} must be at least ${min} characters`,
  }),
  maxLength: (fieldAr: string, fieldEn: string, max: number): BilingualMessage => ({
    ar: `${fieldAr} يجب ألا يتجاوز ${max} حرفًا`,
    en: `${fieldEn} must not exceed ${max} characters`,
  }),
  invalidUrl: {
    ar: "يرجى إدخال رابط صحيح",
    en: "Please enter a valid URL",
  },
  futureDate: {
    ar: "لا يمكن أن يكون التاريخ في المستقبل",
    en: "Date cannot be in the future",
  },
  categoryRequired: {
    ar: "يرجى اختيار فئة",
    en: "Please select a category",
  },
  mediaRequired: {
    ar: "يرجى رفع ملف واحد على الأقل",
    en: "Please upload at least one media file",
  },
  unsupportedMediaType: {
    ar: "نوع الملف غير مدعوم",
    en: "Unsupported file type",
  },
  mediaFileTooLarge: (maxLabel: string): BilingualMessage => ({
    ar: `حجم الملف كبير جداً (الحد الأقصى ${maxLabel})`,
    en: `File is too large (maximum ${maxLabel})`,
  }),
  unsupportedCertificateType: {
    ar: "نوع الملف غير مدعوم (PDF, DOCX, PNG, JPG)",
    en: "Unsupported file type (PDF, DOCX, PNG, JPG)",
  },
  teamMembersRequired: {
    ar: "يرجى إضافة عضو فريق واحد على الأقل",
    en: "Please add at least one team member",
  },
  stepHasErrors: (stepAr: string, stepEn: string): BilingualMessage => ({
    ar: `يرجى تصحيح الأخطاء في: ${stepAr}`,
    en: `Please fix errors in: ${stepEn}`,
  }),
} as const;

export const FIELD_LABELS = {
  title: { ar: "عنوان المشروع", en: "Project title" },
  description: { ar: "وصف المشروع", en: "Project description" },
  summary: { ar: "ملخص المشروع", en: "Project summary" },
  websiteUrl: { ar: "رابط الموقع", en: "Website URL" },
  category: { ar: "الفئة", en: "Category" },
  ownerName: { ar: "اسم المالك", en: "Owner name" },
  ownerBirthdate: { ar: "تاريخ الميلاد", en: "Birthdate" },
  ownerCollege: { ar: "الكلية / الجامعة", en: "College / University" },
  ownerCertificate: { ar: "شهادة التخرج", en: "Graduate certificate" },
  ownerLinkedin: { ar: "رابط LinkedIn", en: "LinkedIn URL" },
  memberName: { ar: "اسم العضو", en: "Member name" },
  memberRole: { ar: "الدور في المشروع", en: "Role" },
  memberBirthdate: { ar: "تاريخ الميلاد", en: "Birthdate" },
  memberCollege: { ar: "الكلية", en: "College" },
  memberLinkedin: { ar: "رابط LinkedIn", en: "LinkedIn URL" },
  memberCertificate: { ar: "شهادة التخرج", en: "Graduate certificate" },
} as const;

export const STEP_LABELS = {
  1: { ar: "معلومات المشروع", en: "Project Information" },
  2: { ar: "وسائط المشروع", en: "Project Media" },
  3: { ar: "معلومات المالك", en: "Owner Information" },
  4: { ar: "أعضاء الفريق", en: "Team Members" },
} as const;
