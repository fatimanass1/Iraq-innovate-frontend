import type { ProjectTab } from "../types/project.types";

export const MY_PROJECTS_PAGE = {
  navbarTitleAr: "مشاريعي",
  navbarTitleEn: "My Projects",
} as const;

export const PROJECT_FILTER_TABS: ProjectTab[] = [
  { id: "all", labelAr: "الكل" },
  { id: "rejected", labelAr: "مرفوض" },
  { id: "approved", labelAr: "موافق عليه" },
  { id: "pending", labelAr: "قيد المراجعة" },
];

export const PROJECTS_CONTENT = {
  submitTitle: "تقديم مشروع جديد",
  submitSubtitle: "Submit New Project",
  detailsBack: "العودة للمشاريع",
  emptyTitle: "لا توجد مشاريع",
  emptyDescription: "لم يتم العثور على أي مشاريع حتى الآن.",
  errorTitle: "تعذر تحميل المشاريع",
  detailsErrorTitle: "تعذر تحميل تفاصيل المشروع",
  retry: "إعادة المحاولة",
  noSearchResults: "لا توجد نتائج مطابقة لبحثك.",
  submitSuccess: "تم تقديم المشروع بنجاح",
  submitError: "فشل تقديم المشروع",
  teamMemberSuccess: "تمت إضافة عضو الفريق بنجاح",
  teamMemberError: "فشل إضافة عضو الفريق",
  addTeamMember: "إضافة عضو فريق",
  website: "الموقع الإلكتروني",
  description: "الوصف",
  category: "التصنيف",
  media: "الصور",
  attachments: "المرفقات",
  teamMembers: "أعضاء الفريق",
  owner: "المالك",
  ownerEmail: "البريد الإلكتروني",
  status: "الحالة",
  summary: "الملخص",
  createdAt: "تاريخ الإنشاء",
  updatedAt: "آخر تحديث",
  openFile: "فتح الملف",
  downloadFile: "تحميل / فتح",
  emptyMedia: "لا توجد وسائط مرفقة لهذا المشروع.",
  emptyAttachments: "لا توجد مرفقات لهذا المشروع.",
  emptyTeamMembers: "لا يوجد أعضاء فريق مسجلون لهذا المشروع.",
  loadingDetails: "جاري تحميل تفاصيل المشروع...",
} as const;

export const SUBMIT_PROJECT_FIELDS = {
  title: "عنوان المشروع",
  summary: "ملخص المشروع",
  description: "الوصف التفصيلي",
  websiteUrl: "رابط الموقع",
  category: "رقم التصنيف",
  media: "صور المشروع",
  ownerName: "اسم المالك",
  ownerBirthdate: "تاريخ الميلاد",
  ownerCollege: "الكلية / الجامعة",
  ownerCertificate: "شهادة التخرج",
  ownerLinkedin: "رابط LinkedIn",
  submit: "تقديم المشروع",
} as const;

export const TEAM_MEMBER_FIELDS = {
  name: "الاسم",
  role: "الدور",
  college: "الكلية",
  birthdate: "تاريخ الميلاد",
  linkedin: "LinkedIn",
  certificate: "شهادة التخرج",
  submit: "إضافة العضو",
} as const;
