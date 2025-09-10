import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.scss";

gsap.registerPlugin(ScrollTrigger);

const FloatingSymbol = ({ children, delay = 0, index }) => {
  const symbolRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Случайная позиция и движение
      const isMobile = window.innerWidth <= 768;
      const opacity = isMobile
        ? Math.random() * 0.15 + 0.05
        : Math.random() * 0.25 + 0.08;

      gsap.set(symbolRef.current, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        opacity: opacity,
      });

      // Плавающая анимация
      gsap.to(symbolRef.current, {
        x: `+=${Math.random() * 200 - 100}`,
        y: `+=${Math.random() * 200 - 100}`,
        rotation: `+=${Math.random() * 180 - 90}`,
        duration: Math.random() * 10 + 15,
        delay,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Случайное мерцание (более тонкое)
      const flickerOpacity = isMobile
        ? Math.random() * 0.2 + 0.03
        : Math.random() * 0.3 + 0.05;
      gsap.to(symbolRef.current, {
        opacity: flickerOpacity,
        duration: Math.random() * 4 + 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    }, symbolRef);

    return () => ctx.revert();
  }, [delay, index]);

  return (
    <div ref={symbolRef} className="floating-symbol">
      {children}
    </div>
  );
};

const Contact = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Начальные состояния
      gsap.set(".contact-title", {
        opacity: 0,
        y: 40,
      });

      gsap.set(".contact-text", {
        opacity: 0,
        y: 25,
      });

      gsap.set(".contact-email", {
        opacity: 0,
        y: 30,
      });

      // Анимация при скролле
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Заголовок
          gsap.to(".contact-title", {
            duration: 0.3,
            opacity: progress < 0.1 ? 0 : Math.min(1, progress * 3),
            y: progress < 0.3 ? 40 * (1 - progress * 3.33) : 0,
            overwrite: "auto",
          });

          // Текст описания (с мягкой анимацией)
          gsap.to(".contact-text", {
            duration: 0.4,
            opacity:
              progress < 0.15 ? 0 : Math.min(0.7, (progress - 0.1) * 1.5),
            y: progress < 0.35 ? 25 * (1 - progress * 2.8) : 0,
            overwrite: "auto",
          });

          // Email
          gsap.to(".contact-email", {
            duration: 0.3,
            opacity: progress < 0.25 ? 0 : Math.min(1, (progress - 0.2) * 2),
            y: progress < 0.4 ? 30 * (1 - progress * 2.5) : 0,
            overwrite: "auto",
          });
        },
      });

      // Hover эффекты для email
      const emailLink = sectionRef.current.querySelector(".contact-email");
      if (emailLink) {
        emailLink.addEventListener("mouseenter", () => {
          gsap.to(emailLink, {
            y: -4,
            duration: 0.25,
            ease: "power2.out",
          });
        });

        emailLink.addEventListener("mouseleave", () => {
          gsap.to(emailLink, {
            y: 0,
            duration: 0.25,
            ease: "power2.out",
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Символы для анимации - значительно меньше на мобильных устройствах
  const symbols = [
    "{ }",
    "< >",
    "[ ]",
    "( )",
    "/>",
    "💻",
    "⚡",
    "✨",
    "🚀",
    "💡",
    "🎯",
    "=>",
    "&&",
    "||",
    "++",
    "--",
    "API",
    "CSS",
    "JS",
    "HTML",
    "React",
  ];

  // Значительно уменьшаем количество символов на мобильных устройствах
  const isMobile = window.innerWidth <= 768;
  const displaySymbols = isMobile ? symbols.slice(0, 10) : symbols.slice(0, 22);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* Плавающие символы на заднем фоне */}
      <div className="contact-bg-animation">
        {displaySymbols.map((symbol, index) => (
          <FloatingSymbol key={index} delay={index * 0.2} index={index}>
            {symbol}
          </FloatingSymbol>
        ))}
      </div>

      <div className="contact__container">
        <h2 className="contact-title">{t("contact.subtitle")}</h2>

        <p className="contact-text">{t("contact.title")}</p>

        <a
          href={`mailto:${t("contact.email")}`}
          className="contact-email"
          aria-label={`Send email to ${t("contact.email")}`}
        >
          {t("contact.email")}
        </a>
      </div>
    </section>
  );
};

export default Contact;
