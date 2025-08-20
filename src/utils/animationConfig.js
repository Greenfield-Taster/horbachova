// animationConfig.js - Configuration for typing animation

export const ANIMATION_CONFIG = {
  // Typing speeds (in milliseconds)
  SPEEDS: {
    FAST: { min: 15, max: 40 },
    NORMAL: { min: 25, max: 75 },
    SLOW: { min: 50, max: 150 },
    PAUSE: { min: 100, max: 300 },
  },

  // Character-specific timing
  CHAR_SPEEDS: {
    space: { min: 20, max: 30 },
    punctuation: { min: 30, max: 40 },
    newline: { min: 100, max: 200 },
    comment: { min: 50, max: 100 },
    normal: { min: 25, max: 75 },
  },

  // Animation timing
  TIMINGS: {
    APPEAR_DELAY: 300,
    FINAL_SCREEN_DURATION: 4000,
    RESET_TRANSITION: 300,
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
      normal: 0.1,
      space: 0.05,
      punctuation: 0.08,
      newline: 0.15,
    },
  },
};

export default ANIMATION_CONFIG;
