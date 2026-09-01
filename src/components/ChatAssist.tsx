import { useState, useRef, useEffect } from "react";
import { askGemini, GeminiResponse } from "../lib/geminiClient";
import { useLanguage } from "../context/LanguageContext";
import { ShieldIcon, PeopleIcon, CheckCircleIcon, LockIcon, DocumentIcon } from "./icons";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  classification?: string;
  source?: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  {
    label: "Is Aadhaar mandatory?",
    prompt: "Is sharing Aadhaar number mandatory for Census 2027?",
  },
  {
    label: "Will tax authorities see my data?",
    prompt: "Will census data be shared with the Income Tax Department or police?",
  },
  {
    label: "What if I'm not home during survey?",
    prompt: "What happens if I am not home when the census surveyor visits?",
  },
  {
    label: "What happens after self-enumeration?",
    prompt: "What happens after I complete self-enumeration online?",
  },
  {
    label: "Are biometrics collected?",
    prompt: "Are fingerprints or biometric scans collected in Phase 1 or Phase 2?",
  },
];

export default function ChatAssist() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "assistant",
      text: "Namaste! I am the Census 2027 AI Civic Assistant. I can help verify rumors, explain the legal protections under the Census Act 1948, or guide you through digital self-enumeration.",
      classification: "info",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof bottomRef.current?.scrollIntoView === "function") {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  async function handleSend(promptText: string) {
    const trimmed = promptText.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const mode = trimmed.toLowerCase().includes("myth") || trimmed.toLowerCase().includes("rumor") || trimmed.toLowerCase().includes("true") ? "myth-check" : "guidance";
      const response: GeminiResponse = await askGemini(mode, trimmed, lang);

      const aiMsg: Message = {
        id: `ai_${Date.now()}`,
        sender: "assistant",
        text: response.text,
        classification: response.classification,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai_err_${Date.now()}`,
          sender: "assistant",
          text: "Under Section 15 of the Census Act 1948, all census information is confidential and used exclusively for national statistics.",
          classification: "info",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function getBadge(classification?: string) {
    if (!classification) return null;
    switch (classification.toLowerCase()) {
      case "myth":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "var(--color-error-soft)",
              color: "var(--color-error)",
              border: "1px solid #fbd5d5",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            <ShieldIcon size={12} /> Myth Busted
          </span>
        );
      case "fact":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "var(--color-success-soft)",
              color: "var(--color-success)",
              border: "1px solid var(--color-success-border)",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            <CheckCircleIcon size={12} /> Verified Fact
          </span>
        );
      case "procedure":
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "var(--color-navy-soft)",
              color: "var(--color-navy)",
              border: "1px solid var(--color-navy-border)",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            <DocumentIcon size={12} /> Official Procedure
          </span>
        );
      default:
        return (
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.25rem",
              background: "var(--color-navy-soft)",
              color: "var(--color-navy)",
              border: "1px solid var(--color-navy-border)",
              padding: "0.15rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
            }}
          >
            <LockIcon size={12} /> Census Guide
          </span>
        );
    }
  }

  return (
    <section
      aria-label="Census 2027 AI Civic Assistant"
      style={{
        background: "var(--color-paper-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: "var(--radius-lg)",
        padding: "1.75rem",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
        <span
          style={{
            width: "2.75rem",
            height: "2.75rem",
            borderRadius: "var(--radius)",
            background: "var(--color-navy-soft)",
            color: "var(--color-navy)",
            border: "1px solid var(--color-navy-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          <ShieldIcon size={22} />
        </span>
        <div>
          <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-ink)" }}>{t("chat_title")}</h3>
          <p style={{ margin: "0.25rem 0 0", color: "var(--color-ink-soft)", fontSize: "0.9rem" }}>
            {t("chat_subtitle")}
          </p>
        </div>
      </div>

      {/* Quick question prompts */}
      <div>
        <span
          style={{
            display: "block",
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--color-ink-soft)",
            marginBottom: "0.5rem",
            fontWeight: 700,
          }}
        >
          {t("chat_suggested")}
        </span>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {QUICK_QUESTIONS.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => handleSend(q.prompt)}
              disabled={loading}
              style={{
                background: "var(--color-paper)",
                border: "1px solid var(--color-line)",
                color: "var(--color-ink)",
                padding: "0.4rem 0.85rem",
                borderRadius: "20px",
                fontSize: "0.82rem",
                cursor: "pointer",
                fontFamily: "var(--font-display)",
                fontWeight: 600,
                textAlign: "left",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-navy)";
                e.currentTarget.style.background = "var(--color-navy-soft)";
                e.currentTarget.style.color = "var(--color-navy)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-line)";
                e.currentTarget.style.background = "var(--color-paper)";
                e.currentTarget.style.color = "var(--color-ink)";
              }}
            >
              {q.label} →
            </button>
          ))}
        </div>
      </div>

      {/* Message log */}
      <div
        role="log"
        aria-live="polite"
        style={{
          border: "1px solid var(--color-line)",
          borderRadius: "var(--radius)",
          background: "var(--color-paper)",
          padding: "1.25rem",
          minHeight: "15rem",
          maxHeight: "24rem",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: m.sender === "user" ? "flex-end" : "flex-start",
              maxWidth: "88%",
              background: m.sender === "user" ? "var(--color-navy-soft)" : "var(--color-paper-raised)",
              border: `1px solid ${m.sender === "user" ? "var(--color-navy-border)" : "var(--color-line)"}`,
              borderRadius: "var(--radius)",
              padding: "0.85rem 1.15rem",
              gap: "0.4rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
                {m.sender === "assistant" ? (
                  <>
                    <ShieldIcon size={15} style={{ color: "var(--color-navy)" }} />
                    <strong style={{ fontSize: "0.8rem", color: "var(--color-navy)" }}>Census AI Guide</strong>
                    {getBadge(m.classification)}
                  </>
                ) : (
                  <>
                    <PeopleIcon size={15} style={{ color: "var(--color-accent)" }} />
                    <strong style={{ fontSize: "0.8rem", color: "var(--color-ink)" }}>You</strong>
                  </>
                )}
              </div>
              <span style={{ fontSize: "0.7rem", color: "var(--color-ink-soft)" }}>{m.timestamp}</span>
            </div>
            <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.5, whiteSpace: "pre-line", color: "var(--color-ink)" }}>
              {m.text}
            </p>
          </div>
        ))}

        {loading && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.65rem 1rem",
              background: "var(--color-navy-soft)",
              border: "1px solid var(--color-navy-border)",
              borderRadius: "var(--radius)",
              fontSize: "0.85rem",
              color: "var(--color-navy)",
              fontWeight: 600,
              maxWidth: "22rem",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <span style={{ display: "inline-flex", gap: "3px", alignItems: "center" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-navy)", opacity: 0.8 }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-accent)", opacity: 0.8 }} />
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--color-success)", opacity: 0.8 }} />
            </span>
            <span>Consulting Census Act &amp; AI Knowledgebase…</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        style={{ display: "flex", gap: "0.5rem" }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t("chat_placeholder")}
          aria-label="Ask a question about Census 2027"
          disabled={loading}
          style={{
            flex: 1,
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--color-line)",
            background: "var(--color-paper)",
            fontSize: "0.92rem",
            fontFamily: "var(--font-body)",
            color: "var(--color-ink)",
          }}
        />
        <button
          type="submit"
          className="btn"
          disabled={loading || !input.trim()}
          style={{ padding: "0.75rem 1.4rem", whiteSpace: "nowrap" }}
        >
          {loading ? "Verifying…" : t("chat_send")}
        </button>
      </form>
    </section>
  );
}
