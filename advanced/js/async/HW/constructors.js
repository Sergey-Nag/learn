// function Cat (name, breed){
//     this.name = name;
//     this.breed = breed;
//     this.meow = function (){console.log('Meow', this.name)};
// }

// let catInfo = new Cat("Musya","Scotland");
// let cat2 = new Cat('Barsik', 'British');


// catInfo.meow()

// cat2.meow()

// function User(firstName, lastName, age){
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.greet = function(){
//         console.log( `Hi, my name is ${this.firstName} and my last name ${this.lastName}, im ${this.age} years old`);
//     }
// }

// User.prototype.years = function() {
//     console.log(this.age)
// }

// let user1 = new User("Vasya", "Pupkin", "37");

// const user = {
//     firstName: 'Bob',
//     lastName: 'Hz',
//     age: 10
// }

// user.greet = user1.greet;
// user.years = user1.years;

// user1.greet();
// user1.years()

// user.greet()
// user.years()

// String.prototype.reverse = function() {
//     let result = "";
//     for ( let i = this.length-1; i >= 0; i--) {
//         result += this[i];
//     }
//     return result;

// }

// const reversedTest = 'asodhf  aosi123 sad'.reverse();

// console.log(reversedTest);
// 'test'.split('').reverse().join('')

