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
// function todayIs() {
//     const currentDate = new Date();
//     const dayOfWeek = currentDate.getDay();
//     let dayName;
//     switch (dayOfWeek) {
//         case 0:
//         dayName = "Воскресенье";
//             break;
//         case 1:
//         dayName = "Понедельник";
//             break;
//         case 2:
//         dayName = "Вторник";
//             break;
//         case 3:
//         dayName = "Среда";
//             break;
//         case 4:
//         dayName = "Четверг";
//             break;
//         case 5:
//         dayName = "Пятница";
//             break;
//         case 6:
//         dayName = "Суббота";
//             break;
//         default:
//         dayName = "В неделе всего 7 дней!";
//     }
//     return dayName;
// }
// alert(todayIs());

// console.log(todayIs()); // Среда (или другой день, в зависимости когда этот скрипт запускается)

// /*
// 6. Напиши функцию, которая вычисляет оценку на основе баллов студента.
//     Она должна принимать на вход оценку студента и выводить соответствующий балл, 
//     основанный на следующей шкале оценок:
//         Оценка 90 или выше: A
//         Оценка 80 - 89:     B
//         Баллы 70 - 79:      C
//         Баллы 60 - 69:      D
//         Балл ниже 60:       F

//     Можно через alert на странице
// */

// // Используй if-else
// // const score = +prompt("Enter score")
// // function getGrade(score) {
// //     if (score >= 90) {
// //             alert("A");
// //         } else if (score >= 80 && score <= 89) {
// //             alert("B");
// //         } else if (score >= 70 && score <= 79) {
// //             alert("C");
// //         } else if (score >= 60 && score <= 69) {
// //             alert("D");
// //         } else {
// //             alert("F");
// //         } 
// //     }
// //     getGrade(score)

// // console.log(getGrade(100)); // A
// // console.log(getGrade(82)); // B
// // console.log(getGrade(79)); // C
// // console.log(getGrade(65)); // D
// // console.log(getGrade(20)); // F

// // Используй switch-case
// function calculateGradeSwitch(score) {
//     // code here
// }

// const score = +prompt("Enter score")
// switch(true){
//     case score >= 90:
//             alert("A");
//             break;
//             case score >= 80 && score <= 89:
//                 alert("B");
//                 break;
//             case score >= 70 && score <= 79:
//                 alert("C");
//                 break;
//             case score >= 60 && score <= 69:
//                 alert("D");
//                 break;
//             default:
//             alert("F");
//     }
// // console.log(calculateGradeSwitch(100)); // A
// // console.log(calculateGradeSwitch(82)); // B
// console.log(calculateGradeSwitch(79)); // C
// console.log(calculateGradeSwitch(65)); // D
// console.log(calculateGradeSwitch(20)); // F

