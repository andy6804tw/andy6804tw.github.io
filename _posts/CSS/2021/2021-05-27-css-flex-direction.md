---
layout: post
title: '[CSS學習筆記] flex-direction 排列方法'
categories: 'CSS'
description: 
keywords: CSS
---

## 前言
Flex 可以將內容物的所有元素並排成一列，使用時機是在父元素加上 `display: flex;`。接著內元件的排版就會以 X 軸方向由左至右排列，如果我們想將內容排序方式顛倒變成由右至左，或是由上往下，都可以透過 `flex-direction` 來設定。

![](/images/posts/css/2021/img1100527-5.png)


### `flex-direction` 屬性介紹
`flex-direction` 是寫在父層 container 裡面的，他主要可以控制子元素的排列方式。row 表示從左到右定向的水平軸，而 row-reverse 表示從右到左。column 表示 flex 容器的主軸與塊軸方向相同，變成由上往下。column-reverse 表現和 column 類似，但是替換了主軸起點和主軸終點(由下往上)。

- flex-direction: row (預設)
    - `main-start=左` 到 `main-start=右`
- flex-direction: row-reverse
    - `main-start=右` 到 `main-start=左`
- flex-direction: column
    - `main-axis` 方向等於 `block-axis`
    - `main-start=上` 到 `main-start=下`
- flex-direction: column-reverse
    - `main-axis` 方向等於 `block-axis`
    - `main-start=下` 到 `main-start=上`


![](/images/posts/css/2021/img1100527-1.png)

![](/images/posts/css/2021/img1100527-2.png)

![](/images/posts/css/2021/img1100527-3.png)

![](/images/posts/css/2021/img1100527-4.png)

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="andy6804tw" data-slug-hash="LYWLaed" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="flex(3)">
  <span>See the Pen <a href="https://codepen.io/andy6804tw/pen/LYWLaed">
  flex(3)</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 小結
`flex-direction` 預設是 `row` 也就是由左至右。如果希望從又到左排版可以使用 `row-reverse`。
其他範例可以參考[MDN Doc](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction)。

