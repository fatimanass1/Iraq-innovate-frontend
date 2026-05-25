export type JourneyStepData = {
  number: string;
  titleEn: string;
  titleAr: string;
  description: string;
};

export const JOURNEY_STEPS: JourneyStepData[] = [
  {
    number: "01",
    titleEn: "Registration",
    titleAr: "التسجيل",
    description: "أنشئ ملفك الشخصي كمبتكر على المنصة",
  },
  {
    number: "02",
    titleEn: "Submission",
    titleAr: "تقديم المشروع",
    description: "قدّم مشروعك مع جميع الوثائق اللازمة.",
  },
  {
    number: "03",
    titleEn: "Evaluation",
    titleAr: "التقييم",
    description: "لجنة من الخبراء تقيّم مشروعك",
  },
  {
    number: "04",
    titleEn: "Finalists",
    titleAr: "المتأهلون",
    description: "يتم اختيار أفضل المبتكرين على المستوى الوطني",
  },
  {
    number: "05",
    titleEn: "Showcase",
    titleAr: "معرض الابتكار",
    description: "بث مباشر للمشاريع",
  },
];
