import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Phases from "./pages/Phases";
import StateSchedulePage from "./pages/StateSchedule";
import SelfEnumeration from "./pages/SelfEnumeration";
import PrivacyAndMyths from "./pages/PrivacyAndMyths";
import DataVisual from "./pages/DataVisual";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ThemeToggle from "./components/ThemeToggle";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { HouseIcon, DocumentIcon, CalendarIcon, PeopleIcon, ShieldIcon, ChartIcon } from "./components/icons";

function AppLayout() {
  const { t } = useLanguage();

  const navItems = [
    { to: "/", labelKey: "nav_overview", icon: HouseIcon, end: true },
    { to: "/phases", labelKey: "nav_phases", icon: DocumentIcon },
    { to: "/schedule", labelKey: "nav_schedule", icon: CalendarIcon },
    { to: "/self-enumeration", labelKey: "nav_self_enum", icon: PeopleIcon },
    { to: "/privacy", labelKey: "nav_privacy", icon: ShieldIcon },
    { to: "/data", labelKey: "nav_data", icon: ChartIcon },
  ];

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="container" style={{ padding: "1.5rem 0" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-display)",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-navy)",
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              <span style={{ color: "var(--color-accent)" }}>●</span> {t("header_tagline")}
            </p>
            <h1 style={{ fontSize: "var(--step-3)", color: "var(--color-ink)", margin: "0.15rem 0 0" }}>{t("header_title")}</h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
        <hr className="hairline" />
        <nav aria-label="Primary">
          <ul
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1.5rem",
              listStyle: "none",
              padding: 0,
              margin: 0,
              fontFamily: "var(--font-display)",
            }}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      textDecoration: "none",
                      color: isActive ? "var(--color-accent)" : "var(--color-ink)",
                      borderBottom: isActive ? "2px solid var(--color-accent)" : "2px solid transparent",
                      paddingBottom: "0.25rem",
                    })}
                  >
                    <Icon size={18} />
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <main id="main-content" className="container" style={{ padding: "2.5rem 0" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/phases" element={<Phases />} />
          <Route path="/schedule" element={<StateSchedulePage />} />
          <Route path="/self-enumeration" element={<SelfEnumeration />} />
          <Route path="/privacy" element={<PrivacyAndMyths />} />
          <Route path="/data" element={<DataVisual />} />
        </Routes>
      </main>

      <footer className="container" style={{ padding: "2rem 0", color: "var(--color-ink-soft)", fontSize: "0.85rem" }}>
        <hr className="hairline" />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <div>{t("footer_text")}</div>
          <p style={{ margin: 0, fontSize: "0.78rem", color: "var(--color-ink-subtle)" }}>
            ⚠️ {t("disclaimer_text")}
          </p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppLayout />
      </LanguageProvider>
    </ThemeProvider>
  );
}
