"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, Send, Sparkles, X } from "lucide-react";
import { useChat, type ChatMessage } from "@/lib/use-chat";

const SUGGESTIONS = [
  "What's Karim's strongest stack?",
  "Tell me about his Accenture work",
  "Is he open to Dubai roles?",
  "What's his React experience?",
] as const;

export function AIChat() {
  const [open, setOpen] = useState(false);
  const { messages, loading, send, isInitial } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <motion.button
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat with AI assistant"}
        aria-expanded={open}
        aria-controls="ai-chat-panel"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] shadow-2xl"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={20} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <MessageSquare size={20} />
              <span className="absolute -right-1 -top-1 grid h-3 w-3 place-items-center">
                <Sparkles size={10} className="text-[var(--color-accent)]" />
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="ai-chat-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="ai-chat-title"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)] shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                  <Sparkles size={14} aria-hidden />
                </span>
                <div>
                  <p id="ai-chat-title" className="text-sm font-medium leading-none">
                    Ask about Karim
                  </p>
                  <p className="mt-0.5 text-[10px] text-[var(--color-fg-muted)]">
                    Powered by Claude
                  </p>
                </div>
              </div>
            </header>

            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-label="Chat messages"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message, index) => (
                <ChatBubble
                  key={index}
                  message={message}
                  showTyping={loading && index === messages.length - 1 && !message.content}
                />
              ))}
            </div>

            {isInitial && <SuggestionChips onPick={send} />}

            <ChatComposer ref={inputRef} loading={loading} onSubmit={send} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ChatBubble({
  message,
  showTyping,
}: {
  message: ChatMessage;
  showTyping: boolean;
}) {
  const isUser = message.role === "user";
  return (
    <div
      className={
        isUser
          ? "ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-[var(--color-fg)] px-3 py-2 text-sm text-[var(--color-bg)]"
          : "max-w-[85%] rounded-2xl rounded-bl-sm border border-[var(--color-border)] px-3 py-2 text-sm"
      }
    >
      {message.content || (showTyping ? <TypingIndicator /> : null)}
    </div>
  );
}

function SuggestionChips({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="border-t border-[var(--color-border)] px-4 py-3">
      <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        Try asking
      </p>
      <ul className="flex flex-wrap gap-1.5">
        {SUGGESTIONS.map((suggestion) => (
          <li key={suggestion}>
            <button
              type="button"
              onClick={() => onPick(suggestion)}
              className="rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[11px] transition hover:bg-[var(--color-bg)]"
            >
              {suggestion}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ChatComposer = ({
  ref,
  loading,
  onSubmit,
}: {
  ref: React.RefObject<HTMLTextAreaElement | null>;
  loading: boolean;
  onSubmit: (text: string) => void;
}) => {
  const [value, setValue] = useState("");

  const submit = () => {
    if (!value.trim() || loading) return;
    onSubmit(value);
    setValue("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="flex items-end gap-2 border-t border-[var(--color-border)] p-3"
    >
      <label htmlFor="ai-chat-input" className="sr-only">
        Ask anything about Karim
      </label>
      <textarea
        id="ai-chat-input"
        ref={ref}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submit();
          }
        }}
        placeholder="Ask anything..."
        rows={1}
        className="flex-1 resize-none rounded-xl border border-[var(--color-border)] bg-transparent px-3 py-2 text-sm outline-none transition focus:border-[var(--color-accent)]"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        aria-label="Send message"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] transition disabled:opacity-40"
      >
        <Send size={14} aria-hidden />
      </button>
    </form>
  );
};

function TypingIndicator() {
  return (
    <span className="inline-flex items-center gap-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -3, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg-muted)]"
        />
      ))}
    </span>
  );
}
