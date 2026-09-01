import { useLanguage } from "../context/LanguageContext";
import { LanguageCode } from "../lib/i18n";

export default function LanguageSwitcher() {
  const { lang, setLang, languages, t } = useLanguage();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <label
        htmlFor="lang-select"
        style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)", fontWeight: 500 }}
      >
        {t("lang_select")}
      </label>
      <select
        id="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value as LanguageCode)}
        aria-label="Select display language"
        style={{
          background: "var(--color-paper)",
          border: "1px solid var(--color-line)",
          borderRadius: "var(--radius)",
          padding: "0.35rem 0.65rem",
          fontSize: "0.85rem",
          fontFamily: "var(--font-body)",
          color: "var(--color-ink)",
          cursor: "pointer",
        }}
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeName} ({l.label})
          </option>
        ))}
      </select>
    </div>
  );
}
