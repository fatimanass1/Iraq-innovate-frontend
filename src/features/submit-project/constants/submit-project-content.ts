export const SUBMIT_PROJECT_STEPS = [
  {
    id: 1,
    titleEn: "Project Info",
    titleAr: "معلومات المشروع",
  },
  {
    id: 2,
    titleEn: "Media Upload",
    titleAr: "رفع الوسائط",
  },
  {
    id: 3,
    titleEn: "Owner Info",
    titleAr: "معلومات المالك",
  },
  {
    id: 4,
    titleEn: "Team Members",
    titleAr: "أعضاء الفريق",
  },
  {
    id: 5,
    titleEn: "Review Submission",
    titleAr: "مراجعة الطلب",
  },
] as const;

export const SUBMIT_PROJECT_SIDEBAR = {
  brandTitle: "INNOVATE IRAQ",
  brandSubtitle: "العراق يبتكر ٢٠٢6",
  title: "Submit Your Innovation",
  subtitle: "قدّم ابتكارك للعالم",
  description:
    "انضم إلى منصة الابتكار الرائدة في العراق واعرض مشاريعك على المستثمرين والموجهين ومجتمع التكنولوجيا العالمي.",
  progressLabel: "Progress",
  footer: "National Innovation Platform · Iraq 2026",
} as const;

export const SUBMIT_PROJECT_STEP_CONTENT = {
  1: {
    stepLabel: "STEP 1 OF 5",
    titleEn: "Project Information",
    titleAr: "معلومات المشروع",
  },
  2: {
    stepLabel: "STEP 2 OF 5",
    titleEn: "Project Media",
    titleAr: "وسائط المشروع",
  },
  3: {
    stepLabel: "STEP 3 OF 5",
    titleEn: "Project Owner Information",
    titleAr: "معلومات مالك المشروع",
  },
  4: {
    stepLabel: "STEP 4 OF 5",
    titleEn: "Add Team Members",
    titleAr: "إضافة أعضاء الفريق",
  },
  5: {
    stepLabel: "STEP 5 OF 5",
    titleEn: "Review Submission",
    titleAr: "مراجعة الطلب",
  },
} as const;

export const SUBMIT_PROJECT_FIELDS = {
  title: { en: "Project Title", ar: "عنوان المشروع/" },
  description: { en: "Project Description", ar: "وصف المشروع/" },
  summary: { en: "Project Summary", ar: "ملخص المشروع/" },
  website: { en: "Website URL", ar: "رابط الموقع/" },
  category: { en: "Category", ar: "الفئات" },
  ownerName: { en: "Owner Name", ar: "اسم المالك/" },
  ownerBirthdate: { en: "Birth Date", ar: "تاريخ الميلاد/" },
  ownerCollege: { en: "College / University", ar: "الكلية / الجامعة/" },
  ownerLinkedin: { en: "LinkedIn URL", ar: "رابط LinkedIn/" },
  ownerCertificate: { en: "Graduate Certificate", ar: "شهادة التخرج/" },
  memberName: { en: "Name", ar: "الاسم \\" },
  memberRole: { en: "Role in Project", ar: "الدور في المشروع/" },
  memberBirthdate: { en: "Birthdate", ar: "تاريخ الميلاد \\" },
  memberCollege: { en: "College", ar: "الكلية \\" },
  memberLinkedin: { en: "LinkedIn URL", ar: "رابط لينكد إن \\" },
} as const;

export const SUBMIT_PROJECT_ACTIONS = {
  back: "Back",
  continue: "Continue",
  submit: "Submit Project",
  submitting: "Submitting...",
  addMember: "Add Team Member",
  removeMember: "Remove",
  selectCategory: "Category \\ الفئات",
  uploadMedia: "Upload images or videos",
  uploadCertificate: "Upload certificate (PDF, JPG, PNG)",
  homeAria: "Back to home",
} as const;
