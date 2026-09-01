// Frontend-safe wrapper calling the server proxy endpoint (/api/gemini).
// Never imports GoogleGenerativeAI directly in client-side code, guaranteeing
// that GEMINI_API_KEY remains protected server-side.

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
  try {
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mode, prompt, lang }),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (err: any) {
    console.warn("Proxy call error, using client-side fallback:", err);

    // Resilient client-side fallback in case dev proxy is offline
    const lower = prompt.toLowerCase();
    if (lower.includes("aadhaar")) {
      return {
        text: "MYTH BUSTED: Aadhaar is voluntary and NOT required to complete Census 2027. You may complete both phases without providing an Aadhaar number or biometrics.",
        classification: "myth",
        source: "fallback",
      };
    }
    if (lower.includes("tax") || lower.includes("police")) {
      return {
        text: "MYTH BUSTED: Under Section 15 of the Census Act 1948, your individual answers are completely confidential and cannot be shared with tax authorities, police, or used as evidence in court.",
        classification: "myth",
        source: "fallback",
      };
    }
    if (lower.includes("not home") || lower.includes("away")) {
      return {
        text: "PROCEDURE: If you are away, the official surveyor leaves a notice with a return date. You can also self-enumerate online and simply present your Reference ID / QR code.",
        classification: "procedure",
        source: "fallback",
      };
    }

    return {
      text: "Census 2027 is India's first digital census. All citizen responses are strictly protected under Section 15 of the Census Act 1948 and DPDP Act 2023 for aggregate developmental planning.",
      classification: "info",
      source: "fallback",
    };
  }
}
