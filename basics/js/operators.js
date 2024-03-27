// const response = [
//     {
//         id: 1,
//         name: 'John',
//         age: 25,
//     },
//     {
//         id: 2,
//         name: 'Jane',
//         age: 30,
//     },
//     {
//         id: 3,
//         name: 'Joe',
//     },
//     {
//         id: 4,
//         name: 'Jack',
//         age: 40,
//     },
//     {
//         id: 5,
//         name: 'Jill',
//         age: 45,
//     },
//     {
//         id: 6,
//         name: 'Jenny',
//         age: null,
//     },
//     {
//         id: 7,
//         name: 'Jesse',
//         age: 55,
//     },
//     {
//         id: 8,
//         name: null,
//         age: null,
//     },
//     {
//         id: 9,
//         name: 'Jasper',
//         age: 0,
//     },
//     {
//         id: 10,
//         name: 'Jared',
//         age: -5,
//     },
// ];

// const num100 = response.filter(function(item) {
//     return item.age >= 0 && item.age !== null;
// });

// const num2 = num100.map(function(item) {
//     return `Age: ${item.age.toFixed(2)}`
// });

// console.log(num2);

// function test() {
//     console.log('true 4')
//     return false
// }

// false || false || console.log('true') || console.log('true 2') || test() || console.log('true 3')

// console.log(console.log(1))

function test(a) {
    const b = a ?? 100;

    return b;
}

console.log(test());