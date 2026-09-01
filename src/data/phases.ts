import type { Phase } from "../types/census";

export const phases: Phase[] = [
  {
    id: "phase1",
    name: "House Listing & Housing Census",
    windowStart: "2027-04-01",
    windowEnd: "2027-05-15",
    dataCollected: [
      "Type and condition of housing",
      "Household amenities (water, electricity, sanitation)",
      "Assets owned by the household",
      "Number of households per building",
    ],
    description:
      "The first phase catalogues every dwelling and household in the country before any individual is counted. It builds the base list used in Phase 2.",
  },
  {
    id: "phase2",
    name: "Population Enumeration",
    windowStart: "2027-09-01",
    windowEnd: "2027-10-15",
    dataCollected: [
      "Demographic details of every individual",
      "Education and employment status",
      "Migration history",
      "Language and religion (self-declared)",
    ],
    description:
      "The second phase records details of every person in every household identified during Phase 1 — the count that produces the final population figures.",
  },
];
