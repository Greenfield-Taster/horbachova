import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Импорты переводов
import enTranslation from './en/translation.json';
import ukTranslation from './uk/translation.json';

const resources = {
  en: {
    translation: enTranslation,
  },
  uk: {
    translation: ukTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
    
    // Настройки для сохранения выбранного языка
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
  });

export default i18n;