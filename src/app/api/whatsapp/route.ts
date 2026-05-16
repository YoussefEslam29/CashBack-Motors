import { NextRequest, NextResponse } from 'next/server';
import { chatForWhatsApp } from '@/lib/chatbot';

// ── WhatsApp Webhook Verification (GET) ──────────────────────
// Meta sends a GET request to verify your webhook URL.
// You must respond with the hub.challenge value.
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log('[WhatsApp] Webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn('[WhatsApp] Webhook verification failed');
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// ── WhatsApp Message Handler (POST) ──────────────────────────
// Meta sends incoming messages here as POST requests.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Meta sends various notification types — we only care about messages
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    // Check if this is a message notification (not a status update)
    if (value?.messages && value.messages.length > 0) {
      const message = value.messages[0];
      const senderPhone = message.from;

      // We only handle text messages for now
      if (message.type === 'text' && message.text?.body) {
        const userMessage = message.text.body;

        console.log(`[WhatsApp] Message from ${senderPhone}: ${userMessage}`);

        // Generate AI response
        const aiReply = await chatForWhatsApp(userMessage, senderPhone);

        // Send reply back via WhatsApp Cloud API
        await sendWhatsAppMessage(senderPhone, aiReply);

        console.log(`[WhatsApp] Reply sent to ${senderPhone}`);
      }
    }

    // Always respond 200 to acknowledge receipt
    // Meta will retry if you don't respond within 20 seconds
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error) {
    console.error('[WhatsApp] Error processing webhook:', error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }
}

// ── Send Message via WhatsApp Cloud API ──────────────────────
async function sendWhatsAppMessage(
  recipientPhone: string,
  messageText: string
): Promise<void> {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const apiVersion = process.env.WHATSAPP_API_VERSION || 'v21.0';

  if (!accessToken || !phoneNumberId) {
    console.error('[WhatsApp] Missing API credentials');
    return;
  }

  const url = `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`;

  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: recipientPhone,
    type: 'text',
    text: {
      preview_url: false,
      body: messageText,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('[WhatsApp] Failed to send message:', errorData);
  }
}
