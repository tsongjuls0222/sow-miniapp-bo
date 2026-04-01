import { useEffect, useMemo, useRef, useState } from "react";
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

  const headerRef = useRef(null);

  const currentLanguage = useMemo(() => {
    return lang === "en"
      ? { label: "English", flag: GB_logo }
      : { label: "Svenska", flag: SE_logo };
  }, [lang]);

  const navItems = useMemo(
    () => [
      { label: t("Home"), to: "/" },
      { label: t("Order"), to: "/" },
      { label: t("Our Customers"), to: "/" },
      { label: t("About Us"), to: "/" },
      { label: t("Contact Us"), to: "/" }
    ],
    [t]
  );

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
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      closeAll();
    };

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        closeAll();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="topbar" ref={headerRef}>
      <div className="container header-inner">
        <div className="logo">
          <Link to="/login" onClick={closeAll}>
            <img src={diamond_logo} alt="Diamond logo" />
          </Link>
        </div>

        <nav className="desktop-nav" aria-label="Desktop navigation">
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} onClick={closeAll}>
              {item.label}
            </Link>
          ))}

          <div className="lang-wrapper">
            <button
              type="button"
              className="lang-trigger"
              onClick={toggleLang}
              aria-expanded={isLangOpen}
              aria-haspopup="true"
            >
              <span>{currentLanguage.label}</span>
              <img
                src={currentLanguage.flag}
                alt={currentLanguage.label}
                className="flag-img"
              />
            </button>

            <div className={`lang-dropdown ${isLangOpen ? "show" : ""}`}>
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
        </nav>

        <div className="mobile-right">
          <button
            type="button"
            className={`menu-btn ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
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
              aria-expanded={isLangOpen}
              aria-haspopup="true"
            >
              <span>{currentLanguage.label}</span>
              <img
                src={currentLanguage.flag}
                alt={currentLanguage.label}
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
        </div>

        <div className={`mobile-menu ${isMenuOpen ? "show" : ""}`}>
          {navItems.map((item) => (
            <Link key={item.label} to={item.to} onClick={closeAll}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;