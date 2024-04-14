// 1. Создай массив с Apple, Orange, Banana, Pineapple, Mango
// 1.2. Добавь в конец массива Orange и Grape
// 1.3. Удали из массива Banana
// 1.4. Замени значение Orange на Cherry
// 1.5. Удали последний элемент массива и выведи его в консоль
// 1.6. Добавь в начало массива Watermelon
// 1.7. Выведи в консоль длину массива


const arr = [10, 40, 9, 52, 116, 324, 1, 9, 3, 5, 12, 13, 14, 15];

// Result: 623

/*
    2. Напиши функцию, которая принимает массив с числами и возвращает массив с нечетными числами
    2.1 C помощью цикла for
    2.2 C помощью метода filter
*/
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Result: [1, 3, 5, 7, 9]

/*
    3. Напиши функцию, которая принимает массив строк и возвращает новый массив строк в верхнем регистре.
    3.1 C помощью цикла for
    3.2 C помощью метода map
*/


/* 

    4. Напиши функцию, которая принимает 2 массива и возвращает новый массив,
       который состоит только из элементов, которые есть в обоих массивах.

    Например:
        Array1: [1, 2, 3, 4, 5]
        Array2: [3, 4, 5, 6, 7]

        Result: [3, 4, 5]
*/

/*
    5. Напиши функцию, которая принимает массив с людьми, и возвращает true или false если в массиве есть
    хотя бы один человек, который курит.
    5.1 C помощью цикла for
    5.2 C помощью метода some

    Например:
        Array: [
            { name: 'Alex', age: 25, smoke: false },
            { name: 'John', age: 30, smoke: true },
            { name: 'Sam', age: 18, smoke: false },
            { name: 'Alice', age: 20 },
        ]
        Result: true

        Array: [
            { name: 'Alex', age: 25 },
            { name: 'John', age: 30 },
            { name: 'Sam', age: 18, smoke: false },
            { name: 'Alice', age: 20, smoke: false },
        ]
        Result: false

*/

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
*/


/*
    9. Напиши функцию, которая принимает массив с числами и возвращает среднее арифметическое.
       Функция должна игнорировать все не числовые значения.
    9.1. C помощью цикла for
    9.2. C помощью метода forEach

    Например:
        Array: [1, 2, [100], 3, '1', 4, false, 5, { 1: 1 }]
        Result: 3

*/


/*
    10. Напиши функцию, которая принимает массив с числами и возвращает их сумму
    10.1. C помощью цикла for
    10.2. C помощью метода forEach
    10.3. C помощью метода reduce
*/
const arr2 = [1, 2, 3, 4, 5];


// Result: 15

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