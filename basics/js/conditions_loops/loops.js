/* 
    ======
    № 1: Напиши цикл, который заполнит строку str символами '*', пока ее длина не станет равна 10
    Сделай 3 варианта: с использованием while, for и do-while
    ======
*/
let str = ''; // не менять эту строку
while(str.length < 10) {
    str += "*";
}
// code here (while loop)

// Результат:
// console.log('\n1: while loop');
// console.log(str); // **********
// console.log(str.length); // 10
str = '';  // не менять эту строку

// code here (for loop)

// for (; str.length <10; str += "*") {}

for (let i = 0; i < 10; i++) {
    str += "*";
}


// Результат:
// console.log('\n2: for loop');
// console.log(str); // **********
// console.log(str.length); // 10

str = '';  // не менять эту строку

// code here (do-while loop)
do{
    str += "*";
}
while(str.length < 10)
    
// Результат:
// console.log('\n3: do-while loop');
// console.log(str); // **********
// console.log(str.length); // 10

/* 
    ======
    № 2: Напиши цикл, который создаст новый массив  в котором будут числа из arr, умноженные на 2
    ======
*/
// const arr = [1, 2, 3, 4, 5, 10, 20, 30]; // не менять эту строку
// let doubleArr; // не менять эту строку
// for (let i = 0; i <= 7; i++){
//     // doubleArr = [] * 2
//     let value = arr[i];
//     if (doubleArr === undefined){
//         doubleArr = [];
//     }
//     doubleArr[i] = value * 2;
// }

const arr = [1, 2, 3, 4, 5, 10, 20, 30]; // не менять эту строку
let doubleArr; // не менять эту строку
// for (let i = 0; i < arr.length; i++) {
//     let value = arr[i];
//     doubleArr ??= [];
//     doubleArr[i] = value * 2;
// }
for (let value of arr) {
    doubleArr ??= [];
    doubleArr.push(value * 2);
}

// const arr = [1, 2, 3, 4, 5, 10, 20, 30];
// let doubleArr;
// for (let i = 0; i <= 7; i++){
//     let value = arr[i];
//     if (doubleArr === undefined){
//         doubleArr = [value * 2];
//     } else {
//         doubleArr.push(value * 2);
//     }
// }
// code here


// Результат:
console.log('\n4: arrays (for loop)');
console.log(doubleArr); // [2, 4, 6, 8, 10, 20, 40, 60]

/* 
    ======
    № 3: Напиши цикл, который добавит в массив numbersLessThanTen числа из doubleArr, которые меньше 10;
        А в массив numbersGreaterThanTen числа из doubleArr, которые больше 10
    ======
*/

const numbersLessThanTen = []; // не менять эту строку
const numbersGreaterThanTen = []; // не менять эту строку

for (let i = 0; i < doubleArr.length; i++ ){
    let value = doubleArr[i];
    if ( value < 10){ 
        numbersLessThanTen.push(value) ;
    } else if ( value > 10)
     {
        numbersGreaterThanTen.push(value);
    }
}

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
for (let i=0; i < Math.max(numbersLessThanTen.length, numbersGreaterThanTen.length); i++){
    let value1 = numbersLessThanTen[i];
    let value2 = numbersGreaterThanTen[i];
    if (value1 !== undefined) {
        shuffleNumbers.push(value1);
    }

    if(value2 !== undefined) {
        shuffleNumbers.push(value2);
    }
}
// code here


// Результат:
// console.log(shuffleNumbers); // [2, 20, 4, 40, 6, 60, 8]

/*
    Закончи функцию grabDoll.
    Функция принимает 1 параметр: dolls. Это строковый массив, список некоторых кукол.
    Необходимо обойти кукол, используя цикл for. Если кукла - "Hello Kitty" или "Barbie doll",
    её нужно поместить в bag (bag - массив, определенный в функции); 
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



// Fix a bug
// const arr = [1, 2, 3, 4, 5]; // массив с числами
// const newArr = []; // пустой массив

// for (let i = arr.length; i >= 0; i--) { // итерация по массиву arr (пока текущий нидекс больше или равен 0);
//     const currentItem = arr[i]; // сохраняем число из массива под текущим индексом в переменную
//     newArr.push(currentItem * 2); // добавляем в конец нового массива число умноженное на 2
// }

// console.log(newArr) // [10, 8, 6, 4, 2]