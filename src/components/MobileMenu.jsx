import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "@/styles/header.css";
import { useLanguage } from "@/global/LanguageContext";
import GB_logo from "@/assets/GB.png";
import SE_logo from "@/assets/SE.png";

function MobileMenu() {
  const { lang, changeLanguage, t } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    setIsLangOpen(false);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsLangOpen(false);
  };

  const toggleLang = () => {
    setIsLangOpen((prev) => !prev);
  };

  const handleLanguageChange = (selectedLang) => {
    changeLanguage(selectedLang);
    setIsLangOpen(false);
    setIsOpen(false);
  };

  const currentLang = lang === "en"
    ? { label: "English", flag: GB_logo }
    : { label: "Svenska", flag: SE_logo };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="mobile-header mobile-only" ref={menuRef}>
        <button
          className={`menu-btn ${isOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <div className="mobile-lang-wrapper">
          <button
            type="button"
            className="mobile-lang-trigger"
            onClick={toggleLang}
          >
            <span>{currentLang.label}</span>
            <img
              src={currentLang.flag}
              alt={currentLang.label}
              className="flag-img"
            />
          </button>

          <div className={`mobile-lang-dropdown ${isLangOpen ? "show" : ""}`}>
            <button
              type="button"
              className="lang-option"
              onClick={() => handleLanguageChange("sv")}
            >
              <span>Svenska</span>
              <img src={SE_logo} alt="Svenska" className="flag-img" />
            </button>

            <button
              type="button"
              className="lang-option"
              onClick={() => handleLanguageChange("en")}
            >
              <span>English</span>
              <img src={GB_logo} alt="English" className="flag-img" />
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div className="mobile-menu mobile-only">
          <Link to="/" onClick={closeMenu}>{t("Home")}</Link>
          <Link to="/" onClick={closeMenu}>{t("Order")}</Link>
          <Link to="/" onClick={closeMenu}>{t("Our Customers")}</Link>
          <Link to="/" onClick={closeMenu}>{t("About Us")}</Link>
          <Link to="/" onClick={closeMenu}>{t("Contact Us")}</Link>
        </div>
      )}
    </>
  );
}

export default MobileMenu;