## Functions and their Scopes

Чтобы не повторять один и тот же код во многих местах, придуманы функции. Функции являются основными «строительными блоками» программы.

Вначале идёт ключевое слово `function`, после него имя функции, затем список параметров в круглых скобках через запятую и наконец, код функции, также называемый «телом функции», внутри фигурных скобок.

```js
function имя(параметры) {
  ...тело...
}
```

```JS
function showMessage() {
  alert( 'Всем привет!' );
}

showMessage();
showMessage();
```
> Этот пример явно демонстрирует одно из главных предназначений функций: избавление от дублирования кода.

Если понадобится поменять сообщение или способ его вывода – достаточно изменить его в одном месте: в функции, которая его выводит.
```js
function showMessage(message) {
  alert(message);
}

showMessage('Всем привет!');
showMessage('Всем пока!');
```
### Параметры (Аргументы)
Мы можем передать внутрь функции любую информацию, используя параметры.
В нижеприведённом примере функции передаются два параметра: from и text.
```js
function showMessage(from, text) { // параметры: from, text
  alert(from + ': ' + text);
}

showMessage('Аня', 'Привет!'); // Аня: Привет! (*)
showMessage('Аня', "Как дела?"); // Аня: Как дела? (**)
```
> Когда функция вызывается в строках (*) и (**), переданные значения копируются в локальные переменные from и text. Затем они используются в теле функции.
```js
function showMessage() {
  // можно представить так:
  let from = 'Аня';
  let text = 'Привет!';

  alert(from + ': ' + text);
}
```
Другими словами:
- Параметр – это переменная, указанная в круглых скобках в объявлении функции.
    ```js
    function myNameIs(name) { // <- name это параметр
      console.log(`My name is ${name}`);
    }
    ```
- Аргумент – это значение, которое передаётся функции при её вызове.
    ```js
    myNameIs('Slim Shady'); // <- 'Slim Shady' это аргумент
    ```

### Значения по умолчанию
Если при вызове функции аргумент не был указан, то его значением становится `undefined`.

Например, вышеупомянутая функция showMessage(from, text) может быть вызвана с одним аргументом:
```js
showMessage('Aня'); //'Аня: undefined'
```

Аналогично:
```js
showMessage(); //'undefined: undefined'
```

Если мы хотим задать параметру `text` значение по умолчанию, мы должны указать его после `=`:
```js
function showMessage(from, text = "текст не добавлен") {
  alert( from + ": " + text );
}

showMessage("Аня"); // Аня: текст не добавлен
```

В данном случае "текст не добавлен" это строка, но на её месте могло бы быть и более сложное выражение, которое бы вычислялось и присваивалось при отсутствии параметра. Например:
```js
function showMessage(from, text = anotherFunction()) {
  // anotherFunction() выполнится только если не передан text
  // результатом будет значение text
}

function anotherFunction() {
  return 'текст не указан';
}
```

Другие способы для записи значение по умолчанию:
```js
function showMessage(from, text) {
  // Если значение text только null или undefined, тогда присвоить параметру text значение по умолчанию
  // заметим, что при этом пустая строка text === "", false или 0 НЕ будет считаться отсутствующим значением
  text = text ?? 'текст не добавлен';
  ...
}

function showMessage(from, text) {
  // Если значение text ложно, тогда присвоить параметру text значение по умолчанию
  // заметим, что при этом пустая строка text === "" будет также считаться отсутствующим значением
  text = text || 'текст не добавлен';
  ...
}

function showMessage(text) {
  // ...
  if (text === undefined) { // если параметр отсутствует
    text = 'пустое сообщение';
  }
  alert(text);
}
```

### Возврат значения
Функция может вернуть результат, который будет передан в вызвавший её код.

Простейшим примером может служить функция сложения двух чисел:
```js
function sum(a, b) {
  return a + b;
}

let result = sum(1, 2);
alert( result ); // 3
```

Директива return может находиться в любом месте тела функции. Как только выполнение доходит до этого места, функция останавливается, и значение возвращается в вызвавший её код (присваивается переменной result выше).

Возможно использовать return и без значения. Это приведёт к немедленному выходу из функции.
```js
function showMovie(age) {
  if ( age === undefined ) {
    return;
  }

  alert( "Вам показывается кино" );
  // ...
}
```
> Если `age` не задано, то функция завершиться на `return` и `alert` не вызовется.

Пустой return аналогичен `return undefined`:
```js
function doNothing() { /* пусто */ }

alert( doNothing() === undefined ); // true
```
```js
function doNothing() {
  return;
}

alert( doNothing() === undefined ); // true
```

