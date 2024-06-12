# Requests in js
В js есть 2 способа отправить запрос на сервер:
- **XMLHttpRequest** - старый способ
- **Fetch** - новый способ


## XMLHttpRequest
XMLHttpRequest - это объект, который позволяет отправлять запросы на сервер и получать ответы от него.
Работает через конструктор `new XMLHttpRequest()`.

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.github.com/users/defunkt');
xhr.send();
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    console.log(xhr.responseText);
  }
};
```
- `xhr.open(method, url, async)` - настраивает запрос, где:
  - `method` - метод запроса (GET, POST, PUT, DELETE)
  - `url` - адрес сервера
  - `async` - асинхронный запрос (по умолчанию true)
- `xhr.send(body)` - отправляет запрос, где:
    - `body` - тело запроса (для POST запросов)
- `xhr.onreadystatechange` - событие, которое срабатывает при изменении состояния запроса (при изменении `readyState` значения), где:
    - `xhr.readyState` - состояние запроса (0-4)
        > Состояния запроса:
        > - 0 - запрос не инициализирован
        > - 1 - установлено соединение с сервером
        > - 2 - запрос принят сервером
        > - 3 - идет обмен данными
        > - 4 - запрос завершен

    - `xhr.status` - статус запроса (200 - OK, 404 - Not Found, 500 - Internal Server Error)
    - `xhr.statusText` - текстовое описание статуса запроса
    - `xhr.responseType` - тип ответа сервера (`text`, `json`, `blob`, `arraybuffer`)
    - `xhr.response` - ответ сервера (в зависимости от типа ответа: строка, объект, массив, бинарные данные)
    - `xhr.responseText` - ответ сервера в виде строки
    - `xhr.responseXML` - ответ сервера в виде XML-документа

      Стадии отправки данных:
        - `xhr.upload` - объект, который содержит события о стадии отправки данных на сервер
          ```js
          xhr.upload.onprogress = function(event) {
            alert( 'Загружено на сервер ' + event.loaded + ' байт из ' + event.total );
          }

          xhr.upload.onload = function() {
            alert( 'Данные полностью загружены на сервер!' );
          }

          xhr.upload.onerror = function() {
            alert( 'Произошла ошибка при загрузке данных на сервер!' );
          }

          ```
      Стадии получения данных:
        ```js
        xhr.onprogress = function(event) {
          alert( 'Получено с сервера ' + event.loaded + ' байт из ' + event.total );
        }

        xhr.onload = function() {
          alert( 'Данные полностью получены с сервера!' );
        }

        xhr.onerror = function() {
          alert( 'Произошла ошибка при получении данных с сервера!' );
        }
        ```

> Подробнее о XMLHttpRequest можно почитать [здесь](https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest)


## Fetch
Fetch - это новый способ отправки запросов на сервер и получения ответов от него.
Реализует работу с запросами через промисы.

```js
fetch('https://api.github.com/users/defunkt')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
- `fetch(url, options)` - отправляет запрос, где:
    - `url` - адрес сервера
    - `options` - настройки запроса (метод, заголовки, тело запроса)
- `then(response)` - метод промиса. Принимает колбэк-функцию, которая принимает аргументом результат выполнения предыдущего промиса.
  - `response` - объект ответа сервера
    - `response.status` - статус ответа сервера
    - `response.statusText` - текстовое описание статуса ответа сервера
    - `response.headers` - заголовки ответа сервера
    - `response.url` - адрес сервера
    - `response.ok` - успешность ответа сервера (`true` - успешно, `false` - неуспешно)
    - `response.text()` - метод, который возвращает промис с данными в формате текста
    - `response.json()` - метод, который возвращает промис с данными в формате json
- `catch(error)` - метод промиса. Принимает колбэк-функцию, которая принимает аргументом ошибку выполнения промиса
