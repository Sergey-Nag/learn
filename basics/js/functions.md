## Function Accessibility in Scopes
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