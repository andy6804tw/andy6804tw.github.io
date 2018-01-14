---
layout: post
title: '[CSS學習筆記] Bootstrap4 Carousel(幻燈片)元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Carousel 意思是旋轉木馬，在 Bootstrap 是 幻燈片的意思，每張幻燈片都有一張圖片和說明文字，在元件裡面我們可以添加一些控制元素來控制幻燈片的播放

## 基本使用
可以添加一個 `carousel` 容器，他可以包裝整個幻燈片組建所需要的東西，內容可以放在一個 `carousel-inner` 
容器裡並容納很多個項目 `carousel-item`，在每個項目裡可以放置圖片與資訊，圖片可以使用 `d-block` 代表 display:block 為佔據一行，與寬度100 `w-100`，最後我們要讓幻燈片動起來可以使用 `data-ride` 預設是五秒變換一次，若需要有滑動效果可以在最外面加個 `slide`。

```html
<div class="container">
   <div class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_412_8.jpg" alt="">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="http://farm4.staticflickr.com/3795/9269794168_3ac58fc15c_b.jpg" alt="">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_3266_19.jpg" alt="">
        </div>
      </div>
    </div>
</div>
```

<img src="/images/posts/css/2018/img1070114-1.png">

## 有按鈕的幻燈片
其中在 `carousel slide` 加個 id 為 `carousel-demo` 之後底下加個目前位置標記利用 `ol、li` 標籤來實作，記住每個的 id 都要與 `carousel slide` 一樣，我們也可以在 `carousel-inner` 添加左右按鈕利用 `a` 標籤來實作。

```html
<div class="container">
   <div class="carousel slide" data-ride="carousel" id="carousel-demo">
        <ol class="carousel-indicators">
          <li data-target="#carousel-demo" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-demo" data-slide-to="1"></li>
          <li data-target="#carousel-demo" data-slide-to="2"></li>
        </ol>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" src="https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_412_8.jpg" alt="">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="http://farm4.staticflickr.com/3795/9269794168_3ac58fc15c_b.jpg" alt="">
        </div>
        <div class="carousel-item">
          <img class="d-block w-100" src="https://www.taiwan.net.tw/att/1/big_scenic_spots/pic_3266_19.jpg" alt="">
        </div>
      
        <a href="#carousel-demo" class="carousel-control-prev" data-slide="prev">
        <span class="carousel-control-prev-icon"></span>
        </a>
        <a href="#carousel-demo" class="carousel-control-next" data-slide="next">
          <span class="carousel-control-next-icon"></span>
        </a>
      </div>
    </div>
</div>
```

<img src="/images/posts/css/2018/img1070114-2.png">
<img src="/images/posts/css/2018/img1070114-3.gif">

## 幻燈片自適應
我們可以手動利用 css 來修改幻燈片的大小，如下：

```css
.carousel .carousel-item {
  height: 300px;
}

.carousel .carousel-item img {
  min-height: 300px;
  max-height: 400px;
  object-fit: cover;
}
```

<img src="/images/posts/css/2018/img1070114-4.gif">

## 使用控制幻燈片切換間隔

##### 1. data-interval
第一種方法是使用 `data-interval` 單位為毫秒，所以 1000 豪秒一秒，此方法原本的 `data-ride="carousel"` 就可以不使用。

```html
 <div class="carousel slide" data-interval="1000" id="carousel-demo">
 ...略
 ```
##### 2. JavaScript控制
第二種方法是利用 JavaScript 搭配 jquery 來控制幻燈片切換的間隔。除了可以使用 `data-ride` 來自動切換幻燈片還可以利用 JavaScript 來控制。

```js
$(document).ready(() => {
  $('.carousel').carousel({
     interval: 1000
  })
})
```

參考：https://v4-alpha.getbootstrap.com/components/carousel/

