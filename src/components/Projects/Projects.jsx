import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.scss";

gsap.registerPlugin(ScrollTrigger);

const FloatingCode = ({ index }) => {
  const codeSnippets = [
    "npm install",
    "git commit",
    "const api =",
    "useEffect()",
    "async/await",
    "useState()",
    "middleware",
    "JWT token",
    "PostgreSQL",
    "WebSocket",
    "REST API",
    "Redux store",
    "SCSS vars",
    "responsive",
    "NODE_ENV",
    "express()",
  ];
  
  const snippet = codeSnippets[index % codeSnippets.length];
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 4;
  const randomDuration = 15 + Math.random() * 10;

  return (
    <div
      className="floating-code"
      style={{
        "--delay": `${randomDelay}s`,
        "--duration": `${randomDuration}s`,
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
    >
      {snippet}
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  return (
    <div 
      ref={cardRef}
      className={`project-card project-card--${project.type}`}
      data-index={index}
    >
      <div className="project-card__inner">
        <div className="project-card__glow"></div>
        
        <div className="project-card__header">
          <div className="project-card__icon">{project.icon}</div>
          <div className="project-card__type">{project.type}</div>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tech">
          <div className="tech-section">
            <span className="tech-label">Frontend:</span>
            <div className="tech-tags">
              {project.frontend.map((tech, i) => (
                <span key={i} className="tech-tag tech-tag--frontend">{tech}</span>
              ))}
            </div>
          </div>
          
          {project.backend && (
            <div className="tech-section">
              <span className="tech-label">Backend:</span>
              <div className="tech-tags">
                {project.backend.map((tech, i) => (
                  <span key={i} className="tech-tag tech-tag--backend">{tech}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="project-card__features">
          {project.features.map((feature, i) => (
            <div key={i} className="feature-item">
              <span className="feature-dot"></span>
              {feature}
            </div>
          ))}
        </div>

        <div className="project-card__footer">
          <div className="project-status">
            <span className="status-dot"></span>
            {project.status}
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const projects = [
    {
      title: "Biosafe",
      type: "healthcare",
      description: "Платформа для медицинской диагностики и онлайн консультаций с врачами",
      icon: "🏥",
      frontend: ["React.js", "CSS3", "Responsive Design"],
      features: [
        "Система записи к врачам",
        "Онлайн консультации",
        "История болезней",
        "Интеграция с мед. базами"
      ],
      status: "Production",
    },
    {
      title: "Cryptobit",
      type: "fintech",
      description: "Криптовалютная биржа для обмена и вывода цифровых активов",
      icon: "₿",
      frontend: ["React.js", "Redux", "SCSS"],
      backend: ["Node.js", "Express.js", "WebSocket", "PostgreSQL"],
      features: [
        "Реал-тайм торговля",
        "Безопасные транзакции",
        "Аналитика рынка",
        "API интеграция"
      ],
      status: "Production",
    },
    {
      title: "TeleAdmin Bot",
      type: "automation",
      description: "Телеграм бот для автоматизации общения администратора с пользователями",
      icon: "🤖",
      frontend: ["Telegram Bot API", "Node.js"],
      backend: ["Node.js", "Express.js", "MongoDB"],
      features: [
        "Автоответы",
        "Система тикетов",
        "Статистика обращений",
        "Интеграция с CRM"
      ],
      status: "Active",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Начальные состояния
      gsap.set(".project-card", {
        rotateY: -45,
        rotateX: 25,
        z: -200,
        opacity: 0,
        scale: 0.7,
      });

      gsap.set(".projects-title", {
        opacity: 0,
        y: 100,
        rotateX: 90,
      });

      // Анимация заголовка
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: "top 85%",
        end: "bottom 15%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".projects-title", {
            duration: 0.3,
            opacity: progress < 0.1 ? 0 : Math.min(1, progress * 2),
            y: progress < 0.3 ? 100 * (1 - progress * 3.33) : 0,
            rotateX: progress < 0.3 ? 90 * (1 - progress * 3.33) : 0,
            overwrite: "auto",
          });
        },
      });

      // Анимация карточек с чередующимся появлением
      const cards = gsap.utils.toArray(".project-card");
      
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            
            // Каждая карточка появляется с небольшой задержкой
            const startProgress = index * 0.1;
            const adjustedProgress = Math.max(0, (progress - startProgress) / (1 - startProgress));
            
            gsap.to(card, {
              duration: 0.4,
              rotateY: adjustedProgress < 0.3 ? -45 * (1 - adjustedProgress * 3.33) : 0,
              rotateX: adjustedProgress < 0.3 ? 25 * (1 - adjustedProgress * 3.33) : 0,
              z: adjustedProgress < 0.3 ? -200 * (1 - adjustedProgress * 3.33) : 0,
              opacity: adjustedProgress < 0.1 ? 0 : Math.min(1, adjustedProgress * 2),
              scale: adjustedProgress < 0.4 ? 0.7 + 0.3 * (adjustedProgress / 0.4) : 1,
              overwrite: "auto",
            });
          },
        });
      });

      // Плавающая анимация карточек
      gsap.to(".project-card", {
        duration: 8,
        rotateY: "+=2",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.7,
      });

      // Пульсация свечения
      gsap.to(".project-card__glow", {
        duration: 3,
        opacity: 0.8,
        scale: 1.1,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });

      // Анимация плавающего кода
      gsap.to(".floating-code", {
        duration: 25,
        y: "-=50px",
        rotation: "+=360",
        repeat: -1,
        ease: "none",
        stagger: {
          each: 0.2,
          from: "random",
        },
      });

      // Анимация технологических тегов при наведении
      cards.forEach((card) => {
        const techTags = card.querySelectorAll(".tech-tag");
        const tl = gsap.timeline({ paused: true });
        
        tl.to(techTags, {
          duration: 0.3,
          scale: 1.1,
          y: -3,
          stagger: 0.05,
          ease: "back.out(1.7)",
        });

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      {/* Плавающий код в фоне */}
      <div className="floating-code-container">
        {Array.from({ length: 30 }, (_, i) => (
          <FloatingCode key={i} index={i} />
        ))}
      </div>

      <div className="projects__container">
        <h2 className="projects-title" ref={titleRef}>
          <span className="projects-title__main">My Projects</span>
          <span className="projects-title__sub">building the future</span>
        </h2>

        <div className="projects-grid" ref={cardsContainerRef}>
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.title} 
              project={project} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;