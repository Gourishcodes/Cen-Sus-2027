export type PhaseId = "phase1" | "phase2";

export interface Phase {
  id: PhaseId;
  name: string;
  windowStart: string; // ISO date
  windowEnd: string; // ISO date
  dataCollected: string[];
  description: string;
}

export interface StateSchedule {
  stateCode: string;
  stateName: string;
  phase1: { start: string; end: string };
  phase2: { start: string; end: string };
  selfEnumerationWindow: { start: string; end: string };
  languagesAvailable: string[]; // ISO 639-1 codes
}

export interface EnumerationRecord {
  id: string;
  timestampSubmitted: string;
  stateCode: string;
  language: string;
  householdSize: number;
  responses: Record<string, string | number | boolean>;
  status: "draft" | "submitted";
}

export interface EnumerationQuestion {
  id: string;
  labelKey: string; // key into the i18n string table
  type: "text" | "number" | "select" | "boolean";
  options?: string[];
  required: boolean;
}
