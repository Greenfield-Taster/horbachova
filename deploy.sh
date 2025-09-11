#!/bin/bash

# Скрипт для ручного деплоя на HIC.UA
# Использование: ./deploy.sh

echo "🚀 Начинаем деплой на HIC.UA..."

# Собираем проект
echo "📦 Сборка проекта..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Ошибка при сборке проекта!"
    exit 1
fi

echo "✅ Проект собран успешно!"

# Проверяем папку dist
if [ ! -d "dist" ]; then
    echo "❌ Папка dist не найдена!"
    exit 1
fi

echo "📁 Файлы для загрузки:"
ls -la dist/

echo ""
echo "🎯 Следующие шаги:"
echo "1. Загрузите содержимое папки dist/ на ваш хостинг HIC.UA"
echo "2. Путь на сервере: /domains/horbachova.com/public_html/"
echo "3. Убедитесь, что все файлы перенесены правильно"
echo ""
echo "📋 FTP данные для HIC.UA:"
echo "- Сервер: обычно ftp.hic.ua или IP вашего сервера"
echo "- Пользователь: ваш логин от хостинга"
echo "- Пароль: ваш пароль от хостинга"
echo ""
echo "🔧 Для автоматического деплоя настройте GitHub Actions secrets:"
echo "- FTP_SERVER: адрес FTP сервера"
echo "- FTP_USERNAME: логин FTP"
echo "- FTP_PASSWORD: пароль FTP"

echo ""
echo "✨ Деплой подготовлен!"
