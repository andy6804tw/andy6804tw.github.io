---
layout: post
title: '[CSS學習筆記] CSS幾個常用的屬性'
categories: 'CSS'
description: 'CSS幾個常用的屬性'
keywords: CSS
---

## 常見的 CSS 屬性
其實前端開發中常用的 HTML、CSS 只有固定幾種，其餘比較特別例外的都可以上網查詢，在這邊整理出一些比較基礎的 CSS 屬性。

- display
- position
- float & clear
- box-model
- background
- text
- font

## 大屬性

### display

display 就是元素顯示的特性

- display
  - block (佔據一整行)
  - inline (字體有多長就多長)
  - none (隱藏)
  - flex (適應不同螢幕尺寸)

<p data-height="265" data-theme-id="dark" data-slug-hash="aEdeBG" data-default-tab="html,result" data-user="andy6804tw" data-embed-version="2" data-pen-title="toggleClass" class="codepen">See the Pen <a href="https://codepen.io/andy6804tw/pen/aEdeBG/">toggleClass</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

### position

position 主要來調整位置，在不同狀況下可以調整任何的屬性到你指定的位置，主要分為以下幾種，預設為 static。

- static (由上而下，由左至右)
- relative (相對位置)
- absolute  (絕對位置)
- fixed (固定位置)
  - top / right / bottom / left


### float & clear

為文繞圖效果，大多數拿來使用排版

- float
  - left
  - right
- clear
  - left
  - right
  - both

<p data-height="265" data-theme-id="0" data-slug-hash="ypePeL" data-default-tab="html" data-user="andy6804tw" data-embed-version="2" data-pen-title="3 columns" class="codepen">See the Pen <a href="https://codepen.io/andy6804tw/pen/ypePeL/">3 columns</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## 小屬性

### box model
為 CSS 屬性總稱，主要分為下列幾個，記住 `display: block` 才能控制 margin。

- margin (跟其他標籤的距離)
- border (框線)
- padding (留白部分)
- wifth / height (寬高)

<img src="/images/posts/web/img1061219-1.png">

### background

background 分為背景顏色和圖片

- background-color
- background-image
- background (簡寫：上面兩個共同使用)

```css
.example{
  background: #eee;
}
```

### text

設定段落，例如像是置左中右。

- text-align
  - left / right / center
- line-height (行高)

```css
.example{
  text-align: center;
  line-height: 3;
}
```

### font

比段落 (text) 更小的就是文字 (font)，可以控制像是字體大小、字體粗細、顏色、字型。

- font-size (字體大小)
- font-weight (字體粗細)
- color (字體顏色)
- font-family (字型)

```css
.example{
  font-size: 20px;
  font-weight: blod;
  color: blue;
  font-family: serif;
}
```

## 其他屬性

- overflow (處理多餘內容)
  - auto / hidden (滾動或隱藏)
- list-style-type (控制 ul/li)
  - disc / circle / none 
- text-decoration (底線或刪除線)
  - underline / line-through

