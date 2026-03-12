# Horbachova - Portfolio Website

Професійний портфоліо веб-сайт Анастасії Горбачової, побудований на React з сучасними технологіями та автоматичним деплоєм.

## Технології

- **Frontend:** React 19, Vite 7
- **Анімації:** GSAP 3.13 + ScrollTrigger
- **Інтернаціоналізація:** i18next (українська/англійська)
- **Стилізація:** SASS/SCSS
- **Деплой:** GitHub Actions + FTP
- **Хостинг:** HIC.UA

## Особливості

- Багатомовність (українська/англійська)
- Bento Grid секція технологій (7 категорій)
- Нескінченна карусель проектів з автоскролом
- Плавні GSAP анімації з ScrollTrigger
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
git clone https://github.com/Greenfield-Taster/horbachova.git
cd horbachova
npm install
npm run dev
```

Сайт буде доступний за адресою `http://localhost:3000`

## Команди

```bash
npm run dev          # Запуск dev сервера
npm run build        # Збірка для продакшн
npm run preview      # Попередній перегляд збірки
npm run lint         # Перевірка коду ESLint
```

## Структура проекту

```
├── public/
│   ├── logo.jpg           # Логотип сайту
│   └── .htaccess          # Конфігурація Apache
├── src/
│   ├── components/        # React компоненти
│   │   ├── Hero/          # Головна секція
│   │   ├── About/         # Bento Grid технологій
│   │   ├── Experience/    # Досвід роботи
│   │   ├── Projects/      # Карусель проектів
│   │   ├── Contact/       # Контактна форма
│   │   ├── Footer/        # Футер з динамічним роком
│   │   ├── Navigation/    # Навігація
│   │   └── LanguageSwitcher/ # Перемикач мов
│   ├── locales/           # Файли перекладів (en/uk)
│   ├── styles/            # SCSS стилі та дизайн-токени
│   ├── App.jsx            # Головний компонент
│   └── main.jsx           # Точка входу
├── .github/workflows/     # GitHub Actions
└── vite.config.js         # Конфігурація Vite
```

## Деплой

### Автоматичний деплой

При пуші в гілку `main` GitHub Actions автоматично збирає проект і завантажує на HIC.UA через FTP.

### Ручний деплой

```bash
npm run build
# Завантажити dist/ на сервер: /domains/horbachova.com/public_html/
```

## Інтернаціоналізація

Проект підтримує дві мови:
- Українська (за замовчуванням)
- Англійська

Переклади в `src/locales/{en,uk}/translation.json`

## Контакти

- **GitHub:** [@Greenfield-Taster](https://github.com/Greenfield-Taster)
- **LinkedIn:** [Anastasiia Horbachova](https://www.linkedin.com/in/anastasiia-horbachova)

## Ліцензія

Приватний проект. Всі права захищені.
