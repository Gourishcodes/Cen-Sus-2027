import type { StateSchedule } from "../types/census";

// Realistic mock data — NOT official Census dates. Representative sample of
// states/UTs, enough to demo the schedule + language coverage requirements.
export const states: StateSchedule[] = [
  {
    stateCode: "MH",
    stateName: "Maharashtra",
    phase1: { start: "2027-04-01", end: "2027-05-15" },
    phase2: { start: "2027-09-01", end: "2027-10-15" },
    selfEnumerationWindow: { start: "2027-08-15", end: "2027-09-30" },
    languagesAvailable: ["mr", "hi", "en"],
  },
  {
    stateCode: "UP",
    stateName: "Uttar Pradesh",
    phase1: { start: "2027-04-10", end: "2027-05-25" },
    phase2: { start: "2027-09-05", end: "2027-10-20" },
    selfEnumerationWindow: { start: "2027-08-20", end: "2027-10-05" },
    languagesAvailable: ["hi", "ur", "en"],
  },
  {
    stateCode: "TN",
    stateName: "Tamil Nadu",
    phase1: { start: "2027-04-01", end: "2027-05-10" },
    phase2: { start: "2027-09-01", end: "2027-10-10" },
    selfEnumerationWindow: { start: "2027-08-10", end: "2027-09-25" },
    languagesAvailable: ["ta", "en"],
  },
  {
    stateCode: "WB",
    stateName: "West Bengal",
    phase1: { start: "2027-04-05", end: "2027-05-20" },
    phase2: { start: "2027-09-03", end: "2027-10-18" },
    selfEnumerationWindow: { start: "2027-08-18", end: "2027-10-02" },
    languagesAvailable: ["bn", "hi", "en"],
  },
  {
    stateCode: "KA",
    stateName: "Karnataka",
    phase1: { start: "2027-04-01", end: "2027-05-15" },
    phase2: { start: "2027-09-01", end: "2027-10-15" },
    selfEnumerationWindow: { start: "2027-08-15", end: "2027-09-30" },
    languagesAvailable: ["kn", "en"],
  },
];
