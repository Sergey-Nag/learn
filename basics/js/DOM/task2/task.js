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

/**
 * 
 * Создание таблицы
 */
function createTable() {
    // Функция создает табдицу на странице и заполняет ее данными из массива languages.
    // Если таблица уже существует, то функция должна пересоздать таблицу.
}

/**
 * 
 * Сортировка таблицы
 * @param {keyof (typeof languages[0])} column 
 * @param {'Asc'|'Desc'} [order] - default value is 'Asc'
 */
function sortTable(column, order) {
    // Функция сортирует таблицу по столбцу (свойству объекта column) в порядке order ('Asc' или 'Desc').
    // Если order не передан, то по дефолту сортировка должна быть Asc.
    // Числовые значения сортируются - от большего к меньшему и наоборот, строки - по алфавиту.
    // Колонка, по которой происходит сортировка, должна быть выделена.
}

/**
 * 
 * Фильтрация таблицы
 * @param {keyof (typeof languages[0])} column
 * @param {string|number|null} value
 */
function filterTable(column, value) {
    // Функция скрывает строки таблицы, в которых значение свойства column не равно value.
    // Если значение value - число, то функция должна показать строки, в которых значение свойства равно value.
    // Если значение value - строка, то функция должна показать строки, в которых значение свойства содержит "подстроку" value.
    // Поиск по строке должен быть регистронезависимым. 'micro' должен найти 'Microsoft'.
    // Если значение value равно null, то функция должна показать все строки таблицы.
    // Колонка, по которой происходит фильтрация, должна быть выделена.
}

/**
 * 
 * Удаление таблицы
 */
function removeTable() {
    // Функция удаляет таблицу со страницы.
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