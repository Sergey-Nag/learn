# Объекты в JavaScript и их конструкторы (advanced)

Объекты в JavaScript - это сущности, которые содержат свойства и методы.
Все сущности в JavaScript являются объектами, включая примитивные типы данных. Именно они описывают как та или иная сущность выглядит и как она ведет себя.

Таким образом можно реалимзовывать другие сущности, которые не являются примитивными типами данных. Например другие типы данных, функции, массивы и т.д.

Например, пофантазируем и создадим новый тип данных - `Car`. Этот тип данных будет описывать машину и ее свойства.
Для начала создадим объект `Car` и добавим в него свойства `brand`, `model`, `year`, `color`.
Дополнительно, 
```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
};

console.log(Car.brand); // BMW
```
Так как это одтельный "тип данных", нужно чтобы он умел взаимодействовать с другими данными.
Например если я захочу объединить его со строкой с помощью оператора `+`, то это не сработает. Мы получим строку `[object Object]`.

При объединении объекта со строкой, объект преобразуется в строку `[object Object]`.

Для того чтобы объект `Car` мог взаимодействовать со строками, нужно создать свойство `toString`, которое определяет как объект будет преобразовываться в строку.

```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
  toString: function() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
};

console.log(Car + ' is ' + Car.color); // BMW X5 (2020) is black
```
> Метод `toString` вызывается автоматически, когда объект используется в контексте, где ожидается строка.

Что делать, если прибавить к объекту число? В этом случае объект все равно преобразуется в строку `[object Object]`.

Для того чтобы объект `Car` мог взаимодействовать с числами, нужно создать свойство `valueOf`, которое определяет как объект будет преобразовываться в число.

```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
  toString: function() {
    return `${this.brand} ${this.model} (${this.year})`;
  },
  valueOf: function() {
    return this.year;
  }
};

console.log(Car + 1); // 2021
```
> Метод `valueOf` вызывается автоматически, когда объект используется в контексте, где ожидается число.

> Почему при сложении объекта без метода `valueOf` с числом, JS вызывает метод `toString`?
> JS сначала пытается преобразовать объект в число с помощью метода `valueOf`, если это не удается, то преобразует объект в строку с помощью метода `toString`.

> Если у объекта, по какой-то причине, нет ни метода `valueOf`, ни метода `toString`, то он выдаст ошибку `TypeError: Cannot convert object to primitive value`

Те же самые преобразования можно реализовать с помощью одного свойства `Symbol.toPrimitive` добавленного в ES6.

```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
  [Symbol.toPrimitive]: function(hint) {
    if (hint === 'string') {
      return `${this.brand} ${this.model} (${this.year})`;
    }
    if (hint === 'number') {
      return this.year;
    }
    return this;
  }
};

console.log(Car + ' is ' + Car.color); // BMW X5 (2020) is black
console.log(Car + 1); // 2021
```
> Метод `Symbol.toPrimitive` вызывается автоматически, когда объект используется в контексте, где ожидается преобразование в примитив.
> Он принимает аргумент `hint`, который определяет какой тип преобразования нужно выполнить. Возможные значения `hint`:
> - `string` - преобразование в строку
> - `number` - преобразование в число
> - `default` - преобразование в примитив

Также, объекту можно задать поведение при итерации с помощью метода `Symbol.iterator`. Таким образом объект становится итерируемым (перебираемым) и его можно использовать в циклах `for...of` и с оператором `...spread`.

```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
  [Symbol.iterator]: function() {
    let i = 0;
    let keys = Object.keys(this);
    return {
      next: () => {
        return {
          value: this[keys[i]],
          done: i++ >= keys.length
        };
      }
    };
  }
};

for (let value of Car) {
  console.log(value);
}
// BMW
// X5
// 2020
// black

console.log([...Car]); // [ 'BMW', 'X5', 2020, 'black' ]
```
> Метод `Symbol.iterator` возвращает итератор, который содержит метод `next()`. Метод `next()` возвращает объект с двумя свойствами:
> - `value` - текущее значение
> - `done` - флаг окончания итерации

Таким образом, объекты в JavaScript могут быть не только хранилищем данных, но и иметь свое поведение.

Свойства можно сделать "динамическими" с помощью геттеров и сеттеров. Геттеры и сеттеры - это специальные методы, которые позволяют управлять доступом к свойствам объекта.

```js
const Car = {
  brand: 'BMW',
  model: 'X5',
  year: 2020,
  color: 'black',
  get fullName() {
    return `${this.brand} ${this.model}`;
  },
  set fullName(value) {
    let [brand, model] = value.split(' ');
    this.brand = brand;
    this.model = model;
  }
};

console.log(Car.fullName); // BMW X5
console.log(Car.brand); // BMW
console.log(Car.model); // X5

Car.fullName = 'Audi A6';

console.log(Car.fullName); // Audi A6
console.log(Car.brand); // Audi
console.log(Car.model); // A6
```
> Геттеры и сеттеры позволяют обрабатывать дополнительную логику при присвоении или при чтении свойства объекта.

## Конструкторы объектов

Конструктор объектов - это функция, которая создает объекты. 
Конструкторы используются для создания множества объектов одного типа.

Конструктор - это обычная функция, которая вызывается с ключевым словом `new`.
Внутри конструктора создается объект с помощью ключевого слова `this` к которому мы добавляем свойства и методы.
На выходе конструктор возвращает объект с добавленными свойствами и методами.

Для того чтобы создать конструктор объекта `Car`, нужно создать функцию `Car` и добавить в нее свойства `brand`, `model`, `year`, `color`.
Далее, мы можем создавать экземпляры объекта `Car` с помощью ключевого слова `new`.

```js
function Car(brand, model, year, color) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.color = color;
}

const car1 = new Car('BMW', 'X5', 2020, 'black');
const car2 = new Car('Audi', 'A6', 2019, 'white');

console.log(car1); // Car { brand: 'BMW', model: 'X5', year: 2020, color: 'black' }
console.log(car2); // Car { brand: 'Audi', model: 'A6', year: 2019, color: 'white' }
```
> Конструктор `Car` создает объекты с помощью ключевого слова `new`. Внутри конструктора создается объект с помощью ключевого слова `this`, к которому добавляются свойства и методы. При этом конструктор всегда возвращает объект даже если мы не используем оператор `return` или вернем что-то другое.

**Название конструктора принято всегда писать с большой буквы**

# JSON

JSON (JavaScript Object Notation) - это формат обмена данными, основанный на JavaScript. JSON представляет собой текст в формате, похожем на объекты и массивы JavaScript.

```json
{
  "name": "John",
  "age": 30,
  "city": "New York",
  "merried": false,
  "hobbies": ["reading", "swimming", "traveling"]
}
```

Обычно JSON используется для передачи данных между клиентом и сервером в виде строки.

То есть, данные преобразуются в строку JSON на сервере, передаются на клиент где их нужно преобразовать обратно в объект JavaScript.
Для работы с JSON в JavaScript используются глобальный объект `JSON` и его методы:
- `JSON.stringify(object)` - преобразует объект JavaScript в строку JSON
- `JSON.parse(string)` - преобразует строку JSON в объект JavaScript

```js
var json = '{"name": "John", "age": 30}'; // это строка
console.log(json.name); // undefined

var obj = JSON.parse(json); // преобразуем строку JSON в объект
console.log(obj.name); // John
```

Если в строке JSON есть ошибка, или строка изначально не являлась JSON строкой, то метод `JSON.parse()` выбросит ошибку `SyntaxError`.