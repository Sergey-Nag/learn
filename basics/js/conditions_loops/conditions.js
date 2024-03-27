/*
    Задачи со скринов task1.png, task2.png, task3.png нужно написать с помощью if-else и тернарного оператора.
*/

// task1 here (if else)

// task1 here (ternary)

// task2 here (if else)

// task2 here (ternary)

// task3 here (if else)

// task3 here (ternary)


// 4. Переписать на switch-case

const number = +prompt('Введите число между 0 и 3', '');

if (number === 0) {
  alert('Вы ввели число 0');
}

if (number === 1) {
  alert('Вы ввели число 1');
}

if (number === 2 || number === 3) {
  alert('Вы ввели число 2, а может и 3');
}

// switch-case here

/*
 5. Напиши функцию, которая возвращает название текущего дня недели (Понедельник, Вторник и т.д.) используя switch-case.
    P.S. Чтобы получить время (в т.ч. дату, год, день недели и т.д.) используй конструктор Date.
    Можно через alert на странице
*/
function todayIs() {
    // code here
}

console.log(todayIs()); // Среда (или другой день, в зависимости когда этот скрипт запускается)

/*
 6. Напиши функцию, которая вычисляет оценку на основе баллов студента.
    Она должна принимать на вход оценку студента и выводить соответствующий балл, 
    основанный на следующей шкале оценок:
        Оценка 90 или выше: A
        Оценка 80 - 89:     B
        Баллы 70 - 79:      C
        Баллы 60 - 69:      D
        Балл ниже 60:       F

    Можно через alert на странице
*/

// Используй if-else
function getGrade(score) {
    // code here
}

console.log(getGrade(100)); // A
console.log(getGrade(82)); // B
console.log(getGrade(79)); // C
console.log(getGrade(65)); // D
console.log(getGrade(20)); // F

// Используй switch-case
function calculateGradeSwitch(score) {
    // code here
    
}

console.log(calculateGradeSwitch(100)); // A
console.log(calculateGradeSwitch(82)); // B
console.log(calculateGradeSwitch(79)); // C
console.log(calculateGradeSwitch(65)); // D
console.log(calculateGradeSwitch(20)); // F

