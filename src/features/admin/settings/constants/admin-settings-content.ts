export const ADMIN_SETTINGS_PAGE = {
  titleAr: "الاعدادات",
  titleEn: "Settings",
  subtitleAr: "معلومات الحساب",
} as const;

export const ADMIN_SETTINGS_PROFILE = {
  roleLabel: "مدير النظام ( Admin )",
  emailLabel: "البريد",
} as const;

export const ADMIN_SETTINGS_SECTIONS = {
  account: "معلومات الحساب",
} as const;

export const ADMIN_SETTINGS_FIELDS = {
  fullName: "الاسم الكامل",
  email: "البريد الإلكتروني",
  phone: "رقم الهاتف",
  organization: "المسمى الوظيفي",
} as const;

export const ADMIN_SETTINGS_STATES = {
  loading: "جاري تحميل الإعدادات...",
  error: "تعذر تحميل معلومات الحساب.",
  empty: "لا تتوفر معلومات للحساب.",
  retry: "إعادة المحاولة",
} as const;
