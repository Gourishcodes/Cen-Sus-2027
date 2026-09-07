export default async function handler(_req: any, res: any) {
  const apiKey = process.env.GEMINI_API_KEY;
  res.status(200).json({
    status: "ok",
    geminiConfigured: !!(apiKey && apiKey !== "your_api_key_here"),
    timestamp: new Date().toISOString(),
  });
}
