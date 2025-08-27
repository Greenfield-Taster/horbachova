// animationConfig.js - Configuration for typing animation

export const ANIMATION_CONFIG = {
  // Typing speeds (in milliseconds) - much faster for better UX
  SPEEDS: {
    FAST: { min: 2, max: 4 },
    NORMAL: { min: 3, max: 6 },
    SLOW: { min: 5, max: 10 },
    PAUSE: { min: 8, max: 15 },
  },

  // Character-specific timing - optimized for faster animation
  CHAR_SPEEDS: {
    space: { min: 2, max: 4 },
    punctuation: { min: 3, max: 5 },
    newline: { min: 8, max: 12 },
    comment: { min: 4, max: 8 },
    normal: { min: 2, max: 5 },
  },

  // Animation timing
  TIMINGS: {
    APPEAR_DELAY: 150,
    FINAL_SCREEN_DURATION: 1500,
    RESET_TRANSITION: 150,
    TOTAL_ANIMATION_DURATION: 3000, // 3 секунды для синхронизации
  },

  // Button evolution stages - стили по нарастанию
  BUTTON_STAGES: [
    { 
      // Stage 1: самая примитивная кнопка
      className: 'btn-stage-1',
      styles: {
        background: '#ccc',
        border: 'none',
        padding: '5px 10px',
        fontSize: '12px',
        color: '#000',
        borderRadius: '0',
        cursor: 'pointer'
      }
    },
    {
      // Stage 2: добавляем базовую форму
      className: 'btn-stage-2', 
      styles: {
        background: '#007acc',
        border: '1px solid #005c99',
        padding: '8px 15px',
        fontSize: '14px',
        color: '#fff',
        borderRadius: '3px',
        cursor: 'pointer'
      }
    },
    {
      // Stage 3: улучшаем типографику
      className: 'btn-stage-3',
      styles: {
        background: 'linear-gradient(135deg, #007acc, #005c99)',
        border: '1px solid #005c99',
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#fff',
        borderRadius: '6px',
        cursor: 'pointer',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }
    },
    {
      // Stage 4: добавляем эффекты и тени
      className: 'btn-stage-4',
      styles: {
        background: 'linear-gradient(135deg, #007acc, #005c99)',
        border: '1px solid #005c99',
        padding: '12px 24px',
        fontSize: '16px',
        fontWeight: '600',
        color: '#fff',
        borderRadius: '8px',
        cursor: 'pointer',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 2px 8px rgba(0, 122, 204, 0.3)',
        transition: 'all 0.2s ease'
      }
    },
    {
      // Stage 5: финальная красивая кнопка
      className: 'btn-stage-5',
      styles: {
        background: 'linear-gradient(135deg, #007acc, #0099ff)',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        padding: '14px 28px',
        fontSize: '18px',
        fontWeight: '600',
        color: '#fff',
        borderRadius: '12px',
        cursor: 'pointer',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        boxShadow: '0 4px 16px rgba(0, 122, 204, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        transform: 'translateY(0)'
      }
    }
  ],

  // Button timing - когда какой стиль применять
  BUTTON_TIMING: {
    STAGE_DURATION: 600, // каждый стейдж 0.6 секунды
    TRANSITION_DURATION: 300 // переход между стейджами
  },

  // Sound configuration
  SOUND: {
    ENABLED_BY_DEFAULT: true,
    FREQUENCIES: {
      normal: { base: 800, variation: 200 },
      space: { base: 400, variation: 0 },
      punctuation: { base: 1200, variation: 0 },
      newline: { base: 600, variation: 0 },
    },
    DURATIONS: {
      normal: 0.08,
      space: 0.04,
      punctuation: 0.06,
      newline: 0.1,
    },
  },
};

export default ANIMATION_CONFIG;
