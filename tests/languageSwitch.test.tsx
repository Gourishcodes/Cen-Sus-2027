import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";
import LanguageSwitcher from "../src/components/LanguageSwitcher";
import { LanguageProvider } from "../src/context/LanguageContext";

describe("LanguageSwitcher & Multi-language i18n", () => {
  it("renders a select with all Indian language options", () => {
    render(
      <LanguageProvider>
        <LanguageSwitcher />
      </LanguageProvider>
    );
    const select = screen.getByLabelText(/select display language/i);
    expect(select).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /हिन्दी/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /मराठी/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /தமிழ்/i })).toBeInTheDocument();
  });

  it("updates page copy across the application when changing language to Hindi", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Initial English content check
    expect(screen.getByText(/Census 2027/i)).toBeInTheDocument();
    expect(screen.getAllByText(/The Two Phases/i).length).toBeGreaterThan(0);

    // Switch to Hindi
    const select = screen.getByLabelText(/select display language/i);
    fireEvent.change(select, { target: { value: "hi" } });

    // Assert that Hindi translations are rendered
    expect(screen.getByText(/जनगणना 2027/i)).toBeInTheDocument();
    expect(screen.getAllByText(/दो चरण/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/स्व-गणना/i).length).toBeGreaterThan(0);
  });
});
