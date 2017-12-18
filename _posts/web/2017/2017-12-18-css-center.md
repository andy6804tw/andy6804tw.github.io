---
layout: post
title: '[CSS學習筆記] 如何版面置中'
categories: 'Web'
description: '置中'
keywords: CSS
---

## 文字置中
一般文字置中使用 `text-align` 就好比你在 word 編輯文字有靠左靠右以及置中一樣。

|屬性|描述|
|---|----|
|left|向左對齊|
|right|向右對齊|
|center|置中|
|justify|使左右對齊本文|
|initial|預設值(靠左)|
|inherit|繼承父元素的 text-align 屬性|

```html
<div class="center">
   Lorem ipsum dolor sit amet.
</div>
```
```css
.center{
  text-align: center;
}
```

## 容器置中

在網頁設計上會用 `div` 當容器把裡面內容包起來，這邊要示範容器置中。

chrome右鍵檢查，可以發現右下腳有個框框有 margin、border、padding及長寬尺寸，這方形區域我們稱它 box model (區塊模型)，你可以發現 container 右邊有橘色的 margin，因為 div 預設 `display:block` ，block 就是暫居整行的元素，像盒子依樣裝滿，我們現在要處理置中，就是將橘色部分切半左右平分，使用 `margin:0 auto` 上下 0 左右自動平分。

<img src="/images/posts/web/img1061218-1.png">

- padding
  - 區塊留白地方、間隔
- border
  - 外框，可以畫框線將它圍起來
- margin
  - 與其他元素間的距離


```html
<div class="container">
  
  <h1>
  Lorem ipsum dolor sit amet.
  </h1>
  <p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio assumenda autem perspiciatis quasi dolorem ipsam temporibus quo neque ab! Labore officiis modi perspiciatis ducimus ipsam?
  </p>
  <img src="http://trickgs.com/blog/wp-content/uploads/2014/07/html_css.png" alt="image">
  
</div>

```

```css
.container{
  margin:0 auto;
  width: 600px;
}
```

<img src="/images/posts/web/img1061218-2.png">


[範例程式碼](https://codepen.io/andy6804tw/pen/eyJvZe)
