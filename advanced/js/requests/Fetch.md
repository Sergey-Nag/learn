# Fetch

Метод `fetch()` используется для отправки запросов на сервер и получения ответов от него. Реализует работу с запросами через промисы. Он не поддерживается в старых браузерах (можно использовать полифилл), но в актуальных браузерах является более удобным и современным способом работы с запросами.

```js
fetch("https://api.github.com/users/defunkt")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

## Параметры запроса

Метод `fetch()` принимает два аргумента: адрес сервера и параметры запроса.
Если параметры запроса не указаны, то по умолчанию используется метод `GET` и заголовки по умолчанию.

Объект параметров запроса может содержать следующие свойства:
- `method` - метод запроса (GET, POST, PUT, DELETE и т.д.) 
- `headers` - объект с заголовками запроса
- `body` - тело запроса
- `mode` - режим запроса (cors, no-cors, same-origin)
- `credentials` - режим использования куки (omit, same-origin, include)
- `cache` - режим кеширования (default, no-store, reload, no-cache, force-cache, only-if-cached)
- `redirect` - режим перенаправления (follow, error, manual)
- `referrer` - адрес, который будет использоваться в заголовке Referer
- `referrerPolicy` - политика использования заголовка Referer
- `integrity` - контрольная сумма для проверки целостности содержимого
- `keepalive` - использовать keepalive соединение
- `signal` - объект `AbortSignal` для отмены запроса

```js
fetch("https://api.github.com/users/defunkt", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  mode: "cors",
  credentials: "same-origin",
  cache: "default",
  redirect: "follow",
  referrer: "no-referrer",
  integrity: "",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### `method`

Свойство `method` определяет метод запроса. Возможные значения:
- `GET` - получение данных
- `POST` - отправка данных
- `PUT` - обновление данных
- `DELETE` - удаление данных
[Полный список методов](https://developer.mozilla.org/ru/docs/Web/HTTP/Methods)

```js
fetch("https://api.github.com/users/defunkt", {
  method: "GET",
});
```

> GET запросы преднеазначены для получения данных с сервера

```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  body: JSON.stringify({ name: "defunkt" }),
});
```

> POST запросы предназначены для отправки данных на сервер

```js
fetch("https://api.github.com/users/defunkt", {
  method: "PUT",
  body: JSON.stringify({ name: "defunkt" }),
});
```

> PUT запросы предназначены для обновления данных на сервере

```js
fetch("https://api.github.com/users/defunkt", {
  method: "DELETE",
});
```

> DELETE запросы предназначены для удаления данных на сервере

### `headers`

Свойство `headers` определяет заголовки запроса.
Заголовки используются для передачи дополнительной информации о запросе.
Они могут быть добавлены в объект в виде пары ключ-значение.

Какие-то заголовки специфичны для запроса, как например `Content-Type`, а какие-то для ответа, как например `Accept`.

Возможные заголовки запроса:

- `Accept` - тип содержимого, который клиент готов принять ([MIME-тип](https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_MIME-%D1%82%D0%B8%D0%BF%D0%BE%D0%B2))
- `Content-Type` - тип содержимого тела запроса (MIME-тип)
- `Authorization` - данные для аутентификации (Basic, Bearer, Token)
- `User-Agent` - информация о клиенте (браузер, ОС, версия)
- `Cookie` - куки, которые были установлены ранее
- `Origin` - адрес, с которого был отправлен запрос (для CORS)
- `Referer` - адрес, с которого был осуществлен переход (URL с которого был отправлен запрос)
- `Connection` - тип соединения (keep-alive, close)
- `Host` - адрес сервера
- `Cache-Control` - настройки кеширования (no-cache, no-store, max-age)

[Полный список заголовков](https://developer.mozilla.org/ru/docs/Web/HTTP/Headers)

Большинство заголовков добавляются автоматически браузером при отправке, но некоторые из них могут быть добавлены вручную.

```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "defunkt" }),
});
```

> `Content-Type` - тип содержимого тела запроса. Указывает на формат данных, которые отправляются на сервер. В данном случае это JSON.

Примерный вид итогового запроса:

```http
POST https://api.github.com/users/defunkt
accept-encoding: gzip, deflate, br
accept: */*
content-length: 20
content-type: application/json
host: api.github.com
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3

{"name":"defunkt"}
```

> В данном случае браузер автоматически добавил заголовки `accept-encoding`, `accept`, `content-length`, `host`, `user-agent`.

#### Аутентификация

Для аутентификации на сервере используется заголовок `Authorization`. Он включает в себя данные пользователя для проверки подлинности клиента с сервером.

`Authorization: <тип> <данные пользователя>`

- `<тип>` - тип авторизации (Basic, Bearer, Token, ...)
- `<данные пользователя>` - данные пользователя для проверки подлинности

```js
fetch("https://api.github.com/users/defunkt", {
  headers: {
    Authorization: "Basic username:password",
  },
});
```

> `Basic` - тип авторизации. В данном случае это базовая аутентификация. `username:password` - данные пользователя для проверки подлинности.

### `body`

Свойство `body` определяет тело запроса. Оно содержит данные, которые будут отправлены на сервер.

Тело запроса может быть строкой или бинарными данными.

**string:**
```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  body: JSON.stringify({ name: "defunkt" }),
});
```
> В данном случае тело запроса представляет собой объект, который преобразуется в строку методом `JSON.stringify()`. Так как мы не указали заголовок `Content-Type`, то по умолчанию используется `text/plain`.

**JSON:**
```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ name: "defunkt" }),
});
```
> В данном случае тело запроса представляет собой объект, который преобразуется в строку методом `JSON.stringify()`. Так как мы указали заголовок `Content-Type`, то сервер будет знать, что это JSON.

**Form Data:**
```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  body: new FormData(document.querySelector("form")),
});
```
> В данном случае тело запроса представляет собой объект `FormData`, который содержит данные формы. Так как мы указали заголовок `Content-Type`, то сервер будет знать, что это данные формы.

**Binary (Image):**
```js
fetch("https://api.github.com/users/defunkt", {
  method: "POST",
  headers: {
    "Content-Type": "image/jpeg",
  },
  body: new Blob([new Uint8Array([0, 1, 2, 3])], { type: "image/jpeg" }),
});
```
> В данном случае тело запроса представляет собой бинарные данные, которые создаются с помощью объекта `Blob`. Так как мы указали заголовок `Content-Type`, то сервер будет знать, что это изображение.

### `mode`

CORS (Cross-Origin Resource Sharing) - механизм, который позволяет ограничивать запросы к ресурсам на другом источнике (на другие сайты).
[Подробнее о CORS](https://developer.mozilla.org/ru/docs/Web/HTTP/CORS)

Свойство `mode` определяет режим запроса. Возможные значения:
- `cors` - запрос с использованием CORS (по умолчанию)
- `no-cors` - разрешены только простые запросы на другой источник.
- `same-origin` - разрешен запрос на тот же источник, отсальные запрещены.


```js
fetch("https://api.github.com/users/defunkt", {
  mode: "cors",
});
```
> В данном случае используется режим `cors`, который позволяет отправлять запросы на другой источник. Если источник разрешает запросы, то сервер возвращает заголовок `Access-Control-Allow-Origin` со значением источника.


### `credentials`

Свойство `credentials` указывает, должен ли браузер отправлять куки и авторизационные данные с запросом. Возможные значения:
- `omit` - не отправлять.
- `same-origin` - отправлять только для запросов на тот же источник. (по умолчанию)
- `include` - отправлять всегда, но при этом необходим заголовок `Access-Control-Allow-Credentials` в ответе от сервера, чтобы JavaScript получил доступ к ответу сервера,

```js
fetch("https://api.github.com/users/defunkt", {
  credentials: "same-origin",
});
```
> В данном случае используется режим `same-origin`, который позволяет использовать куки только для запросов на тот же источник.

Например, если мы отправляем запрос на `http://example.com`, который возвращает ответ с заголовком `Access-Control-Allow-Credentials: true`, то браузер отправит куки и авторизационные данные с запросом.

### `cache`
По умолчанию `fetch` делает запросы, используя стандартное HTTP-кеширование. То есть, учитывается заголовки `Expires`, `Cache-Control`, отправляется `If-Modified-Since` и так далее. Так же, как и обычные HTTP-запросы.

Свойство `cache` переопределяет поведение кеширования для запроса. Возможные значения:
- `default` - используется кеширование по умолчанию
- `no-store` - кеширование отключено. Этот режим становится режимом по умолчанию, если присутствуют такие заголовки как `If-Modified-Since`, `If-None-Match`, `If-Unmodified-Since`, `If-Match`, или `If-Range`,
- `reload` - не брать результат из HTTP-кеша (даже при его присутствии), но сохранить ответ в кеше (если это позволено заголовками ответа)
- `no-cache` - кеширование используется, но данные проверяются на сервере
- `force-cache` - использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, сделать обычный HTTP-запрос, действовать как обычно
- `only-if-cached` - использовать ответ из HTTP-кеша, даже если он устаревший. Если же ответ в HTTP-кеше отсутствует, то выдаётся ошибка. Это работает, только когда mode установлен в "same-origin"

```js
fetch("https://api.github.com/users/defunkt", {
  cache: "force-cache",
});
```
> В данном случае используется режим `force-cache`, который позволяет использовать ответ из HTTP-кеша, даже если он устаревший.

Например, если мы делаем запрос на `http://example.com`, который возвращает ответ с заголовком `Cache-Control: max-age=60`, то при следующем запросе на `http://example.com` в течение 60 секунд, `fetch` будет использовать ответ из кеша.

### `redirect`
Обычно `fetch` прозрачно следует HTTP-редиректам, таким как 301, 302 и так далее.

Свойство `redirect` переопределяет режим перенаправления. Возможные значения:
- `follow` - стоит по умолчанию, следовать HTTP-редиректам
- `error` - ошибка в случае HTTP-редиректа
- `manual` - не следовать HTTP-редиректу, но установить адрес редиректа в `response.url`, а `response.redirected` будет иметь значение `false`, чтобы мы могли сделать перенаправление на новый адрес вручную.

```js
fetch("https://api.github.com/users/defunkt", {
  redirect: "follow",
});
```
> В данном случае используется режим `follow`, который позволяет автоматически перенаправлять запросы.

Наприер, если мы делаем запрос на `http://example.com`, который перенаправляет на `https://example.com`, то по умолчанию `fetch` следует редиректу и возвращает ответ от `https://example.com`.

Если мы установим `redirect: "manual"`, то `fetch` не будет следовать редиректу, но вернет ответ от `http://example.com` с кодом 301 и адресом редиректа в `response.url`.

### `referrer`, `referrerPolicy`
Свойвто `referrer` позволяет установить любой `Referer` в пределах текущего источника или же убрать его.

Чтобы не отправлять Referer, нужно указать значением пустую строку:
```js
fetch("https://api.github.com/users/defunkt", {
  referrer: "",
});
```
Для того, чтобы установить другой URL-адрес (должен быть с текущего источника):
```js
fetch("https://api.github.com/users/defunkt", {
  referrer: "https://api.github.com/pages",
});
```

**Опция `referrerPolicy` устанавливает общие правила для `Referer`.**
- `strict-origin-when-cross-origin` – значение по умолчанию: для `same-origin` отправлять полный `Referer`, для `cross-origin` отправлять только `origin`, если только это не HTTPS на HTTP запрос.
- `no-referrer` - не отправлять `Referer`
- `no-referrer-when-downgrade` - не отправлять `Referer` при запросе с HTTPS на HTTP
- `origin` - отправлять только `Origin` (домен) вместо полного URL. (вместо `https://api.github.com/pages` будет отправлено `https://api.github.com`)
- `origin-when-cross-origin` - отправлять полный `Referer` для запросов в пределах текущего источника, но для запросов на другой источник отправлять только сам источник (как выше).
- `same-origin` - отправлять полный `Referer` для запросов в пределах текущего источника, но для запросов на другой источник не отправлять ничего.
- `strict-origin` - отправлять только `Origin` для всех запросов.
- `unsafe-url` - всегда отправлять полный `Referer` для всех запросов даже HTTPS на HTTP.

```js
fetch("https://api.github.com/users/defunkt", {
  referrerPolicy: "no-referrer",
});
```
> В данном случае используется политика `no-referrer`, которая не отправляет `Referer`.

Наример:
Допустим, у нас есть админка со структурой URL, которая не должна стать известной снаружи сайта.

Если мы отправляем запрос `fetch`, то по умолчанию он всегда отправляет заголовок `Referer` с полным URL-адресом нашей админки (исключение – это когда мы делаем запрос от HTTPS в HTTP, в таком случае `Referer` не будет отправляться).

Например, `Referer: https://javascript.info/admin/secret/paths`.

Если мы хотим, чтобы другие сайты получали только источник, но не URL-путь, это сделает такая настройка:
```js
fetch('https://another.com/page', {
  // ...
  referrerPolicy: "origin-when-cross-origin" // Referer: https://javascript.info
});
```
Мы можем поставить её во все вызовы `fetch`, возможно, интегрировать в JavaScript-библиотеку нашего проекта, которая делает все запросы и внутри использует `fetch`.

Единственным отличием в поведении будет то, что для всех запросов на другой источник fetch будет посылать только источник в заголовке Referer (например, `https://javascript.info`, без пути). А для запросов на наш источник мы продолжим получать полный Referer (это может быть полезно для отладки).

Политику Referer (Referer Policy) можно установить и на уровне всего сайта, используя заголовок `Referrer-Policy`, на уровне документа, используя `<meta name="referrer" content="no-referrer">`, или на уровне ссылки `<a rel="noreferrer">`. (в сслыке `noreferrer` без `-`).

### `integrity`
Свойство `integrity` позволяет установить контрольную сумму для проверки целостности содержимого. Это позволяет убедиться, что загруженный ресурс не был изменен во время передачи.

Например, мы скачиваем файл, и мы точно знаем, что его контрольная сумма по алгоритму SHA-256 равна «abcdef» (разумеется, настоящая контрольная сумма будет длиннее).

```js
fetch("https://api.github.com/users/defunkt", {
  integrity: "sha256-abcdef",
});
```
`fetch` проверит, что загруженный файл соответствует контрольной сумме `abcdef`. Если нет, то загрузка будет прервана.

### `keepalive`
Свойство `keepalive` позволяет использовать keepalive соединение. Это позволяет установить соединение с сервером и оставить его открытым для последующих запросов.

```js
fetch("https://api.github.com/users/defunkt", {
  keepalive: true,
});
```
Например, если мы отправляем несколько запросов подряд на один и тот же адресс, то `keepalive` позволяет использовать одно и то же соединение для всех запросов, что ускоряет загрузку.

### `signal`
Свойство `signal` позволяет отменить запрос. Оно принимает объект `AbortSignal`, который позволяет отменить запрос.

```js
const controller = new AbortController();
const signal = controller.signal;

fetch("https://api.github.com/users/defunkt", {
  signal,
});

// Отмена запроса
controller.abort();
```
> В данном случае создается объект `AbortController`, который содержит метод `abort()`. При вызове метода `abort()` запрос будет отменен.

Например, если мы загружаем данные, и пользователь нажимает на кнопку "Отмена", то мы можем отменить запрос.


## Обработка ответа

Метод `fetch()` возвращает промис, который содержит объект ответа сервера. Объект ответа содержит различные свойства и методы для работы с ответом.

```js
fetch("https://api.github.com/users/defunkt")
  .then((response) => {
    console.log(response.status); // 200
    console.log(response.statusText); // OK
    console.log(response.headers); // Headers
    console.log(response.url); // https://api.github.com/users/defunkt
    console.log(response.ok); // true
    return response.json();
  })
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

### `response`

Объект `response` содержит следующие свойства:
- `status` - статус ответа сервера
- `statusText` - текстовое описание статуса ответа сервера
- `headers` - заголовки ответа сервера
- `url` - адрес сервера
- `ok` - успешность ответа сервера (`true` - успешно, `false` - неуспешно)
- `type` - тип ответа сервера (basic, cors, error, opaque)
- `redirected` - был ли запрос перенаправлен
- `body` - тело ответа сервера в виде байт как объект `ReadableStream`, который можно считывать по частям.
- `bodyUsed` - прочитал ли уже кто-то тело ответа (был ли вызван метод `response.json()`, `response.text()` и т.д.)
Так как объект `response.body` является объектом `ReadableStream`, то его можно прочитать только один раз. После того, как тело ответа было прочитано, его нельзя прочитать снова.
- `clone()` - клонирует объект ответа
- `error()` - возвращает промис с ошибкой
- `redirect()` - перенаправляет запрос
- `json()` - возвращает промис с данными в формате json
- `text()` - возвращает промис с данными в формате текста
- `formData()` - возвращает промис с данными в формате `FormData`
- `blob()` - возвращает промис с данными в формате бинарных данных
- `arrayBuffer()` - возвращает промис с данными в формате `ArrayBuffer`

