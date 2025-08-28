import { useState, useEffect } from "react";
import "./Navigation.scss";

const Navigation = () => {
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
          <button onClick={() => scrollToSection("about")}>About</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("experience")}>
            Experience
          </button>
        </li>
        <li>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
        </li>
        <li>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
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
