// 1. Создай объект с тремя свойствами: name, age, city
// выведи в консоль все свойства объекта через цикл for in
const objTest = {
    name: 'Toha',
    age: '32',
    city: 'Muhosransk'
}

// for (let key in objTest) {
//     console.log(key, objTest[key])
// }
// 2. Выведи в консоль значения всех числовых свойств объекта obj через цикл for in
const obj = {
    0: 'zero',
    '42': 'answer',
    'greeting': 'Hello',
    3.14: 'PI',
}
// for (let key in obj) {
//     // key = Number(key);
//     // console.log(typeof key);
//     // if(typeof key === 'number' && !Number.isNaN(key)) {
//     if(obj[Number(key)]) {
//         console.log(obj[key]);
//     }
// }

// Result: zero, answer, PI

// 3. Проверь являются ли объекты obj1 и obj2 одинаковыми

const obj1 = {
    a: 1,
    b: 2,
    e: 4,
    c: 3,
}

const obj2 = {
    a: 1,
    b: 2,
    e: (() => {
        const arr = [1,1,1,1,1,1,1,,1,1,12,3,4]
        return arr[arr.length - 1]
    }
    )(),
    c: 3,
}
// console.log(Object.values(obj1).toString())
// console.log(obj1, obj2)
// if (
//     Object.values(obj1).toString() === Object.values(obj2).toString() 
//     && Object.keys(obj1).toString() === Object.keys(obj2).toString()
// ){
//     console.log('equal')
// }else{
//     console.log('not equal')
// }


// 4. Создай объект obj3 и скопируй в него все свойства из obj1

const obj3 ={...obj1}
// console.log(obj3,  obj1);

// 5. Проверь являются ли объекты obj4 и obj5 пустыми

const obj4 = {
   a: {}
}

// [] -> true
// [ 'a' ] -> 'a' -> true
let isEmpty;

// if (Object.keys(obj4).toString() === ""){
// if (Object.keys(obj4).toString().length === 0){
// if (Object.keys(obj4).length === 0) {
//     console.log('empty')
// }else{
//     console.log('not empty')
// }

// 6. Создай копию объекта salaries, в котором все значения будут умножены на 2. Первональный объект не должен измениться
// Через цикл

const salaries = {
    HRs: {
        Alice: 1000,
        Bob: 1500,
    },
    Devs: {
        Carol: 2000,
        Dave: 2500,
        Charles: 3000,
    },
    QAs: {
        Eve: 3000,
        Frank: 3500,
    },
}

const salariesCopy = {};

// 7. Создай переменные highestHRSalary, highestDevSalary, highestQASalary из скопированного объекта с помощью деструктуризации
// const highestHRSalary = salaries.HRs.Bob;

let {
    HRs:{
        Bob: highestHRSalary    
    },
    Devs: {
        Charles: highestDevSalary
    },
    QAs: {
        Frank: highestQASalary = 0
    }
} = salaries 

console.log(highestHRSalary) // 1500
console.log(highestDevSalary) // 3000
console.log(highestQASalary) // 3500