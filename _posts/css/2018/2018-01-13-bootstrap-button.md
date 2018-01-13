---
layout: post
title: '[CSS學習筆記] Bootstrap4 Button(按鈕)元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Button 就是按鈕在 Bootstrap 中直接使用 `<Button>` 標籤或是 `<input>` 以及 `<a>`，使用的時機是當你按鈕按下去是執行一個動作的就使用 `<Button>` 標籤，而點擊下去是會跳轉頁面到另一個地方的就使用 `<a>` 標籤。


## 按鈕樣式
在 Bootstrap 的顏色樣式都固定有那些，依據你的動作來使用相對應的標籤形式。

- primary
- secondary
- success
- info
- warning
- danger


```html
<div class="container">
    <button class="btn btn-danger">Button</button>
    <a class="btn btn-success" href="#">Button</a>
    <input class="btn btn-primary" type="button" value="Button">
</div>
```

<img src="/images/posts/css/2018/img1070113-7.png">

## 按鈕加邊框
在 class 名稱加上 `btn-outline-xxx` 即可將按鈕改成邊框樣式。

```html
<div class="container">
    <button class="btn btn-outline-danger">Button</button>
    <a class="btn btn-outline-success">Button</a>
</div>
```

<img src="/images/posts/css/2018/img1070113-8.png">

## 按鈕大小
你可以設定你的按鈕大小只要在 class 加上 `btn-lg` 或 `btn-sm` 即可。

```html
<div class="container">
    <button class="btn btn-outline-danger btn-lg">Button</button>
    <a class="btn btn-outline-success btn-sm">Button</a>
</div>
```

<img src="/images/posts/css/2018/img1070113-9.png">

如果想將按鈕與佔整個版面可以使用 `btn-block` 來填滿整個畫面(獨立佔據一行)。

```html
<div class="container">
    <a class="btn btn-warning btn-sm btn-block">Button</a>
</div>
```

<img src="/images/posts/css/2018/img1070113-10.png">

## Disabled按鈕禁用
你可以使用 `disabled` 來將按鈕禁用讓使用者無法點擊按鈕，樣式會呈現變淡，此外你可以自行套用 css style 將按鈕加個禁止點擊的游標。

```html
<div class="container">
    <button class="btn btn-warning  disabled">Button</button>
</div>
```

```css
.btn.disabled, .btn:disabled {
    cursor: not-allowed;
}
```

<img src="/images/posts/css/2018/img1070113-11.png">

## 按鈕群組
使用 `btn-group` 能將按鈕定為群組，若要垂直則改為 `btn-group-vertical` 即可。

```html
<div class="container">
     <div class="btn-group">
      <button class="btn btn-info">1</button>
      <button class="btn btn-info">2</button>
      <button class="btn btn-info">3</button>
    </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-12.png">

參考：https://v4-alpha.getbootstrap.com/components/buttons/
