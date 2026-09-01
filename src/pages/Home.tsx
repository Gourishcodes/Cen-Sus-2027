import { Link } from "react-router-dom";
import CivicRowIllustration from "../components/CivicRowIllustration";
import { DocumentIcon, CalendarIcon, PeopleIcon, ShieldIcon, ChartIcon, AshokaChakraIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";

export default function Home() {
  const { t } = useLanguage();

  const sections = [
    { to: "/phases", title: t("home_phases_title"), blurb: t("home_phases_desc"), Icon: DocumentIcon, badge: "Phase 1 & 2" },
    { to: "/schedule", title: t("home_schedule_title"), blurb: t("home_schedule_desc"), Icon: CalendarIcon, badge: "Interactive Map" },
    { to: "/self-enumeration", title: t("home_enum_title"), blurb: t("home_enum_desc"), Icon: PeopleIcon, badge: "Citizen Portal" },
    { to: "/privacy", title: t("home_privacy_title"), blurb: t("home_privacy_desc"), Icon: ShieldIcon, badge: "AI Verification" },
    { to: "/data", title: t("home_data_title"), blurb: t("home_data_desc"), Icon: ChartIcon, badge: "National Numbers" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
      {/* Hero Header Area */}
      <div style={{ textAlign: "center", maxWidth: "46rem", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
          <span className="badge-navy" style={{ padding: "0.3rem 0.8rem", fontSize: "0.8rem" }}>
            <AshokaChakraIcon size={16} /> Office of the Registrar General &amp; Census Commissioner, India
          </span>
        </div>

        <div style={{ maxWidth: "32rem", margin: "0.5rem auto 1.5rem" }}>
          <CivicRowIllustration />
        </div>

        <h2 style={{ fontSize: "var(--step-3)", color: "var(--color-ink)", marginBottom: "0.75rem", letterSpacing: "-0.03em" }}>
          India's First Digital Census
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.1rem",
            color: "var(--color-ink-soft)",
            lineHeight: 1.6,
            margin: "0 auto 1.5rem",
          }}
        >
          {t("home_tagline")}
        </p>

        {/* Quick Civic Metric Badges */}
        <div
          style={{
            display: "inline-flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "0.75rem 1.5rem",
            background: "var(--color-paper-raised)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--color-ink-soft)", fontWeight: 700 }}>National Scope</span>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-ink)" }}>1.4 Billion Citizens</div>
          </div>
          <div style={{ width: "1px", background: "var(--color-line)" }} />
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--color-ink-soft)", fontWeight: 700 }}>Digital Adoption</span>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-accent)" }}>Mobile &amp; Web Self-Enum</div>
          </div>
          <div style={{ width: "1px", background: "var(--color-line)" }} />
          <div style={{ textAlign: "left" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", color: "var(--color-ink-soft)", fontWeight: 700 }}>Legal Immunity</span>
            <div style={{ fontSize: "1.05rem", fontWeight: 800, color: "var(--color-success)" }}>Census Act 1948 (Sec 15)</div>
          </div>
        </div>
      </div>

      {/* Grid of Civic Action Cards */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h3 style={{ margin: 0, fontSize: "1.25rem", color: "var(--color-ink)" }}>Portal Directives &amp; Services</h3>
          <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>5 Key Modules</span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
            gap: "1.25rem",
          }}
        >
          {sections.map(({ to, title, blurb, Icon, badge }) => (
            <Link
              key={to}
              to={to}
              style={{
                textDecoration: "none",
                color: "var(--color-ink)",
                background: "var(--color-paper-raised)",
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-lg)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                boxShadow: "var(--shadow-sm)",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--color-navy)";
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "var(--shadow-md)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--color-line)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span
                  style={{
                    width: "2.75rem",
                    height: "2.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "var(--radius)",
                    background: "var(--color-navy-soft)",
                    color: "var(--color-navy)",
                    border: "1px solid var(--color-navy-border)",
                  }}
                >
                  <Icon size={22} />
                </span>
                <span style={{ fontSize: "0.72rem", padding: "0.15rem 0.5rem", borderRadius: "12px", background: "var(--color-paper-muted)", color: "var(--color-ink-soft)", fontWeight: 600 }}>
                  {badge}
                </span>
              </div>

              <div>
                <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", display: "block", color: "var(--color-ink)", marginBottom: "0.35rem" }}>
                  {title}
                </strong>
                <span style={{ color: "var(--color-ink-soft)", fontSize: "0.88rem", lineHeight: 1.45, display: "block" }}>
                  {blurb}
                </span>
              </div>

              <div style={{ marginTop: "auto", paddingTop: "0.5rem", display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.85rem", fontWeight: 700, color: "var(--color-accent)" }}>
                <span>Access Module</span>
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
