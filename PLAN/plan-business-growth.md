# Cash Back Moto — Business Growth Plan

Goal: more WhatsApp/phone inquiries per visitor, more visitors from Google, and numbers that prove it.
Branch with the code work: `feat/business-quick-wins` (nothing committed yet).

Status key: ✅ done in code · 🟡 partly done · ⏳ not started · 🙋 needs owner/you

**Next steps in order:** (1) review + commit the branch (bottom of section 5) → (2) G1 Vercel settings → (3) send the owner G9 questions + G8 spec sheet + G7 photo guide → (4) G2/G3 analytics IDs → (5) G4 Google Business + G6 Search Console → (6) G5 domain → (7) start the admin dashboard (4.1).

---

## 1. Fix what loses inquiries now

| # | Problem | Status | What was done / what's needed |
|---|---|---|---|
| 1.1 | Home category tiles didn't filter the catalog | ✅ | Catalog reads `?type=`, `?fuel=`, `?brand=`, `?q=` from the URL. Old `?type=electric` links still work. |
| 1.2 | No electric bikes, yet site advertises electric | 🟡 🙋 | Electric tile + filter hide until an electric bike exists in `src/data/bikes.ts`. **Owner: list the electric models (KEEWAY, VIGOREY).** |
| 1.3 | 24 bikes share 8 stock photos; photos look AI-made (fake badges, Yamaha logos) | 🙋 | Featured section now avoids showing the same photo twice. **Real photos needed — guide G7.** |
| 1.4 | Bike pages empty (no specs/description) | 🟡 🙋 | Bike page now shows specs table, description and a photo gallery **when filled in**. **Owner: fill the spec sheet — guide G8.** |
| 1.5 | SYM and BENELLI in brand filter but 0 bikes | 🟡 🙋 | Brand filter only lists brands with bikes. **Owner: add SYM/BENELLI models or confirm they're not sold.** |
| 1.6 | Offers (عروض: Zahra, Bagy, Now inj, Nmax, Dayun TX250) missing | ⏳ 🙋 | Needs owner OK + current offer list. Then add an "Offers" section. |
| 1.7 | About stats look invented (500+ sold, 400+ customers, 3+ years) | 🟡 🙋 | "Models available" now uses the real catalog count. **Owner: confirm the other 3 numbers + "certified", "warranty", "service center" claims, or I remove them.** |
| 1.8 | Map links in code ≠ links in notes / AGENTS.md | 🙋 | Marked `TODO(owner)` in `src/lib/constants.ts`. **Owner: open both links, tell me which are correct.** |
| 1.9 | Home "Inquire" only went to Cairo | ✅ | Featured cards reuse the catalog card: Cairo + Alexandria buttons. |
| 1.10 | Broken placeholder path `/images/placeholder.jpg` | ✅ | Now `/placeholder.jpg`. |

## 2. Get found on Google (SEO)

| # | Item | Status |
|---|---|---|
| 2.1 | `sitemap.xml` (all pages, EN+AR, hreflang) — `src/app/sitemap.ts` | ✅ |
| 2.2 | `robots.txt` — `src/app/robots.ts` | ✅ |
| 2.3 | Per-page + per-bike titles/descriptions in **English and Arabic** (e.g. "Zontes K368 — السعر والتفاصيل") | ✅ |
| 2.4 | Canonical + hreflang links on every page | ✅ |
| 2.5 | WhatsApp/Facebook link preview image `public/og-image.jpg` (1200×630) | ✅ |
| 2.6 | Google structured data: both showrooms as `MotorcycleDealer` (phone, map, socials) on Home + Contact | ✅ |
| 2.7 | Custom domain (still `cashback-motors.vercel.app`) | 🙋 guide G5 |
| 2.8 | Google Business Profile for both branches + Search Console | 🙋 guides G4, G6 |
| 2.9 | "Review us on Google" buttons on Contact (hidden until links are set) | ✅ code · 🙋 links (G4) |

## 3. Measure leads

| # | Item | Status |
|---|---|---|
| 3.1 | One site-wide tracker: every WhatsApp/call click → `lead` event with **method, branch, bike, page** (`src/components/analytics/LeadTracker.tsx`) | ✅ |
| 3.2 | Contact form sends tracked too | ✅ |
| 3.3 | Google Analytics 4 (loads only when `NEXT_PUBLIC_GA_ID` is set) | ✅ code · 🙋 ID (G2) |
| 3.4 | Meta Pixel (loads only when `NEXT_PUBLIC_META_PIXEL_ID` is set) | ✅ code · 🙋 ID (G3) |
| 3.5 | Vercel Analytics (page views free; custom events need Vercel Pro) | ✅ code · 🙋 enable (G1) |

