import { phases } from "../data/phases";
import { HouseIcon, PeopleIcon, AmenityIcon, GlobeIcon, CheckCircleIcon, AshokaChakraIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";

export default function Phases() {
  const { t } = useLanguage();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Header */}
      <div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
          <span className="badge-navy">
            <AshokaChakraIcon size={14} /> Census of India 2027 · Operational Blueprint
          </span>
        </div>
        <h2 style={{ margin: "0.2rem 0 0.5rem", fontSize: "var(--step-3)", color: "var(--color-ink)" }}>
          {t("nav_phases")}
        </h2>
        <p style={{ color: "var(--color-ink-soft)", maxWidth: "44rem", fontSize: "1.05rem", lineHeight: 1.55 }}>
          India's Digital Census 2027 is conducted in two distinct statutory stages to ensure complete national coverage and granular developmental planning.
        </p>
      </div>

      {/* Visual Two Phases Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))", gap: "2rem" }}>
        {phases.map((p, idx) => {
          const isPhase1 = p.id === "phase1";

          return (
            <article
              key={p.id}
              style={{
                background: "var(--color-paper-raised)",
                border: "1px solid var(--color-line)",
                borderTop: `4px solid ${isPhase1 ? "var(--color-accent)" : "var(--color-navy)"}`,
                borderRadius: "var(--radius-lg)",
                padding: "2rem",
                boxShadow: "var(--shadow-md)",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {/* Card Header with Monochromatic Icon Badge */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <span
                    style={{
                      width: "3.5rem",
                      height: "3.5rem",
                      borderRadius: "var(--radius)",
                      background: isPhase1 ? "var(--color-accent-soft)" : "var(--color-navy-soft)",
                      color: isPhase1 ? "var(--color-accent)" : "var(--color-navy)",
                      border: `1px solid ${isPhase1 ? "var(--color-accent-border)" : "var(--color-navy-border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {isPhase1 ? <HouseIcon size={28} /> : <PeopleIcon size={28} />}
                  </span>

                  <div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
                      Stage {idx + 1} of 2
                    </span>
                    <h3 style={{ margin: "0.15rem 0 0", fontSize: "1.35rem", color: "var(--color-ink)" }}>
                      {p.name}
                    </h3>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.2rem 0.6rem",
                    borderRadius: "20px",
                    background: "var(--color-paper-muted)",
                    color: "var(--color-ink)",
                    fontWeight: 700,
                  }}
                >
                  {isPhase1 ? "Housing Survey" : "Demographics"}
                </span>
              </div>

              {/* Window Banner */}
              <div
                style={{
                  background: "var(--color-paper)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "var(--radius)",
                  padding: "0.75rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  fontSize: "0.88rem",
                }}
              >
                <span style={{ color: isPhase1 ? "var(--color-accent)" : "var(--color-navy)", fontWeight: 700 }}>
                  📅 Survey Window:
                </span>
                <span style={{ fontWeight: 600, color: "var(--color-ink)" }}>
                  {p.windowStart} to {p.windowEnd}
                </span>
              </div>

              {/* Description */}
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-ink-soft)", lineHeight: 1.55 }}>
                {p.description}
              </p>

              {/* Collected Parameters Section with Visual Micro-Icons */}
              <div style={{ marginTop: "auto", borderTop: "1px solid var(--color-line)", paddingTop: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.75rem" }}>
                  {isPhase1 ? <AmenityIcon size={18} /> : <GlobeIcon size={18} />}
                  <h4 style={{ margin: 0, fontSize: "0.95rem", color: "var(--color-ink)" }}>
                    Key Parameters Recorded:
                  </h4>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem" }}>
                  {p.dataCollected.map((d) => (
                    <div
                      key={d}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "0.88rem",
                        color: "var(--color-ink)",
                        background: "var(--color-paper)",
                        padding: "0.45rem 0.75rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-line)",
                      }}
                    >
                      <CheckCircleIcon size={15} style={{ color: isPhase1 ? "var(--color-accent)" : "var(--color-navy)", flexShrink: 0 }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Operational Workflow Card */}
      <div
        style={{
          background: "var(--color-navy-soft)",
          border: "1px solid var(--color-navy-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h4 style={{ margin: 0, fontSize: "1.1rem", color: "var(--color-navy)" }}>
          Why is the Census conducted in Two Phases?
        </h4>
        <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--color-ink-soft)", lineHeight: 1.6 }}>
          <strong>Phase 1 (House Listing)</strong> creates a complete geographic and structural map of every residential structure and living quarter in India. This prevents duplication and ensures no citizen or slum settlement is left out when <strong>Phase 2 (Population Enumeration)</strong> counts individual demographics and socio-economic characteristics.
        </p>
      </div>
    </div>
  );
}
