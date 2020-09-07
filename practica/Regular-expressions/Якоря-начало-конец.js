// ^ - совпадение с началом текста, ставится вначале поисковой строки
// $ - совпадение с концом текста, ставится в конце поисковой строки


// Начало
let str = "Заработаю 13 миллионов долларов"
let regexp = /^заработаю/i 

// Ищет только в самом начале строки
console.log(str.match(regexp)) // Array [ "Заработаю" ]



// Конец
let str = "Заработаю 13 миллионов долларов"
let regexp = /долларов$/i 

// Ищет только в самом конце строки
console.log(str.match(regexp)) // Array [ "долларов" ]




// Проверка на точное совпадение
let str1 = "09:41"
let str2 = "9:41"

// вначале строки две цифры разделенные : и две цифры вконце
let regexp = /^\d{2}:\d{2}$/

console.log(regexp.test(str1)) // true - всё верно
console.log(regexp.test(str2)) // false