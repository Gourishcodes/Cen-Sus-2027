// Server-side only (Cloud Function / Cloud Run). Never imported into /src.
// GEMINI_API_KEY is read from a plain server environment variable here —
// it is NOT prefixed with VITE_ and is never bundled into client code.

import { onRequest } from "firebase-functions/v2/https";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are the official AI Civic Assistant for India's Census 2027 (Office of the Registrar General & Census Commissioner, India).
Answer civic questions accurately, citing Section 15 of Census Act 1948 (confidentiality) and Digital Personal Data Protection Act safeguards.
`;

export const geminiProxy = onRequest({ cors: true }, async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { mode = "guidance", prompt = "", lang = "English" } = req.body || {};
  if (!prompt) {
    res.status(400).json({ error: "Prompt is required" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.json({
      text: "Census data is strictly confidential under Section 15 of the Census Act 1948 and used solely for national development.",
      classification: "info",
      source: "fallback",
    });
    return;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(`Mode: ${mode}\nLanguage: ${lang}\nInquiry: ${prompt}`);
    const text = result.response.text();

    res.json({
      text,
      mode,
      source: "gemini",
    });
  } catch (err: any) {
    res.status(500).json({ error: err?.message || "Failed to generate AI response" });
  }
});
