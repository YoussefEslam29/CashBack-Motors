# plan-text-fix.md — Text & Icon Visibility Fix
**Cash Back Moto · Feature Plan**
> Written following the AI Workflow Guide (plan before you code).
> Read `developer-guide.md` and `design-system/` before touching any file.

---

## 1. Problem Statement

Across the entire site, a large number of text elements and SVG icons are rendering in **dark grey / black** against the site's **near-black background** (`#09090b` / zinc-950). This makes them invisible or nearly so. The dark theme is correct and must be preserved — the fix is purely ensuring every foreground element uses the right light colour token.

This is **not** a theme change. It is a colour-application bug: components are inheriting or explicitly setting dark text/icon colours that conflict with the dark background.

---

## 2. Scope — Every Affected Element

| Location | Element | Current (broken) | Target |
|---|---|---|---|
| Navbar | Logo icon (bicycle) + "Moto" wordmark | Black / dark | `zinc-50` (`#fafafa`) |
| Navbar | Active page link text | Dark / invisible | `#CC0000` (primary red) |
| Hero section | "Cash Back Moto" heading | Black on dark bg | `zinc-50` |
| Hero section | "FIND YOUR RIDE" — F, I letters in gradient | Fades to invisible | Gradient from `zinc-50` → `#CC0000`, left to right |
| Our Brands strip | Each brand name label | Dark grey on black | `zinc-50` |
| Featured Models | "OUR SELECTION" eyebrow text | Dark grey | `#CC0000` or `zinc-400` |
| Featured Models (cards) | Model name + brand text on **hover** | Goes dark on hover | Stay `zinc-50` on hover; hover state should NOT darken text |
| "View All" button | Border, arrow icon, label text (un-hovered) | Dark / invisible | `zinc-50` text + `border-zinc-600`; red on hover |
| Footer | "Cash Back Moto" logo icon + "Moto" wordmark | Black | `zinc-50` |
| Footer | Phone SVG icon | Black on black | `zinc-50` or `zinc-400` |
| About page | Feature icons (Brand New Cars, Electric Mobility, Affordable Scooter, Bulk Order, After Sale Service) | Dark / black | `#CC0000` or `zinc-50` |
| About page | "By The Numbers" — numbers + icons | Dark | `zinc-50` (numbers) + `#CC0000` (icons) |
| About page | "Visit Us" GPS icon + "Directions" label | Dark | `zinc-50` / `zinc-400` |

---

## 3. Root Cause Analysis

Three likely sources to check before editing:

1. **Tailwind default colour inheritance** — A parent container may have `text-black` or `text-zinc-900` set, causing all children to inherit it. Look for `text-black`, `text-gray-900`, `text-zinc-900` on section wrappers.

2. **SVG `fill` / `stroke` set to `currentColor`** — If the icon SVG uses `currentColor` and the parent text colour is dark, the icon becomes dark too. Fix: set explicit `text-white` or `text-zinc-50` on the icon's parent `<span>` or directly on the `<svg>`.

3. **Hover state overrides** — The card hover state likely applies a class like `hover:text-zinc-900` or changes background to a light colour without adjusting text. Identify and remove or override.

---

## 4. Files to Edit

Based on the architecture in `developer-guide.md`:

```
src/components/
  layout/
    Navbar.tsx                  ← Logo colour + active link colour
    Footer.tsx                  ← Logo colour + contact icon colour
  features/
    home/
      Hero.tsx                  ← Heading colours + gradient text fix
      FeaturedBikes.tsx         ← Card hover text + "Our Selection" eyebrow + View All button
      BrandStrip.tsx            ← Brand name label colours
    about/                      ← Icons colour (if about has its own components)
  ui/
    Button.tsx                  ← View All ghost button styles
```

Also check:
```
src/app/[locale]/about/page.tsx   ← "By The Numbers", Visit Us, feature icons
src/app/globals.css               ← Any global text-colour rules causing inheritance
```

---

## 5. Fix Strategy — Minimal, Targeted Changes

**Principle: change only colour classes. Do not restructure components.**

