import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
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
      category: "Landing Pages",
      title: "Product Showcases",
      description:
        "Одностраничные сайты для продуктов, мероприятий или компаний. Фокус на дизайн, анимацию и скорость загрузки.",
      color: "#4F46E5",
      icon: "🎯",
    },
    {
      category: "Web Applications",
      title: "Full-Stack Solutions",
      description:
        'Быстрый запуск продукта "с нуля": авторизация, личные кабинеты, панели администрирования.',
      color: "#06B6D4",
      icon: "⚡",
    },
    {
      category: "E-Commerce",
      title: "Online Stores",
      description:
        "Интернет-магазины с корзиной, оплатами (Stripe, PayPal) и управлением товарами.",
      color: "#10B981",
      icon: "🛒",
    },
    {
      category: "Integrations",
      title: "API & Automations",
      description: "Интеграция API, миграция данных, настройка автоматизаций.",
      color: "#F59E0B",
      icon: "🔧",
    },
    {
      category: "Backend Systems",
      title: "High-Load Solutions",
      description: "Разработка надёжного backend под высокую нагрузку.",
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
          <h2 className="experience-title__main">Experience</h2>
          <p className="experience-title__sub">digital solutions portfolio</p>
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
