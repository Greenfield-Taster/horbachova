import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./SkillsComponent.scss";

gsap.registerPlugin(ScrollTrigger);

const frontendTechs = [
  { id: "react", icon: "⚛️", name: "React", position: { orbit: 1, angle: 0 } },
  {
    id: "typescript",
    icon: "🔷",
    name: "TypeScript",
    position: { orbit: 2, angle: 60 },
  },
  { id: "gsap", icon: "✨", name: "GSAP", position: { orbit: 2, angle: 240 } },
  { id: "css", icon: "🎨", name: "CSS", position: { orbit: 3, angle: 150 } },
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
    position: { orbit: 3, angle: 330 },
  },
];

const backendTechs = [
  {
    id: "nodejs",
    icon: "🟢",
    name: "Node.js",
    position: { orbit: 1, angle: 10 },
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
    position: { orbit: 3, angle: 350 },
  },
  { id: "jwt", icon: "🔐", name: "JWT", position: { orbit: 1, angle: 190 } },
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

    const getRadius = () => {
      const screenWidth = window.innerWidth;
      const baseRadius =
        screenWidth > 1600
          ? 150
          : screenWidth > 1200
          ? 120
          : screenWidth > 768
          ? 100
          : 80;
      const orbitMultiplier =
        screenWidth > 1600
          ? 60
          : screenWidth > 1200
          ? 60
          : screenWidth > 768
          ? 50
          : 40;
      return baseRadius + tech.position.orbit * orbitMultiplier;
    };

    const radius = getRadius();
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

    // Обработчик изменения размера экрана
    const handleResize = () => {
      if (!planetRef.current) return;
      const newRadius = getRadius();
      const angle = (tech.position.angle * Math.PI) / 180;
      const x = Math.cos(angle) * newRadius;
      const y = Math.sin(angle) * newRadius;

      gsap.set(planetRef.current, {
        x: x,
        y: y,
        transformOrigin: `${-x}px ${-y}px`,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (rotationAnimation) rotationAnimation.kill();
      window.removeEventListener("resize", handleResize);
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
    triggers.push(
      ScrollTrigger.create({
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
      })
    );

    // Анимация орбитальных колец
    const rings = systemRef.current.querySelectorAll(".orbit-ring");
    triggers.push(
      ScrollTrigger.create({
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
      })
    );

    // Анимация планет
    const planets = systemRef.current.querySelectorAll(".tech-planet");
    triggers.push(
      ScrollTrigger.create({
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
      })
    );

    return () => {
      triggers.forEach((trigger) => trigger.kill());
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

        // Эффект притяжения (адаптивный)
        const frontendSystem = document.querySelector(".frontend-system");
        const backendSystem = document.querySelector(".backend-system");
        const attractionDistance = window.innerWidth > 768 ? 20 : 10;
        const attractionRotation = window.innerWidth > 768 ? 5 : 3;

        if (frontendSystem) {
          gsap.to(frontendSystem, {
            x: attractionDistance,
            rotation: attractionRotation,
            duration: 2,
            ease: "power2.out",
            delay: 1,
          });
        }

        if (backendSystem) {
          gsap.to(backendSystem, {
            x: -attractionDistance,
            rotation: -attractionRotation,
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

  return (
    <div className="app">
      <section ref={sectionRef} className="tech-section">
        <div className="orbital-container">
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
    </div>
  );
};

export default TechEcosystem;
