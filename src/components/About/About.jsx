import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.scss";

gsap.registerPlugin(ScrollTrigger);

const CodeParticle = ({ index }) => {
  const symbols = [
    "{ }",
    "< >",
    "[ ]",
    "( )",
    "/>",
    "=>",
    "&&",
    "||",
    "++",
    "--",
    "===",
    "!==",
    "fn()",
    "API",
    "CSS",
    "JS",
  ];
  const symbol = symbols[index % symbols.length];

  // Случайная начальная позиция для каждой частицы
  const [initialPos] = useState({
    x: Math.random() * 100,
    y: Math.random() * 100,
  });

  return (
    <div
      className="code-particle"
      style={{
        "--delay": `${Math.random() * 3}s`,
        "--duration": `${12 + Math.random() * 8}s`,
        left: `${initialPos.x}%`,
        top: `${initialPos.y}%`,
      }}
    >
      {symbol}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Начальное состояние карточек
      gsap.set(".about-card", {
        rotateX: 15,
        rotateY: 0,
        z: -100,
        opacity: 0,
        scale: 0.8,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1,
        },
      });

      tl.to(".about-card", {
        duration: 1,
        rotateX: 0,
        z: 0,
        opacity: 1,
        scale: 1,
        stagger: 0,
        ease: "power2.out",
      });

      // Плавающая анимация карточек
      gsap.to(".about-card", {
        duration: 6,
        rotateY: "+=5",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Анимация заголовка
      gsap.fromTo(
        ".about-title",
        {
          opacity: 0,
          y: 50,
          rotateX: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-title",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      title: "Frontend Development",
      subtitle: "современные и интуитивные интерфейсы",
      description:
        "React, Next.js, TypeScript, SCSS, анимации GSAP, адаптивный дизайн",
      icon: "🎨",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Backend Development",
      subtitle: "быстрые и надёжные серверные решения",
      description:
        "Node.js, Express, PostgreSQL, Redis, REST API, микросервисы",
      icon: "⚡",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* Код частицы в фоне */}
      <div className="code-particles">
        {Array.from({ length: 25 }, (_, i) => (
          <CodeParticle key={i} index={i} />
        ))}
      </div>

      <div className="about__container">
        <h2 className="about-title">
          <span className="about-title__main">What I Create</span>
          <span className="about-title__sub">digital experiences</span>
        </h2>

        <div className="about-grid">
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="about-card"
              style={{ "--gradient": skill.gradient }}
            >
              <div className="about-card__inner">
                <div className="about-card__icon">{skill.icon}</div>
                <h3 className="about-card__title">{skill.title}</h3>
                <p className="about-card__subtitle">{skill.subtitle}</p>
                <p className="about-card__description">{skill.description}</p>

                <div className="about-card__glow"></div>
                <div className="about-card__border"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="about-decorations">
          <div className="about-decoration about-decoration--1"></div>
          <div className="about-decoration about-decoration--2"></div>
          <div className="about-decoration about-decoration--3"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
