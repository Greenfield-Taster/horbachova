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
  const gridRef = useRef(null);

  const categories = [
    { id: "frontend", icon: "🎨", color: "#06B6D4" },
    { id: "languages", icon: "💻", color: "#F59E0B" },
    { id: "design", icon: "✏️", color: "#EC4899" },
    { id: "backend", icon: "⚡", color: "#10B981" },
    { id: "tools", icon: "🔧", color: "#EF4444" },
    { id: "databases", icon: "🗄️", color: "#8B5CF6" },
    { id: "cloud", icon: "☁️", color: "#3B82F6" },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".bento-grid", {
        opacity: 0,
        y: 60,
      });

      gsap.set(".about-title", {
        opacity: 0,
        y: 50,
        rotateX: 90,
      });

      // Title animation
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

      // Entire grid appears together
      ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 88%",
        end: "top 50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".bento-grid", {
            duration: 0.4,
            opacity: progress < 0.05 ? 0 : Math.min(1, progress * 2),
            y: 60 * (1 - Math.min(1, progress * 2)),
            overwrite: "auto",
          });
        },
      });

      // Particles
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

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="code-particles">
        {Array.from({ length: 25 }, (_, i) => (
          <CodeParticle key={i} index={i} />
        ))}
      </div>

      <div className="about__container">
        <h2 className="about-title" ref={titleRef}>
          <span className="about-title__main">{t("about.title")}</span>
          <span className="about-title__sub">{t("about.subtitle")}</span>
        </h2>

        <div className="bento-grid" ref={gridRef}>
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`bento-item bento-item--${cat.id}`}
              style={{ "--accent": cat.color }}
            >
              <div className="bento-item__inner">
                <div className="bento-item__header">
                  <span className="bento-item__icon">{cat.icon}</span>
                  <h3 className="bento-item__title">
                    {t(`about.${cat.id}.title`)}
                  </h3>
                </div>
                <div className="bento-item__tags">
                  {t(`about.${cat.id}.skills`, { returnObjects: true }).map(
                    (skill, i) => (
                      <span key={i} className="bento-tag">
                        {skill}
                      </span>
                    )
                  )}
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
