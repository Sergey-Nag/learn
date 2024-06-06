// 1. Создай массив с Apple, Orange, Banana, Pineapple, Mango
// 1.2. Добавь в конец массива Orange и Grape
// 1.3. Удали из массива Banana
// 1.4. Замени значение Orange на Cherry
// 1.5. Удали последний элемент массива и выведи его в консоль
// 1.6. Добавь в начало массива Watermelon
// 1.7. Выведи в консоль длину массива
// const newArr = ["Apple", "Orange", "Banana", "Pineapple", "Mango"]

// newArr.push("Orange","Grape");
// newArr.splice(2,1);
// newArr.splice(1,1, "Cherry");
// const value = newArr.pop();
// console.log(value);
// newArr.unshift("Watermelon");
// console.log(newArr.length);

/*
    2. Напиши функцию, которая принимает массив с числами и возвращает массив с нечетными числами
    2.1 C помощью цикла for
    2.2 C помощью метода filter
*/
// const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// // function oddNumbers(array) {
// //     let newArr = [];
// //     for(let i = 0; i<array.length; i++) {
// //         let someNumbers = array[i]
// //         if (someNumbers % 2) {
// //             newArr.push(someNumbers)
// //         }
// //     }
// //     return newArr;
// // }

// function oddNumbers(array){
//     return array.filter(num => (num % 2));
// }

// console.log(oddNumbers(arr1));
// console.log(oddNumbers([10, 22, 33, 44, 55, 66, 77, 88, 99]));
// Result: [1, 3, 5, 7, 9]

/*
    3. Напиши функцию, которая принимает массив строк и возвращает новый массив строк в верхнем регистре.
    3.1 C помощью цикла for
    3.2 C помощью метода map
*/

// function convertToUpperCase(array) {
//     const upperCaseArr = []
//     for (let i = 0; i < array.length; i++) {
//         const str = array[i];
//         const upperCasestr = str.toUpperCase();
//         upperCaseArr.push(upperCasestr);
//     }
//     return upperCaseArr;
// }
// convertToUpperCase(['apple', 'orange', 'banana']);

// function convertToUpperCase(array) {
//     const upperCaseArray = array.map(str => str.toUpperCase());
//     return upperCaseArray;
// }

// // ['apple', 'orange', 'banana'] => ['APPLE', 'ORANGE', 'BANANA']

// const strings = ['apple', 'orange', 'banana'];
// const upperCaseStrings = convertToUpperCase(strings);
// console.log(upperCaseStrings)


    // 4. Напиши функцию, которая принимает 2 массива и возвращает новый массив,
    // который состоит только из элементов, которые есть в обоих массивах.
// function validElements(Array1, Array2) {
//     const result = [];
//     for (let i = 0; i < Array1.length; i++) {
//         const element = Array1[i];
//         if (Array2.includes(element)) {
//             result.push(element)
//         }
//     }
//     return result;
// }
//     // Например:
//     //     Array1: [1, 2, 3, 4, 5]
//     //     Array2: [3, 4, 5, 6, 7]

//     //     Result: [3, 4, 5]


// const Array1 = [1, 2, 3, 4, 5];
// const Array2 = [3, 4, 5, 6, 7];
// const resultArray = validElements(Array1, Array2);
// console.log(resultArray)


    // 5. Напиши функцию, которая принимает массив с людьми, и возвращает true или false если в массиве есть
    // хотя бы один человек, который курит.
    // 5.1 C помощью цикла for
    // 5.2 C помощью метода some

    // Например:
    //     people1: [
    //         { name: 'Alex', age: 25, smoke: false },
    //         { name: 'John', age: 30, smoke: true },
    //         { name: 'Sam', age: 18, smoke: false },
    //         { name: 'Alice', age: 20 },
    //     ]
