import { useEffect, useState } from "react";
import "./DustParticles.scss";

const DustParticles = ({ count }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Создаем массив частичек с рандомными свойствами
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          // Позиция в области света лампы
          left: Math.random() * 100, // 0-100%
          animationDelay: Math.random() * 1, // 0-1s задержка
          animationDuration: 8 + Math.random() * 15, // 8-23s длительность
          size: 0.5 + Math.random() * 2, // 0.5-2.5px размер
          opacity: 0.1 + Math.random() * 0.4, // 0.1-0.5 прозрачность
          // Различные типы движения
          moveType: Math.floor(Math.random() * 4), // 0-3 типа анимации
          // Горизонтальный дрейф
          drift: -20 + Math.random() * 40, // -20 до 20px
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [count]);

  return (
    <div className="dust-particles">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`dust-particle dust-particle--type-${particle.moveType}`}
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.animationDelay}s`,
            animationDuration: `${particle.animationDuration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            "--drift": `${particle.drift}px`,
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;
