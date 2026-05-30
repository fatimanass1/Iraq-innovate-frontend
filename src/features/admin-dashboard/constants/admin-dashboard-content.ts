export const ADMIN_BRAND = {
  en: "INNOVATE IRAQ",
  ar: "العراق يبتكر",
} as const;

export const ADMIN_NAV = {
  dashboard: "لوحة التحكم",
  projects: "ادارة المشاريع",
  teams: "الفرق",
  analytics: "التحليلات",
  notifications: "الإشعارات",
  settings: "الإعدادات",
  logout: "تسجيل الخروج",
} as const;

export const ADMIN_HEADER = {
  titleAr: "نظرة عامة على المنصة",
  titleEn: "Platform Overview",
  subtitle: "مراقبة مقاييس الابتكار والتقديمات الواردة",
  searchPlaceholder: "ابحث عن المشاريع...",
  role: "مدير النظام",
} as const;

export const ADMIN_STATS_LABELS = {
  total: { ar: "إجمالي المشاريع", en: "Total Projects" },
  approved: { ar: "معتمد", en: "Approved Projects" },
  pending: { ar: "تحت المراجعة", en: "Pending Projects" },
  rejected: { ar: "مرفوض", en: "Rejected Projects" },
} as const;

export const ADMIN_SECTIONS = {
  trends: {
    title: "اتجاهات التقديم",
    subtitle: "نظرة شهرية على مقترحات المشاريع",
  },
  recentActivity: "النشاط الأخير",
  viewAll: "عرض الكل",
  latestEvaluations: "التقديمات الأخيرة",
  quickReview: "قائمة المراجعة السريعة",
  urgent: "عاجل",
} as const;

export const ADMIN_CHART = {
  totalSeries: "إجمالي التقديمات",
  approvedSeries: "المشاريع المعتمدة",
  weekly: "أسبوعي",
  monthly: "شهري",
  yearly: "سنوي",
} as const;

export const ADMIN_TABLE = {
  projectName: "اسم المشروع",
  status: "الحالة",
  category: "الفئة",
} as const;

export const ADMIN_REVIEW = {
  review: "مراجعة الطلب",
  details: "عرض التفاصيل",
  pendingCount: "بانتظار المراجعة",
} as const;

export const ADMIN_STATES = {
  loading: "جاري تحميل لوحة التحكم...",
  error: "تعذر تحميل بيانات لوحة التحكم.",
  retry: "إعادة المحاولة",
  emptyProjects: "لا توجد مشاريع لعرضها حالياً.",
  emptyActivity: "لا يوجد نشاط حديث.",
  emptyEvaluations: "لا توجد تقديمات حديثة.",
  emptyQuickReview: "لا توجد مشاريع بانتظار المراجعة.",
  trendVsMonth: "مقارنة بالشهر الماضي",
  needsAttention: "يحتاج إلى اهتمام",
  noSearchResults: "لا توجد نتائج مطابقة للبحث.",
} as const;

export const ARABIC_MONTHS = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
] as const;