// Result: true
// people2: [
//     { name: 'Alex', age: 25 },
//     { name: 'John', age: 30 },
//     { name: 'Sam', age: 18, smoke: false },
//     { name: 'Alice', age: 20, smoke: false },
// ]
// Result: false

        
// function hasSmokeFor(people) {
//     for (let i = 0; i < people.length; i++) {
//         if (people[i].smoke) {
//             return true;
//         }
//     }
//     return false; 
// }

// console.log(hasSmokeFor([
//             { name: 'Alex', age: 25, smoke: false },
//             { name: 'John', age: 30, smoke: true },
//             { name: 'Sam', age: 18, smoke: false },
//             { name: 'Alice', age: 20 },
//         ]));

        
// console.log(hasSmokeFor([
//         { name: 'Alex', age: 25 },
//         { name: 'John', age: 30 },
//         { name: 'Sam', age: 18, smoke: false },
//         { name: 'Alice', age: 20, smoke: false },
//     ]));

/*
    6. Напиши функцию, которая принимает массив строк и возвращает массив объектов вида { string: <строка>, length: <длина строки> }
    

    Например:
        Array: ['apple', 'orange', 'banana'];
        Result: [
            { string: 'apple', length: 5 },
            { string: 'orange', length: 6 },
            { string: 'banana', length: 6 }
        ]
*/
// function stringsToObjects(array) {
//     const result = [];
//     for (let i = 0; i < array.length; i++) {
//         const str = array[i];
//         const obj = { string: str, length: str.length };
//         result.push(obj);
//     }
//     return result;
// }

// const Array = ['apple', 'orange', 'banana'];
// const objects = stringsToObjects(Array);
// // console.log(objects);

/*
    7. У тебя есть глобальный объект, который хранит в себе информацию о текущем пользователе.
    У пользователя может быть роль: admin, moderator, или guest.
    В зависимости от роли у него есть разные права на доступ к страницам.
    Напши функцию, которая принимает массив, описывающий какой роле доступны какие страницы
    и присваивай пользователю доступ к страницам в зависимости от его роли.

    Например:
        const pages = [
            { role: ['admin', 'moderator', 'guest'], url: '/' },
            { role: ['admin', 'moderator', 'guest'], url: '/blog' },
            { role: ['admin', 'moderator', 'guest'], url: '/contacts' },
            { role: ['admin', 'moderator', 'guest'], url: '/search' },
            { role: ['admin', 'moderator', 'guest'], url: '/products' },
            { role: ['admin', 'moderator', 'guest'], url: '/login' },
            { role: ['admin', 'moderator', 'guest'], url: '/register' },
            { role: ['admin', 'moderator'], url: '/logout' },
            { role: ['admin', 'moderator'], url: '/blog/edit' },
            { role: ['admin', 'moderator'], url: '/contacts/edit' },
            { role: ['admin', 'moderator'], url: '/products/edit' },
            { role: ['admin', 'moderator'], url: '/cabinet' },
            { role: ['admin', 'moderator'], url: '/users' },
            { role: ['admin'], url: '/cabinet/admin' },
            { role: ['admin'], url: '/users/edit' },
        ];

        const user = {
            role: 'guest',
            pages: [],
        };

        assignPagesToUser(pages);

        console.log(user.pages); // ['/','/blog','/contacts','/search','/products','/login','/register']
            
*/

/*
    8. Напиши функцию, которая принимает массив с числами и возвращает его отсортированным по убыванию
    C помощью метода sort
// */
// function sortDescending(array) {
//     array.sort((a, b) => b - a);
//     return array;
// }
// const numbers = [3, 1, 4, 1, 5, 9, 2, 6];
// const sortedNumbers = sortDescending(numbers);
// // console.log(sortedNumbers)



//     // 9. Напиши функцию, которая принимает массив с числами и возвращает среднее арифметическое.
//     // Функция должна игнорировать все не числовые значения.
//     // 9.1. C помощью цикла for
//     // 9.2. C помощью метода forEach

