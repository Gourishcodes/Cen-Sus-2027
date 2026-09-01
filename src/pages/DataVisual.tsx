import { useState, useMemo } from "react";
import { STATE_PROGRESS_DATA, StateCensusProgress } from "../data/censusStats";
import { ChartIcon } from "../components/icons";
import { useLanguage } from "../context/LanguageContext";

export default function DataVisual() {
  const { t } = useLanguage();
  const [sortBy, setSortBy] = useState<"digital" | "households" | "name">("digital");
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");

  const totalHouseholds = useMemo(
    () => STATE_PROGRESS_DATA.reduce((acc, s) => acc + s.totalHouseholdsMillion, 0).toFixed(1),
    []
  );

  const avgDigitalAdoption = useMemo(() => {
    const totalDigital = STATE_PROGRESS_DATA.reduce(
      (acc, s) => acc + s.totalHouseholdsMillion * (s.digitalSelfEnumPercent / 100),
      0
    );
    const totalHH = STATE_PROGRESS_DATA.reduce((acc, s) => acc + s.totalHouseholdsMillion, 0);
    return Math.round((totalDigital / totalHH) * 100);
  }, []);

  const sortedData = useMemo(() => {
    return [...STATE_PROGRESS_DATA].sort((a, b) => {
      if (sortBy === "digital") return b.digitalSelfEnumPercent - a.digitalSelfEnumPercent;
      if (sortBy === "households") return b.totalHouseholdsMillion - a.totalHouseholdsMillion;
      return a.stateName.localeCompare(b.stateName);
    });
  }, [sortBy]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Page Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
          <span
            style={{
              width: "2.75rem",
              height: "2.75rem",
              borderRadius: "50%",
              background: "var(--color-accent-soft)",
              color: "var(--color-accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-hidden="true"
          >
            <ChartIcon size={24} />
          </span>
          <h2 style={{ margin: 0 }}>{t("nav_data")}</h2>
        </div>
        <p style={{ color: "var(--color-ink-soft)", maxWidth: "42rem", fontSize: "1.05rem", lineHeight: 1.5 }}>
          Real-time simulation of digital self-enumeration and field survey coverage across representative states for Phase 2 readiness.
        </p>
      </div>

      {/* Summary Civic Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(14rem, 1fr))",
          gap: "1.25rem",
        }}
      >
        <div
          style={{
            background: "var(--color-paper-raised)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
            e.currentTarget.style.borderColor = "var(--color-navy-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.borderColor = "var(--color-line)";
          }}
        >
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
            Sample Scope
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, margin: "0.35rem 0", color: "var(--color-ink)" }}>
            {totalHouseholds} M
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Projected Households</span>
        </div>

        <div
          style={{
            background: "var(--color-paper-raised)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
            e.currentTarget.style.borderColor = "var(--color-accent-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.borderColor = "var(--color-line)";
          }}
        >
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
            Digital Adoption Rate
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, margin: "0.35rem 0", color: "var(--color-accent)" }}>
            {avgDigitalAdoption}%
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Completed via Self-Enumeration</span>
        </div>

        <div
          style={{
            background: "var(--color-paper-raised)",
            border: "1px solid var(--color-line)",
            borderRadius: "var(--radius-lg)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-sm)",
            transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "var(--shadow-md)";
            e.currentTarget.style.borderColor = "var(--color-success-border)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "var(--shadow-sm)";
            e.currentTarget.style.borderColor = "var(--color-line)";
          }}
        >
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
            Field Verification
          </span>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", fontWeight: 800, margin: "0.35rem 0", color: "var(--color-success)" }}>
            38%
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Enumerator QR Validations</span>
        </div>
      </div>

      {/* Control Bar: Sorting & View Switcher */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          paddingBottom: "0.5rem",
          borderBottom: "1px solid var(--color-line)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <label htmlFor="sort-select" style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: "0.35rem 0.65rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-line)",
              background: "var(--color-paper)",
              fontSize: "0.85rem",
              fontFamily: "var(--font-body)",
            }}
          >
            <option value="digital">Digital Self-Enum % (High to Low)</option>
            <option value="households">Total Households (Large to Small)</option>
            <option value="name">State Name (A to Z)</option>
          </select>
        </div>

        {/* Legend */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", fontSize: "0.82rem" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "0.85rem", height: "0.85rem", background: "var(--color-accent)", borderRadius: "2px" }} />
            Digital Self-Enum
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "0.85rem", height: "0.85rem", background: "var(--color-ink-soft)", borderRadius: "2px" }} />
            Field Surveyor
          </span>
          <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "0.85rem", height: "0.85rem", background: "var(--color-line)", borderRadius: "2px" }} />
            Pending
          </span>
        </div>

        {/* Accessible View Toggle */}
        <div role="group" aria-label="View representation mode" style={{ display: "flex", gap: "0.35rem" }}>
          <button
            type="button"
            onClick={() => setViewMode("chart")}
            style={{
              padding: "0.35rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-line)",
              background: viewMode === "chart" ? "var(--color-ink)" : "var(--color-paper)",
              color: viewMode === "chart" ? "var(--color-paper)" : "var(--color-ink)",
              cursor: "pointer",
            }}
          >
            Ledger Bars
          </button>
          <button
            type="button"
            onClick={() => setViewMode("table")}
            style={{
              padding: "0.35rem 0.75rem",
              fontSize: "0.8rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--color-line)",
              background: viewMode === "table" ? "var(--color-ink)" : "var(--color-paper)",
              color: viewMode === "table" ? "var(--color-paper)" : "var(--color-ink)",
              cursor: "pointer",
            }}
          >
            Accessible Table
          </button>
        </div>
      </div>

      {/* Main Chart Representation */}
      {viewMode === "chart" ? (
        <div
          role="region"
          aria-label="State-wise enumeration progress chart"
          style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
        >
          {sortedData.map((item: StateCensusProgress) => {
            const pending = Math.max(0, 100 - item.digitalSelfEnumPercent - item.fieldSurveyPercent);
            return (
              <div
                key={item.stateCode}
                style={{
                  background: "var(--color-paper-raised)",
                  border: "1px solid var(--color-line)",
                  borderRadius: "var(--radius-lg)",
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-navy-border)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-line)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span
                      style={{
                        padding: "0.15rem 0.45rem",
                        background: "var(--color-accent-soft)",
                        color: "var(--color-accent)",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        borderRadius: "3px",
                      }}
                    >
                      {item.stateCode}
                    </span>
                    <strong style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                      {item.stateName}
                    </strong>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
                    {item.totalHouseholdsMillion}M Households · <strong>{item.digitalSelfEnumPercent}% Digital</strong>
                  </span>
                </div>

                {/* Progress bar container */}
                <div
                  role="progressbar"
                  aria-valuenow={item.digitalSelfEnumPercent + item.fieldSurveyPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.stateName} enumeration progress`}
                  style={{
                    height: "1.4rem",
                    width: "100%",
                    background: "var(--color-line)",
                    borderRadius: "4px",
                    display: "flex",
                    overflow: "hidden",
                  }}
                >
                  <div
                    title={`Digital Self-Enum: ${item.digitalSelfEnumPercent}%`}
                    style={{
                      width: `${item.digitalSelfEnumPercent}%`,
                      background: "var(--color-accent)",
                      height: "100%",
                      transition: "width 0.4s ease",
                    }}
                  />
                  <div
                    title={`Field Survey: ${item.fieldSurveyPercent}%`}
                    style={{
                      width: `${item.fieldSurveyPercent}%`,
                      background: "var(--color-ink-soft)",
                      height: "100%",
                      transition: "width 0.4s ease",
                    }}
                  />
                  <div
                    title={`Pending: ${pending}%`}
                    style={{
                      width: `${pending}%`,
                      background: "transparent",
                      height: "100%",
                    }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--color-ink-soft)" }}>
                  <span>Digital: {item.digitalSelfEnumPercent}%</span>
                  <span>Field Survey: {item.fieldSurveyPercent}%</span>
                  <span>Pending: {pending}%</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Accessible Table Representation */
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
              fontFamily: "var(--font-body)",
              fontSize: "0.9rem",
              background: "var(--color-paper-raised)",
              border: "1px solid var(--color-line)",
              borderRadius: "var(--radius)",
            }}
          >
            <caption style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: 600, color: "var(--color-ink)" }}>
              State-wise Census 2027 Enumeration Progress Data
            </caption>
            <thead>
              <tr style={{ borderBottom: "2px solid var(--color-line)", background: "var(--color-paper)" }}>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>State</th>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>Code</th>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>Households (M)</th>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>Digital Self-Enum (%)</th>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>Field Survey (%)</th>
                <th scope="col" style={{ padding: "0.75rem 1rem" }}>Total Coverage (%)</th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((s) => (
                <tr key={s.stateCode} style={{ borderBottom: "1px solid var(--color-line)" }}>
                  <th scope="row" style={{ padding: "0.75rem 1rem", fontWeight: 500 }}>{s.stateName}</th>
                  <td style={{ padding: "0.75rem 1rem" }}>{s.stateCode}</td>
                  <td style={{ padding: "0.75rem 1rem" }}>{s.totalHouseholdsMillion}</td>
                  <td style={{ padding: "0.75rem 1rem", color: "var(--color-accent)", fontWeight: 600 }}>{s.digitalSelfEnumPercent}%</td>
                  <td style={{ padding: "0.75rem 1rem" }}>{s.fieldSurveyPercent}%</td>
                  <td style={{ padding: "0.75rem 1rem", fontWeight: 600 }}>{s.digitalSelfEnumPercent + s.fieldSurveyPercent}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footnote Notice */}
      <p style={{ fontSize: "0.82rem", color: "var(--color-ink-soft)", margin: 0, fontStyle: "italic" }}>
        * Note: Figures represent simulated progress metrics for India's 2027 digital census benchmark. Data points are aggregated and do not disclose individual household responses under Section 15 of the Census Act 1948.
      </p>
    </div>
  );
}
