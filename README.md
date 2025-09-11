# Dr. Horbachova - Portfolio Website

Професійний портфоліо веб-сайт Dr. Horbachova, побудований на React з сучасними технологіями та автоматичним деплоєм.

## Технології

- **Frontend:** React 19, Vite 7
- **Анімації:** GSAP 3.13
- **Інтернаціоналізація:** i18next (українська/англійська)
- **Стилізація:** SASS/SCSS
- **Деплой:** GitHub Actions + FTP
- **Хостинг:** HIC.UA

## Особливості

- Багатомовність (українська/англійська)
- Плавні GSAP анімації
- Адаптивний дизайн
- SPA архітектура
- SEO оптимізація
- Автоматичний деплой

## Швидкий старт

### Вимоги
- Node.js 18+ 
- npm або yarn

### Встановлення

```bash
# Клонування репозиторію
git clone https://github.com/Greenfield-Taster/horbachova.git

# Перехід до директорії
cd horbachova

# Встановлення залежностей
npm install

# Запуск dev сервера
npm run dev
```

Сайт буде доступний за адресою `http://localhost:3000`

## Команди

```bash
# Розробка
npm run dev          # Запуск dev сервера
npm run preview      # Попередній перегляд збірки

# Збірка
npm run build        # Збірка для продакшн

# Лінтинг
npm run lint         # Перевірка коду ESLint
```

## Структура проекту

```
├── public/
│   ├── logo.jpg           # Логотип сайту
│   └── .htaccess         # Конфігурація Apache
├── src/
│   ├── components/       # React компоненти
│   ├── locales/         # Файли перекладів
│   │   ├── i18n.js      # Конфігурація i18next
│   │   ├── en.json      # Англійські переклади
│   │   └── uk.json      # Українські переклади
│   ├── styles/          # SCSS стилі
│   ├── App.jsx          # Головний компонент
│   ├── main.jsx         # Точка входу
│   └── index.css        # Глобальні стилі
├── .github/workflows/   # GitHub Actions
│   └── deploy.yml       # Автодеплой на HIC.UA
├── dist/               # Зібраний проект (генерується)
├── package.json        # Залежності та скрипти
└── vite.config.js      # Конфігурація Vite
```

## Деплой

### Автоматичний деплой

Проект налаштований на автоматичний деплой через GitHub Actions. При пуші в гілку `main`:

1. Проект збирається автоматично
2. Файли завантажуються на HIC.UA через FTP
3. Сайт оновлюється на https://horbachova.com

### Налаштування деплою

У GitHub Secrets додані:
- `FTP_SERVER`: tzk302.nic.ua
- `FTP_USERNAME`: логін від хостингу
- `FTP_PASSWORD`: пароль від хостингу

### Ручний деплой

```bash
# Збірка проекту
npm run build

# Завантаження dist/ на сервер через FTP
# Шлях: /domains/horbachova.com/public_html/
```

## Інтернаціоналізація

Проект підтримує дві мови:
- 🇺🇦 Українська (за замовчуванням)
- 🇬🇧 Англійська

Переклади знаходяться в `src/locales/`:
- `uk.json` - українські тексти
- `en.json` - англійські тексти

### Додавання нових текстів

```javascript
// uk.json
{
  "hero": {
    "title": "Заголовок українською"
  }
}

// en.json  
{
  "hero": {
    "title": "Title in English"
  }
}

// Використання в компоненті
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('hero.title')}</h1>
```

## Анімації

Використовується GSAP для створення плавних анімацій:
- Анімації при завантаженні сторінки
- Інтерактивні hover ефекти
- Плавні переходи між секціями

## SEO

Сайт оптимізований для пошукових систем:
- Мета-теги для соціальних мереж (Open Graph)
- JSON-LD структуровані дані
- Семантична HTML розмітка
- Оптимізовані зображення

## Хостинг та домен

- **Хостинг:** HIC.UA
- **Домен:** horbachova.com
- **SSL:** Увімкнений
- **CDN:** Nginx кешування

## Розробка

### Кодстайл

Проект використовує:
- ESLint для перевірки коду
- Prettier для форматування (рекомендується)

### Git workflow

```bash
# Створення feature гілки
git checkout -b feature/new-feature

# Коміт змін
git add .
git commit -m "Add new feature"

# Пуш та створення PR
git push origin feature/new-feature
```

## Продуктивність

- Vite для швидкої збірки
- Code splitting для JS бандлів
- Lazy loading зображень
- Стиснення ресурсів
- Browser кешування

## Підтримка браузерів

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Контакти

- **Розробник:** Anastasiia Horbachova
- **Email:** [контактний email]
- **GitHub:** [@Greenfield-Taster](https://github.com/Greenfield-Taster)
- **LinkedIn:** [linkedin профіль]

## Ліцензія

Приватний проект. Всі права захищені.

---

**Останнє оновлення:** Вересень 2025