// function arifmeticFuncFor(array) {
//     let sum = 0;
//     let count = 0;
//     for (let i = 0; i < array.length; i++) {
//         if (typeof array[i] === 'number' && !isNaN(array[i])) {
//             sum += array[i];
//             count++;
//         }
//     }
//     return count === 0 ? 0 : sum / count;
// }


// function arifmeticFuncForEach(array) {
//     let sum = 0;
//     let count = 0;
//     array.forEach(function(element) {
//         if (typeof element === 'number' && !isNaN(element)) {
//             sum += element;
//             count++;
//         }
//     });

//     return count === 0 ? 0 : sum / count;
// }
// console.log(arifmeticFuncForEach([1, 2, 3]));
//     // Например:
//     //     Array: [1, 2, [100], 3, '1', 4, false, 5, { 1: 1 }]
//     //     Result: 3

//         const Array2 = [1, 2, [100], 3, '1', 4, false, 5, { 1: 1 }];
//         console.log(arifmeticFuncForEach(Array2))




/*
    10. Напиши функцию, которая принимает массив с числами и возвращает их сумму
    10.1. C помощью цикла for
    10.2. C помощью метода forEach
    10.3. C помощью метода reduce
*/
// const arr2 = [1, 2, 3, 4, 5];
// // Result: 15


// const arr = [10, 40, 9, 52, 116, 324, 1, 9, 3, 5, 12, 13, 14, 15];
// // Result: 623

/* 
    11. Напиши функцию, которая принимает массив и удаляет из него дубликаты
    11.1. C помощью метода forEach
    11.2. C помощью метода filter
    11.3. C помощью метода reduce

    Например 1:
        Array: [1, 2, 2, 3, 4, 4, 5]
        Result: [1, 2, 3, 4, 5]

    Например 2:
        Array: ['apple', 'orange', 'apple', 'banana', 'orange']
        Result: ['apple', 'orange', 'banana']

    Например 3:
        Array: [12, false, 12, 15, 15, false, 'apple', true, 'apple', 3, 0, '', 0]
        Result: [12, false, 15, 'apple', true, 3, 0, '']
*/


/*

    12. Напиши функцию keyBy(arr, key), которая принимает массив объектов и возвращает объект, где ключами являются значения поля key
    Если ключ повторяется - значение должно быть массивом, содержащим все объекты с таким ключом.
    С помощью метода reduce
    Например:
    
        Array:  [
            {name: ‘Vasya’, surname: ‘Ivanov’},
            {name: ‘Vanya’, surname: ‘Ivanov’},
            {name: ‘Albert’, surname: ‘Vasyliev’},
        ]

        Result: 
            keyBy(arr, 'name') // {
                Vasya: {name: ‘Vasya’, surname: ‘Ivanov’},
                Vanya: {name: ‘Vanya’, surname: ‘Ivanov’},
                Albert: {name: ‘Albert’, surname: ‘Vasyliev’},
            }

            keyBy(arr, 'surname')// {
                Ivanov: [
                    {name: ‘Vasya’, surname: ‘Ivanov’},
                    {name: ‘Vanya’, surname: ‘Ivanov’},
                ]
                Vasyliev: {name: ‘Albert’, surname: ‘Vasyliev’},
            }
*/


/*
    Напиши функцию, которая принимает:
     1. Массив объектов (объекты с одинаковыми ключами)
     2. Название ключа
     3. Режим сортировки ('ASC', 'DESC'). По умолчанию 'ASC'

    Функция должна вернуть массив объектов, отсортированный по ключу в указанном режиме.

    Например:
        const arr = [
            { name: 'Alex', age: 25 },
            { name: 'John', age: 30 },
            { name: 'Sam', age: 18 },
            { name: 'Alice', age: 20 },
        ];

        sortByKey(arr, 'age', 'ASC') // [
            { name: 'Sam', age: 18 },
            { name: 'Alice', age: 20 },
            { name: 'Alex', age: 25 },
            { name: 'John', age: 30 },
        ]

        sortByKey(arr, 'name', 'DESC') // [
            { name: 'Sam', age: 18 },
            { name: 'John', age: 30 },
            { name: 'Alice', age: 20 },
            { name: 'Alex', age: 25 },
        ]
*/


