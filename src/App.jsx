import { useState, useEffect } from "react";
import "./App.css";
import VSCodeMockup from "./components/startAnimation/VSCodeMockup";

function App() {
  const [showStartAnimation, setShowStartAnimation] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);

  // Обработчик завершения стартовой анимации
  const handleAnimationComplete = () => {
    setShowStartAnimation(false);
    // Небольшая задержка перед показом основного контента для плавности
    setTimeout(() => {
      setShowMainContent(true);
    }, 300);
  };

  return (
    <>
      {showStartAnimation && (
        <VSCodeMockup onAnimationComplete={handleAnimationComplete} />
      )}

      <div
        className={`main-content ${showMainContent ? "visible" : ""}`}
        style={{
          opacity: showMainContent ? 1 : 0,
          transition: "opacity 0.8s ease-in-out",
          pointerEvents: showMainContent ? "auto" : "none",
        }}
      >
        <div className="welcome-container">
          <h1 className="welcome-title">🎉 Horbachova Portfolio</h1>
          <p className="welcome-message">Добро пожаловать в мое портфолио!</p>
          <div className="features">
            <div className="feature-card">
              <span className="feature-icon">⚛️</span>
              <h3>React Development</h3>
              <p>Современные веб-приложения</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🎨</span>
              <h3>UI/UX Design</h3>
              <p>Красивые интерфейсы</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🚀</span>
              <h3>Performance</h3>
              <p>Быстрые и отзывчивые сайты</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
