import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../src/App";

describe("Full Application Click-through Verification", () => {
  it("walks through Overview → Two Phases → State Schedule → Self-Enumeration → Privacy & Myths → Census in Numbers without errors", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // 1. OVERVIEW PAGE
    expect(screen.getByText(/India's First Digital Census/i)).toBeInTheDocument();
    expect(screen.getByText(/Office of the Registrar General/i)).toBeInTheDocument();
    expect(screen.getByText(/1.4 Billion Citizens/i)).toBeInTheDocument();

    // 2. NAVIGATE TO TWO PHASES
    const phasesLink = screen.getAllByText(/The Two Phases/i)[0];
    fireEvent.click(phasesLink);
    expect(screen.getAllByText(/House Listing/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Population Enumeration/i).length).toBeGreaterThan(0);

    // 3. NAVIGATE TO STATE SCHEDULE & TEST MAP/DOSSIER CLICKS
    const scheduleLink = screen.getAllByText(/State Schedule/i)[0];
    fireEvent.click(scheduleLink);
    expect(screen.getByLabelText(/Interactive Map of India/i)).toBeInTheDocument();
    
    // Switch state via dropdown
    const selectState = screen.getByLabelText(/Jump to State:/i);
    fireEvent.change(selectState, { target: { value: "TN" } });
    expect(screen.getByText(/Self-Enumerate for Tamil Nadu →/i)).toBeInTheDocument();

    fireEvent.change(selectState, { target: { value: "UP" } });
    expect(screen.getByText(/Self-Enumerate for Uttar Pradesh →/i)).toBeInTheDocument();

    // 4. NAVIGATE TO SELF-ENUMERATION & GO THROUGH ALL 3 STEPS
    const enumLink = screen.getAllByText(/Self-Enumeration/i)[0];
    fireEvent.click(enumLink);
    expect(screen.getByText(/Step 1 of 3/i)).toBeInTheDocument();

    // Fill Step 1 (Household)
    fireEvent.change(screen.getByLabelText(/State \*/i), { target: { value: "Maharashtra" } });
    fireEvent.change(screen.getByLabelText(/Number of people in the household/i), { target: { value: "4" } });
    fireEvent.change(screen.getByLabelText(/Type of housing/i), { target: { value: "Owned" } });
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // Fill Step 2 (Amenities)
    expect(screen.getByText(/Step 2 of 3/i)).toBeInTheDocument();
    const radioInputs = screen.getAllByRole("radio");
    // Click Yes for electricity (index 0) and piped water (index 2)
    fireEvent.click(radioInputs[0]);
    fireEvent.click(radioInputs[2]);
    fireEvent.click(screen.getByRole("button", { name: /Continue/i }));

    // Fill Step 3 (Language)
    expect(screen.getByText(/Step 3 of 3/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Preferred language for correspondence/i), { target: { value: "Marathi" } });
    fireEvent.click(screen.getByRole("button", { name: /^Submit$/i }));

    // Verify Submission Receipt Slip with QR code
    expect(screen.getByText(/Self-enumeration submitted/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Official Verification QR Code Token/i)).toBeInTheDocument();
    expect(screen.getByText(/SURVEYOR SCAN/i)).toBeInTheDocument();

    // 5. NAVIGATE TO PRIVACY & MYTHS & INTERACT WITH CHAT ASSISTANT
    const privacyLink = screen.getAllByText(/Privacy & Myths/i)[0];
    fireEvent.click(privacyLink);
    expect(screen.getByText(/Statutory Confidentiality \(Section 15\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Public Misconceptions vs. Verified Facts/i)).toBeInTheDocument();

    // Click quick question pill
    const promptPill = screen.getByText(/Is Aadhaar mandatory\? →/i);
    fireEvent.click(promptPill);

    await waitFor(() => {
      expect(screen.getAllByText(/Census AI Guide/i).length).toBeGreaterThan(0);
    });

    // 6. NAVIGATE TO CENSUS IN NUMBERS
    const dataLink = screen.getAllByText(/Census in Numbers/i)[0];
    fireEvent.click(dataLink);
    expect(screen.getByText(/Sample Scope/i)).toBeInTheDocument();
    expect(screen.getByText(/Digital Adoption Rate/i)).toBeInTheDocument();
    expect(screen.getByText(/Ledger Bars/i)).toBeInTheDocument();
    
    // Switch to Accessible Table
    const tableToggle = screen.getByRole("button", { name: /Accessible Table/i });
    fireEvent.click(tableToggle);
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