## 4. Bigger features (roadmap, not started)

1. **Admin dashboard** (your note 5) — owner adds bikes/photos/specs without a developer. S3 + CDN upload (`infra/`, `src/hooks/useS3Upload.ts`) already exists, unused. **Do this first.**
2. **Prices decision** — owner has a full price list. Showing "Starting from EGP X" brings more serious buyers. Needs owner decision + change the "prices hidden" rule in `AGENTS.md`.
3. **Accessories with prices** (your note 2).
4. **"Find your ride" quiz** — budget → use → license → recommended bikes → WhatsApp. Cheaper and more reliable than the AI chatbot plan.
5. **Installments (تقسيط)** — ask owner if offered; big selling point in Egypt.
6. **Fleet / delivery businesses page** — target audience in your notes, no page yet.
7. **Skip for now:** sign-in (friction for a WhatsApp shop) and loading screen (slows first view on mobile data).

## 5. Developer cleanup

| # | Item | Status |
|---|---|---|
| 5.1 | Hard-coded EN/AR text → translations in catalog, filter bar, bike card, bike page, featured | ✅ |
| 5.2 | Deleted 10 unused files (old `src/components/{Navbar,Footer,WhatsAppButton}.tsx`, `src/components/home/{HeroSection,FeaturedRides,BrandsStrip}.tsx`, `src/components/layout/LanguageSwitcher.tsx`, `src/components/features/contact/{ContactInfo,LocationMap}.tsx`, `src/data/products.ts`) + empty `src/app/api/` | ✅ |
| 5.3 | `infra/node_modules` + `infra/cdk.out` untracked (8,635 files). Root `.gitignore` now ignores `node_modules/` at every level. Files stay on disk. | ✅ staged, not committed |
| 5.4 | `src/middleware.ts` → `src/proxy.ts` (Next 16 name). `AGENTS.md` updated so no agent re-creates `middleware.ts`. | ✅ |
| 5.5 | `tsc` ✅ · `eslint` ✅ (0 errors, 0 warnings — also fixed 2 old unused-import warnings) · `npm run build` ✅ (62 pages) · production server checked with curl ✅ (see "Verified" below) · real-browser click test ⏳ | 🟡 |
| 5.6 | Arabic copy in the new SEO texts was written by me — have a native speaker skim `messages/ar.json` → `meta`, `specs`, new `catalog` keys | 🙋 |

### Verified on a local production build (`next build` + `next start`)
- Catalog filters: `/en/catalog` 24 bikes · `?type=scooter` 5 · `?type=motorcycle` 19 · `?brand=keeway` 7 · `?q=k368` 1 · `/ar/catalog?type=scooter` 5 with `dir="rtl"`.
- Home: only Motorcycles + Scooters tiles (no empty Electric tile); Featured = 6 bikes, 6 different photos, 5 brands; Cairo and Alexandria WhatsApp links appear equally (9 each).
- SEO: `/robots.txt` ✓ · `/sitemap.xml` 56 URLs (4 pages + 24 bikes × EN/AR) with hreflang ✓ · every page has its own title, description, canonical and EN/AR/x-default links ✓ · Arabic bike page title "زونتس K368 — السعر والتفاصيل | كاش باك موتو" ✓ · `/og-image.jpg` served ✓ · 2 `MotorcycleDealer` entries (phone + map coordinates) on Home and Contact ✓.
- Bike page: "You May Also Like" shows 3 same-type bikes; unknown bike → 404.
- Lead tracker branch matching tested for `201005804463`, `01005804463`, `201110782513`, `+20 11 10782513`.
- **Not yet tested:** clicking buttons in a real browser with GA4/Pixel IDs set (needs your IDs — do the "Test events" step in G2/G3).
- Note: the first build attempt failed while downloading Google Fonts (network blip); the retry passed with no code change. If a Vercel build ever fails with "Failed to fetch … from Google Fonts", just redeploy.

### How to review and commit this work
```bash
git status                      # on branch feat/business-quick-wins
git diff --cached --stat | tail # the 8,645 staged removals (vendored infra + dead files)
git add -A
git commit -m "feat: catalog filters, SEO, lead tracking, cleanup"
git push -u origin feat/business-quick-wins   # then open a PR / merge into main
```
Vercel will build a preview for the branch — click through it on your phone in EN and AR before merging.

---

## Step-by-step guides (things only you / the owner can do)

### G1 — Vercel: site URL + Analytics
1. vercel.com → your project → **Settings → Environment Variables**.
2. Add `NEXT_PUBLIC_SITE_URL` = `https://cashback-motors.vercel.app` (change it when the real domain is live).
   - Locally your `.env.local` sets this to `http://localhost:3000`, so local builds show localhost in the sitemap — that's expected. `.env.local` is never uploaded to Vercel.
