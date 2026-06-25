"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Halo, aku Nava, asisten portofolio Rey. Mau ngobrol soal skill, project, pengalaman, pendidikan, atau cara kerja Rey? Tanya aja.",
  },
];

const QUICK_PROMPTS = [
  "Rey cocok untuk project apa?",
  "Ceritakan project AI Rey",
  "Bagaimana cara kerja sama dengan Rey?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  async function sendMessage(content: string) {
    const cleanContent = content.trim();
    if (!cleanContent || isLoading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: cleanContent }];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Chatbot sedang tidak bisa merespons.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply || "Maaf, saya belum bisa menjawab pertanyaan itu.",
        },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Chatbot sedang tidak bisa merespons.";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            "Maaf, koneksi ke AI sedang bermasalah. Coba lagi sebentar lagi, atau hubungi Rey lewat email/LinkedIn.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="chatbot-root">
      {isOpen && (
        <section className="chatbot-panel" aria-label="Nava chatbot">
          <header className="chatbot-header">
            <div>
              <span className="chatbot-kicker">PERSONAL AI ASSISTANT</span>
              <h2>Nava</h2>
            </div>
            <button
              type="button"
              className="chatbot-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Tutup chatbot"
              title="Tutup chatbot"
            >
              <X size={18} />
            </button>
          </header>

          <div ref={scrollRef} className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chatbot-row ${message.role}`}>
                <div className="chatbot-bubble">{message.content}</div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-row assistant">
                <div className="chatbot-bubble loading">
                  <Loader2 size={15} className="chatbot-spinner" />
                  Sedang berpikir...
                </div>
              </div>
            )}
          </div>

          {messages.length === 1 && (
            <div className="chatbot-prompts">
              {QUICK_PROMPTS.map((prompt) => (
                <button key={prompt} type="button" onClick={() => void sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {error && <p className="chatbot-error">{error}</p>}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ngobrol dengan Nava..."
              aria-label="Pesan untuk Nava"
              disabled={isLoading}
              maxLength={500}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Kirim pesan">
              {isLoading ? <Loader2 size={16} className="chatbot-spinner" /> : <Send size={16} />}
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="chatbot-toggle"
        onClick={() => setIsOpen((value) => !value)}
        aria-label={isOpen ? "Tutup Nava" : "Buka Nava"}
        title={isOpen ? "Tutup Nava" : "Buka Nava"}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
        <span>Nava</span>
      </button>

      <style jsx>{`
        .chatbot-root {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 9500;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
          font-family: inherit;
        }

        .chatbot-panel {
          width: min(380px, calc(100vw - 32px));
          height: min(560px, calc(100svh - 120px));
          display: flex;
          flex-direction: column;
          background: rgba(13, 13, 13, 0.94);
          border: 1px solid rgba(60, 60, 60, 0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.45);
          overflow: hidden;
        }

        .chatbot-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 18px 14px;
          border-bottom: 1px solid var(--hairline);
          background: linear-gradient(135deg, rgba(28, 105, 212, 0.16), rgba(226, 39, 24, 0.08));
        }

        .chatbot-kicker {
          display: block;
          color: var(--m-blue-dark);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.4px;
          margin-bottom: 5px;
        }

        .chatbot-header h2 {
          color: var(--on-dark);
          font-size: 18px;
          font-weight: 700;
          line-height: 1;
          text-transform: uppercase;
        }

        .chatbot-icon-button,
        .chatbot-toggle,
        .chatbot-form button {
          border: 1px solid var(--hairline);
          color: var(--on-dark);
          background: var(--surface-soft);
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s, color 0.2s, transform 0.2s;
        }

        .chatbot-icon-button {
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chatbot-icon-button:hover,
        .chatbot-form button:hover:not(:disabled) {
          border-color: var(--on-dark);
        }

        .chatbot-messages {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          overflow-y: auto;
        }

        .chatbot-row {
          display: flex;
        }

        .chatbot-row.user {
          justify-content: flex-end;
        }

        .chatbot-row.assistant {
          justify-content: flex-start;
        }

        .chatbot-bubble {
          max-width: 86%;
          padding: 11px 13px;
          border: 1px solid var(--hairline);
          color: var(--body);
          background: var(--surface-soft);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.55;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
        }

        .chatbot-row.user .chatbot-bubble {
          color: #fff;
          background: rgba(28, 105, 212, 0.24);
          border-color: rgba(28, 105, 212, 0.72);
        }

        .chatbot-bubble.loading {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
        }

        .chatbot-prompts {
          display: flex;
          gap: 8px;
          padding: 0 16px 12px;
          overflow-x: auto;
        }

        .chatbot-prompts button {
          flex: 0 0 auto;
          padding: 8px 10px;
          border: 1px solid var(--hairline);
          background: transparent;
          color: var(--muted);
          font-size: 11px;
          font-family: inherit;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
        }

        .chatbot-prompts button:hover {
          color: var(--on-dark);
          border-color: var(--on-dark);
        }

        .chatbot-error {
          padding: 0 16px 10px;
          color: #ff8a80;
          font-size: 11px;
          line-height: 1.4;
        }

        .chatbot-form {
          display: flex;
          gap: 8px;
          padding: 14px;
          border-top: 1px solid var(--hairline);
          background: rgba(0, 0, 0, 0.35);
        }

        .chatbot-form input {
          flex: 1;
          min-width: 0;
          border: 1px solid var(--hairline);
          background: var(--canvas);
          color: var(--on-dark);
          font-family: inherit;
          font-size: 13px;
          outline: none;
          padding: 12px;
        }

        .chatbot-form input::placeholder {
          color: var(--muted);
        }

        .chatbot-form input:focus {
          border-color: var(--m-blue-dark);
        }

        .chatbot-form button {
          width: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chatbot-form button:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .chatbot-toggle {
          height: 48px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 0 16px;
          background: rgba(13, 13, 13, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.4px;
          text-transform: uppercase;
        }

        .chatbot-toggle:hover {
          border-color: var(--on-dark);
          transform: translateY(-1px);
        }

        .chatbot-spinner {
          animation: chatbot-spin 0.9s linear infinite;
        }

        @keyframes chatbot-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 768px) {
          .chatbot-root {
            right: 16px;
            bottom: 88px;
            left: 16px;
            align-items: stretch;
          }

          .chatbot-panel {
            width: 100%;
            height: min(520px, calc(100svh - 172px));
          }

          .chatbot-toggle {
            align-self: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
