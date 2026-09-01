import { useState } from "react";
import ChatAssist from "../components/ChatAssist";
import { ShieldIcon, DocumentIcon, LockIcon, AshokaChakraIcon, CheckCircleIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";

const MYTH_FACTS = [
  {
    id: "mf1",
    myth: "Census 2027 is linked to NRC or can revoke citizenship.",
    fact: "The Census is conducted strictly under the Census Act 1948 for socio-economic planning and resource allocation. It is completely independent of citizenship verification or national registers.",
    category: "Legal Scope",
    statute: "Census Act 1948, Section 3",
  },
  {
    id: "mf2",
    myth: "Sharing my Aadhaar number or bank details is mandatory.",
    fact: "Aadhaar sharing is strictly voluntary. No bank details, credit card numbers, passwords, or OTPs are ever requested in Phase 1 or Phase 2.",
    category: "Data Collection",
    statute: "Census 2027 Directive §4.2",
  },
  {
    id: "mf3",
    myth: "Census responses will be shared with the Income Tax Department or police.",
    fact: "Section 15 of the Census Act 1948 provides absolute immunity: individual records are confidential and cannot even be subpoenaed by a court of law as evidence.",
    category: "Privacy & Law",
    statute: "Section 15 (Confidentiality)",
  },
  {
    id: "mf4",
    myth: "If I make a typo in online self-enumeration, I face legal penalties.",
    fact: "Self-enumeration gives you a Reference QR code. When the official enumerator visits your residence, you can review and correct any entry together before final sign-off.",
    category: "Self-Enumeration",
    statute: "Rule 11 (Correction Window)",
  },
  {
    id: "mf5",
    myth: "Biometric scans (fingerprints/iris) are taken during household visits.",
    fact: "No biometrics whatsoever are recorded during Census 2027. Surveyors only note housing amenities and demographic responses on their official handheld device.",
    category: "Survey Verification",
    statute: "Zero-Biometric Mandate",
  },
];

export default function PrivacyAndMyths() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Legal Scope", "Data Collection", "Privacy & Law", "Self-Enumeration", "Survey Verification"];

  const filteredMyths = activeCategory === "All"
    ? MYTH_FACTS
    : MYTH_FACTS.filter((m) => m.category === activeCategory);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Top Banner / Heading */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <span className="badge-navy">
            <AshokaChakraIcon size={14} /> Official Statutory Confidentiality Shield
          </span>
        </div>
        <h2 style={{ margin: "0.2rem 0 0.5rem", fontSize: "var(--step-3)", color: "var(--color-ink)" }}>
          {t("privacy_heading")}
        </h2>
        <p style={{ color: "var(--color-ink-soft)", maxWidth: "46rem", fontSize: "1.05rem", lineHeight: 1.55 }}>
          {t("privacy_subheading")}
        </p>
      </div>

      {/* Statutory Legal Protection Notice — High Visual Gravitas */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-navy) 0%, #0d2040 100%)",
          color: "#ffffff",
          borderRadius: "var(--radius-lg)",
          padding: "2rem",
          boxShadow: "var(--shadow-md)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ashok Chakra watermark */}
        <div style={{ position: "absolute", right: "-30px", top: "-30px", opacity: 0.08, pointerEvents: "none" }}>
          <AshokaChakraIcon size={260} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
          <ShieldIcon size={24} style={{ color: "var(--color-accent)" }} />
          <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#ffffff" }}>
            {t("legal_title")}
          </h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))", gap: "1.5rem", position: "relative", zIndex: 1 }}>
          <div style={{ background: "rgba(255,255,255,0.06)", padding: "1.25rem", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#68d391", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>
              <LockIcon size={16} /> Statutory Confidentiality (Section 15)
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.5 }}>
              {t("legal_p1")} Individual census responses cannot be used as evidence in courts of law or accessed by tax/police departments.
            </p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.06)", padding: "1.25rem", borderRadius: "var(--radius)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#fbd38d", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>
              <DocumentIcon size={16} /> 256-Bit Sovereign Architecture
            </div>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.5 }}>
              {t("legal_p2")} All records are encrypted in transit and securely aggregated at the National Data Centre without intermediate commercial storage.
            </p>
          </div>
        </div>
      </div>

      {/* Embedded AI Myth-Buster & Guide Widget */}
      <ChatAssist />

      {/* Myth vs. Fact Ledger Section */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.35rem", color: "var(--color-ink)" }}>
              Public Misconceptions vs. Verified Facts
            </h3>
            <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
              Official clarifications backed by statutory mandates
            </span>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "0.3rem 0.75rem",
                  borderRadius: "20px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  border: `1px solid ${activeCategory === cat ? "var(--color-navy)" : "var(--color-line)"}`,
                  background: activeCategory === cat ? "var(--color-navy)" : "var(--color-paper-raised)",
                  color: activeCategory === cat ? "#ffffff" : "var(--color-ink)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Side-by-Side Comparison Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
          {filteredMyths.map((item) => (
            <div
              key={item.id}
              style={{
                background: "var(--color-paper-raised)",
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-lg)",
                boxShadow: "var(--shadow-sm)",
                padding: "1.5rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(18rem, 1fr))",
                gap: "1.5rem",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Left Column: The Public Myth */}
              <div
                style={{
                  background: "var(--color-error-soft)",
                  border: "1px solid #fbd5d5",
                  borderRadius: "var(--radius)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      background: "var(--color-error)",
                      color: "#ffffff",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ❌ Common Myth
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "#9b1c1c", fontWeight: 600 }}>{item.category}</span>
                </div>
                <p style={{ margin: "0.25rem 0 0", fontWeight: 600, fontSize: "0.98rem", color: "#771d1d", lineHeight: 1.45 }}>
                  "{item.myth}"
                </p>
              </div>

              {/* Right Column: Verified Reality */}
              <div
                style={{
                  background: "var(--color-success-soft)",
                  border: "1px solid var(--color-success-border)",
                  borderRadius: "var(--radius)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      background: "var(--color-success)",
                      color: "#ffffff",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "4px",
                      fontSize: "0.72rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                    }}
                  >
                    <CheckCircleIcon size={13} /> Verified Reality
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-success)", fontWeight: 700 }}>
                    {item.statute}
                  </span>
                </div>
                <p style={{ margin: "0.25rem 0 0", fontSize: "0.92rem", color: "#065f46", lineHeight: 1.5 }}>
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Field Verification Notice */}
      <div
        style={{
          border: "1px solid var(--color-navy-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          background: "var(--color-navy-soft)",
          display: "flex",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <span
          style={{
            width: "2.5rem",
            height: "2.5rem",
            borderRadius: "50%",
            background: "var(--color-navy)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <LockIcon size={18} />
        </span>
        <div>
          <h4 style={{ margin: "0 0 0.35rem", fontSize: "1rem", color: "var(--color-navy)" }}>
            How to Verify Official Census Field Enumerators
          </h4>
          <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.88rem", color: "var(--color-ink-soft)", lineHeight: 1.55 }}>
            <li>Official enumerators carry an authorized government photo ID card with a verifiable QR seal.</li>
            <li>They will <strong>never</strong> ask for bank account details, credit card numbers, OTPs, or passwords.</li>
            <li>If you have self-enumerated online, simply show your Reference Slip or QR code for instant zero-touch verification.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
