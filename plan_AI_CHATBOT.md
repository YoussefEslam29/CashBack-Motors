# plan_AI_CHATBOT.md — Cash Back Moto

> Living document. Update this file every time the chatbot is changed, fixed, or extended.
> Last updated: June 2026
> Status: 🔴 BROKEN — chatbot loads but never responds

---

## What exists right now

From the live site audit (https://cashback-motors.vercel.app/en):

- A floating chat widget exists in the bottom-right corner
- Widget label: "CashBack Moto AI — Online — Ask me anything"
- Pre-built quick-reply buttons: "What scooters do you have?", "Show me electric bikes", "Which branch is in Cairo?", "I need a bike for delivery"
- **Current error:** `Chat service is not configured. Add GOOGLE_API_KEY to .env.local.`
- **Root cause:** The chatbot was built using Google Gemini API but the `GOOGLE_API_KEY` environment variable was never added to Vercel

**Architecture as-built:**
```
Client widget (component)
  → POST /api/chat  (Next.js API route)
    → Google Gemini API (requires GOOGLE_API_KEY)
```

---

## Decision: Keep Google Gemini OR switch to Anthropic Claude?

Two options. Choose one before implementing.

### Option A — Fix Google Gemini (fastest, 15 minutes)
- Keep all existing code
- Just add `GOOGLE_API_KEY` to Vercel environment variables
- Get a free Gemini API key from https://aistudio.google.com/app/apikey

**Pros:** Nothing to rewrite, free tier is generous
**Cons:** Tied to Google, less control over model behavior

### Option B — Switch to Anthropic Claude API (recommended)
- Replace Google Gemini with Claude claude-sonnet-4-6 in the API route
- Better quality responses, better Arabic support
- Uses `ANTHROPIC_API_KEY` instead of `GOOGLE_API_KEY`

**Pros:** Better model, Arabic is excellent, more control, you already use Claude
**Cons:** Claude API has usage costs (but very cheap at this scale)

---

## ✅ CHOSEN PATH: Option A — Fix Google Gemini first (implement now)

Reason: Fastest path to a working chatbot. Option B can be done in Phase 2.

---

## Phase 1 — Fix the broken chatbot (implement now)

### Step 1.1 — Get a Google Gemini API key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with a Google account
3. Click "Create API Key"
4. Copy the key — it looks like: `AIzaSy...`
5. Keep it secret — never commit it to git

### Step 1.2 — Add the key to local development

Create or edit `.env.local` in the project root:
```
GOOGLE_API_KEY=AIzaSy...your_key_here
```

Confirm `.env.local` is in `.gitignore` (it should already be). Never commit this file.

### Step 1.3 — Add the key to Vercel (production)

1. Go to https://vercel.com/dashboard
2. Open the **CashBack-Motors** project
3. Go to **Settings → Environment Variables**
4. Click **Add New**
5. Name: `GOOGLE_API_KEY`
6. Value: paste your key
7. Environments: check **Production**, **Preview**, and **Development**
8. Click **Save**
9. Go to **Deployments** → click the three dots on the latest deployment → **Redeploy**

### Step 1.4 — Verify the API route exists and is correct

Find the file: `src/app/api/chat/route.ts` (or `app/api/chat/route.ts`)

It should look roughly like this — if it doesn't, rewrite it:

```ts
// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // optional — faster cold starts on Vercel

const SYSTEM_PROMPT = `You are the AI assistant for Cash Back Moto, a motorcycle and scooter shop in Egypt with two branches — Cairo and Alexandria.

Your job is to help customers find the right bike, answer questions about the shop, and direct them to WhatsApp for pricing and availability.

SHOP INFO:
- 7 brands: ZONTES, SYM, KEEWAY, HOGAN, DAYUN, BENELLI, VIGOREY
- Products: motorcycles, scooters (gas and electric)
- Cairo branch: WhatsApp 01005804463
- Alexandria branch: WhatsApp +20 11 10782513
- Facebook: https://www.facebook.com/Cashbackmotoo
- Instagram: https://www.instagram.com/cashbackmoto

RULES:
- Never reveal or discuss prices — always say "contact us on WhatsApp for current pricing"
- If someone asks about a specific bike, tell them what you know and direct them to WhatsApp
- Keep answers short — 2–4 sentences max on mobile
- Be warm, direct, and helpful — not corporate
- Support both English and Arabic — respond in whichever language the user writes in
- If asked in Arabic, respond fully in Arabic
- Always end with a WhatsApp link when relevant

ARABIC SYSTEM PROMPT (activate when user writes in Arabic):
أنت مساعد ذكاء اصطناعي لمتجر كاش باك موتو لبيع الدراجات النارية والسكوتر في مصر.
ساعد العملاء في إيجاد الدراجة المناسبة ووجههم للواتساب للأسعار.
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat service is not configured. Add GOOGLE_API_KEY to .env.local.' },
        { status: 503 }
      );
    }

    const { messages } = await req.json() as {
      messages: { role: 'user' | 'model'; parts: { text: string }[] }[];
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: messages,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('[/api/chat] Gemini error:', error);
      return NextResponse.json({ error: 'AI service error' }, { status: 502 });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return NextResponse.json({ text });

  } catch (err) {
    console.error('[/api/chat] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 1.5 — Verify the client widget is calling the API correctly

Find the chat widget component (search for "CashBack Moto AI" or "GOOGLE_API_KEY" in the codebase).

The widget should be calling `/api/chat` like this:

```ts
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: conversationHistory }),
});
const data = await response.json();
```

If the widget is calling the Gemini API **directly from the client** (i.e. you see the API key or `generativelanguage.googleapis.com` in the component file) — **stop**. That is a security issue. Move all API calls to the server-side route above and never expose the key to the browser.

### Step 1.6 — Test locally

```bash
npm run dev
```

Open http://localhost:3000/en, open the chat widget, type "What scooters do you have?" — you should get a response within 2–3 seconds.

### Step 1.7 — Test in production

After redeploying on Vercel, open https://cashback-motors.vercel.app/en and test the same question.

---

## Phase 2 — Improve the chatbot (do after Phase 1 works)

### Step 2.1 — Feed it real bike data

The chatbot currently knows nothing specific about the bikes in the catalog. Update the system prompt to include the actual inventory from `data/bikes.ts`:

In `src/app/api/chat/route.ts`, import the bikes array and inject it into the system prompt at runtime:

```ts
import { bikes } from '@/data/bikes';

const bikeList = bikes.map(b =>
  `- ${b.name} (${b.brand}, ${b.type}, ${b.fuel}${b.isElectric ? ', electric' : ''})`
).join('\n');

const SYSTEM_PROMPT = `...
CURRENT INVENTORY:
${bikeList}

When a customer asks about specific bikes, reference this list.
...`;
```

### Step 2.2 — Add typing indicator

The widget should show a "..." typing animation while waiting for the API response. If it doesn't already have one, add it to the chat component.

### Step 2.3 — Add conversation memory limit

Long conversations increase API costs and latency. Cap the message history sent to the API at the last 10 messages:

```ts
const last10 = messages.slice(-10);
// send last10, not full messages array
```

### Step 2.4 — Add error message in Arabic

When the API fails, show the error in the user's language:

```ts
// In the chat widget component:
const errorMessage = locale === 'ar'
  ? 'عذراً، حدث خطأ. جرب مرة أخرى أو تواصل معنا على الواتساب.'
  : 'Sorry, something went wrong. Try again or reach us on WhatsApp.';
```

### Step 2.5 — Fallback to WhatsApp on API failure

If the API returns an error 3 times in a row, auto-suggest WhatsApp instead of showing a broken chat:

```tsx
{failureCount >= 3 && (
  <div className="p-3 bg-[#1A1A1A] rounded-lg text-center">
    <p className="text-[#A0A0A0] text-sm mb-3">Having trouble? Chat with us directly:</p>
    <a href="https://wa.me/201005804463" target="_blank" rel="noopener noreferrer"
       className="inline-flex items-center gap-2 h-10 px-4 bg-[#25D366] text-white text-sm font-semibold rounded-md">
      Open WhatsApp
    </a>
  </div>
)}
```

---

## Phase 3 — Switch to Claude API (optional upgrade)

Do this after Phase 1 and 2 are stable.

### Why switch to Claude

- Claude handles Arabic better than Gemini Flash
- Claude claude-sonnet-4-6 follows complex instructions more reliably
- You already work with Claude — consistent tooling
- Claude's API is well-documented and has a free trial

### Step 3.1 — Get an Anthropic API key

1. Go to https://console.anthropic.com
2. Sign up or log in
3. Go to **API Keys** → **Create Key**
4. Copy it — looks like: `sk-ant-api03-...`

### Step 3.2 — Add to Vercel

Same process as Step 1.3 but:
- Name: `ANTHROPIC_API_KEY`
- Remove `GOOGLE_API_KEY` (or keep both during transition)

### Step 3.3 — Rewrite the API route for Claude

Replace `src/app/api/chat/route.ts` with:

```ts
// src/app/api/chat/route.ts — Claude version
import { NextRequest, NextResponse } from 'next/server';
import { bikes } from '@/data/bikes';

const bikeList = bikes.map(b =>
  `- ${b.name} (${b.brand}, ${b.type}, ${b.isElectric ? 'electric' : 'gas'})`
).join('\n');

const SYSTEM_PROMPT = `You are the AI assistant for Cash Back Moto, a motorcycle and scooter shop in Egypt.

SHOP INFO:
- Two branches: Cairo (01005804463) and Alexandria (+20 11 10782513)
- Brands: ZONTES, SYM, KEEWAY, HOGAN, DAYUN, BENELLI, VIGOREY
- All types: motorcycles, scooters, gas, electric

CURRENT INVENTORY:
${bikeList}

RULES:
- Never share prices — always say "contact us on WhatsApp for pricing"
- Keep answers to 2–4 sentences — users are on mobile
- Be warm and direct — not corporate
- Respond in the same language the user writes in (English or Arabic)
- Always include a WhatsApp link when redirecting for pricing or availability
- Cairo WhatsApp: https://wa.me/201005804463
- Alexandria WhatsApp: https://wa.me/201110782513`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Chat service is not configured. Add ANTHROPIC_API_KEY to .env.local.' },
        { status: 503 }
      );
    }

    const { messages } = await req.json() as {
      messages: { role: 'user' | 'assistant'; content: string }[];
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages: messages.slice(-10), // last 10 messages only
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[/api/chat] Claude error:', error);
      return NextResponse.json({ error: 'AI service error' }, { status: 502 });
    }

    const data = await response.json();
    const text = data?.content?.[0]?.text ?? 'Sorry, I could not generate a response.';

    return NextResponse.json({ text });

  } catch (err) {
    console.error('[/api/chat] Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Step 3.4 — Update message format in the widget

Claude uses `{ role: 'user' | 'assistant', content: string }` format.
Gemini uses `{ role: 'user' | 'model', parts: [{ text: string }] }` format.

When switching to Claude, update the chat widget to use Claude's format:
- Change `role: 'model'` → `role: 'assistant'`
- Change `parts: [{ text: '...' }]` → `content: '...'`

---

## Security rules — never violate these

- **Never** put `GOOGLE_API_KEY` or `ANTHROPIC_API_KEY` in client-side code
- **Never** use `NEXT_PUBLIC_` prefix for API keys — this exposes them in the browser bundle
- **Always** call AI APIs from the server-side API route (`/api/chat/route.ts`), never from the component
- **Always** cap message history before sending to API (max 10 messages)
- **Always** validate and sanitize user input in the API route before sending to AI

---

## Environment variables reference

| Variable | Where | Value |
|---|---|---|
| `GOOGLE_API_KEY` | `.env.local` + Vercel | Google Gemini API key from aistudio.google.com |
| `ANTHROPIC_API_KEY` | `.env.local` + Vercel (Phase 3) | Anthropic key from console.anthropic.com |

`.env.example` must always stay in sync:
```
# AI Chatbot
GOOGLE_API_KEY=
# ANTHROPIC_API_KEY=   ← uncomment if switching to Claude (Phase 3)
```

---

## Progress tracker

| Phase | Step | Status | Notes |
|---|---|---|---|
| 1 | Get Google API key | ⬜ Not started | https://aistudio.google.com/app/apikey |
| 1 | Add key to `.env.local` | ⬜ Not started | |
| 1 | Add key to Vercel | ⬜ Not started | Settings → Environment Variables |
| 1 | Verify API route is correct | ⬜ Not started | `src/app/api/chat/route.ts` |
| 1 | Verify widget calls `/api/chat` not Gemini directly | ⬜ Not started | Security check |
| 1 | Test locally | ⬜ Not started | `npm run dev` |
| 1 | Test on production | ⬜ Not started | Redeploy on Vercel first |
| 2 | Feed real bike data into prompt | ⬜ Not started | Import from `data/bikes.ts` |
| 2 | Add typing indicator | ⬜ Not started | |
| 2 | Cap message history at 10 | ⬜ Not started | |
| 2 | Arabic error messages | ⬜ Not started | |
| 2 | WhatsApp fallback on failure | ⬜ Not started | |
| 3 | Get Anthropic API key | ⬜ Not started | Optional upgrade |
| 3 | Rewrite API route for Claude | ⬜ Not started | Optional upgrade |
| 3 | Update widget message format | ⬜ Not started | Optional upgrade |

Update status as: ⬜ Not started → 🔄 In progress → ✅ Done → ❌ Blocked
