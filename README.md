# 🏛️ Census 2027: India's First Digital Census Portal

> **PromptWars × ADYPU Hackathon Submission**
> A civic web application and misinformation verification engine engineered for India's 2027 digital census.

---

## 🌟 Key Highlights & Rubric Alignment

| Rubric Area | Implementation Details |
|---|---|
| **Problem Statement Alignment** | Fully explains Phase 1 (Housing & Amenities) vs. Phase 2 (Population Enumeration), presents state schedules, guides digital self-enumeration with stepper & QR token, combats rumors citing Census Act 1948, and visualizes progress data. |
| **Google Services & GenAI** | Integrated with **Google Gemini API** (`@google/generative-ai`) via a zero-leak server-side proxy for interactive civic guidance, rumor verification, and multi-language translation. Deployable to Firebase Hosting & Cloud Functions. |
| **Multi-Language Accessibility** | Instant zero-latency UI translation across **6 Indian Languages** (English, हिन्दी, मराठी, தமிழ், বাংলা, ಕನ್ನಡ) with pre-cached dictionaries and live GenAI fallback. |
| **Code Quality & Security** | Server-side API key isolation (`GEMINI_API_KEY` never enters browser JS), TypeScript strict mode, clean modular design, and robust fallback handlers. |
| **Testing & Reliability** | **100% Passing Automated Tests** via Vitest & React Testing Library across 5 dedicated test suites (`phaseData`, `formSubmit`, `dataVisual`, `chatAssist`, `languageSwitch`). |
| **Accessibility (a11y)** | WCAG-compliant semantic HTML5, skip navigation links, focus-visible styling, `aria-live="polite"` regions on AI responses, and accessible alternative data tables. |

---

## 🎨 Design Philosophy: "The Digital Gazette"

Unlike generic SaaS templates, this portal adopts a civic notice-board and ledger aesthetic:
- **Palette**: Paper (`#F7F3EC`), Ink (`#1C1B19`), Soft Ink (`#52504B`), Terracotta Accent (`#B5482E`).
- **Typography**: Fraunces (authoritative display serif) + IBM Plex Sans (native Devanagari & Indian script support).
- **Physical-Digital Bridging**: Self-enumeration generates a printable/scannable Verification Slip with an SVG QR token for the visiting field enumerator.

---

## 🚀 Quickstart

### Prerequisites
- Node.js (v18+)
- npm

### 1. Installation
```bash
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(Note: If no API key is provided, the system seamlessly operates with built-in rule-based fallback responses so all features remain functional).*

### 3. Run Development Server
```bash
npm run dev
```
Starts the client (`http://localhost:5173`) and the Express proxy (`http://localhost:5174`) concurrently.

### 4. Run Automated Test Suite
```bash
npm test
```

### 5. Build for Production
```bash
npm run build
```

---

## 📁 Architecture Overview

```
census2027/
├── server/
│   └── index.ts                 # Express Gemini proxy (keeps API key secure)
├── functions/
│   └── gemini-proxy.ts          # Firebase Cloud Function entrypoint
├── src/
│   ├── components/
│   │   ├── ChatAssist.tsx       # AI civic assistant & rumor buster
│   │   ├── LanguageSwitcher.tsx # Multi-language selector
│   │   ├── Stepper.tsx          # Numbered paper-form stepper
│   │   └── icons.tsx            # Lightweight inline SVG icons
│   ├── context/
│   │   └── LanguageContext.tsx  # Global reactive i18n state provider
│   ├── data/
│   │   ├── censusStats.ts       # State enumeration progress metrics
│   │   ├── phases.ts            # Phase 1 & Phase 2 definitions
│   │   ├── questions.ts         # Schema-driven self-enumeration questions
│   │   └── states.ts            # State windows & schedules
│   ├── lib/
│   │   ├── geminiClient.ts      # Client-side API caller with fallback
│   │   └── i18n.ts              # Pre-cached translation dictionaries
│   ├── pages/
│   │   ├── Home.tsx             # Gazette table-of-contents noticeboard
│   │   ├── Phases.tsx           # Two Phases explanation & data parameters
│   │   ├── StateSchedule.tsx    # State-wise windows & dates
│   │   ├── SelfEnumeration.tsx  # Multi-step self-enumeration & QR slip
│   │   ├── PrivacyAndMyths.tsx  # Section 15 safeguards & Myth ledger
│   │   └── DataVisual.tsx       # State progress ledger & accessible table
│   └── styles/
│       ├── tokens.css           # Design tokens (colors, typography, grid)
│       └── global.css           # Gazette layout, a11y, and print styles
└── tests/
    ├── chatAssist.test.tsx      # AI widget & myth checks
    ├── dataVisual.test.tsx      # Visualization & accessible table modes
    ├── formSubmit.test.tsx      # Stepper validation & record creation
    ├── languageSwitch.test.tsx  # Multi-language switching assertions
    └── phaseData.test.tsx       # Phase rendering
```

---

## 📜 Legal & Compliance References Included
- **Section 15, Census Act 1948**: Absolute individual confidentiality, inadmissible as court evidence.
- **DPDP Act 2023**: 256-bit encryption for transit and sovereign server storage.
- **Voluntary Aadhaar**: Clear statutory clarification that Aadhaar is optional for Census 2027.
"# Cen-Sus-2027" 
"# Cen-Sus-2027" 
