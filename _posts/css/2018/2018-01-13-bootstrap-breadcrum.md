---
layout: post
title: '[CSS學習筆記] Bootstrap4 Breadcrumb(導覽路徑)元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Breadcrumb(譯：麵包屑)，字面上翻可能會不知道他是做什麼的，簡單來說它可以幫使用者在瀏覽網站時，不容易迷失方向，也可以很迅速地知道自己目前所在位置，同時也可以根據目前位置知道現在在網站中哪個地方有點類似一直線的樹狀結構的概念。

## Breadcrumb兩種撰寫方式

**1.列表方式**

使用 `<ol><li>` 列表標籤方式下去實作，最外層 ol 的 class 為 `breadcrumb`，li 的 class 為 `breadcrumb-item`，若為當前位置則在最後面加上 `active`。

```html
<div class="container">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#">首頁</a></li>
      <li class="breadcrumb-item"><a href="#">CSS系列</a></li>
      <li class="breadcrumb-item active">Bootstrap教學</li>
    </ol>
</div>
```
<img src="/images/posts/css/2018/img1070113-3.png">

**2.導覽列方式**

使用 `<nav>` class 並使用 `breadcrumb` ，標籤 `<a>` 的 class 並使用 `breadcrumb-item` 表示項次。

```html
<div class="container">
    <nav class="breadcrumb">
      <a class="breadcrumb-item" href="#">首頁</a>
      <a class="breadcrumb-item" href="#">CSS系列</a>
      <a class="breadcrumb-item" href="#">Bootstrap教學</a>
    </nav>
</div>
```

<img src="/images/posts/css/2018/img1070113-4.png">

## 修改 content 樣式
breadcrumb 預設是以 `/` 做區隔，開啟開發者模式假茶元素可以發現是被包在 `::before`，所以我們可以利用它來修改內文樣式。

<img src="/images/posts/css/2018/img1070113-5.png" width="450">

```html
<div class="container">
    <nav class="breadcrumb">
      <a class="breadcrumb-item" href="#">首頁</a>
      <a class="breadcrumb-item" href="#">CSS系列</a>
      <a class="breadcrumb-item" href="#">Bootstrap教學</a>
    </nav>
</div>
```

```css
.breadcrumb-item + .breadcrumb-item::before {
    content: "#";
}
```

<img src="/images/posts/css/2018/img1070113-6.png">

參考：https://v4-alpha.getbootstrap.com/components/breadcrumb/
