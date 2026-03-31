import { useState } from "react";
import "@/styles/header.css";
import { useLanguage } from "@/global/LanguageContext";

function MobileMenu() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="mobile-header mobile-only">
        <button className="menu-btn" onClick={toggleMenu}>
          ☰
        </button>

        <div className="mobile-lang">
          English <span>🇬🇧</span>
        </div>
      </header>

      {isOpen && (
        <div className="mobile-menu mobile-only">
          <a href="#">{t("Home")}</a>
          <a href="#">{t("Order")}</a>
          <a href="#">{t("Our Customers")}</a>
          <a href="#">{t("About us")}</a>
          <a href="#">{t("Contact Us")}</a>
        </div>
      )}
    </>
  );
}

export default MobileMenu;