import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "@/styles/header.css";
import diamond_logo from "@/assets/diamond.png";
import GB_logo from "@/assets/GB.png";
import SE_logo from "@/assets/SE.png";
import { useLanguage } from "@/global/LanguageContext";

function Header() {
  const { lang, changeLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langLabel = lang === "en" ? "English" : "Svenska";
  const langFlag = lang === "en" ? GB_logo : SE_logo;

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsLangOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLangOpen(false);
  };

  const toggleLang = () => {
    setIsLangOpen((prev) => !prev);
  };

  const handleLanguageChange = (selectedLang) => {
    changeLanguage(selectedLang);
    setIsLangOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      closeAll();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="topbar">
      <div className="container header-inner">
        <div className="logo">
          <Link to="/login" onClick={closeAll}>
            <img src={diamond_logo} alt="Diamond logo" />
          </Link>
        </div>

        <nav className="desktop-nav">
          <a href="/">{t("Home")}</a>
          <a href="/">{t("Order")}</a>
          <a href="/">{t("Our Customers")}</a>
          <a href="/">{t("About Us")}</a>
          <a href="/">{t("Contact Us")}</a>

          <div className="lang-wrapper">
            <button
              type="button"
              className="lang-trigger"
              onClick={toggleLang}
            >
              <span>{langLabel}</span>
              <img src={langFlag} alt={langLabel} className="flag-img" />
            </button>

            <div className={`lang-dropdown ${isLangOpen ? "show" : ""}`}>
                <button
                    type="button"
                    className="lang-option"
                    onClick={() => handleLanguageChange("sv")}
                >
                    <span>Svenska</span>
                    <img src={SE_logo} className="flag-img" />
                </button>

                <button
                    type="button"
                    className="lang-option"
                    onClick={() => handleLanguageChange("en")}
                >
                    <span>English</span>
                    <img src={GB_logo} className="flag-img" />
                </button>
                </div>
          </div>
        </nav>

        <div className="mobile-right">
          <button
            type="button"
            className={`menu-btn ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="mobile-lang-wrapper">
            <button
              type="button"
              className="mobile-lang-trigger"
              onClick={toggleLang}
            >
              <span>{langLabel}</span>
              <img src={langFlag} alt={langLabel} className="flag-img" />
            </button>

            <div className={`mobile-lang-dropdown ${isLangOpen ? "show" : ""}`}>
              <button type="button" className="lang-option"
                onClick={() => handleLanguageChange("sv")}
              >
                <span>Svenska</span>
                <img src={SE_logo} alt="Svenska" className="flag-img" />
              </button>

              <button type="button" className="lang-option"
                onClick={() => handleLanguageChange("en")}
              >
                <span>English</span>
                <img src={GB_logo} alt="English" className="flag-img" />
              </button>
            </div>
          </div>
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
          <a href="/" onClick={closeAll}>{t("Home")}</a>
          <a href="/" onClick={closeAll}>{t("Order")}</a>
          <a href="/" onClick={closeAll}>{t("Our Customers")}</a>
          <a href="/" onClick={closeAll}>{t("About Us")}</a>
          <a href="/" onClick={closeAll}>{t("Contact Us")}</a>
        </div>
      </div>
    </header>
  );
}

export default Header;