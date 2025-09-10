import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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

  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 3;
  const randomDuration = 12 + Math.random() * 8;

  return (
    <div
      className="code-particle"
      style={{
        "--delay": `${randomDelay}s`,
        "--duration": `${randomDuration}s`,
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
    >
      {symbol}
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef(null);

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

      // Начальное состояние заголовка
      gsap.set(".about-title", {
        opacity: 0,
        y: 50,
        rotateX: 90,
      });

      // Анимация карточек при скролле с реверсом
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Ограничиваем рост карточек до 25% прогресса
          const maxProgress = Math.min(progress, 0.25);
          const scaleProgress = maxProgress / 0.25; // Нормализуем до 0-1
          
          gsap.to(".about-card", {
            duration: 0.3,
            rotateX: progress < 0.2 ? 15 * (1 - progress * 5) : 0,
            z: progress < 0.2 ? -100 * (1 - progress * 5) : 0,
            opacity: progress < 0.08 ? 0 : Math.min(1, progress * 3),
            scale: progress < 0.25 ? 0.8 + 0.2 * scaleProgress : 1,
            stagger: 0.1,
            overwrite: "auto",
          });
        },
      });

      // Анимация заголовка при скролле с реверсом
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".about-title", {
            duration: 0.3,
            opacity: progress < 0.1 ? 0 : Math.min(1, progress * 1.5),
            y: progress < 0.3 ? 50 * (1 - progress * 3.33) : 0,
            rotateX: progress < 0.3 ? 90 * (1 - progress * 3.33) : 0,
            overwrite: "auto",
          });
        },
      });

      // Плавающая анимация карточек
      gsap.to(".about-card", {
        duration: 6,
        rotateY: "+=3",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Анимация частиц
      gsap.to(".code-particle", {
        duration: 20,
        y: "-=30px",
        rotation: "+=180",
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.1,
          from: "random",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    {
      title: t('about.frontend.title'),
      subtitle: t('about.frontend.subtitle'),
      description: t('about.frontend.skills', { returnObjects: true }),
      icon: "🎨",
      gradient: "frontend",
    },
    {
      title: t('about.backend.title'),
      subtitle: t('about.backend.subtitle'),
      description: t('about.backend.skills', { returnObjects: true }),
      icon: "⚡",
      gradient: "backend",
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
        <h2 className="about-title" ref={titleRef}>
          <span className="about-title__main">{t('about.title')}</span>
          <span className="about-title__sub">{t('about.subtitle')}</span>
        </h2>

        <div className="about-grid" ref={cardsRef}>
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
                <div className="about-card__description">
                  {skill.description.map((desc, descIndex) => (
                    <span key={descIndex} className="description-tag">
                      {desc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
