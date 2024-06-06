'use strict';

// 1. Функция pow(a, b), которая возводит a в степень b. Оператор ** и Math.pow не использовать.
function pow(num, pow) {
    // code here
    let result = num;
    for(let i = 1; i < pow; i++){
        result = num * result;
    }
    return result;
}

console.log(pow(2, 3)); // 8
console.log(pow(3, 2)); // 9
console.log(pow(4, 5)); // 1024

// 2. Функция createUser(firstName, lastName, age), которая принимает имя, фамилию и возраст, а возвращает объект вида {firstName, lastName, age}. 
//    Если один из параметров не задан - свойство принимает значение null.
function createUser(firstName, lastName, age) {
    firstName = firstName ?? null;
    lastName = lastName ?? null;
    age = age ?? null;
    return { firstName, lastName, age };
}

console.log(createUser('John', 'Doe', 30)); // {firstName: 'John', lastName: 'Doe', age: 30}
console.log(createUser('John', 'Doe')); // {firstName: 'John', lastName: 'Doe', age: null}
console.log(createUser('John')); // {firstName: 'John', lastName: null, age: null}
console.log(createUser()); // {firstName: null, lastName: null, age: null}


// 3.Напиши функцию, которая принимает число и две другие функции. Если число меньше 100 - вызывается первая функция. Если больше - вторая.

function moreLess(number, less, more) {
    if (number < 100) {
        less();
    } else {
        more();
    }
}
function more() {
    console.log('More than 100');
}
function less() {
    console.log('Less than 100');
}
moreLess(50, less, more); // Less than 100 коллбєк функции(гдето чекнуть подробнее)
moreLess(100, less, more); // More than 100


// 4. Напиши функцию, которая принимает неогранниченное количество аргументов (чисел) и возвращает их сумму.
function sum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// console.log(sum(1, 2, 3, 4, 5)); // 15
// console.log(sum(1, 2, 3)); // 6
// console.log(sum(1, 2)); // 3
// console.log(sum(1)); // 1
// console.log(sum()); // 0
