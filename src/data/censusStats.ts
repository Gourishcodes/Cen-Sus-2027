export interface StateCensusProgress {
  stateCode: string;
  stateName: string;
  totalHouseholdsMillion: number;
  digitalSelfEnumPercent: number;
  fieldSurveyPercent: number;
  phase1Completed: boolean;
  activeWindow: "self_enum" | "field_survey" | "upcoming" | "completed";
}

export const STATE_PROGRESS_DATA: StateCensusProgress[] = [
  {
    stateCode: "MH",
    stateName: "Maharashtra",
    totalHouseholdsMillion: 28.5,
    digitalSelfEnumPercent: 42,
    fieldSurveyPercent: 38,
    phase1Completed: true,
    activeWindow: "self_enum",
  },
  {
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    totalHouseholdsMillion: 41.2,
    digitalSelfEnumPercent: 29,
    fieldSurveyPercent: 48,
    phase1Completed: true,
    activeWindow: "field_survey",
  },
  {
    stateCode: "TN",
    stateName: "Tamil Nadu",
    totalHouseholdsMillion: 19.8,
    digitalSelfEnumPercent: 54,
    fieldSurveyPercent: 32,
    phase1Completed: true,
    activeWindow: "self_enum",
  },
  {
    stateCode: "WB",
    stateName: "West Bengal",
    totalHouseholdsMillion: 22.4,
    digitalSelfEnumPercent: 33,
    fieldSurveyPercent: 41,
    phase1Completed: true,
    activeWindow: "field_survey",
  },
  {
    stateCode: "KA",
    stateName: "Karnataka",
    totalHouseholdsMillion: 16.1,
    digitalSelfEnumPercent: 49,
    fieldSurveyPercent: 35,
    phase1Completed: true,
    activeWindow: "self_enum",
  },
];

