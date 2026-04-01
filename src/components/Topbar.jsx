import { useState } from "react";
import { FaBars } from "react-icons/fa";
import GB_logo from "@/assets/GB.png";
import SE_logo from "@/assets/SE.png";
import styles from "@/styles/module/topbar.module.css";
import { useLanguage } from "@/global/LanguageContext";
import { useAuth } from "@/global/AuthContext";

function Topbar({ onHamburgerClick }) {
  const { user } = useAuth();
  const { lang, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: GB_logo },
    { code: "sv", label: "Svenska", flag: SE_logo }
  ];

  const selected = languages.find((l) => l.code === lang) || languages[0];

  const handleLanguageChange = (selectedLang) => {
    changeLanguage(selectedLang);
    setOpen(false);
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.profileSection}>
        <button
          type="button"
          className={styles.hamburger}
          onClick={onHamburgerClick}
        >
          <FaBars />
        </button>

        <div className={styles.avatar}>👨</div>

        <div className={styles.profileText}>
          <h3>{user?.first_name} {user?.last_name}</h3>
          <p>{user?.email}</p>
        </div>
      </div>

      <div className={styles.languageSection}>
        <button
          type="button"
          className={styles.langTrigger}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{selected.label}</span>
          <img src={selected.flag} alt={selected.label} className={styles.langFlag} />
        </button>

        {open && (
          <div className={styles.langDropdown}>
            {languages.map((item, index) => (
              <button
                key={index}
                type="button"
                className={styles.langItem}
                onClick={() => handleLanguageChange(item.code)}
              >
                <span>{item.label}</span>
                <img
                  src={item.flag}
                  alt={item.label}
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