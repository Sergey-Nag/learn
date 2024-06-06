//Task 1

function ucFirst(str){
    if (!str){
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
} 

console.log(ucFirst("guvno"));
//Task 2

function checkSpam(str) {
    let strToLower = str.toLowerCase();
    return strToLower.includes('viagra') || strToLower.includes('xxx');
}

console.log(checkSpam("watch XXX free videos"));
console.log(checkSpam("viagra is evil"));
console.log(checkSpam("evil"));

//Task 3

function extractCurrencyValue(str) {
    let numbersPart = str.slice(1);
    let numberValue = Number(numbersPart);
    return numberValue;
}

console.log(extractCurrencyValue("$952.8909"));

function truncate(str, maxlength) {
    if(str.length > maxlength) {
        return str.slice(0 , maxlength-1) + "...";
    }
    return str;
}

console.log(truncate("Вот, что мне хотелось бы сказать на эту тему:", 20));
console.log(truncate("Всем привет!", 20));