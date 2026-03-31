import "@/styles/login.css";
import { useLanguage } from "@/global/LanguageContext";

function LoginCard({ form, onChange, onSubmit, loading, errorMessage }) {
  const { t } = useLanguage();
  return (
    <div className="login-card">
      <h1>{t("Log in")}</h1>

      <label>{t("Enter your email address")}</label>
      <div className="input-wrap">
        <input
          id="email"
          name="email"
          type="email"
          placeholder={t("Email Address")}
          value={form.email}
          onChange={onChange}
        />
      </div>

      <label>{t("Enter your password")}</label>
      <div className="input-wrap password-wrap">
        <input
          id="password"
          name="password"
          type="password"
          placeholder={t("Password")}
          value={form.password}
          onChange={onChange}
        />
        <span className="eye">◔</span>
      </div>

      {errorMessage && <p className="login-error">{errorMessage}</p>}

      <button type="button" className="login-btn" onClick={onSubmit} disabled={loading}>
        {loading ? "Loading..." : t("Log in")}
      </button>

      <div className="login-links">
        <a href="#">{t("Register")}</a>
        <a href="#">{t("Forgotten password?")}</a>
      </div>
    </div>
  );
}

export default LoginCard;