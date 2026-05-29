# Cash Back Moto — Website

Bilingual (EN/AR) motorcycle & scooter showcase website for Cash Back Moto,
an Egyptian shop selling gas and electric motorcycles and scooters from 7 brands.

## Stack
- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- shadcn/ui (radix-nova)
- next-intl v4 (EN + AR, RTL)
- Vercel deployment

## Getting Started
```bash
npm install
npm run dev
```

Open http://localhost:3000

## Folder structure
```
src/app/[locale]/     — All pages (Home, Catalog, About, Contact)
src/components/       — layout/, ui/, features/
src/lib/              — constants.ts, whatsapp.ts, utils.ts
src/types/index.ts    — All TypeScript types
src/data/             — bikes.ts, brands.ts
messages/             — en.json, ar.json
design-system/        — Visual rules — read before writing any UI
developer-guide.md    — Technical rules — read before writing any code
AGENTS.md             — AI agent instructions — read this first
```

## Adding a new bike
Edit `src/data/bikes.ts` and add a new entry following the `Bike` type.
The catalog page renders from this file automatically.

## Branches
- Alexandria: +20 11 10782513 | https://maps.app.goo.gl/nHStDGwekLnKUJAK7
- Cairo: 010 05804463 | https://maps.app.goo.gl/USLPyWr7Mjdbr9x1A

## Social
- Facebook: https://www.facebook.com/Cashbackmotoo
- Instagram: https://www.instagram.com/cashbackmoto
- TikTok: https://www.tiktok.com/@cashbackmoto
