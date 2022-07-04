---
layout: post
title: 'JavaScript 批次修改 DOM 所有元素的 style'
categories: 'Web'
description: 'Change a style of all Elements with specific Class using JS'
keywords: frontend
---

## 前言
如果想將下面 HTML 元素透過 js 將所有符合 class 名稱等於 `element` 的元素，統一地修改每個的背景和文字顏色該如何實現？

```html
<div class="element">element 1</div>
<div class="element">element 2</div>
<div class="element">element 2</div>
```


## 方法一
使用 `querySelectorAll()` 選擇器搜尋(class 是 `.`  id 是 `#`)並取得所有符合條件的元素，此時將會回原一個陣列，以上面這個例子將會回原長度等於 3 的 NodeList 陣列。接著使用 `forEach()` 依序的對陣列元素取值並執行修改內容。例如對此元素修改 css 樣式(背景顏色、文字顏色)。


```js
const elements = document.querySelectorAll('.element');

elements.forEach(element => {
  element.style.backgroundColor = 'purple';
  element.style.color = 'yellow';
});
```

> The querySelectorAll method returns a NodeList containing the elements that match the selector.

## 方法二
我們也可以使用 `getElementsByClassName()` 方法直接給予 class 名稱取得所有符合條件的元素，回傳的結果是一個 HTMLCollection 物件。接著我們將此物件轉換成 array 型態，這樣才能使用 forEach 方法走訪每個元素並控制修改樣式。

```js
const elements = Array.from(
  document.getElementsByClassName('element')
);

elements.forEach(element => {
  element.style.backgroundColor = 'purple';
  element.style.color = 'yellow';
});
```

![](/images/posts/web/2022/img1110704-1.png)