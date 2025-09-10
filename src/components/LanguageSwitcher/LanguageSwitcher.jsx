import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.scss';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'uk' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button 
      className="language-switcher" 
      onClick={toggleLanguage}
      aria-label="Switch language"
    >
      <span className="language-switcher__text">
        {i18n.language === 'en' ? 'УКР' : 'ENG'}
      </span>
    </button>
  );
};

export default LanguageSwitcher;