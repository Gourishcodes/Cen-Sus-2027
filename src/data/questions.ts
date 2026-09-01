import type { EnumerationQuestion } from "../types/census";

export interface EnumerationStep {
  id: string;
  title: string;
  questions: EnumerationQuestion[];
}

export const enumerationSteps: EnumerationStep[] = [
  {
    id: "household",
    title: "Household",
    questions: [
      { id: "state", labelKey: "State", type: "select", required: true, options: ["Maharashtra", "Uttar Pradesh", "Tamil Nadu", "West Bengal", "Karnataka"] },
      { id: "householdSize", labelKey: "Number of people in the household", type: "number", required: true },
      { id: "housingType", labelKey: "Type of housing", type: "select", required: true, options: ["Owned", "Rented", "Institutional", "Other"] },
    ],
  },
  {
    id: "amenities",
    title: "Amenities",
    questions: [
      { id: "electricity", labelKey: "Household has electricity access", type: "boolean", required: true },
      { id: "piped_water", labelKey: "Household has piped water access", type: "boolean", required: true },
      { id: "internet", labelKey: "Household has internet access", type: "boolean", required: false },
    ],
  },
  {
    id: "language",
    title: "Language",
    questions: [
      { id: "language", labelKey: "Preferred language for correspondence", type: "select", required: true, options: ["English", "Hindi", "Marathi", "Tamil", "Bengali"] },
    ],
  },
];
