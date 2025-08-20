// animationConfig.js - Configuration for typing animation

export const ANIMATION_CONFIG = {
  // Typing speeds (in milliseconds) - faster for 1.5 seconds
  SPEEDS: {
    FAST: { min: 5, max: 10 },
    NORMAL: { min: 6, max: 15 },
    SLOW: { min: 10, max: 25 },
    PAUSE: { min: 15, max: 30 },
  },

  // Character-specific timing - optimized for 1.5-second animation
  CHAR_SPEEDS: {
    space: { min: 5, max: 8 },
    punctuation: { min: 6, max: 10 },
    newline: { min: 15, max: 25 },
    comment: { min: 8, max: 15 },
    normal: { min: 5, max: 12 },
  },

  // Animation timing
  TIMINGS: {
    APPEAR_DELAY: 150,
    FINAL_SCREEN_DURATION: 1000,
    RESET_TRANSITION: 150,
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
