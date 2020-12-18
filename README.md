# Бэкенд проекта News Explorer

## Описание
Бэкэнд дипломного проекта NewsExplorer с регистрацией, авторизацией и роутами.
Сайт для поиска новостей и сохранения их в личном кабинете.
Доступен по ссылке: http://news.rodion.students.nomoreparties.xyz/

Работает в связке с собственным фронтэндом: https://github.com/Rodion257/news-explorer-frontend

## Технологии
Сделано на Express, подключена и настроена база данных MongoDB, созданы модели,
реализована аутентификация и авторизация, настроено логирование, имеется единый обработчик ошибок.

## Установка 
1. Клонировать этот репозиторий:
    + git clone https://github.com/Rodion257/news-explorer-api.git
2. Клонировать репозиторий с фронтэндом:
    + git clone https://github.com/Rodion257/news-explorer-frontend.git
2. Установить зависимости в каждом проекте:
    + npm install
3. Запустить каждый проект: 
    + npm run start
    + npm run dev (режим разработки для бэкэнда)
