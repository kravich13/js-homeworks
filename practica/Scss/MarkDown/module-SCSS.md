# SASS модули

Существует директива `@import` позволяет подключать сторонние пакеты и разделять стили на поддерживаемые элементы, но у неё всё же есть несколько ограничений: 

* `@import` так же есть и в `CSS` и какие либо различия в их поведении могут сбивать с толку.
* Если делать `@import` несколько раз для одного файла, это может замедлить компиляцию, вызвать конфликты переопределения и на выходе получится дублированный код.
* Всё находится в глобальной области видимости, включая сторонние пакеты.
* При использовании функции, например, `color`, невозможно точно узнать, где она определена. Какой `@import` подключил её?

***

## Импортирование файфлов с помощью @use

```scss
@use "buttons";
```

Новый `@use` похож на `@import`, но у него есть некоторые заметные отличия: 

* Файл импортируется единожды, неважно сколько раз используется `@use` в проекте.
* Переменные, миксины и функции начинающиеся с подчёркивания `_` или дефиса `-`, считаются приватными и не импортируются.
* Переменные, функции и т.д. из подключённых через `@use` файла доступны только локально и не передаются последующему импорту.
* Аналогично, `@extends` будет применяться только вверх по цепочке; т.е. расширение применяется только к стилям, которые импортируются, а не к стилям, которые импортируют.
* Все импортированные переменные, функции и т.д. по умолчанию имеют своё пространство имён.

При подключении файла через `@use`, `SASS` автоматически генерирует пространство имён на основе имени файла. 

```scss
@use "buttons"; // создаёт пространство имён "buttons"
@use "forms" // создаёт пространство имён "forms"
```

Теперь есть доступ к коду как файла `buttons.scss`, так и файла `forms.scss`, но этот доступ не передаётся между импортами: `forms.scss` по прежнему не имеет доступа к переменным, определенным в `buttons.scss`. Поскольку импортированные сущности имеют пространство имён, нужно использовать новый синсаксист с раздетилетем точкой для доступа к ним:

```scss
// переменные: <namespace>.$variable
$btn-color: buttons.$color;
$form-border: forms.$input-border;

// функции: <namespace>.function()
$btn-background: buttons.background();
$form-border: forms.border();

// миксины: @include <namespace>.mixin()
@include buttons.submit();
@include forms.input();
```

Можно изменить или удалить пронстранство имён по умолчанию, добавив к импорту `as <name>`.

```scss
@use "buttons" as *; // звёздочка удаляет любое пронстранство имён
@use "forms" as "f"; 

$btn-color: $color; // buttons.$color без пространства имён|
$form-border: f.$input-border; // forms.$input-border пользовательским пространством имен
```

Использование `as *` добавляет модуль в корневое пространство имён, по этому префикс не нужен, но его переменные по прежнему локально ограничены текущим документом.
***

## Импорт встроенных в SASS модулей

Внутренние возможности в SASS так же были перемещены в модульную систему, по этому мы имеем полный констроль над глобальным прространством имён. Существует несколько встроенных модулей - `math, color, string, list, map, selector, meta` - которые должны быть импортированы в файл явно перед использованием.

```scss
@use "sass: math";

$half: math.percentage(1/2);
```

Встроенные модули так же могут быть импортированы в глобальное пронстранство: 

```scss
@use "sass:math" as *;

$half: percentage(1/2);
```

Встроенные функции, которые уже имеют префиксные имена, так же как `map-get` или `str-index`, могут использовать без дублирования этого префикса: 

```scss
@use "sass: map";
@use "sass: string";

$map-get: map.get(("key" : "value"), "key");
$str-index: string.index("string", "i");
```
***

## Новые и измененные основные функции

В качестве дополнительного преимущества это означает, что `SASS` может безопасно добавлять новые внутренние миксины и функции, не вызывая конфликтов имён.

```scss
@use "sass-meta";
$theme-name: "dark";

[data-theme="#{$theme-name}"] {
    @include meta.load-css($theme-name);
}
```

Первый аргумент - это URL модуля (как и в `@use`), но он может быть изменён динамически с помощью записи как в JavaScript: `строка: ${переменная}`. Второй (необязательный) аргумент принимает структуру `map` с конфигурацией:

```scss
@include meta.load-css {
    "theme/dark/,
    $with: ("base-color": red)
};
```

Аргумент `$with` позволяет сконфигурировать с помощью структуры `map` любую переменную в загруженном модуле, при этом переменная должна удовлетворять следующим условиям:

* Не является приватной переменной, которая начинается с `_` или `-`;
* Помечена директивой `!default`.

```scss
$base-color: black !default; // доступна для конфигурации
$_private: true !default; // недоступна в силу приватности, знак _
$config: false; // недоступна, т.к. не помечена !default
```

Есть ещё пара новых функций из модуля `sass:meta: module-variables()` и `module-functions()`. Каждая из них возвращает структуру `map` из имён и значений из уже импортированного модуля. Они принимают один аргумент, соответствующий пространству имён модуля: 

```scss
@use "forms";

$form-vars: module-variables("forms");
// (
    // button-color: red,
    // input-border: thin,
// )

$form-functions: module-functions('forms');
// (
//    background: get-function('background'),
//    border: get-function('border'),
// )
```

Несколько других функций из `sass:meta — global-variable-exists()`, `function-exists()`, `mixin-exists()`, и `get-function()` — получат дополнительные аргументы `$module`, которые позволят явно проверять каждое пространство имен.
***

## Настройка и масштабирование цветов

У модуля `sass: color` так же есть несколько интересных оговорок по поводу решения некоторых старых проблем. Многие из таких устаревших функций, как `lighten()` или `abjust-hue()` больше не рекомендуются к использованию в пользу явных функций `color.adjust()` и `color.scale()`:

```scss
// ранее lighten(red, 20%)
$light-red: color.adjust(red, $lightness: 20%);

// ранее adjust-hue(red, 180deg) 
$complement: color.adjust(red, $hue: 180deg);
```

Оригинальные функции были основаны на `adjust()`, которая использует линейную математику: добавление 20% к текущей светлоте цвета red в нашем примере выше. В большинстве случаев, мы хотим изменять `(scale())` цвет на определенный процент относительно текущего значения:

```scss
// теперь прибавляем к светлоте не просто число 20, а число 0.2, умноженное на текущую светлоту

$light-red: color.scale(red, $lightess: 20%);
```