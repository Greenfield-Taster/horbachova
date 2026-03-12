import { useLayoutEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.scss";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = ({ project }) => {
  return (
    <div className={`project-card project-card--${project.type}`}>
      <div className="project-card__inner">
        <div className="project-card__glow"></div>

        <div className="project-card__header">
          <div className="project-card__icon">{project.icon}</div>
          <div className="project-card__badges">
            <span className="project-card__type">{project.type}</span>
            {project.status && (
              <span
                className={`project-card__status project-card__status--${project.status === "inProgress" ? "progress" : "live"}`}
              >
                {project.statusLabel}
              </span>
            )}
          </div>
        </div>

        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__description">{project.description}</p>

        <div className="project-card__tech">
          <div className="tech-tags">
            {project.tech.map((tech, i) => (
              <span key={i} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-card__features">
          {project.features.map((feature, i) => (
            <div key={i} className="feature-item">
              <span className="feature-dot"></span>
              {feature}
            </div>
          ))}
        </div>

        {project.links && (
          <div className="project-card__links">
            {project.links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                {link.label}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);
  const posRef = useRef(0);
  const isPausedRef = useRef(false);
  const animFrameRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const touchRef = useRef({ startX: 0, startPos: 0, moved: false });

  const projects = [
    {
      title: t("projects.launchkit.title"),
      type: "open-source",
      description: t("projects.launchkit.description"),
      icon: "📦",
      tech: [
        "React 19",
        "Vite",
        "Material UI",
        "SCSS",
        "Framer Motion",
        "npm",
      ],
      features: t("projects.launchkit.features", { returnObjects: true }),
      links: [
        {
          label: t("projects.viewOnNpm"),
          url: "https://www.npmjs.com/package/@greenfield-taster/launchkit-shop",
        },
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/LaunchKit-Shop",
        },
      ],
    },
    {
      title: t("projects.mattressShop.title"),
      type: "e-commerce",
      description: t("projects.mattressShop.description"),
      icon: "🛒",
      tech: [
        "React 19",
        "TypeScript",
        "MedusaJS",
        "PostgreSQL",
        "Node.js",
        "GitHub Actions",
      ],
      features: t("projects.mattressShop.features", { returnObjects: true }),
      links: [
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/mattress-shop",
        },
      ],
    },
    {
      title: t("projects.recipeAi.title"),
      type: "ai",
      description: t("projects.recipeAi.description"),
      icon: "🤖",
      tech: ["React", "TypeScript", "AI APIs"],
      features: t("projects.recipeAi.features", { returnObjects: true }),
      status: "inProgress",
      statusLabel: t("projects.inProgress"),
      links: [
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/recipe-ai-assistant",
        },
      ],
    },
    {
      title: t("projects.biosafe.title"),
      type: "healthcare",
      description: t("projects.biosafe.description"),
      icon: "🏥",
      tech: ["React.js", "CSS3", "Responsive Design"],
      features: t("projects.biosafe.features", { returnObjects: true }),
      links: [
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/biosafe",
        },
      ],
    },
    {
      title: t("projects.cryptobit.title"),
      type: "fintech",
      description: t("projects.cryptobit.description"),
      icon: "₿",
      tech: [
        "React.js",
        "Redux",
        "SCSS",
        "Node.js",
        "Express.js",
        "WebSocket",
        "PostgreSQL",
      ],
      features: t("projects.cryptobit.features", { returnObjects: true }),
      links: [
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/cryptobit",
        },
      ],
    },
    {
      title: t("projects.teleadmin.title"),
      type: "automation",
      description: t("projects.teleadmin.description"),
      icon: "🤖",
      tech: ["Telegram Bot API", "Node.js", "Express.js", "MongoDB"],
      features: t("projects.teleadmin.features", { returnObjects: true }),
      links: [
        {
          label: t("projects.viewOnGithub"),
          url: "https://github.com/Greenfield-Taster/cryptobit-telegram-bot",
        },
      ],
    },
  ];

  // Doubled for infinite loop
  const doubledProjects = [...projects, ...projects];

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(".project-card");
    if (!card) return;

    const gap = parseFloat(getComputedStyle(track).gap) || 24;
    const cardWidth = card.offsetWidth + gap;
    const halfWidth = track.scrollWidth / 2;

    isPausedRef.current = true;

    const anim = { value: 0 };
    const startPos = posRef.current;

    gsap.to(anim, {
      value: direction * cardWidth,
      duration: 0.5,
      ease: "power2.inOut",
      onUpdate: () => {
        let p = startPos + anim.value;
        if (p >= halfWidth) p -= halfWidth;
        if (p < 0) p += halfWidth;
        posRef.current = p;
        track.style.transform = `translateX(-${p}px)`;
      },
      onComplete: () => {
        isPausedRef.current = false;
      },
    });
  };

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      if (!isPausedRef.current) {
        posRef.current += speed;
        const halfWidth = track.scrollWidth / 2;
        if (halfWidth > 0 && posRef.current >= halfWidth) {
          posRef.current -= halfWidth;
        }
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    // Pause on hover (wrapper, not track, to keep hover area stable)
    const wrapper = wrapperRef.current;
    const handleEnter = () => {
      isPausedRef.current = true;
    };
    const handleLeave = () => {
      isPausedRef.current = false;
    };
    const scheduleResume = (delay = 3000) => {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = setTimeout(() => {
        isPausedRef.current = false;
      }, delay);
    };

    const handleTouchStart = (e) => {
      isPausedRef.current = true;
      clearTimeout(resumeTimerRef.current);
      touchRef.current = {
        startX: e.touches[0].clientX,
        startPos: posRef.current,
        moved: false,
      };
    };

    const handleTouchMove = (e) => {
      const dx = touchRef.current.startX - e.touches[0].clientX;
      if (Math.abs(dx) > 5) touchRef.current.moved = true;

      const halfWidth = track.scrollWidth / 2;
      let p = touchRef.current.startPos + dx;
      if (p >= halfWidth) p -= halfWidth;
      if (p < 0) p += halfWidth;
      posRef.current = p;
      track.style.transform = `translateX(-${p}px)`;
    };

    const handleTouchEnd = () => {
      if (!touchRef.current.moved) {
        // Tap — toggle pause, resume after 4s
        scheduleResume(4000);
      } else {
        // Swipe — resume after 2s
        scheduleResume(2000);
      }
    };

    if (wrapper) {
      wrapper.addEventListener("mouseenter", handleEnter);
      wrapper.addEventListener("mouseleave", handleLeave);
      wrapper.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      wrapper.addEventListener("touchmove", handleTouchMove, {
        passive: true,
      });
      wrapper.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    // GSAP animations
    const ctx = gsap.context(() => {
      gsap.set(".projects-title", {
        opacity: 0,
        y: 100,
        rotateX: 90,
      });

      gsap.set(".projects-carousel-wrapper", {
        opacity: 0,
        y: 40,
      });

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

      // Carousel entrance
      ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top 90%",
        end: "top 55%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(".projects-carousel-wrapper", {
            duration: 0.4,
            opacity: progress < 0.05 ? 0 : Math.min(1, progress * 2.5),
            y: 40 * (1 - Math.min(1, progress * 2)),
            overwrite: "auto",
          });
        },
      });
    }, sectionRef);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      ctx.revert();
      clearTimeout(resumeTimerRef.current);
      if (wrapper) {
        wrapper.removeEventListener("mouseenter", handleEnter);
        wrapper.removeEventListener("mouseleave", handleLeave);
        wrapper.removeEventListener("touchstart", handleTouchStart);
        wrapper.removeEventListener("touchmove", handleTouchMove);
        wrapper.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="projects__container">
        <h2 className="projects-title" ref={titleRef}>
          <span className="projects-title__main">{t("projects.title")}</span>
          <span className="projects-title__sub">{t("projects.subtitle")}</span>
        </h2>

        <div className="projects-carousel-wrapper" ref={wrapperRef}>
          <button
            className="carousel-arrow carousel-arrow--left"
            onClick={() => scrollByCard(-1)}
            aria-label="Previous project"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="projects-carousel">
            <div className="projects-track" ref={trackRef}>
              {doubledProjects.map((project, i) => (
                <ProjectCard
                  key={`${project.title}-${i}`}
                  project={project}
                />
              ))}
            </div>
          </div>

          <button
            className="carousel-arrow carousel-arrow--right"
            onClick={() => scrollByCard(1)}
            aria-label="Next project"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
