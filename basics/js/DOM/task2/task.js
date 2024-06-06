const languages = [
    {name: 'JavaScript', releaseDate: 1995, fileExtension: '.js', creator: 'Brendan Eich', popularity: 10},
    {name: 'Python', releaseDate: 1991, fileExtension: '.py', creator: 'Guido van Rossum', popularity: 9},
    {name: 'Java', releaseDate: 1995, fileExtension: '.java', creator: 'James Gosling', popularity: 9},
    {name: 'TypeScript', releaseDate: 2012, fileExtension: '.ts', creator: 'Microsoft', popularity: 8},
    {name: 'Swift', releaseDate: 2014, fileExtension: '.swift', creator: 'Apple', popularity: 7},
    {name: 'C#', releaseDate: 2000, fileExtension: '.cs', creator: 'Microsoft', popularity: 7},
    {name: 'PHP', releaseDate: 1995, fileExtension: '.php', creator: 'Rasmus Lerdorf', popularity: 6},
    {name: 'C++', releaseDate: 1985, fileExtension: '.cpp', creator: 'Bjarne Stroustrup', popularity: 5},
    {name: 'C', releaseDate: 1972, fileExtension: '.c', creator: 'Dennis Ritchie', popularity: 4},
    {name: 'Ruby', releaseDate: 1995, fileExtension: '.rb', creator: 'Yukihiro Matsumoto', popularity: 3},
    {name: 'Go', releaseDate: 2009, fileExtension: '.go', creator: 'Google', popularity: 3},
    {name: 'Rust', releaseDate: 2010, fileExtension: '.rs', creator: 'Mozilla Research', popularity: 2},
    {name: 'Kotlin', releaseDate: 2011, fileExtension: '.kt', creator: 'JetBrains', popularity: 2},
    {name: 'Scala', releaseDate: 2003, fileExtension: '.scala', creator: 'Martin Odersky', popularity: 1},
    {name: 'Perl', releaseDate: 1987, fileExtension: '.pl', creator: 'Larry Wall', popularity: 1},
    {name: 'Haskell', releaseDate: 1990, fileExtension: '.hs', creator: 'Simon Peyton Jones', popularity: 1},
];
let changedLanguages = [...languages]

/**
 * 
 * Создание таблицы
 */
function createTable(shouldClearChanges = true) { 
    if (document.querySelector('table')){
        document.querySelector('table').remove()
        if (shouldClearChanges) {
            changedLanguages = [...languages]
        }
    }
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let headerNames = Object.keys(languages[0]);
    let headers = headerNames.map((name) => {
        let thElement = document.createElement('th');
        thElement.innerText = name;
        thElement.dataset.column = name
        return thElement;
    });
    thead.append(...headers);
    table.append(thead);
    let rows = changedLanguages.map((language) => {
        let rowElem = document.createElement('tr');
        rowElem.innerHTML = `
        <td> ${language.name} </td>
        <td> ${language.releaseDate}</td>
        <td> ${language.fileExtension}</td>
        <td> ${language.creator}</td>
        <td> ${language.popularity}</td>
        `
        return rowElem;
    });
    let tbody = document.createElement('tbody');
    tbody.prepend(...rows);
    table.append(tbody);
    document.body.prepend(table);
    // Функция создает табдицу на странице и заполняет ее данными из массива languages.
    // Если таблица уже существует, то функция должна пересоздать таблицу.
}

/**
 * 
 * Сортировка таблицы
 * @param {keyof (typeof languages[0])} column 
 * @param {'Asc'|'Desc'} [order] - default value is 'Asc'
 */
function sortTable(column, order = 'Asc') {
    // languages.sort((col1, col2)=>{
    //     if( typeof col1[column] === 'number'){
    //         if (order === 'Asc') {
    //             if (col1[column] > col2[column]){
    //                 return 1;
    //             } else {
    //                 return -1;
    //             }
    //         } else {
    //             if (col1[column] < col2[column]){
    //                 return 1;
    //             } else {
    //                 return -1;
    //             }
    //         }
    //     }
    //     if( typeof col1[column] === 'string'){
    //         if (order === 'Asc') {
    //             if (col1[column].localeCompare(col2[column]) === 1) {
    //                 return 1;
    //             } else if (col1[column].localeCompare(col2[column]) === -1){
    //                 return -1;
    //             } else {
    //                 return 0;
    //             }
    //         } else {
    //             if (col1[column].localeCompare(col2[column]) === 1) {
    //                 return -1;
    //             } else if (col1[column].localeCompare(col2[column]) === -1){
    //                 return 1;
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     }
    // })
    changedLanguages.sort((col1, col2)=>{
        let num = order === 'Asc' ? 1 : -1;

        if( typeof col1[column] === 'number'){
            return (col1[column] - col2[column]) * num;
        }
        if( typeof col1[column] === 'string'){
            return col1[column].localeCompare(col2[column]) * num
        }
    });

    createTable(false)
    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
        const isItFilterableColumn = header.dataset.column === column;
        header.style.backgroundColor = isItFilterableColumn ? 'green' : '';
    });
    
    // Функция сортирует таблицу по столбцу (свойству объекта column) в порядке order ('Asc' или 'Desc').
    // Если order не передан, то по дефолту сортировка должна быть Asc.
    // Числовые значения сортируются - от большего к меньшему и наоборот, строки - по алфавиту.
    // Колонка, по которой происходит сортировка, должна быть выделена.
}


