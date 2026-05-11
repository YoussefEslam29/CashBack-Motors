# Developer Guide — Cash Back Moto

> **Read this before writing a single line of code.**
> This document defines architecture, patterns, and rules for the Cash Back Moto website. Every decision here exists for a reason. Don't deviate without updating this file.

---

## 1. Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 14+ (App Router) | Use Server Components by default |
| Language | TypeScript (strict mode) | No `any`. No implicit types. |
| Styling | Tailwind CSS | Use design system tokens, no inline hex values |
| i18n | `next-intl` | EN + AR, RTL support |
| Images | `next/image` | Always. Never raw `<img>` tags |
| Icons | `lucide-react` | Consistent, tree-shakeable |
| Deployment | Vercel | |
| Product data | JSON files (Phase 1) | Migratable to CMS in Phase 2 |

---

## 2. Folder Architecture

```
cashback-moto/
├── app/
│   ├── [locale]/               # i18n root — all pages live here
│   │   ├── layout.tsx          # Root layout with lang/dir attributes
│   │   ├── page.tsx            # Home
│   │   ├── catalog/
│   │   │   ├── page.tsx        # Catalog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Individual bike page
│   │   ├── about/
│   │   │   └── page.tsx
│   │   └── contact/
│   │       └── page.tsx
├── components/
│   ├── ui/                     # Primitive, reusable components
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── SectionHeading.tsx
│   ├── layout/                 # Structural components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   └── WhatsAppButton.tsx  # Sticky floating button
│   └── features/               # Feature-specific components
│       ├── catalog/
│       │   ├── BikeCard.tsx
│       │   ├── FilterBar.tsx
│       │   └── CatalogGrid.tsx
│       ├── home/
│       │   ├── Hero.tsx
│       │   ├── FeaturedBikes.tsx
│       │   └── BrandStrip.tsx
│       └── contact/
│           ├── LocationMap.tsx
│           └── ContactInfo.tsx
├── data/
│   ├── bikes.ts                # All bike data (typed)
│   └── brands.ts               # Brand metadata
├── lib/
│   ├── whatsapp.ts             # WhatsApp link generator
│   ├── utils.ts                # cn(), slugify(), formatters
│   └── constants.ts            # Phone numbers, social links, map URLs
├── messages/
│   ├── en.json                 # English translations
│   └── ar.json                 # Arabic translations
├── public/
│   ├── images/
│   │   ├── bikes/              # Bike photos (named by slug)
│   │   ├── brands/             # Brand logos
│   │   └── hero/               # Hero background assets
│   └── logo.png
├── types/
│   └── index.ts                # Shared TypeScript types
├── design-system/              # (This repo — design docs)
├── i18n.ts                     # next-intl config
├── middleware.ts               # Locale detection + redirect
├── next.config.ts
└── tailwind.config.ts
```

---

## 3. TypeScript Rules

### Strict mode is non-negotiable
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUncheckedIndexedAccess": true
  }
}
```

### Core Types (`types/index.ts`)
```ts
export type FuelType = 'gas' | 'electric';
export type BikeType = 'motorcycle' | 'scooter';
export type Brand = 'ZONTOS' | 'SYM' | 'KEEWAY' | 'HOGAN' | 'DAYUN' | 'BENELLI' | 'VIGOREY';

export interface Bike {
  id: string;
  slug: string;
  name: string;
  nameAr: string;
  brand: Brand;
  type: BikeType;
  fuel: FuelType;
  isElectric: boolean;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];         // paths under /public/images/bikes/
  specs: BikeSpec[];
  descriptionEn: string;
  descriptionAr: string;
}

