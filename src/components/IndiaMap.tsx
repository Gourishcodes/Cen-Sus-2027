import { useState } from "react";
import type { StateSchedule } from "../types/census";

export interface IndiaMapProps {
  statesData: StateSchedule[];
  selectedStateCode: string | null;
  onSelectState: (stateCode: string) => void;
}

interface StatePath {
  code: string;
  name: string;
  path: string;
  center: [number, number]; // [x, y] for label / centroid
}

const INDIA_STATE_PATHS: StatePath[] = [
  {
    code: "MH",
    name: "Maharashtra",
    center: [230, 420],
    path: "M 175,370 L 220,360 L 270,365 L 310,380 L 320,410 L 290,445 L 260,460 L 210,480 L 190,470 L 180,440 L 165,405 Z",
  },
  {
    code: "UP",
    name: "Uttar Pradesh",
    center: [295, 255],
    path: "M 230,225 L 280,210 L 330,220 L 365,245 L 350,285 L 315,300 L 265,290 L 245,260 Z",
  },
  {
    code: "TN",
    name: "Tamil Nadu",
    center: [255, 595],
    path: "M 230,550 L 270,545 L 280,580 L 265,635 L 235,650 L 230,610 L 220,570 Z",
  },
  {
    code: "WB",
    name: "West Bengal",
    center: [385, 330],
    path: "M 370,280 L 395,275 L 400,320 L 380,365 L 360,355 L 365,315 Z",
  },
  {
    code: "KA",
    name: "Karnataka",
    center: [215, 520],
    path: "M 195,475 L 235,465 L 255,505 L 250,550 L 220,560 L 190,520 Z",
  },
  {
    code: "GJ",
    name: "Gujarat",
    center: [140, 340],
    path: "M 115,295 L 165,300 L 185,335 L 175,375 L 140,380 L 135,360 L 105,355 L 100,335 L 125,325 L 110,305 Z",
  },
  {
    code: "RJ",
    name: "Rajasthan",
    center: [175, 250],
    path: "M 140,210 L 205,195 L 235,230 L 220,285 L 170,305 L 130,270 Z",
  },
  {
    code: "MP",
    name: "Madhya Pradesh",
    center: [250, 330],
    path: "M 205,295 L 275,285 L 320,315 L 305,370 L 245,365 L 195,340 Z",
  },
  {
    code: "AP",
    name: "Andhra Pradesh",
    center: [285, 490],
    path: "M 265,455 L 310,430 L 335,470 L 285,545 L 255,510 Z",
  },
  {
    code: "TG",
    name: "Telangana",
    center: [265, 430],
    path: "M 245,395 L 295,390 L 305,430 L 265,455 L 235,435 Z",
  },
  {
    code: "KL",
    name: "Kerala",
    center: [210, 605],
    path: "M 205,565 L 225,570 L 230,625 L 210,645 L 200,600 Z",
  },
  {
    code: "OD",
    name: "Odisha",
    center: [345, 390],
    path: "M 320,345 L 365,345 L 380,390 L 340,425 L 315,395 Z",
  },
  {
    code: "PB",
    name: "Punjab & Haryana",
    center: [210, 175],
    path: "M 185,140 L 210,138 L 245,130 L 250,155 L 260,185 L 235,195 L 195,205 L 180,165 Z",
  },
  {
    code: "BR",
    name: "Bihar",
    center: [345, 275],
    path: "M 325,245 L 375,245 L 375,285 L 330,290 Z",
  },
  {
    code: "JK",
    name: "Jammu & Kashmir / Ladakh",
    center: [225, 85],
    path: "M 175,105 L 180,70 L 205,35 L 225,30 L 245,40 L 265,65 L 268,115 L 245,130 L 210,138 Z",
  },
  {
    code: "NE",
    name: "North East States",
    center: [435, 255],
    path: "M 390,240 L 405,215 L 435,195 L 470,200 L 485,245 L 460,285 L 440,305 L 415,280 L 405,250 Z",
  },
];

// Helper to determine status, accessible symbol, and pattern
function getStatusDetails(stateCode: string, statesData: StateSchedule[]) {
  const match = statesData.find((s) => s.stateCode === stateCode);
  if (!match) {
    return {
      status: "scheduled",
      color: "#64748b",
      fillUrl: "url(#pattern-scheduled)",
      symbol: "○",
      label: "Phase 1 Schedule",
      hasData: false,
    };
  }

  if (stateCode === "MH" || stateCode === "TN" || stateCode === "KA") {
    return {
      status: "active",
      color: "#0d7c4d",
      fillUrl: "url(#pattern-active)",
      symbol: "✓",
      label: "Active Self-Enumeration",
      hasData: true,
    };
  }

  return {
    status: "upcoming",
    color: "#e36414",
    fillUrl: "url(#pattern-upcoming)",
    symbol: "◈",
    label: "Upcoming Window",
    hasData: true,
  };
}

