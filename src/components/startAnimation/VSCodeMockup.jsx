import React, { useState, useEffect, useMemo, useRef } from "react";
import "./VSCodeMockup.scss";
import { ANIMATION_CONFIG } from "../../utils/animationConfig";
import CursorSVG from "../../assets/CursorSVG.svg";

const VSCodeMockup = ({ onAnimationComplete }) => {
  const [typedCode, setTypedCode] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [currentLine, setCurrentLine] = useState(1);
  const [currentCol, setCurrentCol] = useState(1);
  const [buttonStage, setButtonStage] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isAnimatingCursor, setIsAnimatingCursor] = useState(false);
  const [cursorTrail, setCursorTrail] = useState([]);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isNearButton, setIsNearButton] = useState(false);

  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const fullCode = useMemo(
    () => `// Horbachova Portfolio
import React from 'react';
import './App.css';

const App = () => {
  const skills = ['React', 'Vue', 'Node.js'];
  const message = 'Hello, World! 👋';
  
  return (
    <div className="portfolio-magic">
      <h1>{message}</h1>
      <p>Lets create something amazing together! ✨</p>
      {skills.map(skill => 
        <span key={skill} className="skill">{skill}</span>
      )}
    </div>
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
    const lines = textUpToCursor.split("\n");
    setCurrentLine(lines.length);
    setCurrentCol(lines[lines.length - 1].length + 1);
  };

  const getTypingSpeed = (char, prevChar) => {
    const config = ANIMATION_CONFIG.CHAR_SPEEDS;

    // Быстрее печатаем пробелы
    if (char === " ") {
      return (
        config.space.min + Math.random() * (config.space.max - config.space.min)
      );
    }

    // Пунктуация
    if ([",", ";", "(", ")", "{", "}", "[", "]"].includes(char)) {
      return (
        config.punctuation.min +
        Math.random() * (config.punctuation.max - config.punctuation.min)
      );
    }

    // Медленнее на конце строки
    if (prevChar === "\n") {
      return (
        config.newline.min +
        Math.random() * (config.newline.max - config.newline.min)
      );
    }

    // Пауза после комментариев
    if (prevChar === "/" && char === "/") {
      return (
        config.comment.min +
        Math.random() * (config.comment.max - config.comment.min)
      );
    }

    // Обычная скорость
    return (
      config.normal.min +
      Math.random() * (config.normal.max - config.normal.min)
    );
  };

  // Полностью переписанная функция подсветки синтаксиса без пересечений
  const colorizeCode = (code) => {
    const tokens = [];
    let i = 0;

    while (i < code.length) {
      let matched = false;

      // Комментарии (высший приоритет)
      if (code.slice(i, i + 2) === "//") {
        const lineEnd = code.indexOf("\n", i);
        const commentEnd = lineEnd === -1 ? code.length : lineEnd;
        tokens.push({ type: "comment", text: code.slice(i, commentEnd) });
        i = commentEnd;
        matched = true;
      }
      // Строковые литералы
      else if (['"', "'", "`"].includes(code[i])) {
        const quote = code[i];
        let j = i + 1;
        while (j < code.length && code[j] !== quote) {
          if (code[j] === "\\\\") j++; // Пропускаем экранированные символы
          j++;
        }
        if (j < code.length) j++; // Включаем закрывающую кавычку
        tokens.push({ type: "string", text: code.slice(i, j) });
        i = j;
        matched = true;
      }
      // Числа
      else if (/\d/.test(code[i])) {
        let j = i;
        while (j < code.length && /[\d.]/.test(code[j])) j++;
        tokens.push({ type: "number", text: code.slice(i, j) });
        i = j;
        matched = true;
      }
      // Идентификаторы и ключевые слова
      else if (/[a-zA-Z_$]/.test(code[i])) {
        let j = i;
        while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) j++;
        const word = code.slice(i, j);

        let type = "identifier";
        const keywords = [
          "import",
          "export",
          "default",
          "const",
          "let",
          "var",
          "function",
          "return",
          "from",
          "async",
          "await",
          "try",
          "catch",
          "if",
          "else",
          "new",
          "Promise",
          "setTimeout",
          "console",
        ];
        const components = [
          "React",
          "useState",
          "useEffect",
          "App",
          "Router",
          "Routes",
          "Route",
          "BrowserRouter",
          "Header",
          "About",
          "Projects",
          "Contact",
        ];

        if (keywords.includes(word)) {
          type = "keyword";
        } else if (components.includes(word)) {
          type = "component";
        }

        tokens.push({ type, text: word });
        i = j;
        matched = true;
      }
      // Многосимвольные операторы
      else if (code.slice(i, i + 3) === "===") {
        tokens.push({ type: "operator", text: "===" });
        i += 3;
        matched = true;
      } else if (code.slice(i, i + 2) === "=>") {
        tokens.push({ type: "operator", text: "=>" });
        i += 2;
        matched = true;
      } else if (code.slice(i, i + 2) === "&&") {
        tokens.push({ type: "operator", text: "&&" });
        i += 2;
        matched = true;
      } else if (code.slice(i, i + 2) === "++") {
        tokens.push({ type: "operator", text: "++" });
        i += 2;
        matched = true;
      }
      // Односимвольные операторы
      else if (["=", "+", "-", "*", "/", "!", "&", "|"].includes(code[i])) {
        tokens.push({ type: "operator", text: code[i] });
        i++;
        matched = true;
      }
      // Пунктуация
      else if (
        ["{", "}", "(", ")", "[", "]", ";", ",", ".", ":", "?"].includes(
          code[i]
        )
      ) {
        tokens.push({ type: "punctuation", text: code[i] });
        i++;
        matched = true;
      }

      // Если ничего не совпало, добавляем как обычный текст
      if (!matched) {
        tokens.push({ type: "text", text: code[i] });
        i++;
      }
    }

    // Формируем HTML с правильным экранированием
    return tokens
      .map((token) => {
        const escapedText = token.text
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        if (token.type === "text" || token.type === "identifier") {
          return escapedText;
        }

        return `<span class="${token.type}">${escapedText}</span>`;
      })
      .join("");
  };

  // Функция анимации курсора к кнопке
  const animateCursorToButton = () => {
    if (!buttonRef.current || !containerRef.current) return;

    // const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();

    // Начальная позиция - центр экрана
    const startX = window.innerWidth / 2;
    const startY = window.innerHeight / 1.5;

    // Конечная позиция - центр кнопки
    const endX = buttonRect.left + buttonRect.width / 2;
    const endY = buttonRect.top + buttonRect.height / 2;

    setShowCursor(true);
    setIsAnimatingCursor(true);

    setCursorPosition({ x: startX, y: startY });

    // Анимация движения курсора
    const startTime = Date.now();
    const duration = ANIMATION_CONFIG.TIMINGS.CURSOR_ANIMATION_DURATION;

    const animateStep = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Используем easing функцию для плавности
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (endX - startX) * easeProgress;
      const currentY = startY + (endY - startY) * easeProgress;

      setCursorPosition({ x: currentX, y: currentY });

      // Обновляем след курсора
      setCursorTrail((prev) => {
        const newTrail = [
          ...prev,
          { x: currentX, y: currentY, timestamp: Date.now() },
        ];
        // Оставляем только последние элементы следа
        return newTrail.slice(-ANIMATION_CONFIG.CURSOR.TRAIL_LENGTH);
      });

      // Проверяем расстояние до кнопки
      const distanceToButton = Math.sqrt(
        Math.pow(currentX - endX, 2) + Math.pow(currentY - endY, 2)
      );

      if (distanceToButton < 100 && !isNearButton) {
        setIsNearButton(true);
      }

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        // Анимация завершена, имитируем клик
        setIsAnimatingCursor(false);

        // Задержка перед "кликом"
        setTimeout(() => {
          // Эффект клика
          if (buttonRef.current) {
            buttonRef.current.classList.add("clicked");
          }

          // Завершаем анимацию
          setTimeout(() => {
            setIsFadingOut(true);

            setTimeout(() => {
              setShowAnimation(false);
              if (onAnimationComplete) {
                onAnimationComplete();
              }
            }, ANIMATION_CONFIG.TIMINGS.FADE_OUT_DURATION);
          }, 100);
        }, ANIMATION_CONFIG.TIMINGS.CURSOR_CLICK_DELAY);
      }
    };

    requestAnimationFrame(animateStep);
  };

  // Обновляем прогресс анимации для синхронизации
  useEffect(() => {
    if (currentCharIndex < fullCode.length && showAnimation && isVisible) {
      const progress = currentCharIndex / fullCode.length;
      setAnimationProgress(progress);

      // Определяем стадию кнопки на основе прогресса
      const stageIndex = Math.floor(
        progress * ANIMATION_CONFIG.BUTTON_STAGES.length
      );
      const clampedStageIndex = Math.min(
        stageIndex,
        ANIMATION_CONFIG.BUTTON_STAGES.length - 1
      );
      setButtonStage(clampedStageIndex);
    }
  }, [currentCharIndex, fullCode.length, showAnimation, isVisible]);

  useEffect(() => {
    if (currentCharIndex < fullCode.length && showAnimation && isVisible) {
      const currentChar = fullCode[currentCharIndex];
      const prevChar =
        currentCharIndex > 0 ? fullCode[currentCharIndex - 1] : "";
      const speed = getTypingSpeed(currentChar, prevChar);

      const timer = setTimeout(() => {
        setTypedCode(fullCode.slice(0, currentCharIndex + 1));
        updateCursorPosition(currentCharIndex + 1);

        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentCharIndex >= fullCode.length) {
      // Завершаем анимацию кнопки
      setAnimationProgress(1);
      setButtonStage(ANIMATION_CONFIG.BUTTON_STAGES.length - 1);

      // Ждём и запускаем анимацию курсора
      const cursorTimer = setTimeout(() => {
        animateCursorToButton();
      }, ANIMATION_CONFIG.TIMINGS.FINAL_SCREEN_DURATION);

      return () => clearTimeout(cursorTimer);
    }
  }, [currentCharIndex, fullCode.length, showAnimation, isVisible]);

  if (!showAnimation) {
    return null; // Скрываем анимацию после завершения
  }

  const currentButtonStyle =
    ANIMATION_CONFIG.BUTTON_STAGES[buttonStage] ||
    ANIMATION_CONFIG.BUTTON_STAGES[0];

  return (
    <div
      ref={containerRef}
      className={`vscode-container ${isVisible ? "visible" : ""} ${
        isFadingOut ? "fade-out" : ""
      }`}
    >
      {/* Затемнение по углам для фокуса */}
      <div className="corner-vignette corner-vignette--top-left"></div>
      <div className="corner-vignette corner-vignette--top-right"></div>
      <div className="corner-vignette corner-vignette--bottom-left"></div>
      <div className="corner-vignette corner-vignette--bottom-right"></div>

      {/* Анимированный курсор */}
      {showCursor && (
        <>
          {/* След курсора */}
          {cursorTrail.map((point, index) => {
            const age = Date.now() - point.timestamp;
            const maxAge = ANIMATION_CONFIG.CURSOR.TRAIL_FADE_TIME;
            const opacity = Math.max(0, (maxAge - age) / maxAge) * 0.4;
            const scale = 0.2 + (opacity / 0.4) * 0.6;

            return (
              <div
                key={`${point.x}-${point.y}-${point.timestamp}`}
                className="cursor-trail"
                style={{
                  left: point.x - 4,
                  top: point.y - 4,
                  opacity,
                  transform: `scale(${scale})`,
                }}
              />
            );
          })}

          {/* Основной курсор */}
          <div
            className={`animated-cursor ${isAnimatingCursor ? "moving" : ""}`}
            style={{
              left: cursorPosition.x - ANIMATION_CONFIG.CURSOR.SIZE / 2,
              top: cursorPosition.y - ANIMATION_CONFIG.CURSOR.SIZE / 2,
            }}
          >
            <img src={CursorSVG} className="cursor-svg" alt="cursor" />
          </div>
        </>
      )}

      {/* Левая половина - VS Code */}
      <div className="left-section">
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
            </div>
            <div className="code-area">
              <div className="line-numbers">
                {typedCode.split("\n").map((_, index) => (
                  <div
                    key={index}
                    className={`line-number ${
                      index + 1 === currentLine ? "current" : ""
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              <div className="code-content">
                <pre>
                  <code
                    className="javascript"
                    dangerouslySetInnerHTML={{
                      __html:
                        colorizeCode(typedCode) +
                        (currentCharIndex < fullCode.length
                          ? '<span class="cursor">|</span>'
                          : ""),
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
            <span>
              Ln {currentLine}, Col {currentCol}
            </span>
          </div>
        </div>
      </div>

      {/* Правая половина - белый фон с кнопкой */}
      <div className="right-section">
        <button
          ref={buttonRef}
          className={`evolving-button ${currentButtonStyle.className} ${
            isNearButton ? "near-cursor" : ""
          }`}
          style={currentButtonStyle.styles}
        >
          Button
        </button>
      </div>
    </div>
  );
};

export default VSCodeMockup;
