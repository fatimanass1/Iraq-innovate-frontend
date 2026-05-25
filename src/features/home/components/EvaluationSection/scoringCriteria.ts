export type ScoringCriterion = {
  labelEn: string;
  labelAr: string;
  weight: number;
  score: number;
  scoreMax: number;
};

export const SCORING_CRITERIA: ScoringCriterion[] = [
  {
    labelEn: "Innovation",
    labelAr: "الابتكار",
    weight: 25,
    score: 95,
    scoreMax: 100,
  },
  {
    labelEn: "Feasibility",
    labelAr: "الجدوى",
    weight: 20,
    score: 82,
    scoreMax: 100,
  },
  {
    labelEn: "Tech Integration",
    labelAr: "التكامل التقني",
    weight: 20,
    score: 87,
    scoreMax: 100,
  },
  {
    labelEn: "Community Impact",
    labelAr: "الأثر المجتمعي",
    weight: 20,
    score: 91,
    scoreMax: 100,
  },
  {
    labelEn: "Scalability",
    labelAr: "قابلية التوسع",
    weight: 10,
    score: 76,
    scoreMax: 100,
  },
  {
    labelEn: "Presentation",
    labelAr: "جودة العرض",
    weight: 5,
    score: 70,
    scoreMax: 100,
  },
];
