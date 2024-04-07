## Functions and their Scopes

Функции существуют для того, чтобы мы могли повторно использовать код.
> Они представляют собой блоки кода, которые выполняются каждый раз, когда их вызывают. Каждая функция обычно написана для выполнения определенной задачи, например функция сложения `sum(1, 2)` - используется для нахождения суммы двух или более чисел. Когда в коде нужно сложить числа, функция сложения может быть вызвана столько раз, сколько потребуется.

## Создание функции
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
### Параметры/Аргументы
Мы можем передать внутрь функции любую информацию извне, используя параметры.
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
Если при вызове функции аргумент не был указан, то параметр становится `undefined`.

Например, вышеупомянутая функция `showMessage(from, text)` может быть вызвана с одним аргументом:
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
  // результатом будет значение 'текст не указан'
}

function anotherFunction() {
  return 'текст не указан';
}
```

Другие способы для записи значения по умолчанию:
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
**Вопрос**: Что произойдет при вызове функции?
```js
function greetUser(user, greeting = prompt('Choose greeting.', '')) {
  alert(`${greeting}, ${user}!`);
}

greetUser('Vasya');
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

Директива `return` может находиться в любом месте тела функции. Как только выполнение доходит до этого места, функция останавливается, и значение возвращается в вызвавший её код (присваивается переменной result выше).

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

Таким образом можно проверять параметры, отсутсвие которых или неправильное значение по любому приведет к ложным результатам или ошибкам в коде:

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

**Функция без явно указанного return всегда возвращает `undefined`.**

### Arguments
В функциях созданных с использованием ключевого слова `function` существует неявная локальная переменная `arguments`, которая содержит псевдо-массив со всеми переданными аргументами в эту функцию.
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
Псевдо-массив означает что данные в нем хранятся в строгом порядке в сущности похожей на массив, но не является экземпляром `Array`. Тоесть в нем нет большинства методов работы с массивами (`forEach`, `sort`, `map`, `push` и т.д.)

### Rest (остаточные) параметры
> Rest параметр обозначается троеточием + название переменной: `...rest`

Синтаксис rest параметров позволяет функции принимать неограниченное количество аргументов по аналогии с псевдо-массивом `arguments`
```js
function sum(...theArgs) {
  let total = 0;
  for (const arg of theArgs) {
    total += arg;
  }
  return total;
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```
Так-же можно использовать rest параметр для последнего аргумента, что позволяет отделить первые аргументы от остальных 
```js
function myFun(a, b, ...manyMoreArgs) {
  console.log("a", a);
  console.log("b", b);
  console.log("manyMoreArgs", manyMoreArgs);
}

myFun("one", "two", "three", "four", "five", "six");
// a, one
// b, two
// manyMoreArgs, ["three", "four", "five", "six"]
```
> В данном примере первые два аргумента передаются в параметры `a` и `b`, а все остальные попадают в массив `manyMoreArgs`

## Function Expression vs Function Declaration
Независимо от того, как создаётся функция – она является значением.
В примерах выше использовалось стандартное создание функции сразу с именем - это Function Declaration.
**Function Declaration** (Объявление функции): функция объявляется отдельной конструкцией «function…» в основном потоке кода.
```js
function sayHi() {
  alert('Привет');
}
```
**Function Expression** (Функциональное выражение): функция, созданная внутри другого выражения или синтаксической конструкции.
```js
let sayHi = function() {
  alert( "Привет" );
};
```
Данный синтаксис создает новую функцию в правой части присваивания `=`.
В данном случае объявление `function` без имени создает анонимную функцию, которая присваивается в переменную, которая в итоге становится обычной функцией.

Отличие заключается в том, когда создается функция движком. Это влияет на то, когда она доступна для вызова:
- **Function Declaration** создаётся **до** выполнения скрипта. Что может быть удобно для организации кода.
Прежде всего JS ищет в коде Function Declaration и создаёт все функции. Можно считать этот процесс «стадией инициализации».

  И только после того, как все объявления Function Declaration будут обработаны, код начнет выполнятся.

  В результате функции, созданные как Function Declaration, могут быть вызваны раньше своих определений.
  ```js
  sayHi("Вася"); // Привет, Вася

  function sayHi(name) {
    alert( `Привет, ${name}` );
  }

  sayHi("Вася"); // Привет, Вася
  ```

- **Function Expression** создаётся **во время** выполнения скрипта. И недоступна до присвоения.
  ```js
  sayHi("Вася"); // ошибка!

  let sayHi = function(name) {
    alert( `Привет, ${name}` );
  };

  sayHi("Вася"); // Привет, Вася
  ```

**Вопрос**: Что произойдет при выполнении кода?
```js
greetUser();

const greet = function greetUser(user) {
    alert(`Hello ${user}!`);
}
```

## Стрелочные функции
Это новый способ создания функций с помощью оператора `=>` с более коротким синтаксисом.

Варианты записи:
```js
() => expression; // однострочная функция без аргументов

param => expression; //  однострочная функция c одним аргументом без скобок

(param) => expression; // однострочная функция c одним аргументом в скобках

(param1, paramN) => expression; // однострочная функция c двумя аргументами (тут без скобок уже обойтись нельзя)

// аналогичные многострочные функции
() => {
  statements
}

param => {
  statements
}

(param1, paramN) => {
  statements
}
```

Стрелочная функция всегда "анонимная". Значит без названия, аналогична такой функции `function () {}`
Единственный вариант сделать функцию именованной и использовать в дальнейшем это присвоить её переменной:
```js
const sum = (a, b) => {
  return a + b;
}

sum(1, 2) // 3
```

Однострочная функция записанная без фигурных скобок подразумивает что она возвращает значение.
```js
const sum = (a, b) => a + b;

sum(1, 2) // 3
```
Этот вариант аналогичен предыдущему или подобной функции: `function sum(a, b) { return a + b }`

Если из однострочной функции требуется вернуть объект, то такой вариант не сработает:
```js
const func = () => { foo: 1 };
func() // undefined
```
Из-за того, что синтаксис объекта и блока кода использует одинаковые символы в данном случае js определяет фигурные скобоки как блок кода.
Что-бы вернуть объект, его нужно обернуть в круглые скобки:
```js
const func = () => ({ foo: 1 });
func() // { foo: 1 }
```

### Отличие стрелочной функции от обычной
Стрелочные функции это не более короткая замена обычных функций.
Основые отличия
1. Не имеют внутренней переменной `arguments`. Для получения всех параметров нужно использовать только rest оператор.
1. Не может использоваться как конструктор. Вызов их с помощью `new` приводит к ошибке.
1. Не имеют привязки к `this`. То есть не следует использовать как метод объекта:
```js
const obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function () {
    console.log(this.i, this);
  },
};

obj.b(); // undefined, Window { /* … */ }
obj.c(); // 10, Object { i: 10, b: f, c: f }
```


## Область видимости функций
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

outerFunction2(); // Calls its own innerFunction that calls innerInnerFunction that calls outerFunction

function outerFunction2() {
  function innerFunction() {
    function innerInnerFunction() {
      outerFunction();
    }

    innerInnerFunction();
  }

  innerFunction();
}


```

Note:
- Функции, объявленные с помощью ключевого слова function (function declaration), имеют либо область видимости функции, либо глобальную область видимости, в зависимости от того, где они объявлены.
- Функциональные выражения (function expression) (созданные с помощью `const`, `let` или `var`) подчиняются тем же правилам области видимости, что и переменные (`let` и `const` подчиняются правилам области видимости блока).