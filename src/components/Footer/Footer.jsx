import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.scss";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
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
          <button onClick={scrollToTop}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("experience")}>
            Experience
          </button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("contact")}>Contact</button>
        </nav>

        <p className="footer-copyright">
          © 2025 Horbachova. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
