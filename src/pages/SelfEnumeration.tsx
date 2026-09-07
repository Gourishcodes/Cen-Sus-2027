import { useState, useRef } from "react";
import Stepper from "../components/Stepper";
import { enumerationSteps } from "../data/questions";
import { CheckCircleIcon, PeopleIcon, DocumentIcon } from "../components/icons";
import type { EnumerationRecord } from "../types/census";
import { useLanguage } from "../context/LanguageContext";

type Answers = Record<string, string | number | boolean>;

const LOCAL_STORAGE_LAST_RECORD_KEY = "cen2027_last_record";

function buildRecord(answers: Answers): EnumerationRecord {
  const uuid = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Math.random().toString(36).substring(2, 9)}-${Date.now()}`;

  return {
    id: `CEN2027-${uuid}`,
    timestampSubmitted: new Date().toISOString(),
    stateCode: String(answers.state ?? ""),
    language: String(answers.language ?? "English"),
    householdSize: Number(answers.householdSize ?? 1),
    responses: answers,
    status: "submitted",
  };
}

export default function SelfEnumeration() {
  const { t } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<string[]>([]);
  const [numberErrors, setNumberErrors] = useState<string[]>([]);
  const [submittedRecord, setSubmittedRecord] = useState<EnumerationRecord | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_LAST_RECORD_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const errorAlertRef = useRef<HTMLDivElement>(null);
  const step = enumerationSteps[stepIndex];
  const isLastStep = stepIndex === enumerationSteps.length - 1;

  function setAnswer(id: string, value: string | number | boolean) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => prev.filter((errId) => errId !== id));
    setNumberErrors((prev) => prev.filter((errId) => errId !== id));
  }

  function focusError() {
    setTimeout(() => {
      if (errorAlertRef.current) {
        errorAlertRef.current.focus();
        if (typeof errorAlertRef.current.scrollIntoView === "function") {
          errorAlertRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        const firstInvalid = document.querySelector<HTMLElement>('[aria-invalid="true"]');
        if (firstInvalid) {
          firstInvalid.focus();
          if (typeof firstInvalid.scrollIntoView === "function") {
            firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    }, 50);
  }

  function getStepValidation(idx: number): { missing: string[]; invalidNumbers: string[] } {
    const targetStep = enumerationSteps[idx];
    const missing: string[] = [];
    const invalidNumbers: string[] = [];

    for (const q of targetStep.questions) {
      const val = answers[q.id];
      const isEmpty = val === undefined || val === null || val === "";

      if (q.required && isEmpty) {
        missing.push(q.id);
      } else if (!isEmpty && q.type === "number") {
        const numVal = Number(val);
        if (isNaN(numVal) || numVal <= 0 || !Number.isInteger(numVal)) {
          invalidNumbers.push(q.id);
        }
      }
    }

    return { missing, invalidNumbers };
  }

  function validateStep(idx: number = stepIndex): boolean {
    const { missing, invalidNumbers } = getStepValidation(idx);
    const combinedErrors = [...missing, ...invalidNumbers];
    setErrors(combinedErrors);
    setNumberErrors(invalidNumbers);
    return combinedErrors.length === 0;
  }

  function handleNext() {
    if (!validateStep(stepIndex)) {
      focusError();
      return;
    }
    if (isLastStep) {
      const record = buildRecord(answers);
      try {
        localStorage.setItem(LOCAL_STORAGE_LAST_RECORD_KEY, JSON.stringify(record));
        localStorage.setItem(`cen2027_record_${record.id}`, JSON.stringify(record));
      } catch (err) {
        console.warn("Failed to persist record to localStorage:", err);
      }
      setSubmittedRecord(record);
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  function handleBack() {
    setErrors([]);
    setNumberErrors([]);
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function handleStepClick(targetIndex: number) {
    if (targetIndex <= stepIndex) {
      setErrors([]);
      setNumberErrors([]);
      setStepIndex(targetIndex);
      return;
    }

    // Validate all intervening steps
    for (let s = 0; s < targetIndex; s++) {
      const { missing, invalidNumbers } = getStepValidation(s);
      if (missing.length > 0 || invalidNumbers.length > 0) {
        setStepIndex(s);
        setErrors([...missing, ...invalidNumbers]);
        setNumberErrors(invalidNumbers);
        focusError();
        return;
      }
    }

    setErrors([]);
    setNumberErrors([]);
    setStepIndex(targetIndex);
  }

  if (submittedRecord) {
    return (
      <div style={{ maxWidth: "34rem", margin: "1.5rem auto", textAlign: "center" }}>
        {/* Civic Gazette Digital Receipt Slip */}
        <div
          className="receipt-slip"
          style={{
            background: "var(--color-paper-raised)",
            border: "2px dashed var(--color-line)",
            borderRadius: "var(--radius)",
            padding: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--color-line)", paddingBottom: "1rem" }}>
            <div>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-ink-soft)", fontWeight: 600 }}>
                {t("receipt_gov_label")}
              </span>
              <h2 style={{ margin: "0.25rem 0 0", fontSize: "1.35rem", color: "var(--color-ink)" }}>
                {t("enum_submitted_title")}
              </h2>
            </div>
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
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <CheckCircleIcon size={24} />
            </span>
          </div>

          {/* Reference & QR Code Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-ink-soft)", textTransform: "uppercase" }}>{t("receipt_ref_label")}</span>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 700, color: "var(--color-accent)" }}>
                  {submittedRecord.id}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-ink-soft)", textTransform: "uppercase" }}>{t("receipt_jurisdiction_label")}</span>
                <div style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                  {submittedRecord.stateCode || "State Jurisdiction"} · {submittedRecord.householdSize} {t("receipt_members_suffix")}
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--color-ink-soft)", textTransform: "uppercase" }}>{t("receipt_timestamp_label")}</span>
                <div style={{ fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>
                  {new Date(submittedRecord.timestampSubmitted).toLocaleString()}
                </div>
              </div>
            </div>

            {/* Accessible SVG QR Token */}
            <div
              style={{
                padding: "0.6rem",
                background: "white",
                border: "1px solid var(--color-line)",
                borderRadius: "4px",
                textAlign: "center",
              }}
            >
              <svg width="88" height="88" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Official Verification QR Code Token">
                {/* SVG Mock QR Matrix */}
                <rect width="100" height="100" fill="white" />
                {/* Corner 1 */}
                <rect x="10" y="10" width="24" height="24" stroke="#1C1B19" strokeWidth="4" fill="none" />
                <rect x="16" y="16" width="12" height="12" fill="#1C1B19" />
                {/* Corner 2 */}
                <rect x="66" y="10" width="24" height="24" stroke="#1C1B19" strokeWidth="4" fill="none" />
                <rect x="72" y="16" width="12" height="12" fill="#1C1B19" />
                {/* Corner 3 */}
                <rect x="10" y="66" width="24" height="24" stroke="#1C1B19" strokeWidth="4" fill="none" />
                <rect x="16" y="72" width="12" height="12" fill="#1C1B19" />
                {/* Data blocks */}
                <rect x="42" y="14" width="8" height="8" fill="#B5482E" />
                <rect x="42" y="30" width="8" height="8" fill="#1C1B19" />
                <rect x="52" y="42" width="8" height="8" fill="#1C1B19" />
                <rect x="24" y="44" width="8" height="8" fill="#1C1B19" />
                <rect x="66" y="48" width="8" height="8" fill="#B5482E" />
                <rect x="44" y="66" width="8" height="8" fill="#1C1B19" />
                <rect x="60" y="66" width="8" height="8" fill="#1C1B19" />
                <rect x="76" y="76" width="8" height="8" fill="#1C1B19" />
                <rect x="44" y="80" width="8" height="8" fill="#B5482E" />
              </svg>
              <span style={{ display: "block", fontSize: "0.65rem", color: "var(--color-ink-soft)", marginTop: "0.25rem", fontWeight: 600 }}>
                {t("receipt_surveyor_scan")}
              </span>
            </div>
          </div>

          {/* Instructions for Field Verification */}
          <div
            style={{
              background: "var(--color-paper)",
              border: "1px solid var(--color-line)",
              borderRadius: "var(--radius)",
              padding: "0.85rem 1rem",
              fontSize: "0.85rem",
              color: "var(--color-ink-soft)",
              lineHeight: 1.45,
            }}
          >
            <strong style={{ color: "var(--color-ink)" }}>{t("receipt_field_verify_title")}</strong> {t("receipt_field_verify_body")}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
            <button
              type="button"
              className="btn"
              onClick={() => window.print()}
              style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.6rem 1.2rem" }}
            >
              <DocumentIcon size={16} />
              {t("receipt_print_btn")}
            </button>
            <button
              type="button"
              onClick={() => {
                try {
                  localStorage.removeItem(LOCAL_STORAGE_LAST_RECORD_KEY);
                } catch {}
                setSubmittedRecord(null);
                setAnswers({});
                setStepIndex(0);
                setErrors([]);
                setNumberErrors([]);
              }}
              style={{
                background: "none",
                border: "1px solid var(--color-line)",
                padding: "0.6rem 1.2rem",
                borderRadius: "var(--radius)",
                fontSize: "0.9rem",
                cursor: "pointer",
                color: "var(--color-ink)",
              }}
            >
              {t("btn_submit_another")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
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
          <PeopleIcon size={24} />
        </span>
        <h2 style={{ margin: 0 }}>{t("nav_self_enum")}</h2>
      </div>
      <p style={{ color: "var(--color-ink-soft)", maxWidth: "36rem" }}>
        {t("enum_intro")}
      </p>

      <div className="enum-layout">
        <Stepper
          steps={enumerationSteps.map((s) => ({ id: s.id, title: s.title }))}
          currentIndex={stepIndex}
          onStepClick={handleStepClick}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
          }}
          aria-labelledby="step-heading"
        >
          <h3 id="step-heading">{step.title}</h3>

          {errors.length > 0 && (
            <div
              ref={errorAlertRef}
              tabIndex={-1}
              role="alert"
              style={{
                background: "var(--color-error-soft)",
                border: "1.5px solid var(--color-error)",
                color: "var(--color-error)",
                borderRadius: "var(--radius)",
                padding: "0.85rem 1.15rem",
                marginBottom: "1.25rem",
                fontSize: "0.9rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                outline: "none",
              }}
            >
              <span>⚠️</span>
              <span>{t("err_required_banner")}</span>
            </div>
          )}

          <div style={{ display: "grid", gap: "1.5rem" }}>
            {step.questions.map((q) => {
              const fieldId = `field-${q.id}`;
              const hasError = errors.includes(q.id);
              const isNumberError = numberErrors.includes(q.id);

              if (q.type === "select") {
                return (
                  <div key={q.id}>
                    <label htmlFor={fieldId} style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: hasError ? "var(--color-error)" : "var(--color-ink)" }}>
                      {q.labelKey}
                      {q.required && <span aria-hidden="true" style={{ color: "var(--color-accent)" }}> *</span>}
                    </label>
                    <select
                      id={fieldId}
                      aria-required={q.required}
                      aria-invalid={hasError}
                      value={(answers[q.id] as string) ?? ""}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      style={{
                        width: "100%",
                        maxWidth: "24rem",
                        padding: "0.6rem 0.75rem",
                        borderRadius: "var(--radius)",
                        border: `1.5px solid ${hasError ? "var(--color-error)" : "var(--color-line)"}`,
                        background: hasError ? "var(--color-error-soft)" : "var(--color-paper-raised)",
                        fontSize: "0.95rem",
                        color: "var(--color-ink)",
                      }}
                    >
                      <option value="" disabled>
                        Select…
                      </option>
                      {q.options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {hasError && (
                      <span style={{ display: "block", color: "var(--color-error)", fontSize: "0.8rem", marginTop: "0.25rem", fontWeight: 600 }}>
                        {t("err_select_option")}
                      </span>
                    )}
                  </div>
                );
              }
              if (q.type === "boolean") {
                return (
                  <div key={q.id}>
                    <span style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: hasError ? "var(--color-error)" : "var(--color-ink)" }}>
                      {q.labelKey}
                      {q.required && <span aria-hidden="true" style={{ color: "var(--color-accent)" }}> *</span>}
                    </span>
                    <div role="radiogroup" aria-label={q.labelKey} style={{ display: "flex", gap: "1.5rem" }}>
                      {["Yes", "No"].map((opt) => (
                        <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name={fieldId}
                            checked={answers[q.id] === (opt === "Yes")}
                            onChange={() => setAnswer(q.id, opt === "Yes")}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                    {hasError && (
                      <span style={{ display: "block", color: "var(--color-error)", fontSize: "0.8rem", marginTop: "0.25rem", fontWeight: 600 }}>
                        {t("err_yes_no")}
                      </span>
                    )}
                  </div>
                );
              }
              return (
                <div key={q.id}>
                  <label htmlFor={fieldId} style={{ display: "block", marginBottom: "0.4rem", fontWeight: 600, color: hasError ? "var(--color-error)" : "var(--color-ink)" }}>
                    {q.labelKey}
                    {q.required && <span aria-hidden="true" style={{ color: "var(--color-accent)" }}> *</span>}
                  </label>
                  <input
                    id={fieldId}
                    type={q.type === "number" ? "number" : "text"}
                    aria-required={q.required}
                    aria-invalid={hasError}
                    min={q.type === "number" ? 1 : undefined}
                    step={q.type === "number" ? 1 : undefined}
                    value={(answers[q.id] as string | number) ?? ""}
                    onChange={(e) =>
                      setAnswer(q.id, q.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)
                    }
                    style={{
                      width: "100%",
                      maxWidth: "24rem",
                      padding: "0.6rem 0.75rem",
                      borderRadius: "var(--radius)",
                      border: `1.5px solid ${hasError ? "var(--color-error)" : "var(--color-line)"}`,
                      background: hasError ? "var(--color-error-soft)" : "var(--color-paper-raised)",
                      fontSize: "0.95rem",
                      color: "var(--color-ink)",
                    }}
                  />
                  {hasError && (
                    <span style={{ display: "block", color: "var(--color-error)", fontSize: "0.8rem", marginTop: "0.25rem", fontWeight: 600 }}>
                      {isNumberError ? t("err_number_invalid") : t("err_field_empty")}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
            {stepIndex > 0 && (
              <button
                type="button"
                onClick={handleBack}
                style={{
                  background: "none",
                  border: "1px solid var(--color-line)",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "var(--radius)",
                  cursor: "pointer",
                  color: "var(--color-ink)",
                }}
              >
                {t("btn_back")}
              </button>
            )}
            <button type="submit" className="btn">
              {isLastStep ? t("btn_submit") : t("btn_continue")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
