import React, { createContext, useContext, useState, useEffect } from "react";
import { LanguageCode, SUPPORTED_LANGUAGES, LanguageInfo, t as translateHelper } from "../lib/i18n";

interface LanguageContextType {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  t: (key: string) => string;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => key,
  languages: SUPPORTED_LANGUAGES,
});

function getStoredLang(): LanguageCode {
  try {
    if (typeof window !== "undefined" && window.localStorage && typeof window.localStorage.getItem === "function") {
      const saved = window.localStorage.getItem("census2027_lang");
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved as LanguageCode;
      }
    }
  } catch (_e) {
    // ignore storage access error
  }
  return "en";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<LanguageCode>(getStoredLang);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.localStorage && typeof window.localStorage.setItem === "function") {
        window.localStorage.setItem("census2027_lang", lang);
      }
      if (typeof document !== "undefined") {
        document.documentElement.lang = lang;
      }
    } catch (_e) {
      // ignore storage access error
    }
  }, [lang]);

  const setLang = (newLang: LanguageCode) => {
    setLangState(newLang);
  };

  const t = (key: string) => {
    return translateHelper(key, lang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, languages: SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

