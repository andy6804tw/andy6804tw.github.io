---
layout: post
title: '[CSS學習筆記] 如何版面置中'
categories: 'CSS'
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

## 容器(水平)置中

在網頁設計上會用 `div` 當容器把裡面內容包起來，這邊要示範容器置中。

chrome右鍵檢查，可以發現右下腳有個框框有 margin、border、padding及長寬尺寸，這方形區域我們稱它 box model (區塊模型)，你可以發現 container 右邊有橘色的 margin，因為 div 預設 `display:block` ，block 就是暫居整行的元素，像盒子依樣裝滿，我們現在要處理置中，就是將橘色部分切半左右平分，使用 `margin:0 auto` 上下 0 左右自動平分。

<img src="/images/posts/css/2017/img1061218-1.png">

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

<img src="/images/posts/css/2017/img1061218-2.png">


[範例程式碼](https://codepen.io/andy6804tw/pen/eyJvZe)

## 容器(垂直+水平)置中

若今天想將標題內文放置一塊 div 標籤內的正中間也就是垂直水平置中，有兩種方法，首先 html 標籤都一樣，建立一個最外層容器 `<div class=flex>` 內文有 `<h1>` 和 `<p>` 標籤文字。

```html
<div class="flex">
  <div>
    <h1>content content</h1>
    <p>content content</p>
  </div>
</div>
```

##### 方法1.

CSS3 彈性盒子，又稱flexbox，是為了適應不同螢幕尺寸和顯示設備而生的佈局模式。針對許多應用而言，不用 floats 的彈性盒子模型會比塊狀模型（block model）易用，彈性容器的邊緣也不會與內容的邊緣重疊。

```css
.flex{
  display:flex;
  align-items:center;
  justify-content:center;
  width:600px;
  height:600px;
  background-color:#eee;
}
```

##### 方法2.
第二個方法是將內層標籤直接 `margin:auto` 自動平分區塊。

```css
.flex{
  display:flex;
  width:600px;
  height:600px;
  background-color:#eee;
}

.flex div{
  margin:auto;
}
```

<img src="/images/posts/css/2017/img1061218-5.png">
