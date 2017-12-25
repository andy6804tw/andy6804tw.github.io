---
layout: post
title: '[CSS學習筆記] 兩種修改元素位置'
categories: 'CSS'
description: '導覽列介紹'
keywords: CSS
---

## 修改元素位置
在 posioion 屬性中有 relative 相對位置跟 static 差別在於 relative 是可以做上下左右移動的修改屬性有 top、left、right、bottom，以上都是跟 position 共用的，今天的例子是將圖片向上位移，但他只能將圖片位移相對位置而已下面依附的內容則原封不動，如下圖：

<img src="/images/posts/web/img1061221-2.png" width="400">

```css
.container img{
  position: relative;
  bottom: 80px;
}
```

你可以發現下面文字依然保持原地不會跟著向上移動，所以這邊有另一個方法就是使用 margin 使用負的能將圖片和底下元素一起向上移動。

<img src="/images/posts/web/img1061221-3.png" width="400">

```css
.container img{
  margin-top: -90px;
}
```

## 結構

- `<div class="card">` (卡片)
  - 文字置中
  - 周圍圓邊
- `<img>`
  - 圖片向上位移

## 程式碼

此範例就是一個卡片中有圖片、標題以及文字其中圖片要向上位移效果，這邊是使用 `margin-top: -90px` 將圖片往上連帶的下面文字也會跟著連帶往上移動。

<p data-height="265" data-theme-id="0" data-slug-hash="ZvOVYQ" data-default-tab="html,result" data-user="andy6804tw" data-embed-version="2" data-pen-title="CSS-positioning" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/andy6804tw/pen/ZvOVYQ/">CSS-positioning</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

範例程式碼：https://codepen.io/andy6804tw/pen/ZvOVYQ
