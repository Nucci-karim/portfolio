"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ChatRole = "user" | "assistant";
export type ChatMessage = { role: ChatRole; content: string };

const INITIAL_GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi — I'm an AI assistant trained on Karim's experience, projects, and career goals. Ask me anything.",
};

const FALLBACK_NETWORK_ERROR =
  "Network error. Please try again, or email nuccikarim@gmail.com directly.";
const FALLBACK_GENERIC_ERROR = "Something went wrong. Try again or email nuccikarim@gmail.com.";

async function streamReply(
  res: Response,
  onChunk: (text: string) => void,
): Promise<void> {
  if (!res.body) throw new Error("No response body");
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let accumulated = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    accumulated += decoder.decode(value, { stream: true });
    onChunk(accumulated);
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (text: string) => {
      const value = text.trim();
      if (!value || loading) return;

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      const nextHistory: ChatMessage[] = [...messages, { role: "user", content: value }];
      setMessages([...nextHistory, { role: "assistant", content: "" }]);
      setLoading(true);

      const updateAssistant = (content: string) => {
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content };
          return updated;
        });
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextHistory }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => null);
          updateAssistant(data?.error ?? FALLBACK_GENERIC_ERROR);
          return;
        }

        await streamReply(res, updateAssistant);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        updateAssistant(FALLBACK_NETWORK_ERROR);
      } finally {
        if (abortRef.current === controller) abortRef.current = null;
        setLoading(false);
      }
    },
    [loading, messages],
  );

  return {
    messages,
    loading,
    send,
    isInitial: messages.length === 1,
  };
}
