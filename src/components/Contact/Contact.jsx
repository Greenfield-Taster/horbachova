import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.scss";

gsap.registerPlugin(ScrollTrigger);

const FloatingSymbol = ({ children, delay = 0, index }) => {
  const symbolRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Случайная позиция и движение
      gsap.set(symbolRef.current, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        rotation: Math.random() * 360,
        opacity: Math.random() * 0.3 + 0.1,
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

      // Случайное мерцание
      gsap.to(symbolRef.current, {
        opacity: Math.random() * 0.4 + 0.05,
        duration: Math.random() * 3 + 2,
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
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Начальные состояния
      gsap.set(".contact-title", {
        opacity: 0,
        y: 40,
      });

      gsap.set(".contact-email", {
        opacity: 0,
        y: 30,
      });

      gsap.set(".contact-links a", {
        opacity: 0,
        y: 20,
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

          // Email
          gsap.to(".contact-email", {
            duration: 0.3,
            opacity: progress < 0.2 ? 0 : Math.min(1, (progress - 0.1) * 2),
            y: progress < 0.4 ? 30 * (1 - progress * 2.5) : 0,
            overwrite: "auto",
          });

          // Ссылки
          gsap.to(".contact-links a", {
            duration: 0.3,
            opacity: progress < 0.3 ? 0 : Math.min(1, (progress - 0.2) * 1.5),
            y: progress < 0.5 ? 20 * (1 - progress * 2) : 0,
            stagger: 0.05,
            overwrite: "auto",
          });
        },
      });

      // Hover эффекты для ссылок
      const links = sectionRef.current.querySelectorAll(".contact-links a, .contact-email");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -3,
            duration: 0.2,
            ease: "power2.out",
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Символы для анимации
  const symbols = [
    "{ }", "< >", "[ ]", "( )", "/>", "=>", 
    "&&", "||", "++", "--", "===", "!==", 
    "fn()", "API", "CSS", "JS", "HTML", "React",
    "💻", "⚡", "✨", "🚀", "💡", "🎯"
  ];

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      
      {/* Плавающие символы на заднем фоне */}
      <div className="contact-bg-animation">
        {symbols.map((symbol, index) => (
          <FloatingSymbol 
            key={index} 
            delay={index * 0.2} 
            index={index}
          >
            {symbol}
          </FloatingSymbol>
        ))}
      </div>

      <div className="contact__container">
        
        <h2 className="contact-title">
          Get In Touch
        </h2>

        <a 
          href="mailto:horbachova@gmail.com" 
          className="contact-email"
          aria-label="Send email to horbachova@gmail.com"
        >
          horbachova@gmail.com
        </a>

        <div className="contact-links">
          <a 
            href="https://linkedin.com/in/horbachova" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
          >
            LinkedIn
          </a>
          <span className="contact-divider">•</span>
          <a 
            href="https://github.com/horbachova" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            GitHub
          </a>
        </div>

      </div>
    </section>
  );
};

export default Contact;