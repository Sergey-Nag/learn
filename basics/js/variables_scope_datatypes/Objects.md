# Объекты

Объект JavaScript - это структура данных, которая позволяет нам иметь пары ключ-значение; таким образом, мы можем иметь отдельные ключи, и каждый ключ сопоставляется со значением, которое может быть любого типа данных JavaScript. 
> Если сравнивать его с объектом реального мира, то ручка - это объект с несколькими свойствами, такими как цвет, дизайн, материал, из которого она сделана, и т. д. Точно так же и объекты JavaScript могут иметь свойства, определяющие их характеристики.

Объект - это коллекция записей `ключ:значение`.

### Создание объекта
Объект можно создать с помощью конструктора `Object` или с помощью литерала `{}`.
Это называется "plain object" - простой объект.
Можно создавать объекты сразу со свойствами, либо добавлять их после создания (мутировать объект).
```js
const obj = new Object();

const obj1 = {};

obj1.a = 1;

const obj2 = {
    a: 1
}
```

### Ключи объекта
Ключом может быть любая строка `String` или символ `Symbol`. В отличии от имен переменных у ключей нет особых правил именования
```js
{
    a: 1,
    stringProp: 'string',
    let: 'let string',
    for: 'for',
    function: 'some str',
    1: 1,
    1.1: 'float',
    true: true,
    [Symbol('id')]: 'some id'
}
```
> Все ключи являются строками

Если строка содержит пробелы - её необходимо заключить в кавычки.
```js
{
    'boolean prop': true,
}
``` 
Имя ключа может быть динамическим: вычисляться операцией или передаваться в виде переменной.
```js
const objKey = 'anotherProp';
const obj = {
    ['number' + 'Prop']: 1,
    [objKey]: 2
}

obj.numberProp // 1
obj.anotherProp // 2
```
Значением может быть любой тип данных, включая другие объекты или даже функции.
```js
{
    objProp: {
        a: 1,
        b: 2,
        innerObjProp: {
            a: 3,
            b: 4
        }
    },
    sayHi: function() {
        alert('Hi!');
    },
    sayBye() {
        alert('Bye!');
    },
    sayHuy: () => alert('Huy!');
}
```

### Свойства и методы
Ключ в котором содержится примитив или объект называется "свойство объекта".
Ключ в котором содержится функция называется "метод объекта".
```js
const obj = {
    property: 1, // свойство
    method() {
        alert("I'm a method"); // метод
    }
}
```

### Запись значений
Несколько способов добавить значения в объект:
1. Во время создания нового объекта
    ```js
    const obj = {
        prop: 1 // создали свойство prop со значением 1
    }
    ```
2. Добавление нового свойства в существующий объект через `.`
    ```js
    obj.newProp = 'new';

    obj // { prop: 1, newProp: 'new' }
    ```
    При динамическом создании свойтва через `.` нельзя использовать числа
    ```js
    obj.1 = 1 // SyntaxError: Unexpected number
    ```
3. Добавление через квадратные скобки
    ```js
    obj['newNewProp'] = 0;

    obj // { prop: 1, newProp: 'new', newNewProp: 0 }
    ```
    В этом случае числа можно использовать
    ```js
    obj[1] = 1;
    // obj { prop: 1, newProp: 'new', newNewProp: 0, 1: 1 }
    ```
4. С помощью вспомогательного метода `Object.assign`
    ```js
    Object.assign(obj, { assignedProperty: 'value' });

    obj // { prop: 1, newProp: 'new', newNewProp: 0, 1: 1, definedProperty: 'value', assignedProperty: 'value' }
    ```
    > Этот метод предназначен для копирования всех свойств (верхнего уровня) из одного объекта в другой.
5. С использованием вспомогательного метода `Object.defineProperty`
    ```js
    Object.defineProperty(obj, 'definedProperty', {
        value: 'value',
    });

    obj // { prop: 1, newProp: 'new', newNewProp: 0, 1: 1, definedProperty: 'value' }
    ```
    > Этот метод дает дополнительный контроль над созданием свойства позволяя не только присвоить значение но и установить отдельные правила для этого свойства
