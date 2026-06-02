'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS_EN = [
  'What scooters do you have?',
  'Show me electric bikes',
  'Which branch is in Cairo?',
  'I need a bike for delivery',
];

const SUGGESTED_QUESTIONS_AR = [
  'عندكم سكوترات إيه؟',
  'ورّيني الدراجات الكهربائية',
  'فين فرع القاهرة؟',
  'عايز دراجة للتوصيل',
];

export default function ChatWidget() {
  const locale = useLocale();
  const t = useTranslations('chat');
  const isRTL = locale === 'ar';

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  // Phase 2: Track consecutive failures for WhatsApp fallback
  const [failureCount, setFailureCount] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = isRTL ? SUGGESTED_QUESTIONS_AR : SUGGESTED_QUESTIONS_EN;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      setHasInteracted(true);
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput('');
      setIsLoading(true);

      try {
        // Build history from existing messages (exclude the current one)
        const history = messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            history,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiMessage: Message = {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.text || (isRTL ? 'عذراً، لم أتمكن من الرد.' : 'Sorry, I could not generate a response.'),
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, aiMessage]);
          // Reset failure count on success
          setFailureCount(0);
        } else {
          // Phase 2: Increment failure count
          setFailureCount((prev) => prev + 1);

          // Phase 2: Arabic error messages
          const errorMessageContent = isRTL
            ? 'عذراً، حدث خطأ. جرّب تاني أو تواصل معانا على واتساب.'
            : 'Sorry, something went wrong. Try again or reach us on WhatsApp.';

          const errorMessage: Message = {
            id: `error-${Date.now()}`,
            role: 'assistant',
            content: errorMessageContent,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, errorMessage]);
        }
      } catch {
        // Phase 2: Increment failure count on network errors
        setFailureCount((prev) => prev + 1);

        const errorMessage: Message = {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: isRTL
            ? 'عذراً، مفيش اتصال. جرّب تاني أو تواصل معانا على واتساب.'
            : 'Sorry, connection failed. Try again or reach us on WhatsApp.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages, isRTL]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* ── Chat Toggle Button ──────────────────────────────── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
        className={`fixed z-50 flex items-center justify-center rounded-full shadow-2xl transition-all duration-500 ease-out ${
          isOpen
            ? 'bottom-[520px] w-11 h-11 bg-bg-elevated hover:bg-bg-hover border border-border'
            : 'bottom-24 w-14 h-14 bg-primary hover:bg-primary-dark chat-btn-glow'
        } right-6`}
        style={!isOpen ? { boxShadow: '0 0 24px rgba(204, 0, 0, 0.5)' } : undefined}
      >
        {isOpen ? (
          <X className="w-5 h-5 text-text-secondary" />
        ) : (
          <div className="relative">
            <Sparkles className="w-6 h-6 text-white" />
            {/* Notification dot */}
            {!hasInteracted && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-whatsapp rounded-full animate-pulse" />
            )}
          </div>
        )}
      </button>

      {/* ── Chat Panel ──────────────────────────────────────── */}
      <div
        className={`fixed z-40 flex flex-col transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        } right-6 bottom-6`}
        style={{ width: '380px', height: '500px' }}
      >
        <div className="flex flex-col h-full rounded-xl overflow-hidden border border-border bg-bg-dark/95 backdrop-blur-xl shadow-2xl">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-primary/20 to-transparent border-b border-border">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-whatsapp rounded-full border-2 border-bg-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {t('title')}
              </h3>
              <p className="text-xs text-text-secondary">
                {t('subtitle')}
              </p>
            </div>
          </div>

          {/* ── Messages ────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="bg-bg-card border border-border rounded-xl rounded-tl-sm px-4 py-3 max-w-[85%]">
                    <p className="text-sm text-text-primary leading-relaxed">
                      {t('welcome')}
                    </p>
                  </div>
                </div>

                {/* Suggested questions */}
                <div className="flex flex-wrap gap-2 pl-9">
                  {suggestedQuestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(question)}
                      className="text-xs px-3 py-1.5 rounded-full border border-border bg-bg-elevated hover:bg-bg-hover hover:border-primary/50 text-text-secondary hover:text-text-primary transition-all duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message bubbles */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 animate-fade-in ${
                  msg.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'user'
                      ? 'bg-primary/30'
                      : 'bg-primary/20'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <User className="w-3.5 h-3.5 text-primary-light" />
                  ) : (
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-tr-sm'
                      : 'bg-bg-card border border-border text-text-primary rounded-tl-sm'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2 animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-bg-card border border-border rounded-xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-text-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Phase 2: WhatsApp fallback after 3 consecutive failures */}
            {failureCount >= 3 && (
              <div className="p-3 bg-[#1A1A1A] rounded-lg text-center animate-fade-in">
                <p className="text-[#A0A0A0] text-sm mb-3">
                  {isRTL
                    ? 'فيه مشكلة؟ تواصل معانا مباشرة:'
                    : 'Having trouble? Chat with us directly:'}
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://wa.me/201005804463"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#25D366] text-white text-sm font-semibold rounded-md hover:bg-[#20bd5a] transition-colors"
                  >
                    {isRTL ? 'واتساب القاهرة' : 'WhatsApp Cairo'}
                  </a>
                  <a
                    href="https://wa.me/201110782513"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 h-10 px-4 bg-[#25D366] text-white text-sm font-semibold rounded-md hover:bg-[#20bd5a] transition-colors"
                  >
                    {isRTL ? 'واتساب الإسكندرية' : 'WhatsApp Alexandria'}
                  </a>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input ───────────────────────────────────────── */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 border-t border-border bg-bg-dark/80"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('placeholder')}
              disabled={isLoading}
              dir={isRTL ? 'rtl' : 'ltr'}
              className="flex-1 bg-bg-elevated border border-border rounded-lg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="w-10 h-10 rounded-lg bg-primary hover:bg-primary-dark flex items-center justify-center transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/30"
            >
              <Send className={`w-4 h-4 text-white ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
