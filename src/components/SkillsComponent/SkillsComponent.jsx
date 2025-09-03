import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SkillsComponent.scss";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Данные для технологий
const frontendTechs = [
  { id: "react", icon: "⚛️", name: "React", position: { orbit: 1, angle: 0 } },
  {
    id: "typescript",
    icon: "🔷",
    name: "TypeScript",
    position: { orbit: 2, angle: 60 },
  },
  { id: "gsap", icon: "✨", name: "GSAP", position: { orbit: 2, angle: 120 } },
  { id: "css", icon: "🎨", name: "CSS", position: { orbit: 3, angle: 30 } },
  {
    id: "nextjs",
    icon: "📱",
    name: "Next.js",
    position: { orbit: 1, angle: 180 },
  },
  {
    id: "redux",
    icon: "🔗",
    name: "Redux",
    position: { orbit: 3, angle: 210 },
  },
];

const backendTechs = [
  {
    id: "nodejs",
    icon: "🟢",
    name: "Node.js",
    position: { orbit: 1, angle: 0 },
  },
  {
    id: "mongodb",
    icon: "🗄️",
    name: "MongoDB",
    position: { orbit: 2, angle: 60 },
  },
  {
    id: "postgresql",
    icon: "🐘",
    name: "PostgreSQL",
    position: { orbit: 2, angle: 120 },
  },
  {
    id: "express",
    icon: "🚀",
    name: "Express",
    position: { orbit: 3, angle: 30 },
  },
  { id: "jwt", icon: "🔐", name: "JWT", position: { orbit: 1, angle: 180 } },
  {
    id: "docker",
    icon: "🐳",
    name: "Docker",
    position: { orbit: 3, angle: 210 },
  },
];