### 5a. Global inheritance trap (check first)
Search the entire codebase for:
- `text-black`
- `text-gray-900`
- `text-zinc-900`
- `className="text-dark`

Replace any of these on **section/container wrappers** with nothing (remove) or `text-zinc-50`. Only remove if the element lives on a dark background.

### 5b. Logo (Navbar + Footer)
- Find the `<Logo />` component or wherever the SVG/image is rendered.
- If it's an `<Image>` from `next/image`: ensure no dark CSS filter is applied. If the source image is black, it needs to be replaced with a white/light version **or** apply `className="invert"` (Tailwind) as a quick fix.
- If it's an inline SVG: change `fill` values to `#fafafa` or `currentColor` + set `text-zinc-50` on the parent.

### 5c. Navbar active link
- Locate the active state class. Likely something like `data-[active]:text-zinc-900` or `aria-current:text-black`.
- Change to `data-[active]:text-primary` (maps to `#CC0000`).

### 5d. Hero heading gradient
- "FIND YOUR RIDE" text should use:
  ```tsx
  className="bg-gradient-to-r from-zinc-50 to-primary bg-clip-text text-transparent"
  ```
- "Cash Back Moto" sub-label: `text-zinc-50`

### 5e. Brand strip labels
- Each brand `<span>` or `<p>` inside the strip: replace dark colour class with `text-zinc-50` or `text-zinc-400`.

### 5f. Featured models — eyebrow + hover + View All
- "OUR SELECTION" eyebrow: add `text-primary` (red) to match the Section Heading pattern in `04-components.md`.
- Card hover: find the hover class that darkens text. Remove `hover:text-zinc-900` / `hover:text-black`. Text should stay `text-zinc-50` on hover.
- "View All" button: apply the Ghost/Secondary button pattern from `04-components.md`:
  ```tsx
  className="border border-border-active text-primary hover:bg-primary hover:text-white ..."
  ```

### 5g. Footer contact icons
- Wrap each SVG icon: `<span className="text-zinc-400">` or set `className="text-zinc-400"` directly on the icon component.

### 5h. About page icons + numbers
- Feature icons: `className="text-primary"` (red) for visual emphasis — matches the brand system.
- "By The Numbers" numbers: `text-zinc-50 font-bold`. Supporting icons: `text-primary`.
- Visit Us GPS icon + Directions label: `text-zinc-400` for secondary info.

---

## 6. QA Checklist (verify after each change)

- [ ] Navbar logo visible on dark bg — both EN and AR locales
- [ ] Navbar active link shows in red, inactive in `zinc-400`
- [ ] Hero: "Cash Back Moto" label readable
- [ ] Hero: "FIND YOUR RIDE" gradient clean — no invisible letters
- [ ] Brand strip: all brand names readable
- [ ] Featured Models: "OUR SELECTION" eyebrow visible
- [ ] Featured Models cards: text stays white both on hover AND un-hovered
- [ ] "View All" button: border + text + arrow visible un-hovered
- [ ] Footer: logo visible
- [ ] Footer: phone icon visible
- [ ] About page: all 4 feature icons visible
- [ ] About: numbers + icons in "By The Numbers" visible
- [ ] About: Visit Us GPS icon + Directions text visible
- [ ] Run on Arabic locale — RTL layout — same checks apply
- [ ] No `text-black` / `text-gray-900` left on dark-background containers

---

## 7. What NOT to Change

- Overall dark theme (`bg-zinc-950`, `bg-zinc-900/40` glassmorphism) — keep as-is
- Red accent colour usage — do not add more red, just fix invisible elements
- Component structure / JSX hierarchy
- Translation keys or `messages/` files
- Any logic, data fetching, or TypeScript types

---

## 8. Commit Plan

```
fix: correct text and icon colours across all dark-bg sections

- Navbar: logo white, active link red
- Hero: heading zinc-50, gradient text fix
- BrandStrip: label text zinc-50
- FeaturedBikes: eyebrow red, card hover text preserved, View All button visible
- Footer: logo white, phone icon zinc-400
- About: feature icons primary red, numbers zinc-50, Visit Us zinc-400
```

Single commit. All changes are style-only — no logic touched.
