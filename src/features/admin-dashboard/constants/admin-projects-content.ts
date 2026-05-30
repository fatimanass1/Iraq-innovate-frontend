export const ADMIN_PROJECTS_HEADER = {
  titleAr: "أدارة المشاريع",
  titleEn: "Project Management",
  subtitle: "إدارة، مراجعة، وتصفية جميع طلبات الابتكار عبر منصة العراق يبتكر",
} as const;

export const ADMIN_PROJECTS_STATS = {
  total: { ar: "إجمالي الطلبات", en: "Total Requests" },
  pending: { ar: "قيد المراجعة", en: "Under Review" },
  approved: { ar: "المشاريع المقبولة", en: "Accepted Projects" },
  rejected: { ar: "المرفوضة", en: "Rejected" },
} as const;

export const ADMIN_PROJECTS_TABS = {
  all: "جميع المشاريع",
  pending: "قيد المراجعة",
  approved: "مقبول",
  rejected: "مرفوض",
} as const;

export const ADMIN_PROJECTS_FILTERS_COPY = {
  searchPlaceholder: "البحث حسب عنوان المشروع، المالك، أو الجامعة...",
  category: "الفئة",
  university: "الجامعة",
  dateRange: "نطاق التاريخ",
  sort: "الترتيب",
  sortNewest: "الأحدث",
  sortOldest: "الأقدم",
  sortUpdated: "آخر تحديث",
  apply: "تطبيق الفلاتر",
  export: "تصدير البيانات",
  all: "الكل",
  submissionDate: "تاريخ التقديم",
} as const;

export const ADMIN_PROJECTS_TABLE = {
  project: "المشروع",
  owner: "المالك",
  ownerLabel: "صاحب المشروع",
  universityLabel: "المؤسسة الأكاديمية",
  category: "الفئة",
  status: "الحالة",
  date: "تاريخ التقديم",
  actions: "الإجراءات",
  review: "مراجعة الطلب",
  viewDetails: "عرض التفاصيل",
} as const;

export const ADMIN_PROJECT_DETAILS = {
  pageTitle: "تفاصيل المشروع",
  info: "معلومات المشروع",
  owner: "معلومات المالك",
  media: "وسائط المشروع",
  team: "أعضاء الفريق",
  submission: "تفاصيل التقديم",
  status: "الحالة الحالية",
  back: "العودة إلى المشاريع",
} as const;

export const ADMIN_NOTIFICATIONS = {
  title: "الإشعارات",
  empty: "لا توجد إشعارات جديدة",
} as const;
