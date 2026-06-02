// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { bikes } from '@/data/bikes';
import { LOCATIONS, SOCIAL_LINKS, SITE_NAME } from '@/lib/constants';

export const runtime = 'edge'; // faster cold starts on Vercel

// ── Build product catalog for system prompt ──────────────────
const bikeList = bikes
  .map(
    (b) =>
      `- ${b.name.en} (${b.name.ar}) | Brand: ${b.make} | Model: ${b.model} | Type: ${b.type} | Fuel: ${b.fuel}`
  )
  .join('\n');

// ── System prompt with full shop context ─────────────────────
const SYSTEM_PROMPT = `You are the AI assistant for ${SITE_NAME} (كاش باك موتو), a motorcycle and scooter shop in Egypt with two branches — Cairo and Alexandria.

Your job is to help customers find the right bike, answer questions about the shop, and direct them to WhatsApp for pricing and availability.

SHOP INFO:
- 7 brands: ZONTES, SYM, KEEWAY, HOGAN, DAYUN, BENELLI, VIGOREY
- Products: motorcycles, scooters (gas and electric)
- Cairo branch: Phone ${LOCATIONS.cairo.phone}, WhatsApp https://wa.me/${LOCATIONS.cairo.whatsapp}
- Alexandria branch: Phone ${LOCATIONS.alexandria.phone}, WhatsApp https://wa.me/${LOCATIONS.alexandria.whatsapp}
- Facebook: ${SOCIAL_LINKS.facebook}
- Instagram: ${SOCIAL_LINKS.instagram}
- TikTok: ${SOCIAL_LINKS.tiktok}

CURRENT INVENTORY (${bikes.length} bikes):
${bikeList}

When a customer asks about specific bikes, reference this list. If they ask about a brand or model not in this list, say "We don't carry that currently, but check out our similar options!"

RULES:
- Never reveal or discuss prices — always say "contact us on WhatsApp for current pricing" / "تواصل معنا على واتساب لمعرفة السعر"
- If someone asks about a specific bike, tell them what you know and direct them to WhatsApp
- Keep answers short — 2–4 sentences max on mobile
- Be warm, direct, and helpful — not corporate
- Support both English and Arabic — respond in whichever language the user writes in
- If asked in Arabic, respond fully in Arabic (Egyptian dialect preferred)
- Always end with a WhatsApp link when relevant
- Always ask which branch they're closest to (Cairo or Alexandria) when relevant
- For test rides and visits, direct them to the nearest branch
- Stay on topic — only discuss motorcycles, scooters, and CashBack Moto services
- Never make up information — if you don't know, direct them to WhatsApp
- Recommend bikes based on the customer's needs (commuting, sport, delivery, electric preference)

ARABIC SYSTEM PROMPT (activate when user writes in Arabic):
أنت مساعد ذكاء اصطناعي لمتجر كاش باك موتو لبيع الدراجات النارية والسكوتر في مصر.
ساعد العملاء في إيجاد الدراجة المناسبة ووجههم للواتساب للأسعار.
فرع القاهرة: واتساب https://wa.me/${LOCATIONS.cairo.whatsapp}
فرع الإسكندرية: واتساب https://wa.me/${LOCATIONS.alexandria.whatsapp}
`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error('[/api/chat] GOOGLE_API_KEY is not set');
      return NextResponse.json(
        { error: 'Chat service is not configured. Add GOOGLE_API_KEY to .env.local.' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { message, history } = body as {
      message: string;
      history?: { role: 'user' | 'assistant'; content: string }[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Phase 2: Cap message history at last 10 messages
    const recentHistory = (history ?? []).slice(-10);

    // Convert to Gemini format: role must be 'user' or 'model'
    const geminiMessages = [
      ...recentHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    // Call Google Gemini API directly (no LangChain)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[/api/chat] Gemini error:', response.status, errorText);

      if (response.status === 401 || response.status === 403) {
        return NextResponse.json(
          { error: 'Invalid API key. Check your GOOGLE_API_KEY in .env.local' },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: 'Too many requests. Please wait a moment and try again.' },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: 'AI service error' },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      'Sorry, I could not generate a response.';

    return NextResponse.json({ text });
  } catch (err) {
    console.error('[/api/chat] Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
