import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.scss";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer-nav">
          <button onClick={scrollToTop}>{t('footer.home')}</button>
          <button onClick={() => scrollToSection("about")}>{t('navigation.about')}</button>
          <button onClick={() => scrollToSection("experience")}>
            {t('navigation.experience')}
          </button>
          <button onClick={() => scrollToSection("projects")}>{t('navigation.projects')}</button>
          <button onClick={() => scrollToSection("contact")}>{t('navigation.contact')}</button>
        </nav>

        <p className="footer-copyright">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
