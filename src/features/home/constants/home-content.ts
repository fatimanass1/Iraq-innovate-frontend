import {
  BarChart3,
  Layers3,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const HERO_CONTENT = {
  badge: "Enterprise Frontend Architecture",
  title: "Build scalable innovation platforms with",
  highlight: "Iraq Innovate",
  description:
    "A production-ready Next.js foundation with feature-based modularity, reusable UI systems, and dashboard-ready structure for long-term growth.",
} as const;

export const SERVICES: Array<{
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
}> = [
  {
    title: "Feature Modules",
    description: "Self-contained domains with api, hooks, validation, and screens.",
    icon: Layers3,
    features: ["Isolated business logic", "Team-friendly ownership", "Easy scaling"],
  },
  {
    title: "Secure API Layer",
    description: "Public and private Axios clients with centralized endpoints.",
    icon: ShieldCheck,
    features: ["Typed responses", "Interceptors", "Service abstraction"],
  },
  {
    title: "Dashboard Ready",
    description: "Route groups and layouts prepared for admin expansion.",
    icon: BarChart3,
    features: ["Sidebar state", "Protected routes", "Reusable tables/charts"],
  },
  {
    title: "Modern UX Systems",
    description: "Animations, toasts, forms, and design tokens out of the box.",
    icon: Workflow,
    features: ["Framer Motion", "React Query", "Zustand stores"],
  },
];

export const STATS = [
  { value: "12+", label: "Core Modules", description: "Pre-structured for growth" },
  { value: "100%", label: "TypeScript", description: "End-to-end type safety" },
  { value: "3", label: "Route Groups", description: "Website, auth, dashboard" },
  { value: "∞", label: "Scalability", description: "Feature-first architecture" },
] as const;

export const TESTIMONIALS = [
  {
    quote: "The architecture let us ship a polished landing page and plan the admin panel without rework.",
    name: "Sara Al-Mousawi",
    role: "Product Lead",
  },
  {
    quote: "Clean separation between routes and features made onboarding new developers effortless.",
    name: "Omar Hassan",
    role: "Engineering Manager",
  },
  {
    quote: "We migrated from a monolithic page to modular sections in days, not weeks.",
    name: "Layla Kareem",
    role: "Frontend Architect",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Why keep business logic out of app/?",
    answer:
      "The app directory should only handle routing and composition. Features own business logic, making the codebase easier to test, scale, and migrate.",
  },
  {
    question: "How does this scale into a dashboard?",
    answer:
      "Route groups, dashboard layouts, sidebar/modal stores, and reusable table/chart placeholders are already in place for admin features.",
  },
  {
    question: "What handles server vs client state?",
    answer:
      "TanStack React Query manages server state. Zustand handles auth, UI, theme, sidebar, and modal state only.",
  },
] as const;
