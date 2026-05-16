# Colour Tokens — Cash Back Moto

The palette is built around the logo: **near-black backgrounds, crimson red as the dominant action colour, white for legibility.** Nothing soft. Nothing pastel. Every colour choice should feel like it belongs on a racetrack.

---

## Core Tokens

```css
:root {
  /* Backgrounds */
  --color-bg-base:       #09090b;   /* Page background — deepest black zinc-950 */
  --color-bg-surface:    rgba(24, 24, 27, 0.4); /* Cards, panels — zinc-900 at 40% with backdrop-blur */
  --color-bg-elevated:   #18181b;   /* Modals, dropdowns, hover states (zinc-900) */
  --color-bg-subtle:     #27272a;   /* Dividers, skeleton loaders (zinc-800) */

  /* Primary — Red */
  --color-primary:       #CC0000;   /* Strictly for primary action buttons, active link underlines, small badges */
  --color-primary-hover: #E60000;   /* Hover / focus */
  --color-primary-muted: #7A0000;   /* Disabled, ghost states */

  /* Text */
  --color-text-primary:  #fafafa;   /* Headings, main body (zinc-50) */
  --color-text-secondary:#a1a1aa;   /* Subtitles, meta, labels (zinc-400) */
  --color-text-disabled: #52525b;   /* Disabled inputs, inactive states (zinc-600) */
  --color-text-inverse:  #09090b;   /* Text on red backgrounds */

  /* Accent */
  --color-accent-white:  #fafafa;
  --color-accent-red:    #FF1A1A;   /* Badges, highlights — brighter than primary */

  /* Semantic */
  --color-success:       #22C55E;
  --color-warning:       #F59E0B;
  --color-error:         #EF4444;

  /* Borders */
  --color-border:        #2A2A2A;   /* Default borders */
  --color-border-active: #CC0000;   /* Focused inputs, selected cards */
}
```

---

## Usage Rules

- **Backgrounds** — always use `--color-bg-*` tokens. Cards and containers use glassmorphism (opacity + blur).
- **Red is for action** — only use `--color-primary` on interactive elements (buttons, link underlines, active states, badges). Don't splash it decoratively everywhere or use it for text gradients.
- **Crisp white text** — use pure `zinc-50` (`#fafafa`) for text on dark backgrounds. No text shadows or glows.
- **No text glow** — text shadows and glows are strictly forbidden. Use clean, depth-focused design instead.
- **Floating CTAs** — WhatsApp branch buttons use dark frosted-glass pills with subtle brand icons. No solid bright green.

---

## Tailwind Config Mapping

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      bg: {
        base:     '#0A0A0A',
        surface:  '#111111',
        elevated: '#1A1A1A',
        subtle:   '#222222',
      },
      primary: {
        DEFAULT: '#CC0000',
        hover:   '#E60000',
        muted:   '#7A0000',
      },
      accent: '#FF1A1A',
      border: {
        DEFAULT: '#2A2A2A',
        active:  '#CC0000',
      }
    }
  }
}
```
