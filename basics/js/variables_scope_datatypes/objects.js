// 1. Создай объект с тремя свойствами: name, age, city
// выведи в консоль все свойства объекта через цикл for in

// 2. Выведи в консоль значения всех числовых свойства объекта obj через цикл for in
const obj = {
    0: 'zero',
    '42': 'answer',
    'greeting': 'Hello',
    3.14: 'PI',
}

// Result: zero, answer, PI

// 3. Проверь являются ли объекты obj1 и obj2 одинаковыми

const obj1 = {
    a: 1,
    b: 2,
    c: 3,
}

const obj2 = {
    a: 1,
    b: 2,
    c: 3,
}



// 4. Создай объект obj3 и скопируй в него все свойства из obj1

// 5. Проверь являются ли объекты obj4 и obj5 пустыми

const obj4 = {}

const obj5 = {
    a: {},
}

// 6. Создай копию объекта salaries, в котором все значения будут умножены на 2. Первональный объект не должен измениться

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

// 7. Создай переменные highestHRSalary, highestDevSalary, highestQASalary из скопированного объекта с помощью деструктуризации