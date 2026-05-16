import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage, AIMessage, type BaseMessage } from '@langchain/core/messages';
import { bikes } from '@/data/bikes';
import { LOCATIONS, SOCIAL_LINKS, SITE_NAME } from '@/lib/constants';

// ── Build product catalog context ────────────────────────────
function buildCatalogContext(): string {
  return bikes
    .map((bike) => {
      return `- ${bike.name.en} (${bike.name.ar}) | Brand: ${bike.make} | Model: ${bike.model} | Type: ${bike.type}`;
    })
    .join('\n');
}

// ── System prompt ────────────────────────────────────────────
const SYSTEM_PROMPT = `You are the AI sales assistant for ${SITE_NAME} (كاش باك موتو), an Egyptian motorcycle and scooter dealership.

## Your Personality
- Friendly, knowledgeable, and professional
- You love bikes and are passionate about helping customers find their perfect ride
- You speak naturally in the language the customer uses (English or Arabic/Egyptian dialect)
- Keep responses concise — 2-4 sentences max unless the customer asks for details
- Use a warm, conversational tone

## Our Branches
1. **Cairo Branch (فرع القاهرة)**
   - Phone: ${LOCATIONS.cairo.phone}
   - WhatsApp: https://wa.me/${LOCATIONS.cairo.whatsapp}
   - Location: ${LOCATIONS.cairo.mapUrl}

2. **Alexandria Branch (فرع الإسكندرية)**
   - Phone: ${LOCATIONS.alexandria.phone}
   - WhatsApp: https://wa.me/${LOCATIONS.alexandria.whatsapp}
   - Location: ${LOCATIONS.alexandria.mapUrl}

## Social Media
- Facebook: ${SOCIAL_LINKS.facebook}
- Instagram: ${SOCIAL_LINKS.instagram}
- TikTok: ${SOCIAL_LINKS.tiktok}

## Our Product Catalog (${bikes.length} bikes)
${buildCatalogContext()}

## CRITICAL RULES
1. **NEVER reveal or discuss prices.** If asked about price, say "For the best price, please contact us on WhatsApp or call your nearest branch — we have special offers!" / "للحصول على أفضل سعر، تواصل معنا على واتساب أو اتصل بأقرب فرع — عندنا عروض مميزة!"
2. **Always suggest contacting via WhatsApp** for pricing, availability, and purchasing.
3. **Always ask which branch** they're closest to (Cairo or Alexandria) when relevant.
4. **Recommend bikes** based on the customer's needs (commuting, sport, delivery, electric preference, budget-consciousness).
5. **You only know about bikes we sell.** If asked about brands/models we don't carry, say "We don't carry that brand currently, but check out our similar options!"
6. **Never make up information.** If you don't know something, direct them to WhatsApp.
7. **For test rides and visits**, direct them to the nearest branch.
8. **Stay on topic.** You only discuss motorcycles, scooters, and CashBack Moto services. Politely redirect off-topic questions.

## Brands We Carry
ZONTOS, SYM, KEEWAY, HOGAN, DAYUN, BENELLI, VIGOREY

## Services
- New motorcycle and scooter sales
- Electric vehicle sales
- After-sale support and warranty
- Bulk orders for delivery businesses`;

// ── Chat model singleton ─────────────────────────────────────
// Using Gemini 2.0 Flash — 100% FREE via Google AI Studio
let modelInstance: ChatGoogleGenerativeAI | null = null;

function getModel(): ChatGoogleGenerativeAI {
  if (!modelInstance) {
    modelInstance = new ChatGoogleGenerativeAI({
      model: 'gemini-2.0-flash',
      apiKey: process.env.GOOGLE_API_KEY,
      temperature: 0.7,
      maxOutputTokens: 512,
    });
  }
  return modelInstance;
}

// ── Types ────────────────────────────────────────────────────
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ── Main chat function ───────────────────────────────────────
export async function chat(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const model = getModel();

  const messages: BaseMessage[] = [
    new SystemMessage(SYSTEM_PROMPT),
    ...conversationHistory.map((msg) =>
      msg.role === 'user'
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    ),
    new HumanMessage(userMessage),
  ];

  const response = await model.invoke(messages);

  // response.content can be string or array — handle both
  const content = typeof response.content === 'string'
    ? response.content
    : Array.isArray(response.content)
      ? response.content
          .filter((part): part is { type: 'text'; text: string } => typeof part === 'object' && 'text' in part)
          .map((part) => part.text)
          .join('')
      : String(response.content);

  return content;
}

// ── Stream chat function (for website widget) ────────────────
export async function chatStream(
  userMessage: string,
  conversationHistory: ChatMessage[] = []
) {
  const model = getModel();

  const messages: BaseMessage[] = [
    new SystemMessage(SYSTEM_PROMPT),
    ...conversationHistory.map((msg) =>
      msg.role === 'user'
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    ),
    new HumanMessage(userMessage),
  ];

  return await model.stream(messages);
}

// ── WhatsApp-specific chat (stateless per message) ───────────
export async function chatForWhatsApp(
  userMessage: string,
  senderPhone: string
): Promise<string> {
  // For WhatsApp, we keep it simple — no history persistence for now
  // In production, you'd store conversation in a database keyed by senderPhone
  return chat(userMessage, []);
}