6. С использованием вспомогательного метода `Object.defineProperties`
    ```js
    Object.defineProperties(obj, {
        prop1: { value: 'prop 1' },
        prop2: { value: 123 },
        // Add more properties if needed
    });

    obj // { prop: 1, newProp: 'new', newNewProp: 0, 1: 1, definedProperty: 'value', prop1: 'prop 1', prop2: 123 }
    ```
    > Работает так-же как и предыдущий, но позволяет определять множество свойств за раз
6. Через "Shorthand" (короткие свойства). Так можно создавать свойства в момент создания нового объекта из существующих переменных
    ```js
    const name = 'Vasya';
    const age = 33;

    // Обычно мы можем передать значения из переменные так
    const person1 = {
        name: name,
        age: age,
    }
    // Так как у нам нужно создать свойства name и age а переменные так и называются,
    // можно передавать их напрямую без присвоения значений через :
    const person2 = {
        name,
        age,
    }

    person1 // { name: 'Vasya', age: 33 }
    person2 // { name: 'Vasya', age: 33 }
    ```


### Чтение значений
Чтение свойства может осуществляться несколькими способами:
```js
const person = {
    name: 'Vasya',
    'current age': 33,
    education: {
        university: 'KPI',
        degree: 'master',
    }
}
```
- Через точку
    ```js
    person.name // Vasya
    ```
- Через квадратные скобки (этот способ также позволяет использовать переменные в качестве ключа)
    ```js
    person['current age'] // 33

    const key = 'name';
    
    person[key] // Vasya
    ```
Обращение к несуществующему свойству возвращает `undefined`
```js
person.something // undefined
person['something'] // undefined
```
Возможно обращаться к свойствам вложеных объектов просто продолжая цепочку
```js
person.education.degree // master
```
Но, если обращатся к свойству которое должно быть объектом но его не существует, то обращение к его вложенным свойства вызовет ошибку
```js
person.job.title // TypeError: Cannot read properties of undefined (reading 'title')
```
> Так как свойства job не существует в объекте person, оно undefined. В этом случае мы пытаемся получить свойство title из undefined, о чем нам и  говорит ошибка!

Чтобы предостеречь себя от возможных ошибок при чтении свойств, в существовании которых мы не уверены, лучше использовать оператор "optional chaining" `?.`.
```js
person.job?.title // undefined
```
> В данном случае, этот оператор помогает избежать ошибки при чтении `title` из `undefined`.

Все ключи являются строками вне зависимости как мы их записали (если это не символ)
```js
const obj = {
    1: 1,
    2.1: 2,
}

obj[1] // 1
obj['1'] // 1
obj[2.1] // 2
obj['2.1'] // 2
```

Чтобы получить значание из свойства, созданного через `Symbol`, нужно заранее хранить этот символ в переменной и только с помощью неё брать значение
```js
const privateId = Symbol('id');
const obj = {
    id: 'public id',
    [privateId]: 'private id',
};

obj.id            // public id
obj['id']         // public id
obj[Symbol('id')] // undefined
obj[privateId]    // private id
```

### Удаление значений
Есть один основной и явный спобос удаления значения из объекта -  оператор `delete`
```js
const obj = {
    name: 'Vasya',
    age: 33,
    'likes birds': true;
}

delete obj.name // удаление значения name

obj // { age: 33, 'likes birds': true}

delete obj['likes birds'] // удаление значения likes birds

obj // { age: 33 }
```

### Оператор `in`
Этот оператор используется в двух целях:
1. Определить существует ли свойство в объекте
2. Перебрать объект по ключам (в цикле)

#### Наличие ключа в объекте
Часто такая проверка делается обычным обращением к свойству или сравнением свойства с `undefined`. 
```js
const user = {
    name: 'Vasya'
}

if (user.age) { // false
    // операции над user.age
}

if (user.age !== undefined) { // false
    // операции над user.age
}
```
Но если ключ `age` существует в объекте а его значение - любое ложное (`0`, `false`, `''`, `null`), в таком случае условие тоже вернет `false`
```js
const user = {
    name: 'Vasya',
    age: 0,
    nickname: undefined
}

if (user.age) { // false
    // операции над user.age
}

if (user.nickname !== undefined) { // false
    // операции над user.nickname
}
```

