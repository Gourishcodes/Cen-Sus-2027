import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SelfEnumeration from "../src/pages/SelfEnumeration";
import { LanguageProvider } from "../src/context/LanguageContext";

function fillRequiredSelectsAndInputs() {
  fireEvent.change(screen.getByLabelText(/^State/i), { target: { value: "Maharashtra" } });
  fireEvent.change(screen.getByLabelText(/Number of people in the household/i), { target: { value: "4" } });
  fireEvent.change(screen.getByLabelText(/Type of housing/i), { target: { value: "Owned" } });
}

describe("Self-enumeration form submit", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("produces a submitted record after all required fields across all steps are filled", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <SelfEnumeration />
        </MemoryRouter>
      </LanguageProvider>
    );

    // Step 1: Household
    fillRequiredSelectsAndInputs();
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 2: Amenities
    fireEvent.click(screen.getAllByLabelText(/^Yes$/i)[0]);
    fireEvent.click(screen.getAllByLabelText(/^Yes$/i)[1]);
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    // Step 3: Language
    fireEvent.change(screen.getByLabelText(/Preferred language for correspondence/i), {
      target: { value: "Hindi" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByText(/self-enumeration submitted/i)).toBeInTheDocument();
  });

  it("blocks progression and shows an error when a required field is left blank", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <SelfEnumeration />
        </MemoryRouter>
      </LanguageProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
