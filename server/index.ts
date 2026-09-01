import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config({ path: ".env.local" });
dotenv.config();

const app = express();
const port = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;

if (apiKey && apiKey !== "your_api_key_here") {
  genAI = new GoogleGenerativeAI(apiKey);
} else {
  console.warn("⚠️ GEMINI_API_KEY is not set or placeholder. Operating in fallback mode.");
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

const LOCAL_FALLBACKS: Record<string, { classification: string; text: string }> = {
  aadhaar: {
    classification: "myth",
    text: "MYTH BUSTED: Sharing your Aadhaar number is voluntary and NOT mandatory for Census 2027. You can complete both Phase 1 and Phase 2 without providing Aadhaar or any biometric information.",
  },
  tax: {
    classification: "myth",
    text: "MYTH BUSTED: Census data cannot be shared with the Income Tax Department or any other authority. Section 15 of the Census Act 1948 strictly prohibits the use of individual census records for tax assessment or judicial proceedings.",
  },
  not_home: {
    classification: "procedure",
    text: "PROCEDURE: If you are not home when the enumerator visits, they will leave an official Census Notice slip with their contact number and visit schedule. You can also self-enumerate online and simply share your Reference ID when they return.",
  },
  self_enum: {
    classification: "procedure",
    text: "PROCEDURE: After submitting your self-enumeration online, you will receive a unique Reference ID and a digital QR code. Keep this safe; when the enumerator visits your doorstep, they will scan this QR code to verify your household without asking all the questions again.",
  },
  biometrics: {
    classification: "myth",
    text: "MYTH BUSTED: No biometrics (such as fingerprints, iris scans, or facial recognition) are collected in either Phase 1 or Phase 2 of Census 2027. The census records only demographic and housing statistics.",
  },
  nrc: {
    classification: "myth",
    text: "MYTH BUSTED: Census 2027 is conducted solely under the Census Act 1948 for statistical and developmental planning. Individual census records are completely separate from citizenship verification processes.",
  },
};

function getLocalFallback(prompt: string, _mode: string): { classification: string; text: string } {
  const lower = prompt.toLowerCase();
  if (lower.includes("aadhaar")) return LOCAL_FALLBACKS.aadhaar;
  if (lower.includes("tax") || lower.includes("income") || lower.includes("police")) return LOCAL_FALLBACKS.tax;
  if (lower.includes("not home") || lower.includes("away") || lower.includes("visit")) return LOCAL_FALLBACKS.not_home;
  if (lower.includes("after") || lower.includes("reference") || lower.includes("qr") || lower.includes("complete")) return LOCAL_FALLBACKS.self_enum;
  if (lower.includes("biometric") || lower.includes("fingerprint") || lower.includes("iris")) return LOCAL_FALLBACKS.biometrics;
  if (lower.includes("nrc") || lower.includes("citizenship")) return LOCAL_FALLBACKS.nrc;

  return {
    classification: "info",
    text: "Census 2027 is India's first digital census. All citizen responses are protected under Section 15 of the Census Act 1948 and used solely for national statistical planning and welfare allocation.",
  };
}

app.post("/api/gemini", async (req, res) => {
  try {
    const { mode = "guidance", prompt = "", lang = "English" } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "A valid prompt string is required." });
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

    // Call Gemini API using gemini-1.5-flash
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const fullPrompt = `Mode: ${mode}\nTarget Language: ${lang}\nUser Inquiry: ${prompt}\n\nProvide an authoritative, clear, and reassuring response.`;
    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

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
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", geminiConfigured: !!genAI, timestamp: new Date().toISOString() });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`🏛️ Census 2027 Gemini Proxy listening on http://127.0.0.1:${port}`);
});

