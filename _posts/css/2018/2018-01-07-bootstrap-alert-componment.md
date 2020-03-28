---
layout: post
title: '[CSS學習筆記] Bootstrap4 Alerts元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Alerts 元件可以用在訊息反饋會是資訊呈現的彈跳視窗，若想了解更多可以觀看[官方](https://getbootstrap.com/docs/4.0/components/alerts/)的說明文件，裡面有更詳細的解說。

## 事前準備
首先打開 codepen 載入 CSS 和 JavaScript 所會用到的函式庫，這邊是使用 Bootstrap [官方](https://getbootstrap.com/docs/4.0/getting-started/introduction/)所提供的引入檔。

### 引入 CSS
- https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css

<img src="/images/posts/css/2018/img1070107-3.png">

### 引入 JavaScript
- https://code.jquery.com/jquery-3.2.1.slim.min.js
- https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js
- https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.min.js

<img src="/images/posts/css/2018/img1070107-2.png">

## Alerts 元件
Alerts 元件是 Bootstrap 所建的一個標籤區塊，主要是能夠用顏色來顯示內部區塊訊息，打開 codepen 新增一個 `container` 的 div 標籤裡面放置一個 alert 的區塊，可以輸入簡寫 `div.alert.alert-primary[role=alert]` 並按下 tab 鍵即可自動補上完整程式碼。
此外在區塊內建立一個連結 `<a>` 標籤若想將連結顏色與背景區塊同色系的話直接在該標籤的類別名稱設定為 `class="alert-link"`。

```html
<div class="container">
  <div class="alert alert-primary" role="alert">
    hello world!<br>
    <a href="#" class="alert-link">see more</a>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070107-1.png">

### alert 關閉按鈕

- 使用alert內部按鈕關閉
Bootstrap 的 alert 元件中還添增了一個按鈕關閉的功能，類別名稱加入 `alert-dismissible` 且在底下加入一個 button 後可得到右上角關閉的動作，若要有淡出的特效可加入 `fade show` ，最後要顯示關閉圖示使用 `<bbutton>` 標籤並加入 `data-dismiss="alert"` 的屬性即可關閉，若要使用按鈕風格在列別名稱加上 `class="close"` 關閉按鈕即跑到右上角。

```html
<div class="container">
  <div class="alert alert-primary alert-dismissible fade show" role="alert">
    hello world!<br>
    <a href="#" class="alert-link">see more</a>
    <button class="close" data-dismiss="alert">&times;</button>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070107-4.gif">

- 利用外部按鈕關閉alert
此外關閉的方法不僅有一個也可以利用外部按鈕搭配 JavaScript 的 jquery 來執行關閉，此外 alert 關閉有個聽事件分別為 `close.bs.alert` 關閉中以及 `closed.bs.alert` 關閉後的監聽模式可以在這之中處理你想做的事情。


```html
<div class="container">
  <div class="alert alert-primary alert-dismissible fade show" role="alert">
    hello world!<br>
    <a href="#" class="alert-link">see more</a>
  </div>
  <button class="btn btn-danger close-alert">Close</button>
</div>
```

```js
$(document).ready(() => {

  $('.close-alert').click(() => {
    $('.alert').alert('close')
  })

  $('.alert').on('close.bs.alert', () => {
    console.log('close alert')
  })

  $('.alert').on('closed.bs.alert', () => {
    console.log('closed alert')
  })

})
```

<img src="/images/posts/css/2018/img1070107-5.gif">

### 實現開關來關閉或顯示 Alerts
若要使用外部按鈕來呈現關閉與展開，使用 JavaScript 來控制標籤的顯示和隱藏。

```html
<div class="container">
  <div class="alert alert-primary alert-dismissible fade show" role="alert">
    hello world!<br>
    <a href="#" class="alert-link">see more</a>
    <button class="close" data-dismiss="alert">&times;</button>
  </div>
  <button class="btn btn-danger close-alert">Close</button>
  <button class="btn btn-danger open-alert">Open</button>
</div>
```

```js
$('.close-alert').click(() => {
    $('.alert').removeClass('show')
  })
 
$('.open-alert').click(() => {
  $('.alert').addClass('show')
})
```

<img src="/images/posts/css/2018/img1070107-6.gif">
