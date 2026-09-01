import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Phases from "../src/pages/Phases";
import { LanguageProvider } from "../src/context/LanguageContext";

describe("Phases page", () => {
  it("renders both census phases", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <Phases />
        </MemoryRouter>
      </LanguageProvider>
    );
    expect(screen.getAllByText(/House Listing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Population Enumeration/i).length).toBeGreaterThan(0);
  });
});
