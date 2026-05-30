export const ADMIN_NOTIFICATIONS_PAGE = {
  titleAr: "الاشعارات",
  titleEn: "Notifications",
  subtitleAr: "اخر التحديثات المتعلقة بالمشاريع والمراجعات",
  markAllRead: "تحديد الكل كمقروء",
  loadOlder: "تحميل الإشعارات القديمة",
} as const;

export const ADMIN_NOTIFICATIONS_FILTERS = {
  all: "الكل",
  unread: "غير مقروء",
  actionRequired: "تحتاج إجراء",
} as const;

export const ADMIN_NOTIFICATIONS_STATES = {
  loading: "جاري تحميل الإشعارات...",
  error: "تعذر تحميل الإشعارات.",
  empty: "لا توجد إشعارات لعرضها حالياً.",
  emptyUnread: "لا توجد إشعارات غير مقروءة.",
  emptyAction: "لا توجد إشعارات تحتاج إلى إجراء.",
  retry: "إعادة المحاولة",
} as const;
