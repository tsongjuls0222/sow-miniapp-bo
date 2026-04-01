import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { GetLanguage } from "@/services/authService";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const loadLanguage = useCallback(async (selectedLang) => {
    try {
      setLoading(true);

      const res = await GetLanguage(selectedLang);
      const rawJson = res?.data?.data?.json;

      if (!rawJson) {
        setTranslations({});
        return;
      }

      let parsedTranslations = {};

      if (typeof rawJson === "string") {
        parsedTranslations = JSON.parse(rawJson);
      } else if (typeof rawJson === "object") {
        parsedTranslations = rawJson;
      }

      setTranslations(parsedTranslations || {});
    } catch (error) {
      console.error("Language API error:", error);
      setTranslations({});
    } finally {
      setLoading(false);
    }
  }, []);

  const changeLanguage = useCallback(
    async (newLang) => {
      if (!newLang || newLang === lang) return;

      setLang(newLang);
      localStorage.setItem("lang", newLang);

      await loadLanguage(newLang);
    },
    [lang, loadLanguage]
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);
    loadLanguage(savedLang);
  }, [loadLanguage]);

  const t = useCallback(
    (key) => {
      return translations?.[key] || key;
    },
    [translations]
  );

  const value = useMemo(
    () => ({
      lang,
      changeLanguage,
      t,
      loading,
      translations
    }),
    [lang, changeLanguage, t, loading, translations]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}