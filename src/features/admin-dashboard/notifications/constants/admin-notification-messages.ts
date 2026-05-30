export const ADMIN_NOTIFICATION_MESSAGES = {
  newPending: {
    titleAr: "تم استلام الطلب",
    bodyAr: (projectName: string) =>
      `تم استلام ملفات مشروع "${projectName}". الطلب الآن تحت المعالجة الأولية من قبل فريق الإدارة.`,
  },
  resubmitted: {
    titleAr: "تم تحديث المشروع بعد طلب التعديلات",
    bodyAr: (projectName: string) =>
      `تم تحديث مشروع "${projectName}" بعد طلب التعديلات. يرجى مراجعة التحديثات واتخاذ الإجراء المناسب.`,
  },
  changesRequested: {
    titleAr: "تحديث مطلوب للمشروع",
    bodyAr: (projectName: string) =>
      `يرجى مراجعة ملاحظات المقيمين حول "${projectName}". هناك بعض التفاصيل التي تحتاج إلى توضيح إضافي قبل الموافقة النهائية.`,
  },
  approved: {
    titleAr: "تمت الموافقة على المشروع",
    bodyAr: (projectName: string) =>
      `تهانينا! تمت مراجعة مشروع "${projectName}" من قبل اللجنة المختصة وتمت الموافقة عليه بنجاح.`,
  },
  declined: {
    titleAr: "عدم الموافقة على المقترح",
    bodyAr: (projectName: string) =>
      `تم رفض مشروع "${projectName}". يمكن مراجعة التفاصيل في صفحة المشروع.`,
  },
} as const;
