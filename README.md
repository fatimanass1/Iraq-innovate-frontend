# Architecture

Frontend architecture for Iraq Innovate — a landing page foundation designed to scale into additional modules later.

## Core Philosophy

1. **`src/app/` handles routing only** — no business logic in route files
2. **Features own domains** — hooks, validation, screens per module
3. **Global components stay generic** — no feature-specific UI in `components/`
4. **Production essentials first** — env validation, error boundaries, Docker

## Directory Map

```
src/
├── app/                          # Routes, metadata, providers, error UI
│   ├── (website)/                # Public marketing routes
│   └── providers/                # Query, theme, toast providers
│
├── features/                     # Business modules
│   ├── home/                     # Landing page
│   └── contact/                  # Contact form feature
│
├── components/                   # Shared UI primitives
│   ├── ui/                       # Button, Input, FormField...
│   └── shared/                   # Header, Footer, Logo
│
├── layouts/                      # Route shell layouts
│   └── website/WebsiteLayout.tsx
│
├── api/
│   ├── client/public/            # Unauthenticated Axios instance
│   └── core/                     # config, endpoints, types
│
├── store/                        # Zustand client stores
│   └── theme.store.ts
│
├── lib/                          # utils, env
├── middleware.ts                 # Locale-ready routing
├── constants/                    # Routes, app config
└── styles/                       # Tailwind v4 design system
```

## Feature-Based Architecture

Each feature is a self-contained module:

```
src/features/contact/
├── components/       # Feature-specific UI
├── hooks/            # Feature hooks (React Query + RHF)
├── services/         # API service calls
├── validation/       # Zod schemas
└── types/            # Feature types
```

**Route files compose screens:**

```tsx
// src/app/(website)/page.tsx
import { HomeScreen } from "@/features/home/screens/HomeScreen";

export default function HomePage() {
  return <HomeScreen />;
}
```

## State Boundaries

| Responsibility | Tool | Location |
|----------------|------|----------|
| Server/API data | TanStack React Query | Feature hooks |
| Theme preference | Zustand | `store/theme.store.ts` |
| Local UI state | React `useState` | Component-level |

## Import Aliases

```json
"@/*": ["./src/*"]
```

Always import from `@/` — never use deep relative paths across module boundaries.
