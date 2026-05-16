import { NextRequest, NextResponse } from 'next/server';
import { chatStream, type ChatMessage } from '@/lib/chatbot';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, history } = body as {
      message: string;
      history?: ChatMessage[];
    };

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required', code: 'INVALID_INPUT' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_API_KEY) {
      console.error('[Chat API] GOOGLE_API_KEY is not set in .env.local');
      return NextResponse.json(
        { error: 'Chat service is not configured. Add GOOGLE_API_KEY to .env.local', code: 'NOT_CONFIGURED' },
        { status: 503 }
      );
    }

    const stream = await chatStream(message, history ?? []);

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              const text = typeof chunk.content === 'string'
                ? chunk.content
                : Array.isArray(chunk.content)
                  ? chunk.content.filter((p: any) => typeof p === 'object' && 'text' in p).map((p: any) => p.text).join('')
                  : String(chunk.content);
              if (text) controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (e) {
          console.error('[Stream Error]', e);
          controller.error(e);
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache, no-transform',
      }
    });
  } catch (error) {
    console.error('[Chat API Error]', error instanceof Error ? error.message : error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Check for common Gemini API errors
    if (errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('401')) {
      return NextResponse.json(
        { error: 'Invalid API key. Check your GOOGLE_API_KEY in .env.local', code: 'INVALID_KEY' },
        { status: 401 }
      );
    }

    if (errorMessage.includes('RATE_LIMIT') || errorMessage.includes('429')) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.', code: 'RATE_LIMITED' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process your message. Please try again.', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