export interface BikeSpec {
  labelEn: string;
  labelAr: string;
  value: string;
}
```

---

## 4. Internationalisation (i18n)

### Setup (`i18n.ts`)
```ts
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default
}));
```

### RTL Layout
The `<html>` tag must have the correct `lang` and `dir` attributes per locale:
```tsx
// app/[locale]/layout.tsx
export default function RootLayout({ children, params: { locale } }) {
  const isRTL = locale === 'ar';
  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={isRTL ? 'font-arabic' : 'font-body'}>
        {children}
      </body>
    </html>
  );
}
```

### Translation File Structure
```json
// messages/en.json
{
  "nav": {
    "home": "Home",
    "catalog": "Catalog",
    "about": "About",
    "contact": "Contact"
  },
  "catalog": {
    "askPrice": "Ask for Price",
    "filterAll": "All",
    "filterMotorcycle": "Motorcycle",
    "filterScooter": "Scooter",
    "filterElectric": "Electric Only"
  },
  "cta": {
    "whatsapp": "Chat with Us",
    "call": "Call Now"
  }
}
```

**Rule:** Never hardcode UI text in components. Every user-facing string goes through `useTranslations()`.

---

## 5. Data Layer (Phase 1 — JSON)

Product data lives in `data/bikes.ts` as a typed array. No database in Phase 1.

```ts
// data/bikes.ts
import { Bike } from '@/types';

export const bikes: Bike[] = [
  {
    id: '1',
    slug: 'keeway-superlight-200',
    name: 'Keeway Superlight 200',
    nameAr: 'كيواي سوبرلايت 200',
    brand: 'KEEWAY',
    type: 'motorcycle',
    fuel: 'gas',
    isElectric: false,
    isNew: true,
    isFeatured: true,
    images: ['/images/bikes/keeway-superlight-200-1.jpg'],
    specs: [
      { labelEn: 'Engine', labelAr: 'المحرك', value: '200cc' },
      { labelEn: 'Weight', labelAr: 'الوزن', value: '145 kg' },
    ],
    descriptionEn: '...',
    descriptionAr: '...',
  },
  // ...
];
```

### Querying helpers
```ts
// lib/utils.ts
export function getBikeBySlug(slug: string) {
  return bikes.find(b => b.slug === slug) ?? null;
}

export function filterBikes(filters: { brand?: Brand; type?: BikeType; fuel?: FuelType }) {
  return bikes.filter(bike => {
    if (filters.brand && bike.brand !== filters.brand) return false;
    if (filters.type && bike.type !== filters.type) return false;
    if (filters.fuel && bike.fuel !== filters.fuel) return false;
    return true;
  });
}
```

---

## 6. WhatsApp Link Generator

All WhatsApp links must be generated through one utility — never hardcoded inline. Each branch has its own number.

```ts
// lib/whatsapp.ts
import { LOCATIONS, BranchKey } from './constants';

export function buildWhatsAppLink(branch: BranchKey, message?: string): string {
  const number = LOCATIONS[branch].whatsapp;
  const base = `https://wa.me/${number}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function bikeInquiryLink(bikeName: string, branch: BranchKey, locale: 'en' | 'ar'): string {
  const message = locale === 'ar'
    ? `مرحبا، أنا مهتم بـ ${bikeName}. هل هو متاح؟`
    : `Hello, I'm interested in the ${bikeName}. Is it available?`;
  return buildWhatsAppLink(branch, message);
}
```

When showing a "Chat with Us" or "Ask for Price" button, either:
- Show **two buttons** — one per branch (Cairo / Alexandria), or
- Default to the branch closest to the user's context if known.

Never use a single hardcoded WhatsApp number.
```

---

## 7. Component Rules

### Server vs Client Components
- **Default to Server Components.** Only add `'use client'` when you need:
  - `useState` / `useEffect`
  - Browser APIs
  - Event handlers that can't be in a Server Action

- Catalog filter state → `'use client'` component wrapping a Server Component grid.
- `WhatsAppButton` (floating) → `'use client'` (needs `window` for scroll behaviour if animated).
- All page-level components → Server Components.

### Component Anatomy
```tsx
// Every component follows this structure:
import type { FC } from 'react';

interface BikeCardProps {
  bike: Bike;
  locale: string;
}

const BikeCard: FC<BikeCardProps> = ({ bike, locale }) => {
  // ...
};

export default BikeCard;
```

### Do
- One component per file.
- Props interface always defined and exported.
- Use `cn()` utility for conditional classnames (install `clsx` + `tailwind-merge`).
- All images via `next/image` with explicit `width`/`height` or `fill` + container with relative positioning.

