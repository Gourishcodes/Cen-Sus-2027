import { HouseIcon, AmenityIcon, LanguageIcon, DocumentIcon, CheckCircleIcon } from "./icons";

interface StepperProps {
  steps: { id: string; title: string }[];
  currentIndex: number;
  onStepClick?: (index: number) => void;
}

function getStepIcon(stepId: string, size = 18) {
  switch (stepId.toLowerCase()) {
    case "household":
      return <HouseIcon size={size} />;
    case "amenities":
      return <AmenityIcon size={size} />;
    case "language":
      return <LanguageIcon size={size} />;
    default:
      return <DocumentIcon size={size} />;
  }
}

export default function Stepper({ steps, currentIndex, onStepClick }: StepperProps) {
  return (
    <ol
      aria-label="Self-enumeration steps"
      style={{
        listStyle: "none",
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        background: "var(--color-paper-raised)",
        border: "1px solid var(--color-line)",
        borderRadius: "var(--radius-lg)",
        padding: "1.25rem",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div style={{ marginBottom: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid var(--color-line)" }}>
        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-ink-soft)", fontWeight: 700 }}>
          Progress Stepper
        </span>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-navy)" }}>
          Step {currentIndex + 1} of {steps.length}
        </div>
      </div>

      {steps.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "upcoming";
        const clickable = i !== currentIndex && !!onStepClick;

        let iconColor = "var(--color-ink-soft)";
        let bgColor = "var(--color-paper)";
        let borderColor = "var(--color-line)";
        let textColor = "var(--color-ink-soft)";

        if (state === "current") {
          iconColor = "#ffffff";
          bgColor = "var(--color-accent)";
          borderColor = "var(--color-accent)";
          textColor = "var(--color-navy)";
        } else if (state === "done") {
          iconColor = "var(--color-success)";
          bgColor = "var(--color-success-soft)";
          borderColor = "var(--color-success-border)";
          textColor = "var(--color-ink)";
        }

        return (
          <li
            key={step.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              padding: "0.6rem 0.75rem",
              borderRadius: "var(--radius)",
              background: state === "current" ? "var(--color-accent-soft)" : "transparent",
              border: `1px solid ${state === "current" ? "var(--color-accent-border)" : "transparent"}`,
              transition: "all 0.15s ease",
            }}
          >
            {/* Step Icon Container */}
            <span
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "var(--radius-sm)",
                background: bgColor,
                color: iconColor,
                border: `1px solid ${borderColor}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s ease",
              }}
              aria-hidden="true"
            >
              {state === "done" ? <CheckCircleIcon size={18} /> : getStepIcon(step.id, 18)}
            </span>

            {/* Step Text / Clickable Button */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--color-ink-soft)", fontWeight: 600 }}>
                {state === "done" ? "Completed" : state === "current" ? "In Progress" : `Step ${i + 1}`}
              </span>
              {clickable ? (
                <button
                  type="button"
                  onClick={() => onStepClick(i)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    textAlign: "left",
                    font: "inherit",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: textColor,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  {step.title}
                </button>
              ) : (
                <span
                  aria-current={state === "current" ? "step" : undefined}
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: state === "current" ? 700 : 500,
                    color: textColor,
                  }}
                >
                  {step.title}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
