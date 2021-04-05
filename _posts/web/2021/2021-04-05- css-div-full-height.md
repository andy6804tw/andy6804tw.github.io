---
layout: post
title: '網頁 css div 100% height 佔全滿螢幕'
categories: 'Web'
description: How to make a div 100% height of the browser window
keywords: 
---

## 前言
想將網頁的某個 `<div></div>` 填滿整個螢幕大小可以透過三種方式實現。

## 方法一
第一種是先設定 `body` 與 `html` 高度 100%，之後的 child 區域就會繼承。此時子區域高度在設定 `100%` 即可。

#### css
```css
html,
body {
    height: 100%;
    padding: 0;
    margin: 0;
}

.left {
    height: 100vh;
    width: 50%;
    background-color: rgb(91, 91, 255);
    float: left;
}

.right {
    height: 100vh;
    width: 50%;
    background-color: rgb(248, 85, 85);
    float: right;
}
```

#### html
```html
<div class="left"></div>
<div class="right"></div>
```

- [Demo](https://1010code.github.io/css-div-full-height/demo1.html)
- [Code](https://github.com/1010code/css-div-full-height/blob/main/demo1.html)

## 方法二
`1 vh` 大約是佔版面的 `1%`，因此假設如果要填滿整個畫面就可以直接設定 `100 vh`。

![](/images/posts/web/2021/img1100405-1.jpeg)

[參考](https://stackoverflow.com/questions/1575141/how-to-make-a-div-100-height-of-the-browser-window)

#### css
```css
html,
body {
    padding: 0;
    margin: 0;
}

.left {
    height: 100vh;
    width: 50%;
    background-color: rgb(91, 91, 255);
    float: left;
}

.right {
    height: 100vh;
    width: 50%;
    background-color: rgb(248, 85, 85);
    float: right;
}
```

#### html
```html
<div class="left"></div>
<div class="right"></div>
```

- [Demo](https://1010code.github.io/css-div-full-height/demo2.html)
- [Code](https://github.com/1010code/css-div-full-height/blob/main/demo2.html)

## 方法三
第三種方法是透過 css 的 `position: absolute;` 來固定位置。因為 `absolute` 是有絕對位置的意思，因此可以很快速的指定區塊在螢幕中的方位與大小。

#### css
```css
html,
body {
    padding: 0;
    margin: 0;
}

.left {
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: rgb(91, 91, 255);
    top: 0;
    left: 0;
}

.right {
    position: absolute;
    width: 50%;
    height: 100%;
    background-color: rgb(248, 85, 85);
    top: 0;
    left: 50%;
}
```

#### html
```html
<div class="left"></div>
<div class="right"></div>
```

- [Demo](https://1010code.github.io/css-div-full-height/demo3.html)
- [Code](https://github.com/1010code/css-div-full-height/blob/main/demo3.html)