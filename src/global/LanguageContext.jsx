import { createContext, useContext, useEffect, useState } from "react";
import { GetLanguage } from "@/services/authService";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [translations, setTranslations] = useState({});
  const [loading, setLoading] = useState(true);

  const changeLanguage = async (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);

    await loadLanguage(newLang);
  };

  const loadLanguage = async (selectedLang) => {
    try {
      const res = await GetLanguage(selectedLang);
      console.log("Language API123 response:", JSON.parse(res?.data?.data?.json));
      setTranslations(JSON.parse(res?.data?.data?.json));
    } catch (err) {
      console.error("Language API error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("lang") || "en";
    setLang(savedLang);

    loadLanguage(savedLang);
  }, []);

  const t = (key) => {
    return translations?.[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        changeLanguage,
        t,
        loading
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}