### Don't
- Don't pass raw style objects (`style={{ color: '#CC0000' }}`). Use Tailwind classes.
- Don't put business logic inside JSX. Extract to a variable or helper function first.
- Don't duplicate a component — if you're writing something for the second time, abstract it.

---

## 8. Performance Rules

- **Images** — always use `next/image`. Set `priority` on hero and above-the-fold images. Use `loading="lazy"` (default) everywhere else.
- **Fonts** — load via `next/font/google`. Never via `<link>` tag. This eliminates layout shift.
- **No N+1 data fetching** — fetch all bikes once at the page level, pass down as props. Don't fetch per-card.
- **Client bundles** — keep `'use client'` components small. Don't import heavy libraries into client components (e.g. don't import all of `lodash` — use specific imports).
- **Catalog filtering** — do it client-side from the already-fetched JSON array. No API call on filter change.

---

## 9. Security Rules

- **No API keys in client code.** Ever. If a future integration needs a key, it goes in an API Route (`app/api/`) with environment variables.
- **Environment variables** — store in `.env.local`, never commit to git. Add all vars to `.env.example` with placeholder values.
- **External links** — always add `rel="noopener noreferrer"` to `target="_blank"` links.
- **User input** (contact form) — sanitize on the server side before forwarding to WhatsApp or email. Never trust raw input.

---

## 10. What to Avoid

### Frontend
| ❌ Avoid | ✅ Do instead |
|---|---|
| Raw `<img>` tags | `next/image` |
| Inline hex colours | Tailwind design system tokens |
| Hardcoded UI strings | `useTranslations()` |
| Giant monolithic components | Split into `ui/`, `layout/`, `features/` |
| `any` type | Proper TypeScript types |
| `useEffect` for data fetching | Server Components |
| CSS modules | Tailwind (keep it consistent) |

### General
| ❌ Avoid | ✅ Do instead |
|---|---|
| Magic numbers | Named constants in `lib/constants.ts` |
| Copy-paste code | Abstract into a shared utility |
| `console.log` in production | Remove before commit, use error boundaries |
| Comments explaining *what* code does | Write self-documenting code; comment *why* only |

---

## 11. Constants File

All hardcoded values live here. Never scatter them in components.

```ts
// lib/constants.ts
export const SOCIAL_LINKS = {
  facebook:  'https://www.facebook.com/Cashbackmotoo',
  instagram: 'https://www.instagram.com/cashbackmoto',
  tiktok:    'https://www.tiktok.com/@cashbackmoto',
} as const;

// Each branch has its own phone — both support calls AND WhatsApp
export const LOCATIONS = {
  cairo: {
    label: 'Cairo',
    labelAr: 'القاهرة',
    phone: '01005804463',        // display format
    whatsapp: '201005804463',    // wa.me format — no + sign
    mapUrl: 'https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A',
    embedUrl: '',                // TODO: extract embed URL from Google Maps
  },
  alexandria: {
    label: 'Alexandria',
    labelAr: 'الإسكندرية',
    phone: '+20 11 10782513',    // display format
    whatsapp: '201110782513',    // wa.me format — no + sign
    mapUrl: 'https://maps.app.goo.gl/omChfM4oFsqhCepE7',
    embedUrl: '',                // TODO: extract embed URL from Google Maps
  },
} as const;

export type BranchKey = keyof typeof LOCATIONS;

export const BRANDS = [
  'ZONTOS', 'SYM', 'KEEWAY', 'HOGAN', 'DAYUN', 'BENELLI', 'VIGOREY'
] as const;
```

---

## 12. Git & Code Quality

- **Commits** — use conventional commits: `feat:`, `fix:`, `style:`, `refactor:`, `chore:`
- **Branches** — `main` is production. Work on `feat/<feature-name>` branches.
- **No commented-out code** in commits — delete it. Git history exists for a reason.
- **Linting** — ESLint + Prettier configured. Run before every commit. Don't disable lint rules without a comment explaining why.

```json
// .eslintrc.json — key rules
{
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": "warn",
    "react/no-unescaped-entities": "error"
  }
}
```