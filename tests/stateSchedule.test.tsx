import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import StateSchedulePage from "../src/pages/StateSchedule";
import { LanguageProvider } from "../src/context/LanguageContext";

describe("StateSchedule Page & Interactive India Map", () => {
  it("renders the interactive India map and state schedules", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <StateSchedulePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getAllByText(/State Schedule/i).length).toBeGreaterThan(0);
    expect(screen.getByLabelText(/Interactive Map of India/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Maharashtra/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tamil Nadu/i).length).toBeGreaterThan(0);
  });

  it("updates selected jurisdiction dossier when changing state", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <StateSchedulePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Initial selected state should be Maharashtra
    expect(screen.getAllByText(/Maharashtra/i).length).toBeGreaterThan(0);

    // Select Tamil Nadu via quick select
    const select = screen.getByLabelText(/Jump to State:/i);
    fireEvent.change(select, { target: { value: "TN" } });

    // Assert that dossier displays Tamil Nadu
    expect(screen.getByText(/Self-Enumerate for Tamil Nadu →/i)).toBeInTheDocument();
  });

  it("filters state lists when clicking filter buttons", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <StateSchedulePage />
        </MemoryRouter>
      </LanguageProvider>
    );

    const activeFilterBtn = screen.getByRole("button", { name: /Active Self-Enum \(3\)/i });
    fireEvent.click(activeFilterBtn);

    expect(screen.getAllByText(/Maharashtra/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Tamil Nadu/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Karnataka/i).length).toBeGreaterThan(0);
  });
});
