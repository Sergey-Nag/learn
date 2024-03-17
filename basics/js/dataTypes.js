const str = 'string'; // String('str')
const num = 1 // Number()
const bigInt = 127346582736458972634895762389456289346587234n // BigInt()
const bool = false; // Boolean()
const isChototam = 4 > 1;
const varNull = null;
const undf = undefined;
const obj = { a: 1 }; // Object()
const arr = [1, 2]; // Array()
const symb = Symbol('test');


// < > <== >== ===

// let msg = undefined
// const test = function () {
//     console.log('from test')
// }

// // console.log('>', msg)

// const res = {
//     a: 1,
//     b: 123
// }

// const num1 = Number('\n123\t123\n');
// const num2 = Number('2')

// const bool2 = Boolean(0)

// console.log(bool2)


// Number(value)
// undefined = NaN
// null	= 0
// true / false	 = 1 / 0
// string = remove whitespace from the start and the end of the string. 
// If the remaining string is empty, the result is 0. Otherwise, the number is “read” from the string. An error gives NaN.

// Boolean(value)
// 0, null, undefined, NaN, '' = false
// остальные = true

// ---------------------------------

// let result = Boolean(str)
// let result = Boolean(undf)
// let result = String(bigInt)
// let num1, num2;
// let result;

// num1 = Number(num)
// num2 = Number(isChototam)
// result = Boolean( num1 - num2 )
// let num3 = Number('1') // +'1';
// let bool2 = !!'';
// let result = "ba" + Number("fsfsf") + "a"

// console.log(result) // baNaNa
// let result = "" + 1 + 0 // 10 string
// let result = "" - 1 + 0; // -1 number
// let result = true + false // 1 number
// let result = 6 / "3" // 2 number
// let result = 4 + 5 + "px" // 9px string
// let result = "$" + 4 + 5 // $45 string
// let result = "4px" - 2 // NaN number
// let result = "  -9  " + 5 // -9 5 string
let result = " \t \n" - 2 // -2 number

console.log(result)
 