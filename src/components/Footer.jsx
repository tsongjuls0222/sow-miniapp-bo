import "@/styles/footer.css";
import { useLanguage } from "@/global/LanguageContext";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer desktop-only">
      <div className="container">
        <div className="footer-line"></div>

        <div className="footer-content">
          <div className="footer-left"></div>

          <div className="footer-center">
            © Lättfaktura, CRO no. 638537, 2025. {t("All rights reserved.")}
          </div>

          <div className="footer-right">
            <a href="#">{t("Home")}</a>
            <a href="#">{t("Order")}</a>
            <a href="#">{t("Contact Us")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;