'use strict';

let name = 'Jack';
let age = 30;
function rename(newName) {
    name = newName;
}
function changeAge(newAge) {
    age = newAge;
}

function changeNameAndAge(newName , newAge){
    name = newName;
    let changeAges = age;
    age = newAge;
    if (age > 50) {       
        age = changeAges - newAge;
    }
}




rename('John');
console.log('Result:', name) // John

rename('Bob')
console.log('Result:', name) // Bob

rename('Jim')
console.log('Result:', name) // Jim

changeAge(40)
console.log('Age Result:', age) // 40

changeNameAndAge('John', 50);
console.log('Result:', name, age) // John 50


changeNameAndAge('John', 55);
console.log('Result:', name, age) // John -5

// name === 'John' // true