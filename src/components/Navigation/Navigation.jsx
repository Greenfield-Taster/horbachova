import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./Navigation.scss";

const Navigation = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Блокируем прокрутку страницы когда меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  return (
    <nav className="navigation">
      <button
        className={`navigation__burger ${
          isMenuOpen ? "navigation__burger--open" : ""
        }`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul
        className={`navigation__menu ${
          isMenuOpen ? "navigation__menu--open" : ""
        }`}
      >
        <li>
          <button onClick={() => scrollToSection("about")}>{t('navigation.about')}</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("experience")}>
            {t('navigation.experience')}
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("projects")}>{t('navigation.projects')}</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("contact")}>{t('navigation.contact')}</button>
        </li>
      </ul>

      {isMenuOpen && (
        <div
          className="navigation__overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navigation;
