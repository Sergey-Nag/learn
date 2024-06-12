# Promise

`Promise` - это объект, который представляет результат асинхронной операции. Он может находиться в трех состояниях:
- *Ожидание* (pending) - начальное состояние "обещание выполнится"
- *Выполнено* (fulfilled) - операция завершена успешно
- *Отклонено* (rejected) - операция завершена с ошибкой

Промис создается с помощью конструктора `Promise`. В конструктор передается функция, которая принимает два аргумента: `resolve` и `reject`, которые являются колбеками. 
- `resolve` вызывается, когда операция завершена успешно
- `reject` - когда операция завершена с ошибкой.

Эта функция определяет когда промис переходит в состояние `fulfilled` или `rejected`.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('Operation completed successfully');
  }, 2000);
});
```

Для того чтобы получить результат выполнения промиса, используется метод `then`. Он принимает два колбека: первый вызывается, когда промис переходит в состояние `fulfilled`, второй - когда промис переходит в состояние `rejected`.

```js
promise
  .then(function (result) {
    console.log(result)
}, function (error) {
    console.error(error);
});
```
> Вывод через 2 секунды log: Operation completed successfully
> Если бы промис вызывал `reject('Operation failed')` вместо `resolve('Operation completed successfully')`, то вывод был бы error: Operation failed

Метод `catch` - это синтаксический сахар для метода `then(undefined, onRejected)`. Он вызывается, когда промис переходит в состояние `rejected`.
Для лучшей читаемости кода, рекомендуется использовать метод **всегда** `catch`.

```js
promise
  .then(function (result) {
    console.log(result)
})
  .catch(function (error) {
    console.error(error);
});
```

Метод `finally` вызывается в любом случае, когда промис завершается, независимо от того, успешно или с ошибкой.

```js
promise
  .then(function (result) {
    console.log(result)
})
  .catch(function (error) {
    console.error(error);
})
  .finally(function () {
    console.log('Promise completed');
});
```

### Промис всегда возращает новый промис

Методы `then`, `catch`, `finally` всегда возвращают новый промис. Это позволяет создавать цепочки промисов.

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

promise
  .then(result => {
    console.log(result); // 1
    return result * 2;
  })
  .then(result => {
    console.log(result); // 2
    return result * 2;
  })
  .then(result => {
    console.log(result); // 4
  });
```
> Вывод через 2 секунды: 1, 2, 4
> Результатом следующего `then` становится результат предыдущего `then`.


### `Promise.resolve`

Метод `Promise.resolve` создает промис, который сразу перейдет в состояние `fulfilled` с переданным значением.

```js
Promise.resolve(1)
  .then(result => {
    console.log(result); // 1
  });
```

### `Promise.reject`

Метод `Promise.reject` создает промис, который сразу перейдет в состояние `rejected` с переданным значением.

```js
Promise.reject('Error')
  .catch(error => {
    console.error(error); // Error
  });
```

### `Promise.all`

Метод `Promise.all` принимает массив промисов и возвращает новый промис, который перейдет в состояние `fulfilled`, когда все промисы в массиве перейдут в состояние `fulfilled`. Если хотя бы один промис перейдет в состояние `rejected`, то весь промис перейдет в состояние `rejected`.

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2);
  }, 1000);
});

Promise.all([promise1, promise2])
  .then(result => {
    console.log(result); // [1, 2]
  });
```
> Вывод через 2 секунды: [1, 2]

### `Promise.race`

Метод `Promise.race` принимает массив промисов и возвращает новый промис, который перейдет в состояние `fulfilled` или `rejected` сразу после того, как один из промисов в массиве перейдет в состояние `fulfilled` или `rejected`.

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(2);
  }, 1000);
});

Promise.race([promise1, promise2])
  .then(result => {
    console.log(result); // 2
  })
  .catch(error => {
    console.error(error); // 2
  });
```
> Вывод через 1 секунду error: 2


### Микрозадачи

При выполнении промисов используется отдельная очередь задач (Микротаски), которая выполняется раньше основой очереди (Макротаски). Из-за чего, можно сказать, что у промисов больший приоритет, чем у `setTimeout`.

```js
setTimeout(() => {
  console.log('Timeout');
}, 0);

Promise.resolve()
  .then(() => console.log('Promise'));
```
> Вывод: Promise, Timeout
