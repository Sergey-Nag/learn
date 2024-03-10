### Основы CSS

CSS (Cascading Style Sheets) используется для оформления веб-страниц. Это язык, который определяет стиль элементов HTML, включая цвет, размер шрифта, расположение и многое другое.

### Принципы Работы CSS:

1. **Каскадирование**: Стили применяются в порядке приоритета. Если один и тот же элемент наделен несколькими стилями, применяется наиболее специфический или последний объявленный стиль. 
CSS:
```css
/* Общий стиль для всех абзацев */
p {
    color: blue;
}

/* Специфический стиль для абзацев с классом 'highlight' */
.highlight {
    color: red;
}

/* Более специфический стиль для абзацев имеющих оба класса: 'highlight' и 'yellow' */
.highlight.yellow {
    color: yellow;
}

/* Последний объявленный стиль для абзацев с классом 'highlight' */
.highlight {
    color: green;
}
```
```html
<p>Синий текст</p>
<p class="highlight">Зеленый текст</p>
<p>Синий текст</p>
<p class="yellow">Синий текст</p>
<p class="highlight yellow">Желтый текст</p>
<p>Синий текст</p>
<p class="highlight">Зеленый текст</p>
<p>Синий текст</p>
```
> В этом примере все абзацы (`<p>`) сначала получают синий цвет текста. Но абзацы с классом `.highlight` в итоге будут зелёными, потому что этот стиль объявлен последним и переопределяет предыдущие. Абзац с классом `.highlight.yellow` будет с желтым текстом несмотря на то что он объявлен до зеленого, так как селектор более спецефичен.
Класс `.yellow` по отдельности от `.highlight` никакой роли не играет.

2. **Селекторы**: CSS работает через селекторы, которые идентифицируют HTML-элементы для стилизации. Существуют разные типы селекторов: теги, классы, идентификаторы, псевдоклассы и др.

```css
/* Стиль для элементов тега <h1> */
h1 {
    font-size: 24px;
}

/* Стиль для элементов с классом 'main-text' */
.main-text {
    color: navy;
}

/* Стиль для элемента с идентификатором 'unique-element' */
#unique-element {
    background-color: lightgrey;
}

/* Псевдокласс :hover для ссылок */
a:hover {
    color: red;
}
```
> Здесь используются различные типы селекторов: селектор по тегу (`h1`), классу (`.main-text`), идентификатору (`#unique-element`), и псевдоклассу (`:hover` на ссылках).

3. **Наследование**: Некоторые стили наследуются дочерними элементами от родителей, например, цвет шрифта и шрифт.

```css
/* Стиль для элемента <div> */
div {
    font-family: Arial, sans-serif;
}

/* Все дочерние элементы в <div> наследуют шрифт Arial */
```
```html
<div>
    <p>Этот абзац наследует шрифт Arial от div.</p>
    <h1>Этот заголовок также наследует шрифт Arial.</h1>
    <ul>
        <li>Элемент списка наследует шрифт Arial.</li>
    </ul>
    <span>Этот span также наследует шрифт Arial.</span>
</div>
```
> В этом примере все текстовые элементы, которые являются дочерними элементами `<div>`, будут автоматически использовать шрифт Arial, так как он наследуется от их родительского `<div>` элемента.

Наследование можно проверить в девтулзах:
![Наследлвание](/assets//inheritence.png)

### Назначение Классов:

1. **Именование**: Имена классов должны быть понятными и отражать функцию или содержание элемента. Лучше использовать методологии, такие как BEM (Block, Element, Modifier), для систематизации имен классов. `.block__element--modifier` [Подробнее](https://ru.bem.info/methodology/quick-start/#%D0%B2%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5)
```css
/* Блок: Карточка продукта */
.product-card {
    border: 1px solid #ddd;
    padding: 20px;
}

/* Элемент: изображение продукта в карточке */
.product-card__image {
    width: 100%;
    height: auto;
}

/* Модификатор: карточка продукта на акции */
.product-card--on-sale {
    border-color: red;
}

/* Модификатор элемента: замещающая картинка в случае отсутствия фото в карточке */
.product-card__image--no-photo {
    background: url('/url/no-photo-placeholder.png');
}

/* Элемент: название продукта в карточке */
.product-card__title {
    font-size: 1.2em;
    color: #333;
}

/* Элемент: описание продукта в карточке */
.product-card__description {
    font-size: 1em;
    color: #666;
}
```

2. **Применение**: Классы могут применяться к любому количеству элементов на странице и повторно использоваться, что делает CSS эффективным для стилизации.
```html
<body>
    <header class="main-header">
        <h1 class="main-header__title">Добро пожаловать на наш сайт</h1>
    </header>

    <section class="content">
        <p class="text-highlight">Этот абзац будет выделен благодаря классу 'text-highlight'.</p>
        <p class="text-highlight">И этот абзац также будет выделен таким же образом.</p>
        <p>Этот абзац останется без выделения.</p>
    </section>

    <footer class="main-footer">
        <p class="text-highlight">Даже в подвале сайта мы можем использовать класс 'text-highlight'.</p>
    </footer>
</body>
```

3. **Комбинация**: Элементы могут иметь несколько классов, что позволяет комбинировать различные стили.
```html
<body>
    <div class="container center-text">
        <p class="text-highlight large-text">Этот абзац использует два класса: 'text-highlight' и 'large-text'.</p>
        <p class="text-highlight">Этот абзац использует только класс 'text-highlight'.</p>
        <p class="large-text">Этот абзац использует только класс 'large-text'.</p>
    </div>
</body>
```

### Примеры и Практики:

1. **Конкретность**: Избегайте чрезмерно общих имен классов, которые могут вызвать конфликты или путаницу.

2. **Согласованность**: Поддерживайте единообразие в именовании классов на всем сайте.

3. **Комментарии**: Используйте комментарии в CSS для объяснения назначения сложных или неочевидных стилей. Но не стоит злоупотреблять ими, названия классов все еще должны описывать то для чего нужны.

### Пример Стилизации:

```css
/* Класс для основного заголовка */
.main-header {
    color: navy;
    font-size: 24px;
}

/* Класс для акцентного текста */
.accent-text {
    color: red;
    font-weight: bold;
}

/* Пример использования BEM для кнопки */
.button {
    background-color: blue;
    color: white;
}

.button--large {
    padding: 10px 20px;
}
```

В этом примере используются различные классы для стилизации элементов, показывая, как классы могут быть использованы для обозначения различных типов элементов и их состояний.