export default function IndiaMap({ statesData, selectedStateCode, onSelectState }: IndiaMapProps) {
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  const hoveredPath = INDIA_STATE_PATHS.find((s) => s.code === hoveredState);
  const hoveredSchedule = statesData.find((s) => s.stateCode === hoveredState);

  return (
    <div
      style={{
        background: "var(--color-paper-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: "var(--radius-lg)",
        padding: "1.5rem",
        boxShadow: "var(--shadow-sm)",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        position: "relative",
      }}
    >
      {/* Map Header & Colorblind-Accessible Legend */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
            Geographic Census Ledger
          </span>
          <h3 style={{ margin: "0.2rem 0 0", fontSize: "1.2rem", color: "var(--color-ink)" }}>
            National Self-Enumeration Map
          </h3>
        </div>

        {/* Legend with Dual Encoding (Color + Accessible Symbol) */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "3px", background: "#0d7c4d", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800 }}>✓</span>
            <strong>Active Self-Enum</strong>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "3px", background: "#e36414", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800 }}>◈</span>
            <strong>Upcoming</strong>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
            <span style={{ width: "14px", height: "14px", borderRadius: "3px", background: "#64748b", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800 }}>○</span>
            <span>Scheduled</span>
          </span>
        </div>
      </div>

      {/* Interactive Map Visualizer */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "520px",
          margin: "0 auto",
          aspectRatio: "500 / 680",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="80 30 420 640"
          style={{ width: "100%", height: "100%", filter: "drop-shadow(0 4px 12px rgba(11,27,61,0.06))" }}
          aria-label="Interactive Map of India showing Census 2027 enumeration schedule"
          role="img"
        >
          {/* Colorblind-Friendly SVG Patterns */}
          <defs>
            {/* Pattern for Active states (Solid rich green with micro-grid) */}
            <pattern id="pattern-active" width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#0d7c4d" />
              <rect x="0" y="0" width="8" height="8" fill="none" stroke="#0a613c" strokeWidth="0.5" />
            </pattern>

            {/* Pattern for Upcoming states (Diagonal hatching lines for clear texture difference) */}
            <pattern id="pattern-upcoming" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#e36414" />
              <line x1="0" y1="0" x2="0" y2="8" stroke="#f68b44" strokeWidth="2.5" />
            </pattern>

            {/* Pattern for Scheduled states (Stippled dots) */}
            <pattern id="pattern-scheduled" width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#94a3b8" />
              <circle cx="3" cy="3" r="1" fill="#cbd5e1" />
            </pattern>
          </defs>

          {/* Subtle Ashok Chakra Geometric Motif Watermark in Background */}
          <g opacity="0.05" transform="translate(260, 360)">
            <circle r="120" fill="none" stroke="var(--color-ink)" strokeWidth="3" />
            <circle r="110" fill="none" stroke="var(--color-ink)" strokeWidth="1" strokeDasharray="4 4" />
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={i}
                x1="0"
                y1="0"
                x2={120 * Math.cos((i * 15 * Math.PI) / 180)}
                y2={120 * Math.sin((i * 15 * Math.PI) / 180)}
                stroke="var(--color-ink)"
                strokeWidth="1.5"
              />
            ))}
          </g>

          {/* State Shapes with Micro-Interactions & Dual Status Encoding */}
          {INDIA_STATE_PATHS.map((state) => {
            const isSelected = selectedStateCode === state.code;
            const isHovered = hoveredState === state.code;
            const info = getStatusDetails(state.code, statesData);

            let strokeColor = "#ffffff";
            let strokeWidth = 1.5;
            let filterStyle = "none";

            if (isSelected) {
              strokeColor = "var(--color-ink)";
              strokeWidth = 3;
              filterStyle = "drop-shadow(0 2px 8px rgba(11,27,61,0.35))";
            } else if (isHovered) {
              strokeColor = "#ffffff";
              strokeWidth = 2.5;
              filterStyle = "brightness(1.12)";
            }

            return (
              <g
                key={state.code}
                tabIndex={0}
                role="button"
                aria-label={`${state.name}: ${info.label}`}
                aria-pressed={isSelected}
                onMouseEnter={() => setHoveredState(state.code)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => onSelectState(state.code)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectState(state.code);
                  }
                }}
                style={{
                  cursor: "pointer",
                  outline: "none",
                  transition: "transform 180ms ease, filter 180ms ease",
                  filter: filterStyle,
                }}
              >
                <path
                  d={state.path}
                  fill={info.fillUrl}
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeLinejoin="round"
                  style={{
                    transition: "all 180ms ease",
                  }}
                />
                {/* State Label Abbreviation + Accessible Status Symbol */}
                <text
                  x={state.center[0]}
                  y={state.center[1] - 4}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="800"
                  fontFamily="var(--font-display)"
                  pointerEvents="none"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
                >
                  {state.code}
                </text>
                <text
                  x={state.center[0]}
                  y={state.center[1] + 8}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#ffffff"
                  fontSize="8"
                  fontWeight="700"
                  fontFamily="var(--font-display)"
                  pointerEvents="none"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
                >
                  {info.symbol}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoveredPath && (
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "50%",
              transform: "translateX(-50%)",
              background: "var(--color-ink)",
              color: "#ffffff",
              padding: "0.6rem 1rem",
              borderRadius: "var(--radius)",
              fontSize: "0.85rem",
              boxShadow: "var(--shadow-md)",
              pointerEvents: "none",
              zIndex: 10,
              whiteSpace: "nowrap",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              animation: "fadeIn 0.15s ease",
            }}
          >
            <span
              style={{
                width: "16px",
                height: "16px",
                borderRadius: "3px",
                background: getStatusDetails(hoveredPath.code, statesData).color,
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 800,
              }}
            >
              {getStatusDetails(hoveredPath.code, statesData).symbol}
            </span>
            <div>
              <strong>{hoveredPath.name} ({hoveredPath.code})</strong>
              <div style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
                {hoveredSchedule
                  ? `Self-Enum: ${hoveredSchedule.selfEnumerationWindow.start} to ${hoveredSchedule.selfEnumerationWindow.end}`
                  : "Phase 1 Schedule Active"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Helper Text */}
      <div style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--color-ink-soft)" }}>
        💡 Click on any state on the map or select from the dossier to inspect schedule windows.
      </div>
    </div>
  );
}
