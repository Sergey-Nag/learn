// /*
// Создайте класс Vegetable(name), содержащий в себе имя овоща.
// Создайте класс Animal(legs), реализующий метод eat(food). У каждого животного должен быть массив объектов stomach, в который попадает еда food
// Создайте класс Rabbit(breed), наследующий от Animal и реализующий метод jump(). При этом, метод eat должен выбрасывать ошибку, если кролик пытается съесть что-то, кроме овощей.
// Создайте класс Snake(isPoisonous), наследующий от Animal и реализующий метод crawl(). При этом, метод eat должен выбрасывать ошибку, если змея ест что-либо, кроме кроликов.
// Создайте класс Human(firstName, lastName), наследующий от Animal и реализующий метод walk() и greet(). При этом, метод eat должен выбрасывать ошибку, если человек пытается съесть другого человека.
// */

// class Vegetable {
//     constructor(name){
//         this.name = name;
//     }
// }

// const potato = new Vegetable('potato');

// console.log(potato)

// class Animal {
//     // stomach = [] - аналогия constructor() { this.stomach = [] } 

//     constructor(legs){
//         this.legs = legs;
//         this.stomach = []
//     }

//     eat(food){
//         this.stomach.push(food)
//     }

//     get energy() {
//         if (this.stomach.length > 0){
//             return true;
//         } else {
//             return false;
//         }
//     }
// }

// class Rabbit extends Animal {
//     constructor(breed) {
//         super(4)
//         this.breed = breed;
//     }
//     jump(){
//         if(this.energy) {
//             console.log("Rabbit jumps")
//         } else {
//             console.log("Low energy for jumps, go to eat!")
//         }
//     }

//     eat(food){
//         if (food instanceof Vegetable) {
//             super.eat(food)
//         } else {
//             throw new Error("Its not Vegetables")
//         }
//     }
// }

// class Snake extends Animal {
//     constructor(isPoisonous){
//         super(0);
//         this.isPoisonous = isPoisonous;
//     }
//     crawl(){
//         if(this.energy) {
//             console.log("Snake crawls")
//         } else {
//             console.log("Low energy for crawl, go to eat!")
//         }
//     }
//     eat(food) {
//         if(food instanceof Rabbit){
//             super.eat(food);
//         } else {
//             throw new Error("Its not Rabit");
//         }
//     }
// }

// class Human extends Animal {
//     constructor(firstName, lastName){
//         super(2)
//         this.firstName = firstName;
//         this.lastName = lastName;
//     }
//     greet() {
//         console.log(`Hi my name is ${this.firstName}`)
//     }
//     walk() {
//         if(this.energy) {
//             console.log(`${this.firstName} walking`)
//         } else {
//             console.log("Low energy for walk, go to eat!")
//         }
//     }
//     eat(food) {
//         if(food instanceof Human){
//             throw new Error ('Canibalism');
//         } else {
//             super.eat(food);
//         }
//     }
//     сделатьЧай(teapot) {
//         teapot.наполнить(1);
//         teapot.нагретьВоду();
        
//         // TimeRanges.подождать(10)
//         const сахар = 3;
//         const заварка = 'черный';
        
//         const cup = `${teapot.кипяток / 2}л ${заварка} чай с ${сахар} ложками сахара`

//         return cup
//     }
// }
// const rabbit = new Rabbit('Львиноголовый');
// rabbit.eat(potato);
// rabbit.jump();
// console.log(rabbit);

// const snake = new Snake(true);
// snake.eat(rabbit);
// snake.crawl();

// const human = new Human('Jack');
// human.eat(snake);
// human.walk();
// human.greet();

// // const horse = new Animal(4);

// // horse.eat(potato);

// // console.log(horse)

// class Teapot extends Pourable, Heatable { // TeapotInterface
//     constructor(объем) {
//         this.объем = объем;
//         this.температура = 0
//         this.вода = 0;
//         this.кипяток = 0;
//     }

//     наполнить(обьем) {
//         if (обьем > this.объем) {
//             throw new Error('Дохуя льеш')
//         }

//         this.вода = обьем;
//     } 

//     нагретьВоду() {
//         this.температура = 100;
//         this.кипяток = this.вода;
//         this.вода = 0;
//     }
// }

// class ElectoTeapot extends Teapot { // TeapotInterface
//     constructor(объем, електричество) {
//         super(объем)
//         this.електричество = електричество;
//     }

//     // нагретьВодуИПоказатьЛампочку() {
//     //     if (!this.електричество) {
//     //         throw new Error('Нужна енергия')
//     //     }

//     //     this.on();

//     //     super.нагретьВоду();

//     //     this.off();
//     // }

//     нагретьВоду() {
//         if (!this.електричество) {
//             throw new Error('Нужна енергия')
//         }

//         this.on();

//         super.нагретьВоду();

//         this.off();
//     }

//     on() {
//         // включает лампочку
//     }

//     off() {
//         // отключает лампочку
//     }
// }

// const tepot1= new Teapot(5);
// const tepot2 = new ElectoTeapot(2, true);
// const tepot3 = new ElectoTeapot(1, true);
// const tepot4 = new ElectoTeapot(3, true);
// const tepot5 = new ElectoTeapot(2, false);

// const чай = human.сделатьЧай(tepot5);

// console.log(чай)

// class Clock {
//     constructor({ template }) {

//         let timer;

//         function render() {
//             let date = new Date();

//             let hours = date.getHours();
//             if (hours < 10) hours = '0' + hours;

//             let mins = date.getMinutes();
//             if (mins < 10) mins = '0' + mins;

//             let secs = date.getSeconds();
//             if (secs < 10) secs = '0' + secs;

//             let output = template
//                 .replace('h', hours)
//                 .replace('m', mins)
//                 .replace('s', secs);

//             console.log(output);
//         }

//         this.stop = function () {
//             clearInterval(timer);
//         };

//         this.start = function () {
//             render();
//             timer = setInterval(render, 1000);
//         };

//     }
// }

// let clock = new Clock({template: 'h:m:s'});
// clock.start();

class Clock {
    constructor({ template }) {
        this.template = template;
        this.timer = null;
    }

    render() {
        const date = new Date();
        let hours = date.getHours().toString().padStart(2, '0')
        // if (hours < 10) hours = '0' + hours;
        let mins = date.getMinutes().toString().padStart(2, '0')
        // if (mins < 10) mins = '0' + mins;
        let secs = date.getSeconds().toString().padStart(2, '0')
        // if (secs < 10) secs = '0' + secs;

        const output = this.template
        .replace('h', hours)
        .replace('m', mins)
        .replace('s', secs);
        console.log(output);
    }

    stop() {
        clearInterval(this.timer);
    }

    start() {
        this.render();
        this.timer = setInterval(() => this.render(), 1000);
    }
}

const clock = new Clock({ template: 'h:m:s' });
clock.start();