Однако, если нам принципиально важно знать о наличии ключа в объекте, этого может быть недостаточно.
Также этот синтаксис работает и с переменными.
```js
const user = {
    name: 'Vasya',
    age: 0,
    nickname: undefined,
}

if ('age' in user) { // true
    // операции над user.age
}

console.log('lastName' in user) // false

if (user.nickname) { // false
    // операции над user.nickname
}

if ('nickname' in user) { // true
   // операции над user.nickname
}

const key = 'age';
if (key in user) {
    // операции над user.age
}
```
**Важно!** Оператор `in` проверяет не только собственные значения объекта, но и его родителей (объектов от которых он наследуется)
```js
const obj = { prop: 'value' };

console.log('prop' in obj) // true
console.log('toString' in obj) // true, потому что этот метод есть у родителя - Object
```
Для того, чтобы проверить только собственные свойства лучше использовать `Object.hasOwn(obj, 'toString') // false`
#### Цикл `for...in`
Цикл `for...in` позволяет перебирать ключи объекта.
```js
for (let key in obj) {
    // ...
}
```
Внутри цикла мы: 
- объявляем переменную, в которое сохраняется значение ключей, 
- передаём в цикл объект
- производим действия с объектом

```js
const user = {
    name: 'Vasya',
    age: 30,
    isAdmin: true,
}

for (let key in user) {
    console.log(key); // 'name', 'age', 'isAdmin'
    console.log(user[key]) // 'Vasya', 30, true
}
```

### Деструктуризация объектов
Деструктурирующее присваивание – это специальный синтаксис, который позволяет нам «распаковать» массивы или объекты в несколько переменных, так как иногда они более удобны.
```js
const obj = { var1: 1, var2: 'second' };
let {var1, var2} = obj;

console.log(var1) // 1
console.log(var2) // second
console.log(obj) // {var1: 1, var2: 'second'}
```
Это более короткая запись такого присваивания
```js
const obj = {var1: 1, var2: 'second'};
let var1 = obj.var1;
let var2 = obj.var2;

console.log(var1) // 1
console.log(var2) // second
console.log(obj) // {var1: 1, var2: 'second'}
```
При деструктуризации имена переменных должны совпадать с именами свойст, которые нужно получить.
```js
let {var1, var2, var3} = obj;

console.log(var1) // 1
console.log(var1) // second
console.log(var3) // undefined
```
Но также есть возможность переписать название переменной прямо в "шаблоне" деструктуризации

```js
let {var1, var2: var3 } = obj;

console.log(var1) // 1
console.log(var3) // second
```
Есть возможность задать дефолтное значение в случае если свойства в объекте не существует
```js
let {var1, var2, var3 = 'third'} = obj;

console.log(var1) // 1
console.log(var1) // second
console.log(var3) // third
```
С помощью оператора `...rest` можно создать отдельный объект с "остаткми свойств" не попавшими в первые переменные
```js
const obj = {
    var1: 1,
    var2: 'second',
    var3: 'third',
    var4: true,
};
let {var1, var2, ...restProps} = obj;

console.lov(var1) // 1
console.lov(var2) // second
console.lov(restProps) // { var3: 'third', var4: true }
```
Есть вохможность деструктурировать вложенные свойства из объекта
```js
let options = {
  size: {
    width: 100,
    height: 200
  },
  items: ["Cake", "Donut"],
  extra: true
};
// деструктуризация разбита на несколько строк для ясности
let {
  size: {
    width,
    height
  },
  items: [item1, item2],
  title = "Menu"
} = options;

alert(title);  // Menu
alert(width);  // 100
alert(height); // 200
alert(item1);  // Cake
alert(item2);  // Donut
```

### Копирование объекта
С помощью оператора `...spread` можно создать "поверхносную" копию объекта.
Для этого нужно в литерал нового объекта передать переменную, объект которой нужно скопировать добавив `...` перед ней
```js
const obj = { a: 1 };

const objCopy = { ...obj };

obj // { a: 1 }
objCopy // { a: 1 };

obj === objCopy // false
```
Копируются значения только первого уровня.
Вложеные объекты все еще передадутся по ссылке в скопированные свойства
```js
const obj = { 
    a: 1,
    innerObj: {
        a: 2
    }
};

const objCopy = {...obj};

obj // { a: 1, innerObj: { a: 2 } }
objCopy // { a: 1, innerObj: { a: 2 } }

obj === objCopy // false
obj.innerObj === objCopy.innerObj // true
```

