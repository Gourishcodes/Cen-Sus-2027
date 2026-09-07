export interface FallbackItem {
  classification: "myth" | "fact" | "procedure" | "info";
  text: string;
}

export const CENSUS_FALLBACKS: Record<string, FallbackItem> = {
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

export const DEFAULT_FALLBACK: FallbackItem = {
  classification: "info",
  text: "Census 2027 is India's first digital census. All citizen responses are protected under Section 15 of the Census Act 1948 and DPDP Act 2023 for aggregate developmental planning and welfare allocation.",
};

export function getLocalFallback(prompt: string, _mode?: string): FallbackItem {
  const lower = (prompt || "").toLowerCase();
  if (lower.includes("aadhaar")) return CENSUS_FALLBACKS.aadhaar;
  if (lower.includes("tax") || lower.includes("income") || lower.includes("police")) return CENSUS_FALLBACKS.tax;
  if (lower.includes("not home") || lower.includes("away") || lower.includes("visit") || lower.includes("missed")) return CENSUS_FALLBACKS.not_home;
  if (lower.includes("after") || lower.includes("reference") || lower.includes("qr") || lower.includes("complete") || lower.includes("submit")) return CENSUS_FALLBACKS.self_enum;
  if (lower.includes("biometric") || lower.includes("fingerprint") || lower.includes("iris") || lower.includes("face")) return CENSUS_FALLBACKS.biometrics;
  if (lower.includes("nrc") || lower.includes("citizenship") || lower.includes("citizen")) return CENSUS_FALLBACKS.nrc;

  return DEFAULT_FALLBACK;
}
