import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { SunIcon, MoonIcon } from "./icons";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isDark = theme === "dark";
  const label = isDark ? t("theme_toggle_light") : t("theme_toggle_dark");

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.25rem",
        height: "2.25rem",
        borderRadius: "var(--radius)",
        border: "1px solid var(--color-line)",
        background: "var(--color-paper-raised)",
        color: isDark ? "#fbbf24" : "var(--color-navy)",
        cursor: "pointer",
        transition: "all 0.2s ease",
        padding: 0,
      }}
    >
      {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
