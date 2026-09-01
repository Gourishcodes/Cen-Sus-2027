import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DataVisual from "../src/pages/DataVisual";
import { LanguageProvider } from "../src/context/LanguageContext";

describe("DataVisual Page & Census Progress Visualization", () => {
  it("renders summary statistics and representative state progress", () => {
    render(
      <LanguageProvider>
        <DataVisual />
      </LanguageProvider>
    );

    expect(screen.getByText(/Census in Numbers/i)).toBeInTheDocument();
    expect(screen.getByText(/Projected Households/i)).toBeInTheDocument();
    expect(screen.getByText(/Maharashtra/i)).toBeInTheDocument();
    expect(screen.getByText(/Tamil Nadu/i)).toBeInTheDocument();
    expect(screen.getByText(/Karnataka/i)).toBeInTheDocument();
  });

  it("toggles between visual ledger bars and accessible data table", () => {
    render(
      <LanguageProvider>
        <DataVisual />
      </LanguageProvider>
    );

    // Initial chart view has progressbars
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0);

    // Switch to table mode
    const tableBtn = screen.getByRole("button", { name: /Accessible Table/i });
    fireEvent.click(tableBtn);

    // Assert table is rendered
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText(/State-wise Census 2027 Enumeration Progress Data/i)).toBeInTheDocument();
  });

  it("allows sorting by state name and total households", () => {
    render(
      <LanguageProvider>
        <DataVisual />
      </LanguageProvider>
    );

    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: "name" } });
    expect(sortSelect).toHaveValue("name");
  });
});

