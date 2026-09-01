import { useState } from "react";
import { Link } from "react-router-dom";
import { states } from "../data/states";
import IndiaMap from "../components/IndiaMap";
import { GlobeIcon, CalendarIcon, CheckCircleIcon, DocumentIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";

export default function StateSchedulePage() {
  const { t } = useLanguage();
  const [selectedStateCode, setSelectedStateCode] = useState<string>("MH");
  const [filter, setFilter] = useState<"all" | "active" | "upcoming">("all");

  const selectedState = states.find((s) => s.stateCode === selectedStateCode) || states[0];

  const filteredStates = states.filter((s) => {
    if (filter === "all") return true;
    const isActive = s.stateCode === "MH" || s.stateCode === "TN" || s.stateCode === "KA";
    return filter === "active" ? isActive : !isActive;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Top Banner & Heading */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
          <span className="badge-navy">Official Gazette · Notification No. C-2027/SCH</span>
        </div>
        <h2 style={{ margin: "0.25rem 0 0.5rem", fontSize: "var(--step-3)", color: "var(--color-ink)" }}>
          {t("nav_schedule")}
        </h2>
        <p style={{ color: "var(--color-ink-soft)", maxWidth: "46rem", fontSize: "1.05rem", lineHeight: 1.5 }}>
          Explore self-enumeration and field survey timelines across India. Click any state on the interactive map or choose from the schedule dossier below.
        </p>
      </div>

      {/* Filter and State Jump Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        {/* Filter Buttons */}
        <div role="group" aria-label="Filter state schedules" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => setFilter("all")}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "20px",
              border: "1px solid var(--color-line)",
              background: filter === "all" ? "var(--color-ink)" : "var(--color-paper-raised)",
              color: filter === "all" ? "#ffffff" : "var(--color-ink)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            All States ({states.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("active")}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "20px",
              border: "1px solid var(--color-success-border)",
              background: filter === "active" ? "var(--color-success)" : "var(--color-success-soft)",
              color: filter === "active" ? "#ffffff" : "var(--color-success)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🟢 Active Self-Enum (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter("upcoming")}
            style={{
              padding: "0.4rem 0.9rem",
              borderRadius: "20px",
              border: "1px solid var(--color-accent-border)",
              background: filter === "upcoming" ? "var(--color-accent)" : "var(--color-accent-soft)",
              color: filter === "upcoming" ? "#ffffff" : "var(--color-accent)",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            🟠 Upcoming Windows (2)
          </button>
        </div>

        {/* Quick Dropdown Select */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="state-quick-select" style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)", fontWeight: 500 }}>
            Jump to State:
          </label>
          <select
            id="state-quick-select"
            value={selectedStateCode}
            onChange={(e) => setSelectedStateCode(e.target.value)}
            style={{
              padding: "0.4rem 0.75rem",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--color-line)",
              background: "var(--color-paper-raised)",
              fontFamily: "var(--font-display)",
              fontSize: "0.85rem",
              color: "var(--color-ink)",
              fontWeight: 600,
            }}
          >
            {states.map((s) => (
              <option key={s.stateCode} value={s.stateCode}>
                {s.stateName} ({s.stateCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Dual-Column Graphical Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(22rem, 1fr))",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left Column: Interactive India Map */}
        <div>
          <IndiaMap
            statesData={states}
            selectedStateCode={selectedStateCode}
            onSelectState={(code) => setSelectedStateCode(code)}
          />
        </div>

        {/* Right Column: Selected State Dossier & Schedule List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Active State Detailed Inspection Dossier */}
          {selectedState && (
            <div
              style={{
                background: "var(--color-paper-raised)",
                border: "2px solid var(--color-navy)",
                borderRadius: "var(--radius-lg)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-md)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle Saffron Top Accent */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: "var(--color-accent)" }} />

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div>
                  <span className="badge-navy" style={{ marginBottom: "0.4rem" }}>
                    Selected Jurisdiction
                  </span>
                  <h3 style={{ margin: "0.2rem 0 0", fontSize: "1.6rem", color: "var(--color-ink)" }}>
                    {selectedState.stateName}
                  </h3>
                </div>
                <span
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "50%",
                    background: "var(--color-navy-soft)",
                    color: "var(--color-navy)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "1.2rem",
                    border: "1px solid var(--color-navy-border)",
                  }}
                >
                  {selectedState.stateCode}
                </span>
              </div>

              {/* Window Status Badge */}
              <div style={{ marginBottom: "1.25rem" }}>
                {selectedState.stateCode === "MH" || selectedState.stateCode === "TN" || selectedState.stateCode === "KA" ? (
                  <span className="badge-active">
                    <CheckCircleIcon size={14} /> Self-Enumeration Window is OPEN
                  </span>
                ) : (
                  <span className="badge-upcoming">
                    <CalendarIcon size={14} /> Window Opens Soon
                  </span>
                )}
              </div>

              {/* Schedule Details Grid */}
              <div style={{ display: "grid", gap: "0.85rem", background: "var(--color-paper)", padding: "1.25rem", borderRadius: "var(--radius)", border: "1px solid var(--color-line)", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <CalendarIcon size={16} />
                    <strong>Self-Enumeration Window:</strong>
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--color-accent)" }}>
                    {selectedState.selfEnumerationWindow.start} – {selectedState.selfEnumerationWindow.end}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <DocumentIcon size={16} />
                    <span>Phase 1 (Housing Census):</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {selectedState.phase1.start} – {selectedState.phase1.end}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <DocumentIcon size={16} />
                    <span>Phase 2 (Population Enum):</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>
                    {selectedState.phase2.start} – {selectedState.phase2.end}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.9rem", borderTop: "1px dashed var(--color-line)", paddingTop: "0.6rem" }}>
                  <span style={{ color: "var(--color-ink-soft)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <GlobeIcon size={16} />
                    <span>Supported Official Languages:</span>
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--color-navy)" }}>
                    {selectedState.languagesAvailable.join(", ").toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Direct CTA */}
              <Link
                to="/self-enumeration"
                className="btn"
                style={{ width: "100%", textDecoration: "none", padding: "0.85rem" }}
              >
                Self-Enumerate for {selectedState.stateName} →
              </Link>
            </div>
          )}

          {/* List of All State Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <h4 style={{ margin: "0.5rem 0 0.25rem", color: "var(--color-ink)", fontSize: "1rem" }}>
              All Monitored State Jurisdictions ({filteredStates.length})
            </h4>

            {filteredStates.map((s) => {
              const isSelected = selectedStateCode === s.stateCode;
              const isActive = s.stateCode === "MH" || s.stateCode === "TN" || s.stateCode === "KA";

              return (
                <article
                  key={s.stateCode}
                  onClick={() => setSelectedStateCode(s.stateCode)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "1rem",
                    alignItems: "center",
                    background: isSelected ? "var(--color-navy-soft)" : "var(--color-paper-raised)",
                    border: `1.5px solid ${isSelected ? "var(--color-navy)" : "var(--color-line)"}`,
                    borderRadius: "var(--radius)",
                    padding: "1rem 1.25rem",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                  }}
                >
                  <span
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                      borderRadius: "50%",
                      background: isSelected ? "var(--color-navy)" : "var(--color-paper)",
                      color: isSelected ? "#ffffff" : "var(--color-ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                      border: "1px solid var(--color-line)",
                    }}
                    aria-hidden="true"
                  >
                    {s.stateCode}
                  </span>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <strong style={{ fontSize: "1.05rem", color: "var(--color-ink)" }}>{s.stateName}</strong>
                      {isActive ? (
                        <span className="badge-active" style={{ fontSize: "0.7rem", padding: "0.1rem 0.4rem" }}>
                          Active
                        </span>
                      ) : (
                        <span className="badge-upcoming" style={{ fontSize: "0.7rem", padding: "0.1rem 0.4rem" }}>
                          Upcoming
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>
                      Self-Enum: {s.selfEnumerationWindow.start} – {s.selfEnumerationWindow.end}
                    </span>
                  </div>

                  <span style={{ color: isSelected ? "var(--color-navy)" : "var(--color-ink-subtle)", fontSize: "1.2rem", fontWeight: 700 }}>
                    →
                  </span>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
