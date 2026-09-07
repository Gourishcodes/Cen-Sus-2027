import { getLocalFallback } from "../data/censusFallbacks";

export interface GeminiResponse {
  text: string;
  classification?: "myth" | "fact" | "procedure" | "info" | string;
  source?: "gemini" | "fallback";
  mode?: string;
}

export async function askGemini(
  mode: "guidance" | "translate" | "myth-check",
  prompt: string,
  lang: string = "English"
): Promise<GeminiResponse> {
  const trimmed = (prompt || "").trim();
  if (!trimmed) {
    return {
      text: "Please enter a question or query regarding Census 2027.",
      classification: "info",
      source: "fallback",
    };
  }

  // Client-side prompt length check
  if (trimmed.length > 500) {
    return {
      text: "Your inquiry is too long (maximum 500 characters). Please summarize your question.",
      classification: "info",
      source: "fallback",
    };
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode, prompt: trimmed, lang }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    clearTimeout(timeoutId);
    console.warn("Proxy call error, using client-side fallback:", err);

    const fallback = getLocalFallback(prompt, mode);
    return {
      text: fallback.text,
      classification: fallback.classification,
      source: "fallback",
      mode,
    };
  }
}

