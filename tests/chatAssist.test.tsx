import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PrivacyAndMyths from "../src/pages/PrivacyAndMyths";
import { LanguageProvider } from "../src/context/LanguageContext";

describe("Privacy & Myths Page & ChatAssist", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({
          text: "MYTH BUSTED: Sharing your Aadhaar number is voluntary and NOT mandatory for Census 2027.",
          classification: "myth",
          source: "gemini",
        }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("renders statutory privacy protections and myth-busting ledger", () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <PrivacyAndMyths />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByRole("heading", { name: /Privacy, Data Protection & Misinformation/i })).toBeInTheDocument();
    expect(screen.getByText(/The Census Act, 1948 & DPDP Act, 2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Statutory Confidentiality \(Section 15\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Census 2027 is linked to NRC or can revoke citizenship/i)).toBeInTheDocument();
  });

  it("renders ChatAssist AI widget with quick question pills and handles inquiry", async () => {
    render(
      <LanguageProvider>
        <MemoryRouter>
          <PrivacyAndMyths />
        </MemoryRouter>
      </LanguageProvider>
    );

    expect(screen.getByRole("heading", { name: /Census 2027 AI Civic Assistant/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Is Aadhaar mandatory\? →/i })).toBeInTheDocument();

    // Click quick pill
    const aadhaarBtn = screen.getByRole("button", { name: /Is Aadhaar mandatory\? →/i });
    fireEvent.click(aadhaarBtn);

    // Verify user message appears in log
    await waitFor(() => {
      expect(screen.getByText(/Is sharing Aadhaar number mandatory for Census 2027\?/i)).toBeInTheDocument();
    });

    // Verify assistant responds with myth badge and text
    await waitFor(() => {
      expect(screen.getAllByText(/Myth Busted/i).length).toBeGreaterThan(0);
    });
  });
});

