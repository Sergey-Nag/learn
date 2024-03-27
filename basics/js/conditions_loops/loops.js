/* 
    ======
    № 1: Напиши цикл, который заполнит строку str символами '*', пока ее длина не станет равна 10
    Сделай 3 варианта: с использованием while, for и do-while
    ======
*/
let str = ''; // не менять эту строку

// code here (while loop)

// Результат:
// console.log(str); // **********
// console.log(str.length); // 10

str = '';  // не менять эту строку

// code here (for loop)

// Результат:
// console.log(str); // **********
// console.log(str.length); // 10

str = '';  // не менять эту строку

// code here (do-while loop)

// Результат:
// console.log(str); // **********
// console.log(str.length); // 10

/* 
    ======
    № 2: Напиши цикл, который создаст новый массив doubleArr, в котором будут числа из arr, умноженные на 2
    ======
*/
const arr = [1, 2, 3, 4, 5, 10, 20, 30]; // не менять эту строку
let doubleArr; // не менять эту строку


// code here


// Результат:
// console.log(doubleArr); // [2, 4, 6, 8, 10, 20, 40, 60]

/* 
    ======
    № 3: Напиши цикл, который добавит в массив numbersLessThanTen числа из doubleArr, которые меньше 10;
        А в массив numbersGreaterThanTen числа из doubleArr, которые больше 10
    ======
*/

const numbersLessThanTen = []; // не менять эту строку
const numbersGreaterThanTen = []; // не менять эту строку

// Напиши цикл, который добавит в массив numbersLessThanTen числа из doubleArr, которые меньше 10
// и в массив numbersGreaterThanTen числа из doubleArr, которые больше 10

// code here

// Результат:
// console.log(numbersLessThanTen); // [2, 4, 6, 8]
// console.log(numbersGreaterThanTen); // [20, 40, 60]

/* 
    ======
    № 4: Напиши цикл, который добавляет в массив shuffleNumbers числа из numbersLessThanTen и numbersGreaterThanTen чередуя их.
    ======
*/
const shuffleNumbers = []; // не менять эту строку

// code here

// Результат:
// console.log(shuffleNumbers); // [2, 20, 4, 40, 6, 60, 8]

/*
    Закончи функцию grabDoll.
    Функция принимает 1 параметр: dolls. Это строковый массив, список некоторых кукол.
    Необходимо обойти кукол, используя цикл for. Если кукла - "Hello Kitty" или "Barbie doll",
    его нужно поместить в bag (bag - массив, определенный в функции); 
    Если это другие строки, нужно использовать continue, чтобы пропустить их.

    Когда в мешке будет три элемента, мешок будет переполнен.
    Следует использовать break для выхода из цикла; 
    Если сумка не заполнена, следует пройтись по куклам до последнего элемента.

    Верни из функции сумку после завершения цикла for.
*/
function grabDoll(dolls) {
    const bag = [];

    // code here
    
    return bag;
}

// Результат:
console.log(grabDoll(["Mickey Mouse","Hello Kitty","Snow white"])) // ["Hello Kitty"]
console.log(grabDoll(["Mickey Mouse","Hello Kitty","Hello Kitty","Barbie doll","Snow white"])) // ["Hello Kitty","Hello Kitty","Barbie doll"]
console.log(grabDoll(["Mickey Mouse","Barbie doll","Hello Kitty","Hello Kitty","Barbie doll","Snow white"])) // ["Barbie doll","Hello Kitty","Hello Kitty"]