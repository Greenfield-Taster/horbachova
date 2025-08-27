// animationConfig.js - Configuration for typing animation

export const ANIMATION_CONFIG = {
  // Typing speeds (in milliseconds) - much faster for better UX
  SPEEDS: {
    FAST: { min: 1, max: 2 },
    NORMAL: { min: 1, max: 3 },
    SLOW: { min: 2, max: 4 },
    PAUSE: { min: 3, max: 6 },
  },

  // Character-specific timing - optimized for faster animation
  CHAR_SPEEDS: {
    space: { min: 1, max: 2 },
    punctuation: { min: 1, max: 3 },
    newline: { min: 4, max: 8 },
    comment: { min: 2, max: 4 },
    normal: { min: 1, max: 3 },
  },

  // Animation timing
  TIMINGS: {
    APPEAR_DELAY: 100,
    FINAL_SCREEN_DURATION: 1200, // Время показа финальной кнопки перед курсором
    CURSOR_ANIMATION_DURATION: 800, // Время движения курсора к кнопке
    CURSOR_CLICK_DELAY: 200, // Задержка перед "кликом"
    FADE_OUT_DURATION: 500, // Время исчезновения анимации
    RESET_TRANSITION: 150,
    TOTAL_ANIMATION_DURATION: 2500, // Общее время анимации (ускорено)
  },

  // Button evolution stages - стили по нарастанию
  BUTTON_STAGES: [
    {
      // Stage 1: самая примитивная кнопка
      className: "btn-stage-1",
      styles: {
        background: "#ccc",
        border: "none",
        padding: "5px 10px",
        fontSize: "12px",
        color: "#000",
        borderRadius: "0",
        cursor: "pointer",
      },
    },
    {
      // Stage 2: добавляем базовую форму
      className: "btn-stage-2",
      styles: {
        background: "#007acc",
        border: "1px solid #005c99",
        padding: "8px 15px",
        fontSize: "14px",
        color: "#fff",
        borderRadius: "3px",
        cursor: "pointer",
      },
    },
    {
      // Stage 3: улучшаем типографику
      className: "btn-stage-3",
      styles: {
        background: "linear-gradient(135deg, #007acc, #005c99)",
        border: "1px solid #005c99",
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "500",
        color: "#fff",
        borderRadius: "6px",
        cursor: "pointer",
        fontFamily: "system-ui, -apple-system, sans-serif",
      },
    },
    {
      // Stage 4: добавляем эффекты и тени
      className: "btn-stage-4",
      styles: {
        background: "linear-gradient(135deg, #007acc, #005c99)",
        border: "1px solid #005c99",
        padding: "12px 24px",
        fontSize: "16px",
        fontWeight: "600",
        color: "#fff",
        borderRadius: "8px",
        cursor: "pointer",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow: "0 2px 8px rgba(0, 122, 204, 0.3)",
        transition: "all 0.2s ease",
      },
    },
    {
      // Stage 5: финальная красивая кнопка с улучшенным фокусом
      className: "btn-stage-5",
      styles: {
        background: "linear-gradient(135deg, #007acc, #0099ff)",
        border: "2px solid transparent",
        backgroundClip: "padding-box",
        padding: "16px 32px",
        fontSize: "20px",
        fontWeight: "700",
        color: "#fff",
        borderRadius: "12px",
        cursor: "pointer",
        fontFamily: "system-ui, -apple-system, sans-serif",
        boxShadow:
          "0 8px 32px rgba(0, 122, 204, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateY(0) scale(1)",
        textShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
        letterSpacing: "0.5px",
      },
    },
  ],

  // Button timing - когда какой стиль применять
  BUTTON_TIMING: {
    STAGE_DURATION: 400, // каждый стейдж 0.4 секунды (ускорено)
    TRANSITION_DURATION: 200, // переход между стейджами (ускорено)
  },

  // Курсор конфигурация
  CURSOR: {
    SIZE: 24, // Размер курсора
    ANIMATION_CURVE: "cubic-bezier(0.25, 0.46, 0.45, 0.94)", // Плавная кривая движения
    GLOW_COLOR: "#00d4ff",
    TRAIL_LENGTH: 8, // Количество элементов в следе курсора (увеличили для лучшего эффекта)
    TRAIL_FADE_TIME: 400, // Время исчезновения следа
  },
};

export default ANIMATION_CONFIG;
