import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import lampImage from "../../assets/lamp-green.png";
import DustParticles from "../DustParticles/DustParticles";
import "./Hero.scss";

const splitToSpans = (el) => {
  const text = el.textContent;
  el.textContent = "";
  [...text].forEach((ch) => {
    const s = document.createElement("span");
    s.className = "char";
    s.textContent = ch;
    el.appendChild(s);
  });
};

const Hero = () => {
  const root = useRef(null);
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // начальные состояния (не трогаем CSS)
      gsap.set(
        [".hero__light-glow", ".hero__light-soft", ".hero__light-ambient"],
        {
          autoAlpha: 0,
          scale: 0.95,
        }
      );
      gsap.set(".hero__content", { autoAlpha: 0, y: 16 });
      gsap.set(".hero__veil", { autoAlpha: 1 });

      // сплит заголовка на символы
      if (titleRef.current && !titleRef.current.querySelector(".char")) {
        splitToSpans(titleRef.current);
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1) темнота -> лёгкое "вкл"
      tl.to(".hero__veil", {
        duration: 0.35,
        autoAlpha: 0.85,
        ease: "power2.in",
      }) // короткая темнота
        .to(".hero__veil", { duration: 0.6, autoAlpha: 0, ease: "power2.out" });

      // 2) вспышка/мерцание лампы и наращивание света
      tl.to(
        ".hero__light-glow",
        { duration: 0.2, autoAlpha: 0.6, scale: 1, ease: "power2.out" },
        "<-0.2"
      )
        .to(
          ".hero__light-soft",
          { duration: 0.25, autoAlpha: 0.4, scale: 1 },
          "<-0.05"
        )
        .to(
          ".hero__light-ambient",
          { duration: 0.3, autoAlpha: 0.25, scale: 1 },
          "<"
        );

      // лёгкое мерцание (две ноты, как будто контакт пошевелился)
      tl.to(
        [".hero__light-glow", ".hero__light-soft", ".hero__light-ambient"],
        { duration: 0.08, autoAlpha: 0.2 },
        "+=0.02"
      ).to([".hero__light-glow", ".hero__light-soft", ".hero__light-ambient"], {
        duration: 0.18,
        autoAlpha: (i) => [0.7, 0.5, 0.35][i],
      });

      // 3) появление текста (по буквам)
      tl.to(".hero__content", { duration: 0.3, autoAlpha: 1, y: 0 }, "-=0.05")
        .from(
          ".hero__title .char",
          {
            duration: 0.7,
            y: 30,
            autoAlpha: 0,
            rotate: () => gsap.utils.random(-4, 4),
            transformOrigin: "50% 100%",
            stagger: { each: 0.03, from: "center" },
          },
          "-=0.15"
        )
        .from(
          ".hero__subtitle",
          { duration: 0.5, y: 14, autoAlpha: 0 },
          "-=0.35"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__container">
        <div className="hero__lamp-container">
          <img src={lampImage} alt="Lamp" className="hero__lamp" />
          <div className="hero__light-glow"></div>
          <div className="hero__light-soft"></div>
          <div className="hero__light-ambient"></div>
          <DustParticles count={60} />
        </div>
        <div className="hero__content">
          <h1 className="hero__title" ref={titleRef}>
            HORBACHOVA
          </h1>
          <div className="hero__subtitle">
            <span>Full-stack developer</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