3. Project → **Analytics** tab → **Enable** Web Analytics.
4. Redeploy (Deployments → ⋯ → Redeploy).

### G2 — Google Analytics 4
1. analytics.google.com → **Admin → Create → Property** "Cash Back Moto", time zone Egypt, currency EGP.
2. **Data streams → Web** → URL of the site → copy the **Measurement ID** (`G-XXXXXXX`).
3. Vercel env var `NEXT_PUBLIC_GA_ID` = that ID → redeploy.
4. After a day of traffic: **Admin → Events** → find `generate_lead` → toggle **Mark as key event**.
5. Reports → Engagement → Events → `generate_lead` → add `branch` / `bike` as custom dimensions (Admin → Custom definitions) to see which bike and branch get inquiries.

### G3 — Meta Pixel (Facebook/Instagram ads)
1. business.facebook.com → **Events Manager → Connect data sources → Web → Meta Pixel**.
2. Name it "Cash Back Moto", copy the **Pixel ID** (numbers only).
3. Vercel env var `NEXT_PUBLIC_META_PIXEL_ID` = that ID → redeploy.
4. Events Manager → **Test events** → open the site, click a WhatsApp button → you should see `Contact`.

### G4 — Google Business Profile + review links (one per branch)
1. business.google.com → **Add business** → "Cash Back Moto — Cairo" → category **Motorcycle dealer** → pin the showroom on the map → phone `01005804463` → verify (postcard/phone/video).
2. Repeat for Alexandria (`+20 11 10782513`).
3. Add photos, opening hours, website link.
4. In each profile: **Ask for reviews** → copy the link.
5. Send me both links (or paste them into `GOOGLE_REVIEW_URLS` in `src/lib/constants.ts`) — the "Review us on Google" buttons appear automatically.

### G5 — Custom domain
1. Buy a domain (e.g. `cashbackmoto.com` on Namecheap/Cloudflare, or `.com.eg` via an Egyptian registrar).
2. Vercel → project → **Settings → Domains → Add** → follow the DNS records it shows (A record or CNAME) at your registrar.
3. Update `NEXT_PUBLIC_SITE_URL` to the new domain → redeploy.

### G6 — Google Search Console
1. search.google.com/search-console → **Add property → URL prefix** → the site URL.
2. Verify with **HTML tag**: send me the `content="..."` value, or use DNS verification if you have the domain.
3. **Sitemaps** → submit `sitemap.xml`.
4. Check back in 1–2 weeks: Performance → which searches show the site.

### G7 — Real bike photos (owner)
1. One spot in the showroom, plain wall, good daylight or 2 lamps.
2. Per bike: front-¾ (main), side, back-¾, dashboard, close-up detail. Landscape, phone camera is fine.
3. Name files `brand-model-1.jpg`, `brand-model-2.jpg`… (e.g. `zontes-k368-1.jpg`).
4. Put them in `public/bikes/`, run `node convert-images.js` (converts to .webp), then list them in that bike's `images: [...]` in `src/data/bikes.ts`. More than one image = gallery on the bike page.
5. Tip: keep one `.jpg` per bike as the first image if you want WhatsApp previews to show the bike itself.

### G8 — Bike data the owner should send (copy this table)

| Bike | Engine cc | Power | Top speed | Fuel tank | Weight | Transmission | Brakes | Colours | 1–2 line description (EN/AR) | Electric? battery/range |
|---|---|---|---|---|---|---|---|---|---|---|
| Zontes K368 | | | | | | | | | | |

In code each row becomes, e.g.:
```ts
specs: { engine: '368cc', topSpeed: '140 km/h', fuelTank: '12 L' },
description: { en: '…', ar: '…' },
featured: true, // optional: pin to home page
```

### G9 — Questions for the owner (one message)
1. Which map links are right for Cairo and Alexandria? (1.8)
2. Real numbers: bikes sold, customers, years open? Do you give warranty / have a service center? (1.7)
3. Which electric models do you sell? Any SYM / BENELLI models? (1.2, 1.5)
4. Current offers (عروض) and until when? (1.6)
5. Show prices ("starting from") or keep "Ask for price"? (4.2)
6. Do you offer installments? Which companies? (4.5)

---

## Env vars summary (Vercel → Settings → Environment Variables)

| Name | Example | Needed for |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://cashback-motors.vercel.app` | sitemap, canonical links, previews |
| `NEXT_PUBLIC_GA_ID` | `G-ABC123XYZ` | Google Analytics |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890123456` | Meta Pixel |

None are secrets (they're public IDs), but keep them in Vercel, not in code.
