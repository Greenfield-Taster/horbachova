// Дополнительные утилиты для стартовой анимации
export const createSmoothPath = (startX, startY, endX, endY, controlPoints = 2) => {
  const points = [];
  const segments = 20; // Количество точек для плавной кривой
  
  // Создаем контрольные точки для кривой Безье
  const cp1X = startX + (endX - startX) * 0.25;
  const cp1Y = startY + (endY - startY) * 0.1;
  const cp2X = startX + (endX - startX) * 0.75;
  const cp2Y = startY + (endY - startY) * 0.9;
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    
    // Кубическая кривая Безье
    const x = Math.pow(1 - t, 3) * startX +
              3 * Math.pow(1 - t, 2) * t * cp1X +
              3 * (1 - t) * Math.pow(t, 2) * cp2X +
              Math.pow(t, 3) * endX;
              
    const y = Math.pow(1 - t, 3) * startY +
              3 * Math.pow(1 - t, 2) * t * cp1Y +
              3 * (1 - t) * Math.pow(t, 2) * cp2Y +
              Math.pow(t, 3) * endY;
    
    points.push({ x, y, t });
  }
  
  return points;
};

export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeInOutQuart = (t) => {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
};

// Функция для создания естественного движения курсора с микро-дрожанием
export const addNaturalJitter = (x, y, intensity = 0.5) => {
  const jitterX = (Math.random() - 0.5) * intensity;
  const jitterY = (Math.random() - 0.5) * intensity;
  
  return {
    x: x + jitterX,
    y: y + jitterY
  };
};

// Проверка производительности устройства
export const getDevicePerformance = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    if (renderer.includes('Intel') || renderer.includes('AMD')) {
      return 'medium';
    }
    if (renderer.includes('NVIDIA') || renderer.includes('GeForce')) {
      return 'high';
    }
  }
  
  // Фоллбэк на основе памяти устройства
  const memory = navigator.deviceMemory || 4;
  if (memory >= 8) return 'high';
  if (memory >= 4) return 'medium';
  return 'low';
};

// Адаптивная конфигурация на основе производительности
export const getAdaptiveConfig = () => {
  const performance = getDevicePerformance();
  
  const configs = {
    low: {
      TRAIL_LENGTH: 4,
      ANIMATION_QUALITY: 'low',
      ENABLE_GLOW: false,
      FRAME_RATE: 30
    },
    medium: {
      TRAIL_LENGTH: 6,
      ANIMATION_QUALITY: 'medium', 
      ENABLE_GLOW: true,
      FRAME_RATE: 45
    },
    high: {
      TRAIL_LENGTH: 8,
      ANIMATION_QUALITY: 'high',
      ENABLE_GLOW: true,
      FRAME_RATE: 60
    }
  };
  
  return configs[performance] || configs.medium;
};

export default {
  createSmoothPath,
  easeInOutCubic,
  easeInOutQuart,
  addNaturalJitter,
  getDevicePerformance,
  getAdaptiveConfig
};
