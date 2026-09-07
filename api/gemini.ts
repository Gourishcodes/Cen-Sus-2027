import { GoogleGenerativeAI } from "@google/generative-ai";
import { getLocalFallback } from "../src/data/censusFallbacks";

const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey && apiKey !== "your_api_key_here") {
  genAI = new GoogleGenerativeAI(apiKey);
}

const SYSTEM_PROMPT = `
You are the official, authoritative, and helpful AI Civic Assistant for India's Census 2027 (Office of the Registrar General & Census Commissioner, India).
Your tone is respectful, clear, objective, civic, and reassuring.

Key Facts to adhere to:
1. Legal Safeguards: Under Section 15 of the Census Act 1948, all individual census data is strictly confidential. It cannot be used as evidence in a court of law and is never shared with police, tax departments, or other enforcement agencies.
2. DPDP Act Compliance: The digital census uses end-to-end encryption and anonymization for aggregated policy planning.
3. Two Phases:
   - Phase 1: House Listing and Housing Census (amenities, asset ownership, housing condition).
   - Phase 2: Population Enumeration (demographics, religion, language, literacy, occupation, migration).
4. Self-Enumeration: Citizens can self-enumerate online via mobile app/web portal. Upon completion, a Reference ID and QR code is issued. When the official enumerator visits, citizens simply show this QR code/ID for fast verification.
5. Misconceptions:
   - Aadhaar is NOT mandatory for census.
   - Census data does NOT impact citizenship status or NRC.
   - No bank details, passwords, or biometrics (fingerprints/iris) are ever collected.

When answering:
- If asked about a misconception or myth, clearly identify whether it is a MYTH or a FACT, cite the relevant safeguard (e.g., Census Act 1948 Section 15), and give the clear truth.
- Keep responses concise (2 to 4 sentences or a short bulleted list).
- Respond in the user's requested language if specified.
`;

// In-memory rate limiting per IP: 10 requests / minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  record.count += 1;
  return false;
}

export default async function handler(req: any, res: any) {
  // CORS configuration
  const origin = req.headers?.origin || "";
  const host = req.headers?.host || "";
  const isAllowedOrigin =
    !origin ||
    origin.includes("localhost") ||
    origin.includes("127.0.0.1") ||
    origin.endsWith(".vercel.app") ||
    (host && origin.includes(host));

  if (isAllowedOrigin && origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  // Basic IP-based rate limiting
  const forwarded = req.headers?.["x-forwarded-for"];
  const clientIp = typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.socket?.remoteAddress || "unknown";

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      error: "Too many requests. Please wait a moment before sending another query.",
      source: "fallback",
    });
  }

  try {
    const { mode = "guidance", prompt = "", lang = "English" } = req.body || {};

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "A valid prompt string is required." });
    }

    if (prompt.length > 500) {
      return res.status(400).json({ error: "Prompt exceeds maximum allowed length of 500 characters." });
    }

    if (!genAI) {
      const fallback = getLocalFallback(prompt, mode);
      return res.json({
        text: fallback.text,
        classification: fallback.classification,
        mode,
        source: "fallback",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const fullPrompt = `Mode: ${mode}\nTarget Language: ${lang}\nUser Inquiry: ${prompt}\n\nProvide an authoritative, clear, and reassuring response.`;
    const result = await model.generateContent(fullPrompt);
    const text = result?.response?.text ? result.response.text().trim() : "";

    // If response text is empty or blank, fall back gracefully
    if (!text) {
      const fallback = getLocalFallback(prompt, mode);
      return res.json({
        text: fallback.text,
        classification: fallback.classification,
        mode,
        source: "fallback",
      });
    }

    let classification = "info";
    const lowerText = text.toLowerCase();
    if (lowerText.includes("myth")) classification = "myth";
    else if (lowerText.includes("fact")) classification = "fact";
    else if (lowerText.includes("procedure") || lowerText.includes("step")) classification = "procedure";

    return res.json({
      text,
      classification,
      mode,
      source: "gemini",
    });
  } catch (err: any) {
    console.error("Gemini API error, using fallback:", err?.message || err);
    const fallback = getLocalFallback(req.body?.prompt || "", req.body?.mode || "guidance");
    return res.json({
      text: fallback.text,
      classification: fallback.classification,
      mode: req.body?.mode || "guidance",
      source: "fallback",
    });
  }
}
