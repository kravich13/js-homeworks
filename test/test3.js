// 1) Сделать цикл с prompt, который прерывается по нажатию OK и продолжается по нажатию Отмена

for (var i = 0; i < 999; i++) {
    i = prompt ("нажми на отмену и цикл продолжится")    
    if (i == null) {    // при нажатии на отмену сработает continue 
        continue
    }
    else {
        break
    }
}

// 2) Сделать бесконечный цикл, который прерывается с помощью конструкции break, когда Math.random() > 0.9. Подсчитать количество итераций и вывести это число с помощью alert

function number () {
    var quantity = 0
    for (var i = 0; i < Infinity; i++) { // делаем цикл
        i = Math.random() * (1 - 0) + 0     // в цикл пишем random
        console.log(i)
        quantity++
        if (i > 0.9) {  // если рандом больше, чем 0.9 - прерываем цикл
            console.log(`Произведено ${quantity} операций`)
            break
        }
    }
    return quantity
}
number ()

// 3) Сделать цикл с prompt, который прерывается по нажатию OK и продолжается по нажатию Отмена и вывести пустое тело

for (var i = 0; i < 999; i++) {
    i = prompt ("нажми на отмену и цикл продолжится")    
    if (i == null) {    // при нажатии на отмену сработает continue 
        continue
    }
    else {
        while (prompt ("Break?") == null) {
        }
    }
}


// 4) Подсчитать сумму арифметической прогрессии от 1 до N используя цикл for.

function theAmount (input, lenght, index) { // функцию с тремя параметрами: входное число, длинна, шаг прогрессии
    var sum = 0 // создаём переменную сумму, в которую будем записывать сумму складывания чисел в цикле
    var nextNumber = input  // создаём переменную следующее число, в которую сохраняем входное число
    for (var i = 0; i < lenght; i++) {  // делаем цикл с длинной шага 
        console.log(nextNumber) // выводим в консоль следующее число (в цикле)
        sum = nextNumber + sum  // в сумму присваиваем следующее число + предыдущее
        nextNumber = nextNumber + index // в следующее число присваиваем следующее число + шаг прогрессии
    }
    console.log(sum)    // выводми в консоль сумму прогрессии
    return sum  // возвращаем сумму
}
theAmount (1,10,2)  // сумма 100


// 6) Сформировать строку " # # # # # " с помощью цикла for

var lattice = " "
for (var i = 0; i < 5; i++) {
    lattice += "# "
}
console.log(lattice)


// 7) Сформировать строку "34567890" с помощью цикла for

var number = "" // переменная с пустой строкой
for (var i = 3; i <= 10; i++) { // цикл от 3 до 10
    number = number + (i % 10)  // в переменную присваиваем i % 10 и получаем 0
}
console.log(number)

// разряды / остаток от деления

console.log(123456 % 1000) // остаток 456
console.log(123456 % 100) // остаток 56
console.log(123456 % 10) // остаток 6

10 % 5 // остаток 0
12 % 5 // остаток 2
17 % 5 // остаток 2



// 8) Сформировать строку c помощью вложенных циклов. Для перевода строки используйте \n. 

var number = ""
var number1 
for (var i = 0; i < 10; i++) {
    number = number + i
    for (var j = 0; j < 10; j++) {
    number1 = number 
    }
}
console.log(number)
console.log(number1)

