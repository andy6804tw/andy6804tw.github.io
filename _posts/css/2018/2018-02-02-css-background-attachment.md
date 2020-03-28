---
layout: post
title: '[CSS學習筆記] parallax視差捲動效果'
categories: 'CSS'
description: 
keywords: 
---

## 前言
今天要來介紹一個 CSS 樣式它能夠將圖片背景固定且能做出頁面滾動式差的效果，而我們所使用的語法也很簡單只要一行就能呈現，就是 `background-attachment` 簡單來說它是一個背景固定模式的屬性，裡面有多種參數對應像是 scroll、fixed、local，可利用視覺差的效果擺脫傳統圖片的特性。


## 實作
整個程式的關鍵在於 `background-attachment: fixed` 他背景是固定的而上下滾動時會有一個視覺差的效果。


- HTML

```html
<div id="box1">
  <h1>Helllo World!</h1>
</div>
<div id="box2">
  <h1>Helllo World!</h1>
</div>
<div id="box3">
  <h1>Helllo World!</h1>
</div>
```

- CSS

```css
body{
  margin: 0;
  padding: 0;
}
#box1{
  height: 80vh;
  width: 100%;
  background-image: url(https://i.ytimg.com/vi/mm_M7TE2qJ0/maxresdefault.jpg);
  background-size: cover;
  display: table;
  background-attachment: fixed;
}
#box2{
  height: 80vh;
  width: 100%;
  background-image: url(http://farm7.static.flickr.com/6135/5936831942_cbd5f9ce0e_b.jpg);
  background-size: cover;
  display: table;
  background-attachment: fixed;
}
#box3{
  height: 80vh;
  width: 100%;
  background-image: url(https://i.ytimg.com/vi/bfxy8j9Y6nY/maxresdefault.jpg);
  background-size: cover;
  display: table;
  background-attachment: fixed;
}
h1{
  font-family: arial black;
  color: #fff;
  font-size: 50px;
  margin: 0;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}

```

## Demo


<p data-height="265" data-theme-id="0" data-slug-hash="eVpxLE" data-default-tab="result" data-user="andy6804tw" data-embed-version="2" data-pen-title="eVpxLE" class="codepen">See the Pen <a href="https://codepen.io/andy6804tw/pen/eVpxLE/">eVpxLE</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