Таким образом можно проверять переменные, отсутсвие которых или неправильное значение по любому приведет к ложным результатам:

```js
function calculateRectanglePerimeter(height, width) {
  // Проверить, указаны ли высота и ширина
  if (typeof height !== 'number' || typeof width !== 'number') {
    return;
  }

  // Проверить, являются ли высота и ширина положительными числами
  if (height <= 0 || width <= 0) {
    return;
  }

  // Вычислить и вернуть периметр
  const perimeter = 2 * (height + width);
  return perimeter;
}

console.log(calculateRectanglePerimeter(5, 4)); // 18
console.log(calculateRectanglePerimeter(0, 4));  // undefined
console.log(calculateRectangleArea('5', 4)); // undefined
```
### Arguments
В функциях созданных через function declaration (с использованием ключевого слова `function`) существует неявная локальная переменная `arguments`, которая содержит псевдо-массив со всеми переданными аргументами в эту функцию.
```js
function showName() {
  alert( arguments.length ); // выведет колличество переданных аргументов
  alert( arguments[0] ); // первый аргумент
  alert( arguments[1] ); // второй аргумент

  // Объект arguments можно перебирать
  // for (let arg of arguments) alert(arg);
}

// Вывод: 2, Юлий, Цезарь
showName("Юлий", "Цезарь");

// Вывод: 1, Илья, undefined (второго аргумента нет)
showName("Илья");
```

### 1. Global Scope:
Функции, объявленные в глобальной области видимости, доступны из любой точки кода.

```javascript
// Function declared in global scope
function globalFunction() {
  console.log("I am a global function");
}

globalFunction(); // Accessible here

function anotherGlobalFunction() {
    if (true) {
        globalFunction(); // Accessible here
    }
}

```

### 2. Function Scope:
Функции, объявленные внутри другой функции, доступны только внутри неё.

```javascript
function outerFunction() {
  // Function declared inside another function (function scope)
  function innerFunction() {
    console.log("I am an inner function");
  }

  innerFunction(); // Accessible within the outerFunction
}

outerFunction(); // Calls outerFunction which then calls innerFunction

innerFunction(); // Error: innerFunction is not accessible outside outerFunction
```

### 3. Block Scope (ES6+):
#### 3.1. Function expression:
Функции, объявленные с помощью функциональных выражений в блоке, доступны только в этом блоке.
Также как и переменные.

```javascript
if (true) {
  // Function expression declared inside a block (block scope)
  const blockFunction = function() {
    console.log("I am a block-scoped function");
  };

  blockFunction(); // Accessible within the block
}

 blockFunction(); // Error: blockFunction is not accessible outside the block
```

#### 3.2. Function declaraion:
В старых версиях JavaScript (ES5 и ниже) объявления функций поднимаются в верхнюю часть содержащей их области видимости (hoisting). Это означает, что даже объявленная функция внутри блока ведет себя так же, как если бы была объявлена в верхней части функции или глобальной области видимости.
```js
if (true) {
  // Function declaration hoisted to the top of the block
  function myFunction() {
    console.log("I am a function declared inside a block scope");
  }
}

// Accessible outside the block
myFunction(); // Outputs: "I am a function declared inside a block scope"
```
Это поведение может сбивать с толку, поэтому в ES6+ оно исправлено если использовать `'use strict'` режим. Объявления функций с блочной привязкой по-прежнему поднимаются, но привязываются к блоку, в котором они объявлены, подобно переменным, объявленным с помощью `let` и `const`.
```js
'use strict';

if (true) {
  // Function declaration is block-scoped (ES6+ behavior)
  function myFunction() {
    console.log("I am a function declared inside a block scope");
  }

  myFunction(); // Accessible inside the block
}

myFunction(); // Error: myFunction is not accessible outside the block
```

### 4. Nested Scopes:
Функции могут быть объявлены и доступны во вложенных областях видимости.

```js
function outerFunction() {
  function innerFunction() {
    console.log("I am an inner function");
  }

  innerFunction(); // Accessible within the outerFunction
}

outerFunction(); // Calls outerFunction which then calls innerFunction

innerFunction(); // Error: innerFunction is not accessible outside outerFunction
```

Note:
- Функции, объявленные с помощью ключевого слова function (function declaration), имеют либо область видимости функции, либо глобальную область видимости, в зависимости от того, где они объявлены.
- Функциональные выражения (function expression) (созданные с помощью `const`, `let` или `var`) подчиняются тем же правилам области видимости, что и переменные (`let` и `const` подчиняются правилам области видимости блока).