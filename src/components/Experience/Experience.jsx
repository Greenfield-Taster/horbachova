import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".experience-card");

      gsap.set(cards, { opacity: 0, y: 60, scale: 0.96 });
      gsap.set(".experience-title", { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(".experience-title", {
        duration: 0.6,
        opacity: 1,
        y: 0,
        ease: "power2.out",
      }).to(
        cards,
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.2"
      );

      mm.add("(min-width: 768px)", () => {
        gsap.to(".experience__light-beam", {
          duration: 4,
          y: "80vh",
          opacity: 0.7,
          repeat: -1,
          ease: "power2.inOut",
          delay: 0.6,
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const projects = [
    {
      category: t('experience.projects.landing.category'),
      title: t('experience.projects.landing.title'),
      description: t('experience.projects.landing.description'),
      color: "#4F46E5",
      icon: "🎯",
    },
    {
      category: t('experience.projects.webapp.category'),
      title: t('experience.projects.webapp.title'),
      description: t('experience.projects.webapp.description'),
      color: "#06B6D4",
      icon: "⚡",
    },
    {
      category: t('experience.projects.ecommerce.category'),
      title: t('experience.projects.ecommerce.title'),
      description: t('experience.projects.ecommerce.description'),
      color: "#10B981",
      icon: "🛒",
    },
    {
      category: t('experience.projects.integrations.category'),
      title: t('experience.projects.integrations.title'),
      description: t('experience.projects.integrations.description'),
      color: "#F59E0B",
      icon: "🔧",
    },
    {
      category: t('experience.projects.databases.category'),
      title: t('experience.projects.databases.title'),
      description: t('experience.projects.databases.description'),
      color: "#8B5CF6",
      icon: "🗄️",
    },
    {
      category: t('experience.projects.backend.category'),
      title: t('experience.projects.backend.title'),
      description: t('experience.projects.backend.description'),
      color: "#EF4444",
      icon: "🚀",
    },
  ];

  const hexToRgb = (hex) => {
    const s = hex.replace("#", "");
    const n =
      s.length === 3
        ? s
            .split("")
            .map((c) => c + c)
            .join("")
        : s;
    const v = [n.slice(0, 2), n.slice(2, 4), n.slice(4, 6)].map((h) =>
      parseInt(h, 16)
    );
    return `${v[0]} ${v[1]} ${v[2]}`;
  };

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="experience__light-beam"></div>

      <div className="experience__container">
        <div className="experience-title">
          <h2 className="experience-title__main">{t('experience.title')}</h2>
          <p className="experience-title__sub">{t('experience.subtitle')}</p>
        </div>

        <div className="experience-grid">
          {projects.map((project, index) => (
            <div
              key={index}
              className="experience-card"
              ref={(el) => (cardsRef.current[index] = el)}
              style={{ "--project-rgb": hexToRgb(project.color) }}
            >
              <div className="experience-card__inner">
                <div className="experience-card__header">
                  <div className="experience-card__icon">{project.icon}</div>
                  <div className="experience-card__category">
                    {project.category}
                  </div>
                </div>

                <h3 className="experience-card__title">{project.title}</h3>
                <p className="experience-card__description">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
