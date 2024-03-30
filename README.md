<h1 align="center">Сайт проекта Madness</h1>

<p align="center">
<img src="https://img.shields.io/github/contributors/Uximy/Madness-Project-React?color=dark-green" alt="Contributors">
<img src="https://img.shields.io/github/downloads/Uximy/Madness-Project-React/total" alt="Total Downloads">
<img src="https://img.shields.io/badge/license-MIT-green" alt="License">
</p>

Сайт проекта Madness представляет собой полноценную платформу для игрового проекта. Он включает в себя функции авторизации через Steam, публикации новостей, отображения статистики и возможность покупки привилегий через систему FreeKassa.

## Описание
Сайт разработан с использованием **React**, **Node.js** и **Express**, обеспечивая высокую производительность и удобство использования. Он предоставляет пользователям возможность приобретать игровые привилегии через систему FreeKassa, а также читать последние новости и обновления проекта.

## Функционал
- **Авторизация через Steam:** Пользователи могут быстро и безопасно войти на сайт, используя свои аккаунты Steam.
- **Публикация новостей:** Администраторы могут публиковать новости и обновления проекта, которые будут отображаться на сайте.
- **Статистика:** Пользователи могут просматривать статистику игроков, такую как количество убийств и очки.
- **Покупка привилегий:** Пользователи могут приобретать игровые привилегии на сервере через сайт с помощью системы FreeKassa.

## Как установить сайт
1. **Клонируйте репозиторий:** `git clone https://github.com/Madness-Project-React`
2. **Установите зависимости:** `cd Madness-Project-React && npm install`
3. **Запустите бэкенд:** `cd backend && node server.js`
4. **Запустите фронтенд:** `npm run start`
5. **Откройте сайт:** Перейдите по адресу `http://localhost:3000` в вашем браузере.

## Технологии
- **Фронтенд:** React
- **Бэкенд:** Node.js, Express, WebSocket, Nodemailer, SteamAPI
- **Платежная система:** FreeKassa

## Настройка backend
Для настройки backend проекта используется файл конфигурации `config.json`, который находится в папке `backend`. В нем необходимо указать следующие параметры:

- **hostname:** Здесь указывается доменное имя вашего сервера.
- **port:** Порт, на котором будет работать сервер (например, 3001).
- **apiKey:** API ключ для доступа к [Steam API](https://steamcommunity.com/dev/apikey). 
- **secretKey:** Секретный ключ для некоторых операций, требующих аутентификации.
- **rcon_password:** Пароль для доступа к RCON (Remote Console) сервера.

- **FreeKassa:** Содержит настройки для работы с платежной системой FreeKassa.
  - `merchantId`: Идентификатор мерчанта FreeKassa.
  - `secretKey_1`: Секретный ключ для работы с FreeKassa.
  - `secretKey_2`: Второй секретный ключ для работы с FreeKassa.

- **mail:** Содержит настройки для отправки почты.
  - `user`: Логин почтового ящика для отправки писем.
  - `password_key`: Ключ приложения для доступа к почтовому ящику.

- **database_lvlrank:** Содержит настройки для подключения к базе данных lvlrank, где хранятся уровни и ранги игроков.
  - `ip_db`: IP-адрес базы данных.
  - `user`: Имя пользователя базы данных.
  - `database`: Название базы данных.
  - `password`: Пароль для доступа к базе данных.

- **database_ReactDB:** Содержит настройки для подключения к базе данных react. **(Файл базы лежит в корневой папки проекта)**
  - `username`: Имя пользователя базы данных ReactDB.
  - `databaseName`: Название базы данных ReactDB.
  - `password`: Пароль для доступа к базе данных ReactDB.

## Настройка файла .env.production
Файл **.env.production** используется для установки переменных среды во время production-сборки вашего приложения React. В нем можно указать различные настройки, которые будут использоваться в вашем приложении при запуске в production-режиме.

- **HTTPS**: Установите как true, чтобы использовать HTTPS протокол на вашем сайте.
- **SSL_CRT_FILE и SSL_KEY_FILE**: Пути к SSL-сертификатам.
- **REACT_APP_NAME**: Название вашего проекта.
- **REACT_APP_API_URL_SOCKET**: URL вашего websocket backend.
- **REACT_APP_DOMAIN_NAME**: Домен вашего сайта.

## Отправка шаблонных писем
После покупки привилегии отправляется шаблонное письмо на email покупателя, который он указывает при оплате на FreeKassa. Шаблон email находится в папке `backend/emailTemplate`, файл называется `success_buy.handlebars`.

Для отправки шаблонной почты используется библиотека `nodemailer-express-handlebars`, а для отправки писем используется `nodemailer`. Настройка email отправителя использует почту Gmail.

## Настройка front-end
Так таковая настройка остутствует. В данный момент более-менее удобно можно изменить привилегии и правила.
Настройка правил находится в файле `src/template/AkeYlake/RulesPage.jsx`

## Настройка привилегий для продажи
Переходим в директорию `src/template/AkeYlake` и находим файл `ShopDictionary.json`
Свойства объекта - массив привилегий сервера.
У привилегий следующие свойства:
- **name**: Название привилегии
- **ID**: ID привилегии. Нужно для генерации ключа.
- **Price**: Массив цен на привилегию. на 7, 30, 90 дней и навсегда.
- **decription**: Описание привилегии. Поддерживает html.


## Над созданием сайта работали:
- [Uximy](https://github.com/Uximy)
- [AkeYlake](https://github.com/AkeYlake)

Проект открыт для вклада в виде предложений и исправлений. Будем рады вашей помощи!