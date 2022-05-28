---
layout: post
title: 'CSS 偽元素替換文字'
categories: 'CSS'
description: 'CSS pseudo element'
keywords: CSS
---

##  前言
今天要介紹 `::before` 和 `::after` 這兩個 pseudo-element 來對標籤內的文字進行內容修改。`::before` 是在原本的元素`之前`建立一個新的元素， `::after` 則是在原本的元素`之後`建立一個新的元素。在實作過程中若不想透過 JavaScript 更改元素內的文字或 icon 時，可以考慮使用 CSS 提供的 `content` 屬性進行修改內容。以下就提供兩種技巧搭配網頁 hover 互動效果，即時更改標籤內的文字。

## 方法一
第一種方法是先將原本標籤內的文字大小設定 0，接著透過 `::after` 偽元素在原本的元素`之後`建立一個新的內容。同時將字型大小設回原本大小，以及透過 `content` 屬性進行修改內容。

HTML:
```html
<div class="element">[測試一] 滑鼠移動至此查看效果</div>
```

CSS:
```css
.element:hover{
    font-size: 0;
}
.element:hover::after{
    font-size: 18px;
    content: 'Hello world!';
}
```

![](https://i.imgur.com/g5IwbE9.gif)

## 方法二
另一種方法是透過 `text-indent` 屬性將原本的元素內容文字首行縮排，填上一個負很大的數字代表將此內容向左移到視窗外。接著透過 `::after` 偽元素建立新的內容，同時將內容拉回來原本位置。` display: block` 的目的是為了讓新的元素顯示出來。直得注意的是原先 `line-height: 0` 之後為了顯示需要改成 initial。不過缺點是會有高低不對齊問題，也可以試著改成 1.4。


HTML:
```html
<div class="element2">[測試二] 滑鼠移動至此查看效果</div>
```

CSS:
```css
.element2:hover{
    text-indent: -9999px;
    line-height: 0;
}
.element2:hover::after{
    content: 'Hello world!';
    text-indent: 0;
    display: block;
    line-height: initial;
}
```

![](https://i.imgur.com/JXQ5b5t.gif)

> 除了 `text-indent` 之外，也可以透過文字顏色 color 實作相同結果。

## 番外篇
我們也可以透過偽元素 content 搭配 Font Awesome 為元素添加 icon。以下示範採用 Font Awesome 5。記得要更改 `font-family` 字型以及 `font-weight` 字體才能使用 content icon 功能。

HTML:
```html
<div class="element4">[番外篇] 滑鼠移動至此查看效果添加 Font Awesome icon</div>
```

CSS:
```css
.element4:hover{
    font-size: 0;
}
.element4:hover::after{
    font-size: 18px;
    font-family: 'Font Awesome 5 Free';
    content: "\f00c";
    font-weight: 900;
}
```

範例程式碼： https://codepen.io/andy6804tw/pen/GRQymLz