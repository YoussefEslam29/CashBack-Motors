# Typography — Cash Back Moto

The type system needs to feel fast and confident — like the brand. We use two fonts: one aggressive display font for headings, one clean legible font for body copy. The Arabic font must be equally bold and modern, not a generic fallback.

---

## Font Families

### English
| Role | Font | Source |
|---|---|---|
| Display / Headings | **Barlow Condensed** (800 ExtraBold) | Google Fonts |
| Body / UI | **DM Sans** (400, 500, 600) | Google Fonts |

**Why Barlow Condensed?** — Tight, tall, mechanical. Used in motorsport branding. Feels like speed without being illegible. Bold headlines at large sizes are stunning on dark backgrounds.

### Arabic
| Role | Font | Source |
|---|---|---|
| Display / Headings | **Cairo** (700, 800) | Google Fonts |
| Body / UI | **Cairo** (400, 500) | Google Fonts |

**Why Cairo?** — Geometric, modern, works brilliantly alongside Latin condensed fonts. Doesn't feel "decorative" — it feels engineered.

---

## Import (in `layout.tsx` or `globals.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;600&family=Cairo:wght@400;500;700;800&display=swap');

:root {
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body:    'DM Sans', sans-serif;
  --font-arabic:  'Cairo', sans-serif;
}

/* Apply per language direction */
[lang="en"] { font-family: var(--font-body); }
[lang="ar"] { font-family: var(--font-arabic); }
```

---

## Type Scale

All sizes in `rem`. Base = `16px`.

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-hero` | `5rem` (80px) | 800 | Hero headline (EN only, Barlow Condensed) |
| `--text-h1` | `3rem` (48px) | 800 | Page titles |
| `--text-h2` | `2rem` (32px) | 700 | Section headings |
| `--text-h3` | `1.5rem` (24px) | 600 | Card titles, subheadings |
| `--text-body-lg` | `1.125rem` (18px) | 400 | Intro paragraphs |
| `--text-body` | `1rem` (16px) | 400 | Default body copy |
| `--text-sm` | `0.875rem` (14px) | 400/500 | Labels, meta, badges |
| `--text-xs` | `0.75rem` (12px) | 500 | Tags, legal, captions |

```css
:root {
  --text-hero:    5rem;
  --text-h1:      3rem;
  --text-h2:      2rem;
  --text-h3:      1.5rem;
  --text-body-lg: 1.125rem;
  --text-body:    1rem;
  --text-sm:      0.875rem;
  --text-xs:      0.75rem;
}
```

---

## Line Heights & Letter Spacing

```css
/* Headings — tight, punchy */
h1, h2, h3 {
  line-height: 1.1;
  letter-spacing: -0.02em; /* EN only */
}

/* Body — readable */
p, li {
  line-height: 1.65;
  letter-spacing: 0;
}

/* Arabic — slightly more line height */
[lang="ar"] h1,
[lang="ar"] h2,
[lang="ar"] h3 {
  line-height: 1.3;
  letter-spacing: 0; /* Never kern Arabic */
}

[lang="ar"] p {
  line-height: 1.8;
}
```

---

## Rules

- **NEVER** use `font-family: Arial`, `Roboto`, `Inter`, or system-ui as the primary font.
- **NEVER** kern Arabic text (`letter-spacing` must stay `0` for Arabic).
- Headings in English use `text-transform: uppercase` only for **hero** and **navigation** — not everywhere.
- Arabic headings are **never** uppercased (the language doesn't have it).
- Keep the hierarchy clear: only one `<h1>` per page, always in the display font.