/*
    Напиши свою реализацию методов forEach, filter, map, some, every.
    1. Использовать встроенные методы массивов нельзя.
    2. Каждая функция должна принимать массив и колбэк функцию
    3. Колбэк функция должна принимать элемент массива, индекс, сам массив
    
    Пример использования:
    1. forEach(arr, (el, i, arr) => {}); // ничего не возвращает
    2. filter(arr, (el, i, arr) => {}); // возвращает новый массив
    3. map(arr, (el, i, arr) => {}); // возвращает новый массив
    4. some(arr, (el, i, arr) => {}); // возвращает true или false
    5. every(arr, (el, i, arr) => {}); // возвращает true или false
*/

// function every (arr, callback) {
//     for(let i = 0; i < arr.length; i++) {
//         if (!callback(arr[i], i, arr)) {
//             return false;
//         }
//     }
//     return true;
// }

// let num0 = [10, 18, 50, 1];

// function callback(elem) {
//     return elem % 2 === 0;
// };

// console.log(every(num0, callback));

// function filter (arr, callback) {
//     let result = []
//     for(let i = 0; i < arr.length; i++) {
//         if (callback(arr[i], i, arr)) {
//             result.push(arr[i])
//         }
//     }
// return result;
// }

// let num1 = [10, 103, 17, 15, 92, 13 ,58];

// function callback(elem) {
//     return elem >= 20;
// };
// console.log (filter(num1, callback))

// function map(arr, callback){
//     let newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         let result = callback(arr[i], i, arr)
//         newArr.push(result)
//     }
//     return newArrcc
// }

// const numbers1 = [1,2,3];
// const strings = map(numbers1, function callback(number) {
//     console.log(number);
//     return number.toString();
// });
// const callback = function (number) {
//     console.log(number);
//     return number.toString();
// }

// const cb = (num) => {
//     return num === -1213123
// }

// function some(arr, callback){
//     for (let i = 0; i < arr.length; i++){
//         let number = arr[i];
//         let result = callback(number);
//         if (result === true ) {
//             return result;
//         }
//     }
//     return false;
// }

// // num === 1 => true
// // num === 3 => true
// // num === 5 => false


// console.log(
//     some([1,2,3], cb),
//     [1,2,3].some(cb)
// )

// callback(123)
// console.log(strings) // ['1', '2', '3'];

// function num2String(number) {
//     return number.toString();
// }

// const str = num2String(1);
// console.log('>>>', str, 1)


// function forEach(arr, callback) {
//     for (let i = 0; i < arr.length; i++) {
//         callback(arr[i], i, arr);
//     }
// }
// const arr3 = [1, 2];

// arr3.forEach((el, i) => {
//     console.log('array 1', el, i);
// });

// forEach(arr3, (el, i) => {
//     console.log('array 2', el, i);
// });

// for (let i = 0; i < arr3.length; i++) {
//     console.log('array 3', arr3[i], i)
// }

// console.log('not array', arr3[0], 0);
// console.log('not array', arr3[1], 1);

const someArr = [1, 2, 3, 4, 5];

function sum(acc, elem) {
    console.log(acc, elem)
    return acc + elem;
}

function reduce(arr, callback, def) {
    let result = def;
    if (def === undefined ) {
        result = arr[0];
    }
    for( let i = 0; i < arr.length; i++){
        let elem = arr[i]
        if (def === undefined && i === 0){
            continue
        } else {
            result = callback(result, elem);
        }
    }
    return result;
}

console.log(someArr.reduce(sum, 0))
console.log('------------------------')
console.log(reduce(someArr, sum, 0))
console.log(reduce([1,2,3, 1, 2, 3, 4,3, 2, 1], (acc, el) => {
    if (el in acc) {
        acc[el] += 1;
    } else {
        acc[el] = 1
    }

    return acc;
}, {}))