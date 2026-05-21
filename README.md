# Architecture

Enterprise frontend architecture for Iraq Innovate — designed to scale from a marketing site into a production admin platform.

## Core Philosophy

1. **`src/app/` handles routing only** — no business logic in route files
2. **Features own domains** — api, hooks, validation, screens per module
3. **Global components stay generic** — no feature-specific UI in `components/`
4. **State has clear boundaries** — server vs client responsibilities are explicit
5. **Production concerns are first-class** — middleware, env validation, error boundaries, Docker

## Directory Map

```
src/
├── app/                          # Routes, metadata, providers, error/loading UI
│   ├── (website)/                # Public marketing routes
│   ├── (auth)/                   # Login/register routes
│   ├── (dashboard)/              # Protected admin routes
│   ├── providers/                # Query, theme, toast, app providers
│   ├── error.tsx                 # Route-level error boundary
│   ├── global-error.tsx          # Root error boundary
│   ├── loading.tsx               # Global loading UI
│   └── not-found.tsx             # 404 page
│
├── features/                     # Business modules
│   ├── home/                     # Landing page sections + screen
│   ├── contact/                  # Contact form feature
│   ├── auth/                     # Login flow
│   └── dashboard/                # Admin screens
│
├── components/                   # Shared UI primitives
│   ├── ui/                       # Button, Input, Card, Section...
│   ├── shared/                   # Header, Footer, Logo
│   ├── forms/                    # FormField, TextInput
│   ├── charts/                   # Chart placeholders
│   ├── tables/                   # Table placeholders
│   ├── modals/                   # BaseModal
│   └── loaders/                  # Spinner, PageLoader
│
├── layouts/                      # Route shell layouts
│   ├── website/WebsiteLayout.tsx
│   ├── auth/AuthLayout.tsx
│   └── dashboard/DashboardLayout.tsx
│
├── api/
│   ├── client/public/            # Unauthenticated Axios instance
│   ├── client/private/           # Authenticated Axios + token interceptor
│   ├── core/                     # config, endpoints, types
│   └── services/                 # Domain API functions
│
├── store/                        # Zustand client stores
│   ├── auth.store.ts
│   ├── ui.store.ts
│   ├── theme.store.ts
│   ├── sidebar.store.ts
│   └── modal.store.ts
│
├── lib/
│   ├── utils.ts                  # cn() Tailwind merge helper
│   ├── env.ts                    # Zod-validated environment
│   └── auth/session.ts           # Cookie + token session helpers
│
├── middleware.ts                 # Auth protection & locale-ready routing
├── constants/                    # Routes, auth rules, app config
├── hooks/                        # Shared hooks
├── validations/                  # Shared Zod schemas
├── styles/                       # Tailwind v4 design system
└── animations/                   # Framer Motion variants
```

## Feature-Based Architecture

Each feature is a self-contained module:

```
src/features/contact/
├── api/              # Feature API adapters
├── components/       # Feature-specific UI
├── hooks/            # Feature hooks (React Query + RHF)
├── services/         # API service calls
├── validation/       # Zod schemas
├── types/            # Feature types
├── constants/        # Feature constants
├── sections/         # Composable page sections
└── screens/          # Full-page screen components
```

**Route files compose screens:**

```tsx
// src/app/(website)/page.tsx
import { HomeScreen } from "@/features/home/screens/HomeScreen";

export default function HomePage() {
  return <HomeScreen />;
}
```

**Screens compose sections:**

```tsx
// src/features/home/screens/HomeScreen.tsx
export function HomeScreen() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      {/* ... */}
    </>
  );
}
```

## State Boundaries

| Responsibility | Tool | Location |
|----------------|------|----------|
| Server/API data | TanStack React Query | Feature hooks |
| Auth session (client) | Zustand | `store/auth.store.ts` |
| UI chrome (menus, loaders) | Zustand | `store/ui.store.ts` |
| Theme preference | Zustand | `store/theme.store.ts` |
| Sidebar state | Zustand | `store/sidebar.store.ts` |
| Modal state | Zustand | `store/modal.store.ts` |

**Rule:** Do not put API response data in Zustand. Use React Query.

## API Layering

```
Feature Hook → Service → Axios Client → Backend API
```

1. **`api/core/endpoints.ts`** — single source of truth for URL paths
2. **`api/core/config.ts`** — base URL, timeout (from validated env)
3. **`api/client/public`** — public requests, error normalization
4. **`api/client/private`** — attaches Bearer token from session cookie/localStorage
5. **`api/services/*`** — typed service functions
6. **Feature hooks** — React Query queries/mutations wrapping services

## Middleware & Auth Flow

`src/middleware.ts` handles:

- **Protected routes** (`/dashboard/*`) → redirect to `/login?redirect=...` if no auth cookie
- **Auth routes** (`/login`, `/register`) → redirect to dashboard if authenticated
- **Locale prefix detection** — strips `/en`, `/ar` prefixes for future i18n (sets `x-locale` header)

Auth token is stored in:

- HTTP cookie (`access_token`) — read by middleware
- localStorage — read by Axios private client

## Styling System

Tailwind CSS v4 with design tokens in `src/styles/globals.css`:

- CSS variables for colors, radius, typography
- `.dark` class toggled by `ThemeProvider`
- Utility classes in `utilities.css` (`container-app`, `section-padding`, `heading-display`)
- Animation utilities in `animations.css`
- `cn()` helper in `src/lib/utils.ts` for safe class merging

## Scalability Strategy

### Phase 1 — Landing (current)
- Section-based home feature
- Contact form with validation
- Public API client

### Phase 2 — Auth & Dashboard
- Middleware-protected routes ✅
- Dashboard layout with sidebar ✅
- Auth store + session cookies ✅

### Phase 3 — Admin Modules
Add features without restructuring:

```
src/features/users/
src/features/analytics/
src/features/settings/
```

Each follows the same internal structure. Register routes under `src/app/(dashboard)/`.

### Phase 4 — i18n
- Locale prefixes already handled in middleware
- Add `src/i18n/` and locale-aware layouts
- Route groups can become `/(website)/[locale]/`

## Production Checklist

- [x] TypeScript strict mode
- [x] ESLint (Next.js config)
- [x] Environment validation (`lib/env.ts`)
- [x] Error boundaries (`error.tsx`, `global-error.tsx`)
- [x] Loading states (`loading.tsx`)
- [x] 404 page (`not-found.tsx`)
- [x] Toast system (React Toastify)
- [x] Standalone Next.js output for Docker
- [x] Docker + nginx + docker-compose
- [x] GitHub Actions CI

## Import Aliases

```json
"@/*": ["./src/*"]
```

Always import from `@/` — never use deep relative paths across module boundaries.
