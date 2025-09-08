import { useLayoutEffect, useRef } from "react";
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
      description: [
        "React",
        "JavaScript",
        "TypeScript",
        "SCSS",
        "GSAP",
        "адаптивный дизайн",
      ],
      icon: "🎨",
    },
    {
      title: "Backend Development",
      subtitle: "быстрые и надёжные серверные решения",
      description: [
        "Node.js",
        "Express",
        "PostgreSQL",
        "Redis",
        "REST API",
        "микросервисы",
      ],
      icon: "⚡",
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
