import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import UniverseStars from "../SkillsComponent/UniverseStars";
import "./TitleSection.scss";

gsap.registerPlugin(ScrollTrigger);

const TitleSection = () => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (!titleRef.current) return;

    // Анимация появления заголовка с эффектом стекла
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "top 20%",
        toggleActions: "play none none reverse",
        onEnter: () => {
          titleRef.current.classList.add('visible');
        },
        onLeave: () => {
          titleRef.current.classList.remove('visible');
        },
        onEnterBack: () => {
          titleRef.current.classList.add('visible');
        },
        onLeaveBack: () => {
          titleRef.current.classList.remove('visible');
        },
      },
    });

    // Анимация основного контейнера
    tl.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.8,
        rotationX: -15,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power3.out",
      }
    );

    // Анимация отдельных элементов с задержкой
    const titleWords = titleRef.current.querySelectorAll('.title-word');
    const separator = titleRef.current.querySelector('.title-separator');
    const subtitle = titleRef.current.querySelector('.title-subtitle');

    // Анимация слов
    tl.fromTo(
      titleWords,
      {
        opacity: 0,
        y: 30,
        rotationY: -20,
      },
      {
        opacity: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        stagger: 0.3,
        ease: "back.out(1.7)",
      },
      "-=1"
    );

    // Анимация разделителя
    if (separator) {
      tl.fromTo(
        separator,
        {
          opacity: 0,
          scale: 0,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
        },
        "-=0.5"
      );
    }

    // Анимация подзаголовка
    if (subtitle) {
      tl.fromTo(
        subtitle,
        {
          opacity: 0,
          y: 20,
          letterSpacing: "0.5em",
        },
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.1em",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.8"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="title-section">
      <UniverseStars starCount={100} className="title-universe-bg" />
      <h1 ref={titleRef} className="skills-title">
        <div className="title-main">
          <span className="title-word">Frontend</span>
          <span className="title-separator">&</span>
          <span className="title-word">Backend</span>
        </div>
        <span className="title-subtitle">in One</span>
      </h1>
    </div>
  );
};

export default TitleSection;
