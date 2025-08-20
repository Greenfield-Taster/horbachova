// animationConfig.js - Configuration for typing animation

export const ANIMATION_CONFIG = {
  // Typing speeds (in milliseconds)
  SPEEDS: {
    FAST: { min: 8, max: 15 },
    NORMAL: { min: 10, max: 25 },
    SLOW: { min: 15, max: 40 },
    PAUSE: { min: 20, max: 50 },
  },

  // Character-specific timing - faster for 2-second animation
  CHAR_SPEEDS: {
    space: { min: 8, max: 12 },
    punctuation: { min: 10, max: 15 },
    newline: { min: 25, max: 40 },
    comment: { min: 15, max: 25 },
    normal: { min: 8, max: 20 },
  },

  // Animation timing
  TIMINGS: {
    APPEAR_DELAY: 200,
    FINAL_SCREEN_DURATION: 1500,
    RESET_TRANSITION: 200,
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
