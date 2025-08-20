import React, { useState, useEffect, useMemo, useRef } from "react";
import "./VSCodeMockup.scss";
import TypingSound from "../../utils/typingSound";
import { ANIMATION_CONFIG } from "../../utils/animationConfig";

const VSCodeMockup = () => {
  const [typedCode, setTypedCode] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentCol, setCurrentCol] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const typingSoundRef = useRef(new TypingSound());

  const fullCode = useMemo(
    () => `// Horbachova Portfolio - Main Application
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize portfolio
    const initializeApp = async () => {
      try {
        await loadUserPreferences();
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to initialize:', error);
      }
    };

    initializeApp();
  }, []);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  const loadUserPreferences = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('✨ Portfolio loaded successfully!');
        resolve();
      }, 1000);
    });
  };

  if (isLoading) {
    return <div className="loading">Loading portfolio...</div>;
  }

  return (
    <Router>
      <div className={\`app \${theme}\`}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2025 Horbachova. Crafted with ❤️ and React.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;`,
    []
  );

  // Появление компонента
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, ANIMATION_CONFIG.TIMINGS.APPEAR_DELAY);
    return () => clearTimeout(timer);
  }, []);

  // Вычисление позиции курсора
  const updateCursorPosition = (charIndex) => {
    const textUpToCursor = fullCode.slice(0, charIndex);
    const lines = textUpToCursor.split('\n');
    setCurrentLine(lines.length);
    setCurrentCol(lines[lines.length - 1].length + 1);
  };

  const getTypingSpeed = (char, prevChar) => {
    const config = ANIMATION_CONFIG.CHAR_SPEEDS;
    
    // Быстрее печатаем пробелы
    if (char === ' ') {
      return config.space.min + Math.random() * (config.space.max - config.space.min);
    }
    
    // Пунктуация
    if ([',', ';', '(', ')', '{', '}', '[', ']'].includes(char)) {
      return config.punctuation.min + Math.random() * (config.punctuation.max - config.punctuation.min);
    }
    
    // Медленнее на конце строки
    if (prevChar === '\n') {
      return config.newline.min + Math.random() * (config.newline.max - config.newline.min);
    }
    
    // Пауза после комментариев
    if (prevChar === '/' && char === '/') {
      return config.comment.min + Math.random() * (config.comment.max - config.comment.min);
    }
    
    // Обычная скорость
    return config.normal.min + Math.random() * (config.normal.max - config.normal.min);
  };

  const colorizeCode = (code) => {
    return code
      // Комментарии (должны быть первыми)
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      // Ключевые слова
      .replace(/\b(import|export|default|const|let|var|function|return|from|async|await|try|catch|if|else|new|Promise|setTimeout|console)\b/g, '<span class="keyword">$1</span>')
      // Строки
      .replace(/('.*?'|".*?"|`.*?`)/g, '<span class="string">$1</span>')
      // Числа
      .replace(/\b(\d+)\b/g, '<span class="number">$1</span>')
      // React компоненты и хуки
      .replace(/\b(React|useState|useEffect|App|Router|Routes|Route|BrowserRouter|Header|About|Projects|Contact)\b/g, '<span class="component">$1</span>')
      // JSX теги
      .replace(/(<\/?[\w-]+[^>]*>)/g, '<span class="jsx">$1</span>')
      // Операторы
      .replace(/(=>|===|!==|&&|\|\||[+][+]|--|[+]=|-=|\*=|\/=)/g, '<span class="operator">$1</span>')
      // Простые операторы
      .replace(/([=\+\-\*\/])/g, '<span class="operator">$1</span>')
      // Пунктуация
      .replace(/([{}()\[\];,.])/g, '<span class="punctuation">$1</span>')
      // Методы и свойства
      .replace(/\.(\w+)/g, '.<span class="method">$1</span>')
      // Шаблонные литералы
      .replace(/(\$\{[^}]*\})/g, '<span class="template-literal">$1</span>');
  };

  useEffect(() => {
    if (currentCharIndex < fullCode.length && showAnimation && isVisible) {
      const currentChar = fullCode[currentCharIndex];
      const prevChar = currentCharIndex > 0 ? fullCode[currentCharIndex - 1] : '';
      const speed = getTypingSpeed(currentChar, prevChar);
      
      const timer = setTimeout(() => {
        setTypedCode(fullCode.slice(0, currentCharIndex + 1));
        updateCursorPosition(currentCharIndex + 1);
        
        // Play typing sound if enabled
        if (soundEnabled) {
          const charType = typingSoundRef.current.getCharType(currentChar);
          typingSoundRef.current.playKeystroke(charType);
        }
        
        setCurrentCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentCharIndex >= fullCode.length) {
      // Анимация завершена, показываем финальный экран
      const hideTimer = setTimeout(() => {
        setShowAnimation(false);
      }, ANIMATION_CONFIG.TIMINGS.FINAL_SCREEN_DURATION);
      
      return () => clearTimeout(hideTimer);
    }
  }, [currentCharIndex, fullCode.length, showAnimation, isVisible, soundEnabled]);

  const toggleSound = () => {
    if (!soundEnabled) {
      typingSoundRef.current.enable();
    }
    setSoundEnabled(!soundEnabled);
  };

  const resetAnimation = () => {
    setTypedCode("");
    setCurrentCharIndex(0);
    setCurrentLine(1);
    setCurrentCol(1);
    setShowAnimation(true);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), ANIMATION_CONFIG.TIMINGS.RESET_TRANSITION);
  };

  const skipAnimation = () => {
    setTypedCode(fullCode);
    setCurrentCharIndex(fullCode.length);
    updateCursorPosition(fullCode.length);
  };

  if (!showAnimation) {
    return null; // Скрываем анимацию после завершения
  }

  return (
    <div className={`vscode-container ${isVisible ? 'visible' : ''}`}>
      {/* Верхняя панель */}
      <div className="vscode-header">
        <div className="window-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
        <div className="file-tabs">
          <div className="tab active">
            <span className="tab-icon">⚛️</span>
            App.js
            <span className="tab-close">×</span>
          </div>
          <div className="tab">
            <span className="tab-icon">🎨</span>
            App.css
          </div>
        </div>
      </div>

      {/* Основная область */}
      <div className="vscode-body">
        {/* Боковая панель */}
        <div className="sidebar">
          <div className="sidebar-icon active">📁</div>
          <div className="sidebar-icon">🔍</div>
          <div className="sidebar-icon">🔀</div>
          <div className="sidebar-icon">🐛</div>
          <div className="sidebar-icon">🧩</div>
        </div>

        {/* Проводник файлов */}
        <div className="file-explorer">
          <div className="explorer-header">EXPLORER</div>
          <div className="folder-tree">
            <div className="folder expanded">
              📁 horbachova-portfolio
              <div className="folder-content">
                <div className="folder">📁 public</div>
                <div className="folder expanded">
                  📁 src
                  <div className="folder-content">
                    <div className="file active">📄 App.js</div>
                    <div className="file">📄 App.css</div>
                    <div className="file">📄 index.js</div>
                    <div className="folder">📁 components</div>
                    <div className="folder">📁 pages</div>
                  </div>
                </div>
                <div className="file">📄 package.json</div>
                <div className="file">📄 README.md</div>
              </div>
            </div>
          </div>
        </div>

        {/* Редактор кода */}
        <div className="code-editor">
          <div className="editor-header">
            <div className="breadcrumb">src &gt; App.js</div>
            <div className="animation-controls">
              <button 
                className="control-btn sound" 
                onClick={toggleSound}
                title={soundEnabled ? 'Disable sound' : 'Enable sound'}
              >
                {soundEnabled ? '🔊' : '🔇'} Sound
              </button>
              <button className="control-btn skip" onClick={skipAnimation}>
                ⏭ Skip
              </button>
              <button className="control-btn reset" onClick={resetAnimation}>
                🔄 Reset
              </button>
            </div>
          </div>
          <div className="code-area">
            <div className="line-numbers">
              {typedCode.split("\n").map((_, index) => (
                <div key={index} className={`line-number ${index + 1 === currentLine ? 'current' : ''}`}>
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="code-content">
              <pre>
                <code 
                  className="javascript"
                  dangerouslySetInnerHTML={{
                    __html: colorizeCode(typedCode) + (currentCharIndex < fullCode.length ? '<span class="cursor">|</span>' : '')
                  }}
                />
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Статусная строка */}
      <div className="status-bar">
        <div className="status-left">
          <span className="branch">🔀 main</span>
          <span className="errors">❌ 0</span>
          <span className="warnings">⚠️ 0</span>
          <span className="info">ℹ️ Portfolio ready</span>
        </div>
        <div className="status-right">
          <span>JavaScript React</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>Ln {currentLine}, Col {currentCol}</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeMockup;