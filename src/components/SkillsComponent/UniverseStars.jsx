import React, { useEffect, useState, useRef } from "react";
import "./UniverseStars.scss";

const UniverseStars = ({ starCount = 150, className = "" }) => {
  const [stars, setStars] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    // Generate random stars with different properties
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speed: Math.random() * 3 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleDelay: Math.random() * 5,
          color: getRandomStarColor(),
          direction: Math.random() * 360, // Random direction for movement
          distance: Math.random() * 2 + 0.5, // How far the star moves
        });
      }
      setStars(newStars);
    };

    generateStars();

    // Regenerate stars on window resize to maintain distribution
    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [starCount]);

  const getRandomStarColor = () => {
    const colors = [
      "#ffffff",
      "#e6f3ff",
      "#ffffcc",
      "#fff0e6",
      "#e6ccff",
      "#cce6ff",
      "#ffcccc",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      ref={containerRef}
      className={`universe-stars-container ${className}`}
      aria-hidden="true"
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            "--star-x": `${star.x}%`,
            "--star-y": `${star.y}%`,
            "--star-size": `${star.size}px`,
            "--star-opacity": star.opacity,
            "--star-color": star.color,
            "--twinkle-delay": `${star.twinkleDelay}s`,
            "--twinkle-duration": `${2 + Math.random() * 3}s`,
            "--move-x": `${
              Math.cos((star.direction * Math.PI) / 180) * star.distance
            }px`,
            "--move-y": `${
              Math.sin((star.direction * Math.PI) / 180) * star.distance
            }px`,
            "--move-duration": `${star.speed + 5}s`,
          }}
        />
      ))}
    </div>
  );
};

export default UniverseStars;
