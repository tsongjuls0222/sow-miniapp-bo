import { useState } from "react";
import { FaBars } from "react-icons/fa";
import GB_logo from "@/assets/GB.png";
import SE_logo from "@/assets/SE.png";
import styles from "@/styles/module/topbar.module.css";
import { useLanguage } from "@/global/LanguageContext";

function Topbar({ onHamburgerClick }) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { label: "English", flag: GB_logo },
    { label: "Svenska", flag: SE_logo }
  ];

  const langLabel = lang === "en" ? languages[0] : languages[1];

  const [selected, setSelected] = useState(langLabel);

  return (
    <header className={styles.topbar}>
      <div className={styles.profileSection}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={onHamburgerClick}
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        <div className={styles.avatar}>👨</div>

        <div className={styles.profileText}>
          <h3>John Andre</h3>
          <p>Storfjord AS</p>
        </div>
      </div>

      <div className={styles.languageSection}>
        <button
          type="button"
          className={styles.langTrigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{selected.label}</span>
          <img
            src={selected.flag}
            alt={selected.label}
            className={styles.langFlag}
          />
        </button>

        {open && (
          <div className={styles.langDropdown}>
            {languages.map((lang, index) => (
              <button
                key={index}
                type="button"
                className={styles.langItem}
                onClick={() => {
                  setSelected(lang);
                  setOpen(false);
                }}
              >
                <span>{lang.label}</span>
                <img
                  src={lang.flag}
                  alt={lang.label}
                  className={styles.langFlag}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export default Topbar;