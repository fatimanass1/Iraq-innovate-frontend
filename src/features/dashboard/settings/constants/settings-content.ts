export const SETTINGS_PAGE = {
  titleAr: "الإعدادات",
  titleEn: "Settings",
  profileLabelEn: "Profile Information",
  profileLabelAr: "معلومات الملف الشخصي",
} as const;

export const SETTINGS_FIELDS = {
  fullName: { labelAr: "الاسم الكامل", placeholder: "" },
  email: {
    labelAr: "البريد الالكتروني",
    placeholder: "",
  },
  phoneNumber: {
    labelAr: "رقم الهاتف",
    placeholder: "07701234567",
  },
  organization: {
    labelAr: "المنظمة / الجامعة",
    placeholder: "",
  },
  newsletter: {
    labelAr: "الاشتراك في النشرة الإخبارية",
  },
} as const;

export const SETTINGS_MESSAGES = {
  saveSuccess: "تم حفظ التغييرات بنجاح",
  saveError: "فشل حفظ التغييرات",
  loadError: "تعذر تحميل بيانات الملف الشخصي",
} as const;

export const SETTINGS_ACTIONS = {
  save: "حفظ التغييرات",
  cancel: "إلغاء",
} as const;
