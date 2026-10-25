import { useEffect, useRef, useState, useCallback } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const WEBHOOK_URL =
  'https://gecog99982.app.n8n.cloud/webhook/e29f2146-24ca-4f91-95d7-eced516f7be4/chat';

const GREETING =
  'Hi! Welcome to Coimbatore Chess Centre. How can I help you with our chess coaching programs today?';

type Message = { role: 'user' | 'ai'; text: string };

function getOrCreateSessionId(): string {
  const KEY = 'ccc-ai-session-id';
  try {
    let id = sessionStorage.getItem(KEY);
    if (!id) {
      id =
        typeof crypto !== 'undefined' && 'randomUUID' in crypto
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'ai', text: GREETING }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sessionIdRef = useRef<string>(getOrCreateSessionId());
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  useEffect(() => {
    if (open) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [open, scrollToBottom]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'sendMessage',
          sessionId: sessionIdRef.current,
          chatInput: text,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      const data = await res.json();
      const reply =
        data?.output ||
        data?.text ||
        data?.response ||
        data?.message ||
        'Sorry, I didn’t catch that. Could you rephrase?';

      setMessages((prev) => [...prev, { role: 'ai', text: String(reply) }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text:
            'I’m having trouble connecting right now. Please try again in a moment, or call us at 9360287128.',
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button — sits above the Vapi call button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
        className="fixed right-6 z-[9998] grid h-12 w-12 place-items-center rounded-full border border-gold-500/60 bg-ink-100 text-gold-400 shadow-glow-gold transition-all duration-300 hover:scale-105 hover:border-gold-400"
        style={{ bottom: '96px' }}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
        {!open && (
          <span className="absolute -left-1 -top-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-ink-950">
            Ask AI
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className="fixed right-6 z-[9998] flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl border border-gold-500/40 bg-ink-950 shadow-card sm:w-96"
          style={{ bottom: '160px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gold-500/30 bg-ink-100 px-4 py-3">
            <div className="min-w-0">
              <h3 className="truncate font-display text-base font-semibold text-gold-300">
                Coimbatore Chess Centre AI
              </h3>
              <p className="truncate text-[11px] text-ink-600">
                Ask about classes, batches & coaching
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full text-ink-600 transition-colors hover:bg-ink-200 hover:text-gold-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-ink-950 px-4 py-4 text-sm"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-gold-500 text-ink-950'
                      : 'rounded-bl-sm border border-gold-500/20 bg-ink-100 text-ink-700'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-gold-500/20 bg-ink-100 px-3 py-2.5">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500 [animation-delay:-0.3s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500 [animation-delay:-0.15s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-500" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-gold-500/20 bg-ink-100 p-3">
            <div className="flex items-center gap-2 rounded-full border border-gold-500/30 bg-ink-950 px-3 py-1.5">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message…"
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-ink-800 placeholder:text-ink-400 focus:outline-none disabled:opacity-60"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full bg-gold-500 text-ink-950 transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-ink-500">
              Press Enter to send
            </p>
          </div>
        </div>
      )}
    </>
  );
}
