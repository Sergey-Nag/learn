# Variables and scope in JavaScript

Переменные хранят значение в определенном формате (типе данных).\
Создавая переменную значение сохраняется в оперативную память, переменная просто ссылка к сохраненному в ней значению.

Создание переменной:
```js
let message; // объявление пустой переменной message (значит что её значение - undefined)
```
Присвоить ей значение можно через оператор присваивания `=`
```js
message = 'Hello'; // присвоение строки 'Hello' в переменную с именем message
```
Во время выполнения кода, движок сам пойдет в оперативную память по ссылке переменной и подставит нужное значение.
```js
let message;
message = 'Hello!';

alert(message); // показывает содержимое переменной
```
Для краткости можно совместить объявление переменной и запись данных в одну строку:
```js
let message = 'Hello!'; // определяем переменную и присваиваем ей значение

alert(message); // Hello!
```
Мы также можем объявить несколько переменных в одной строке разделив их `,`:
```js
let user = 'John', age = 25, message = 'Hello';
```
Для лучшей читабильности лучше пересносить такое на разные строки:
```js
let user = 'John',
  age = 25,
  message = 'Hello';

// Такая запись ни чем не отличается от следующей:

let user = 'John';
let age = 25;
let message = 'Hello';
```

#### Повторное объявление вызывает ошибку
Переменная может быть объявлена только один раз.
Повторное объявление той же переменной является ошибкой:
```js
let message = "Это";

// повторение ключевого слова 'let' приводит к ошибке
let message = "Другое"; // SyntaxError: 'message' has already been declared
```

#### Имена переменных
В JavaScript есть два ограничения, касающиеся имён переменных:

- Имя переменной должно содержать только буквы, цифры или символы `$` и `_`.
- Первый символ не должен быть цифрой.
```js
let userName; // good, works
let test123; // good, works

let $ = 1; // ok, works
let _ = 2; // ok, works

let 1a; // bad, doesn't work
let my-name; // bad, doesn't work
```
#### Регистр имеет значение
Переменные с именами `apple` и `APPLE` – это две разные переменные.

#### Зарезервированные имена
Существует [список зарезервированных слов](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Lexical_grammar#%D0%BA%D0%BB%D1%8E%D1%87%D0%B5%D0%B2%D1%8B%D0%B5_%D1%81%D0%BB%D0%BE%D0%B2%D0%B0), которые нельзя использовать в качестве имён переменных, потому что они используются самим языком.

Например: `let`, `class`, `return` и `function` зарезервированы.

Приведённый ниже код даёт синтаксическую ошибку:
```js
let let = 5; // нельзя назвать переменную "let", ошибка!
let return = 5; // также нельзя назвать переменную "return", ошибка!
```

## В js есть 3 варианта создания переменных

### 1. `var` (старый метод, функциональная область видимости):
```javascript
// Declaration and initialization of a variable using var
var age = 30;

// Reassigning the variable
age = 40;

// Variables declared with var can be redeclared without an error
var age = 50;
```

### 2. `let` (блочная область видимости, значение можно перезаписать):
```javascript
// Declaration and initialization of a variable using let
let name = "John";

// Reassigning the variable
name = "Jane";
```

### 3. `const` (блочная область видимости, значение нельзя перезаписать):
```javascript
// Declaration and initialization of a constant variable using const
const PI = 3.14;

// Trying to reassign a constant variable will result in an error
PI = 3.14159; // TypeError: Assignment to constant variable.

// Objects and arrays declared with const can still have their properties or elements modified
const person = {
  name: "Alice",
  age: 25
};
person.age = 30; // Valid, modifies the age property

const numbers = [1, 2, 3];
numbers.push(4); // Valid, adds 4 to the array
```

### Понимание области видимости:
Область видимости (Scope) в JavaScript определяет видимость и доступность переменных и функций в различных частях кода.


#### 1. Глобальная область видимости (Global Scope):
Переменные, объявленные вне функции или блока, имеют глобальную область видимости, то есть они доступны из любой точки кода.

```javascript
// Global scope variable
var globalVar = "I am a global variable";

function printGlobal() {
  console.log(globalVar); // Accessible within the function
}

printGlobal(); // Output: "I am a global variable"
console.log(globalVar); // Output: "I am a global variable"
```

#### 2. Функциональная область видимости (Function Scope):
Переменные, объявленные внутри функции, имеют область видимости функции, то есть они доступны только внутри неё.

```javascript
function printLocal() {
  // Function scope variable
  var localVar = "I am a local variable";
  console.log(localVar); // Accessible within the function
}

console.log(localVar); // Error: localVar is not defined, as it's not accessible outside the function
```

#### 3. Блочная область видимости (Block Scope) (появилась в ES6 вместе с let и const):
Переменные, объявленные с помощью `let` и `const`, имеют область видимости блока, то есть они доступны только в пределах блока, в котором объявлены (например, внутри `{}`).

```javascript
if (true) {
  // Block scope variable
  let blockVar = "I am a block-scoped variable";
  const PI = 3.14;
  console.log(blockVar); // Accessible within the block
  console.log(PI); // Accessible within the block
}

console.log(blockVar); // Error: blockVar is not defined outside the block
console.log(PI); // Error: PI is not defined outside the block
```

#### Вложенные области видимости (Nested Scopes):
Области могут быть вложены друг в друга, а внутренние области могут получать доступ к переменным внешних.

```javascript
var outerVar = "I am an outer variable";

function outerFunction() {
  var innerVar = "I am an inner variable";

  function innerFunction() {
    console.log(innerVar); // Accesses innerVar from the outer function
    console.log(outerVar); // Accesses outerVar from the global scope
  }

  innerFunction();
}

outerFunction(); // Outputs values of innerVar and outerVar
```
