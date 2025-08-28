import "./App.css";

function App() {
  return (
    <>
      <div className="main-content">
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