> Оператор spread в этом случае это просто синтаксический сахар, добавленный в ES6. Старым аналогом является использование метода assign: `const objCopy = Object.assign({}, obj);`


### Методы `Object`.
Объект `Object` в JS содержит много статичных методов для работы с объектами.
Помимо `Object.definedProperty` и `Object.definedProperties` существуют более часто используемые:
- `Object.assign`: копирует все "собственные" свойства из одного или нескольких исходных объектов в целевой объект. Он возвращает измененный целевой объект.
    ```js
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const source2 = { d: 5, e: 6 };
    const source3 = { f: 7, g: 8 };

    const returnedTarget = Object.assign(target, source, source2, source3);

    console.log(target); // Object { a: 1, b: 3, c: 4, d: 5, e: 6, f: 7, g: 8 }

    console.log(returnedTarget === target); // true
    ```
    > Свойства с одинаковыми именами будут перезаписанны исходными значениями
- `Object.entries`: возвращает массив пар `[ключ, значение]` свойств данного объекта.
    ```js
    const obj = { foo: "bar", baz: 42 };
    console.log(Object.entries(obj)); // [ ['foo', 'bar'], ['baz', 42] ]
    ```
    Так как возвращаемое значение это массив иногда его используют чтобы проходиться по значениям в цикле
    ```js
    const obj = {
        a: 'somestring',
        b: 42,
    };

    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }

    // Expected output:
    // "a: somestring"
    // "b: 42"
    ```
- `Object.fromEntries`: Метод преобразует массив с парами `[ключ, значение]` в объект
    ```js
    const entries = [
        ['foo', 'bar'],
        ['baz', 42],
    ];
    console.log(Object.fromEntries(entries)); // Object { foo: "bar", baz: 42 }
    ```
- `Object.keys`: возвращает массив ключей свойств данного объекта.
    ```js
    const obj = {
        a: 'somestring',
        b: 42,
        c: false,
    };

    console.log(Object.keys(obj)); // Array ["a", "b", "c"]
    ```
- `Object.values`: возвращает массив значение свойств данного объекта.
    ```js
    const obj = {
        a: 'somestring',
        b: 42,
        c: false,
    };

    console.log(Object.values(obj)); // Array ["somestring", 42, false]
    ```
- `Object.hasOwn()` возвращает true, если указанный объект имеет указанное свойство в качестве своего собственного свойства. Если свойство унаследовано или не существует, метод возвращает false.
    ```js
    const obj = {
        prop: 'exists',
    };

    console.log(Object.hasOwn(obj, 'prop')); // true

    console.log(Object.hasOwn(obj, 'toString')); // false

    console.log(Object.hasOwn(obj, 'undeclaredPropertyValue')); //false
    ```

## Important!
1. **Приведение ЛЮБОГО объекта к логическому типу (boolean) дает `true`** 
```js
const obj = { a: 1 };

if (obj) { // true
}

Boolean(obj) // true

while (obj) { // true
    // бесконечный цикл
}

!!{} // пустой объект -> true

if ({}) while({}) { // true, true
    // бесконечный цикл
}
```
1. **Объект не примитив** - при присваивании объекта присваивается его ссылка.
```js
const obj1 = {
    a: 'object 1 property'
};

obj1.a // object 1 property

const obj2 = obj1;

obj2.a // object 1 property

obj2.a = 'object 2 property';

obj1.a // object 2 property
obj2.a // object 2 property
```
> Изменяя свойство в переменной `obj2` мы на самом деле изменяем `obj1`, Это называется **мутацией**.
2. **`const` защищает саму переменную от переприсваивания но не свойства объекта в ней**.
```js
const obj = { a: 1 };
obj = { b: 2 } // TypeError: Assignment to constant variable.

obj.b = 2;
// obj -> { a: 1, b: 2}
```
> Тоесть поменять ссылку на объект не получится.
3. Сравнение объектов также происходит по ссылке
```JS
const obj1 = {};
const obj2 = {};

obj1 == obj2 // false
obj1 === obj2 // false

obj1 === obj1 // true
obj2 === obj2 // true

const obj3 = obj2;

obj3 === obj2 // true

const obj4 = {...obj3};

obj2 === obj4 // false
```
4. Не стоит полагайться на порядок ключей при переборе объекта!