const TechPlanet = ({ tech, type, systemRef }) => {
  const planetRef = useRef(null);

  useEffect(() => {
    if (!planetRef.current || !systemRef.current) return;

    const radius = 70 + tech.position.orbit * 35;
    const speed = 15 + tech.position.orbit * 8;
    const direction = type === "frontend" ? 1 : -1;

    // Позиционирование планеты на орбите
    const angle = (tech.position.angle * Math.PI) / 180;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    gsap.set(planetRef.current, {
      x: x,
      y: y,
      transformOrigin: `${-x}px ${-y}px`,
    });

    // Вращение планеты вокруг центра
    const rotationAnimation = gsap.to(planetRef.current, {
      rotation: direction * 360,
      duration: speed,
      ease: "none",
      repeat: -1,
    });

    // Hover эффекты
    const handleMouseEnter = () => {
      gsap.to(planetRef.current, {
        scale: 1.3,
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.5)",
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(planetRef.current, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
      });
    };

    const element = planetRef.current;
    if (element) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (rotationAnimation) rotationAnimation.kill();
      if (element) {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [tech, type, systemRef]);

  return (
    <div ref={planetRef} className={`tech-planet ${type}-planet`}>
      <div className="planet-icon">{tech.icon}</div>
      <div className="planet-name">{tech.name}</div>
    </div>
  );
};

const OrbitalSystem = ({ type, techs, className }) => {
  const systemRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    if (!systemRef.current) return;

    const triggers = [];

    // Анимация появления центра
    triggers.push(ScrollTrigger.create({
      trigger: systemRef.current,
      start: "top 70%",
      end: "top 40%",
      scrub: 1,
      animation: gsap.fromTo(
        centerRef.current,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      ),
    }));

    // Анимация орбитальных колец
    const rings = systemRef.current.querySelectorAll(".orbit-ring");
    triggers.push(ScrollTrigger.create({
      trigger: systemRef.current,
      start: "top 60%",
      end: "top 35%",
      scrub: 1,
      animation: gsap.fromTo(
        rings,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      ),
    }));

    // Анимация планет
    const planets = systemRef.current.querySelectorAll(".tech-planet");
    triggers.push(ScrollTrigger.create({
      trigger: systemRef.current,
      start: "top 50%",
      end: "top 25%",
      scrub: 1,
      animation: gsap.fromTo(
        planets,
        { opacity: 0, scale: 0 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }
      ),
    }));

    return () => {
      triggers.forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={systemRef} className={`orbital-system ${className}`}>
      <div ref={centerRef} className={`orbit-center ${type}-center`}>
        {type === "frontend" ? "Frontend" : "Backend"}
      </div>

      <div className="orbit-ring orbit-1"></div>
      <div className="orbit-ring orbit-2"></div>
      <div className="orbit-ring orbit-3"></div>

      {techs.map((tech) => (
        <TechPlanet
          key={tech.id}
          tech={tech}
          type={type}
          systemRef={systemRef}
        />
      ))}
    </div>
  );
};

const UnitySystem = () => {
  const unityRef = useRef(null);
  const coreRef = useRef(null);

  useEffect(() => {
    if (!unityRef.current) return;

    let trigger = null;
    let coreAnimation = null;
    let beamAnimation = null;

    // Анимация объединения систем
    trigger = ScrollTrigger.create({
      trigger: ".orbital-container",
      start: "top 20%",
      end: "bottom 80%",
      onEnter: () => {
        // Показываем центральную систему
        gsap.to(unityRef.current, {
          opacity: 1,
          duration: 1,
        });

        gsap.fromTo(
          coreRef.current,
          { scale: 0, rotation: -180 },
          {
            scale: 1,
            rotation: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)",
          }
        );

        // Показываем лучи соединения
        const beams = unityRef.current.querySelectorAll(".connection-beam");
        if (beams.length) {
          gsap.to(beams, {
            opacity: 1,
            scaleX: 1,
            duration: 1,
            stagger: 0.2,
            delay: 0.5,
          });
        }

        // Движение энергетических частиц
        const particles = unityRef.current.querySelectorAll(".energy-particle");
        if (particles.length) {
          gsap.to(particles, {
            opacity: 1,
            duration: 0.5,
            delay: 1,
          });

          // Анимация перетекания энергии
          gsap.to(particles, {
            x: "random(-50, 50)",
            y: "random(-30, 30)",
            duration: "random(2, 4)",
            ease: "sine.inOut",
            stagger: 0.3,
            repeat: -1,
            yoyo: true,
            delay: 1.5,
          });
        }

        // Эффект притяжения
        const frontendSystem = document.querySelector(".frontend-system");
        const backendSystem = document.querySelector(".backend-system");
        
        if (frontendSystem) {
          gsap.to(frontendSystem, {
            x: 20,
            rotation: 5,
            duration: 2,
            ease: "power2.out",
            delay: 1,
          });
        }

        if (backendSystem) {
          gsap.to(backendSystem, {
            x: -20,
            rotation: -5,
            duration: 2,
            ease: "power2.out",
            delay: 1,
          });
        }
      },
    });

    // Постоянное вращение центрального ядра
    gsap.to(coreRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Постоянное вращение центрального ядра
    coreAnimation = gsap.to(coreRef.current, {
      rotation: 360,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    // Эффект мерцания лучей
    const allBeams = unityRef.current.querySelectorAll(".connection-beam");
    if (allBeams.length) {
      beamAnimation = gsap.to(allBeams, {
        opacity: 0.3,
        duration: 1.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5,
      });
    }

    return () => {
      if (trigger) trigger.kill();
      if (coreAnimation) coreAnimation.kill();
      if (beamAnimation) beamAnimation.kill();
    };
  }, []);

  return (
    <div ref={unityRef} className="unity-system">
      <div ref={coreRef} className="unity-core">
        <span>Full Stack</span>
      </div>

      <div className="connection-beam beam-left"></div>
      <div className="connection-beam beam-right"></div>

      <div
        className="energy-particle"
        style={{ top: "45%", left: "-200px" }}
      ></div>
      <div
        className="energy-particle"
        style={{ top: "55%", left: "-150px" }}
      ></div>
      <div
        className="energy-particle"
        style={{ top: "45%", right: "-200px" }}
      ></div>
      <div
        className="energy-particle"
        style={{ top: "55%", right: "-150px" }}
      ></div>
    </div>
  );
};

const TechEcosystem = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    let titleTrigger = null;
    let heroAnimation = null;

    // Анимация героя
    heroAnimation = gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 2,
        ease: "power3.out",
        delay: 0.5,
      }
    );

    // Анимация заголовка секции
    titleTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      end: "top 50%",
      scrub: 1,
      animation: gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
        }
      ),
    });

    return () => {
      if (titleTrigger) titleTrigger.kill();
      if (heroAnimation) heroAnimation.kill();
    };
  }, []);

  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <h1 ref={heroRef}>Full Stack Developer</h1>
        <div className="scroll-indicator">Скролль вниз ↓</div>
      </section>

      {/* Tech Section */}
      <section ref={sectionRef} className="tech-section">
        <div className="orbital-container">
          <h2 ref={titleRef} className="section-title">
            Моя Tech Экосистема
          </h2>

          <div className="tech-ecosystem">
            <OrbitalSystem
              type="frontend"
              techs={frontendTechs}
              className="frontend-system"
            />

            <UnitySystem />

            <OrbitalSystem
              type="backend"
              techs={backendTechs}
              className="backend-system"
            />
          </div>
        </div>
      </section>

      {/* Next Section */}
      <section className="next-section">
        <h2>Мои проекты...</h2>
      </section>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .app {
          font-family: "Arial", sans-serif;
          background: linear-gradient(
            135deg,
            #0f0f23 0%,
            #1a1a2e 50%,
            #16213e 100%
          );
          color: white;
          overflow-x: hidden;
        }

        .hero {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }

        .hero h1 {
          font-size: 4rem;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tech-section {
          min-height: 150vh;
          position: relative;
          padding: 100px 50px;
        }

        .orbital-container {
          width: 100%;
          max-width: 1400px;
          height: 100vh;
          position: relative;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 3rem;
          margin-bottom: 100px;
          opacity: 0;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .tech-ecosystem {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .orbital-system {
          position: absolute;
          width: 400px;
          height: 400px;
          top: 50%;
          transform: translateY(-50%);
        }

        .frontend-system {
          left: 10%;
        }

        .backend-system {
          right: 10%;
        }

        .orbit-center {
          position: absolute;
          width: 100px;
          height: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: bold;
          opacity: 0;
          z-index: 10;
        }

        .frontend-center {
          background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
          box-shadow: 0 0 30px rgba(255, 107, 107, 0.5);
        }

        .backend-center {
          background: linear-gradient(45deg, #4ecdc4, #6ee7e7);
          box-shadow: 0 0 30px rgba(78, 205, 196, 0.5);
        }

        .orbit-ring {
          position: absolute;
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
        }

        .orbit-1 {
          width: 200px;
          height: 200px;
        }
        .orbit-2 {
          width: 280px;
          height: 280px;
        }
        .orbit-3 {
          width: 360px;
          height: 360px;
        }

        .tech-planet {
          position: absolute;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: bold;
          text-align: center;
          opacity: 0;
          cursor: pointer;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .frontend-planet {
          background: rgba(255, 107, 107, 0.2);
          border-color: #ff6b6b;
        }

        .backend-planet {
          background: rgba(78, 205, 196, 0.2);
          border-color: #4ecdc4;
        }

        .planet-icon {
          font-size: 1.2rem;
          margin-bottom: 2px;
        }

        .planet-name {
          font-size: 0.6rem;
        }

        .unity-system {
          position: absolute;
          width: 200px;
          height: 200px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          z-index: 20;
        }

        .unity-core {
          position: absolute;
          width: 120px;
          height: 120px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          font-weight: bold;
          box-shadow: 0 0 50px rgba(69, 183, 209, 0.8);
        }

        .connection-beam {
          position: absolute;
          height: 4px;
          background: linear-gradient(90deg, transparent, #45b7d1, transparent);
          top: 50%;
          transform: translateY(-50%);
          opacity: 0;
          border-radius: 2px;
        }

        .beam-left {
          right: 60px;
          width: 300px;
          transform-origin: right center;
        }

        .beam-right {
          left: 60px;
          width: 300px;
          transform-origin: left center;
        }

        .energy-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #45b7d1;
          border-radius: 50%;
          opacity: 0;
        }

        .scroll-indicator {
          position: fixed;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateX(-50%) translateY(0);
          }
          40% {
            transform: translateX(-50%) translateY(-10px);
          }
          60% {
            transform: translateX(-50%) translateY(-5px);
          }
        }

        .next-section {
          height: 50vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .next-section h2 {
          font-size: 2rem;
          opacity: 0.7;
        }

        @media (max-width: 1200px) {
          .orbital-system {
            width: 300px;
            height: 300px;
          }

          .frontend-system {
            left: 5%;
          }

          .backend-system {
            right: 5%;
          }

          .beam-left,
          .beam-right {
            width: 200px;
          }
        }

        @media (max-width: 768px) {
          .tech-section {
            min-height: 200vh;
          }

          .tech-ecosystem {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 100px;
          }

          .orbital-system {
            position: relative;
            margin: 50px auto;
            left: auto !important;
            right: auto !important;
            top: auto;
            transform: none;
          }

          .unity-system {
            position: relative;
            margin: 100px auto;
            top: auto;
            left: auto;
            transform: none;
          }

          .beam-left,
          .beam-right {
            display: none;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .section-title {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TechEcosystem;