function findSubString(string, substring){
    if (substring === string){
        return true;
    }
    if (substring === '' || string === ''){
        return false;
    }
    if (substring.length > string.length){
        return false;
    }
    let result = false;
    let substringIndex = 0;
    for ( let i = 0; i < string.length; i++){
        let stringSymbol = string[i].toLowerCase();
        if (substring[substringIndex] === undefined && result){
            return true;
        }
        let substringSymbol = substring[substringIndex].toLowerCase();
        if( stringSymbol !== substringSymbol && result === true){
            return false;
        };
        if ( string.length - 1 === i && substring.length - 1 !== substringIndex) {
            return false;
        };
        if (stringSymbol === substringSymbol){
            substringIndex++;
            result = true
        } else {
            result = false
        }
    }

    return result;
    // M i c r o s o f t - m i c r o | s o f t | g | c r o s
    // Guido van Rossum | mic
    // .swift | ts
    // substring[0]
}
/**
 * 
 * Фильтрация таблицы
 * @param {keyof (typeof languages[0])} column
 * @param {string|number|null} value
 */
function filterTable(column, value) {
    if (value === null){
        changedLanguages = [...languages];
    } else {
        changedLanguages = languages.filter(language => {
            if (typeof language[column] === 'number') {
                if(language[column] === value){
                    return true;
                } else {
                    return false;
                }
            } else if (typeof language[column] === 'string'){
                let result = findSubString(language[column], value)
                return result;
                // const string = language[column].toLowerCase();
                // const substring = value.toLowerCase();

                // // if (string.indexOf(substring) === -1) {
                // //     return false;
                // // } else {
                // //     return true;
                // // }

                // return string.indexOf(substring) !== -1
            }
        });
    }
    createTable(false);

    const headers = document.querySelectorAll('th');
    headers.forEach(header => {
        const isItFilterableColumn = header.dataset.column === column;
        const shoulHighlightColumn = value !== null;
        header.style.backgroundColor = isItFilterableColumn && shoulHighlightColumn ? 'red' : '';
    });
}
    // Функция скрывает строки таблицы, в которых значение свойства column не равно value.
    // Если значение value - число, то функция должна показать строки, в которых значение свойства равно value.
    // Если значение value - строка, то функция должна показать строки, в которых значение свойства содержит "подстроку" value.
    // Поиск по строке должен быть регистронезависимым. 'micro' должен найти 'Microsoft'.
    // Если значение value равно null, то функция должна показать все строки таблицы.
    // Колонка, по которой происходит фильтрация, должна быть выделена.

/**
 * 
 * Удаление таблицы
 */
function removeTable() {
    const table = document.querySelector('table');
    if (table) {
        table.remove();
        changedLanguages = [...languages]
    }
}


/*
    Использование функций:
    При вызове из консоли браузера функции createTable() создаст таблицу на странице.

    При вызове функции sortTable('popularity') таблица отсортируется по столбцу popularity по возрастанию.
    При вызове функции sortTable('popularity', 'Desc') таблица отсортируется по столбцу popularity по убыванию.

    При вызове функции filterTable('creator', 'Microsoft') таблица отобразит только строки, в которых creator равен 'Microsoft'.
    При вызове функции filterTable('creator', null) таблица отобразит все строки (фильтр сбросится).

    При вызове функции removeTable() таблица будет удалена со страницы.

    * Сортировка и фильтрация работают вместе:
        При вызове функции sortTable('popularity') а затем filterTable('creator', 'Microsoft')
        таблица отсортируется по столбцу popularity и отобразит только строки, в которых creator равен 'Microsoft'.
        Результатом такого вызова будет таблица со строками в следующем порядке: C#, Typescript.

    P.S. Сначала сортируй/фильтруй массив, а потом обновляй таблицу на основе этого массива.
*/