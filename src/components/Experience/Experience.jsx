import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useThrottledCallback } from "../../hooks/useThrottledCallback";
import "./Experience.scss";

gsap.registerPlugin(ScrollTrigger);

const HologramLines = () => {
  return (
    <div className="hologram-lines">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className={`hologram-line hologram-line--${i + 1}`} />
      ))}
    </div>
  );
};

const Experience = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Начальное состояние карточек
      gsap.set(".experience-card", {
        rotateX: 25,
        rotateY: 15,
        z: -200,
        opacity: 0,
        scale: 0.7
      });

      gsap.set(".experience-title", {
        opacity: 0,
        y: 80,
        rotateX: 45
      });

      // Анимация появления при скролле
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1,
        }
      });

      // Заголовок
      tl.to(".experience-title", {
        duration: 1,
        opacity: 1,
        y: 0,
        rotateX: 0,
        ease: "power3.out"
      })
      // Карточки
      .to(".experience-card", {
        duration: 1.5,
        rotateX: 0,
        rotateY: 0,
        z: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        ease: "power2.out"
      }, "-=0.5");

      // Плавающая анимация
      gsap.to(".experience-card", {
        duration: 8,
        rotateY: "+=3",
        z: "+=20",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 1
      });

      // Анимация голограммных линий
      gsap.to(".hologram-line", {
        duration: 3,
        scaleY: 0.8,
        opacity: 0.3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.2
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = useThrottledCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });

    // Параллакс для карточек
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const intensity = (index + 1) * 2;
        const offsetX = (x - 0.5) * intensity;
        const offsetY = (y - 0.5) * intensity;
        
        gsap.to(card, {
          duration: 0.6,
          rotateY: offsetX,
          rotateX: -offsetY,
          ease: "power2.out"
        });
      }
    });
  }, 16);

  const handleCardHover = (index) => {
    setActiveCard(index);
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        duration: 0.4,
        scale: 1.05,
        z: 50,
        ease: "power2.out"
      });
    }
  };

  const handleCardLeave = (index) => {
    setActiveCard(null);
    const card = cardsRef.current[index];
    if (card) {
      gsap.to(card, {
        duration: 0.4,
        scale: 1,
        z: 0,
        ease: "power2.out"
      });
    }
  };

  const projects = [
    {
      category: "Landing Pages",
      title: "Product Showcases",
      description: "Одностраничные сайты для продуктов, мероприятий или компаний. Фокус на дизайн, анимацию и скорость загрузки.",
      tech: ["React", "GSAP", "Optimize"],
      color: "#4F46E5",
      icon: "🎯"
    },
    {
      category: "Web Applications", 
      title: "Full-Stack Solutions",
      description: "Быстрый запуск продукта \"с нуля\": авторизация, личные кабинеты, панели администрирования.",
      tech: ["React", "Node.js", "Auth"],
      color: "#06B6D4",
      icon: "⚡"
    },
    {
      category: "E-Commerce",
      title: "Online Stores",
      description: "Интернет-магазины с корзиной, оплатами (Stripe, PayPal) и управлением товарами.",
      tech: ["Next.js", "Stripe", "CMS"],
      color: "#10B981",
      icon: "🛒"
    },
    {
      category: "Integrations",
      title: "API & Automations",
      description: "Интеграция API, миграция данных, настройка автоматизаций.",
      tech: ["Python", "APIs", "Cloud"],
      color: "#F59E0B",
      icon: "🔧"
    },
    {
      category: "Backend Systems",
      title: "High-Load Solutions", 
      description: "Разработка надёжного backend под высокую нагрузку.",
      tech: ["Node.js", "PostgreSQL", "Redis"],
      color: "#EF4444",
      icon: "🚀"
    }
  ];

  return (
    <section 
      id="experience"
      className="experience" 
      ref={sectionRef}
      onMouseMove={handleMouseMove}
    >
      <HologramLines />
      
      <div className="experience__container">
        <div className="experience-title">
          <h2 className="experience-title__main">Experience</h2>
          <p className="experience-title__sub">digital solutions portfolio</p>
        </div>

        <div className="experience-grid">
          {projects.map((project, index) => (
            <div 
              key={index}
              className={`experience-card ${activeCard === index ? 'experience-card--active' : ''}`}
              ref={el => cardsRef.current[index] = el}
              style={{ '--project-color': project.color }}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardLeave(index)}
            >
              <div className="experience-card__inner">
                <div className="experience-card__header">
                  <div className="experience-card__icon">{project.icon}</div>
                  <div className="experience-card__category">{project.category}</div>
                </div>
                
                <h3 className="experience-card__title">{project.title}</h3>
                <p className="experience-card__description">{project.description}</p>
                
                <div className="experience-card__tech">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">{tech}</span>
                  ))}
                </div>
                
                {/* Голограммные эффекты */}
                <div className="experience-card__glow"></div>
                <div className="experience-card__scan-line"></div>
                <div className="experience-card__border-glow"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Декоративная сетка */}
        <div className="experience-grid-bg">
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i} className="grid-line" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;