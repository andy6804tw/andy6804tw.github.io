---
layout: post
title: '[CSS學習筆記] CSS Flex 排版技巧介紹'
categories: 'CSS'
description: 
keywords: CSS
---

## 前言
Flex 是一種網頁排版方式，現今大多數網頁都會使用 CSS 的 Flex 進行任何樣式的排版。在使用之前你必須了解 Flex 有行、列的軸線觀念以及需要建立一個外容器(Container) 並採用 Flex 來控制內元件的排版。此外  Flex 提供多種排版對齊方式，例如靠左、靠右、置中、左右對齊。

![](/images/posts/css/2021/img1100526-1.png)

Flex 外容器屬性：
- display
- flex-direction
- flex-wrap
- justify-content
- align-items

Flex 內元件屬性：
- flex
  - flex-grow
  - flex-shrink
  - flex-basis

## 觀察 display: block 特性
在談談 flex 之前我們先來觀察 block 屬性。在預設的 `<div>` 標籤都是 `display: block` 代表每一個區塊是獨自佔滿一列，並填滿瀏覽器寬或是父元素的寬。如下圖為一個簡單範例，建立三個 `class="item"` 的 `<div>` 標籤，並無設定 item 寬預設會自己繼承父元素(也就是`class="container"`)。因為父元素 `container` 沒有設定寬，因此寬度會自己預設 100% 也就是符合瀏覽器的寬。

![](/images/posts/css/2021/img1100526-3.png)

如果我們想將三個 item 合併成同一列並排顯示，是不是設定每一個 item 寬就好了呢？答案是錯的即使你設定寬等於 `100px` 其他兩個 item 也不會因此浮上去。解決方法可以透過 `display: flex;`，那這段程式該放哪兒呢？也就是下一個我們要講的外層屬性位置。

![](/images/posts/css/2021/img1100526-4.png)

## Flex 外層屬性 (container)
如果要將內層的 item 進行多欄排版，必須在外層容器加上 `display: flex;`。每一個 item 會依照外層容器所設定的寬度，自動去計算 item 寬度的比例。另一個特性是如果你沒有個別去設定 item 的高度，每一個 item 預設是等高的，如下圖所示。每一個 item 的高會找出最大的高度，並作為所有的 item 高(稍後有例子說明)。

![](/images/posts/css/2021/img1100526-2.png)


常見的 Flex 語法(放在外層容器)：
- display: Flex屬性
- flex-direction: 決定 flex 軸線
- flex-wrap: 決定換行屬性
- justify-content: 主要軸線的對齊
- align-items: 內部item軸線的對齊

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="andy6804tw" data-slug-hash="RwpgbOJ" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="RwpgbOJ">
  <span>See the Pen <a href="https://codepen.io/andy6804tw/pen/RwpgbOJ">
  RwpgbOJ</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


## Flex 內部 item 元素的高
剛剛有提到 flex 第一個特性是會去自動計算 item 寬度的比例，且內部的所有 item 元素都會並排。因此不需要怕你給的 item 三個加總起來會超出瀏覽器的寬。下面這個例子 item1 跟 item3 的寬度加總等於 `550px` 遠大於 `container` 所設的 `width: 500px;`。因此可以證明 flex 會自適應每個元素的比例並符合自適應後的大小。另外 item2 沒有設置寬因此預設就是吻合元素內的內容當作寬。另外 item1 和 item2 都有設定高並寫死，但是 item3 並沒有設定高。由於 flex 其預設是等高，因此每一個 item 的高會找出最大的高度，並作為所有的 item 高。

![](/images/posts/css/2021/img1100526-5.png)

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="css,result" data-user="andy6804tw" data-slug-hash="LYWLJeK" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="flex(2)">
  <span>See the Pen <a href="https://codepen.io/andy6804tw/pen/LYWLJeK">
  flex(2)</a> by Yi Lin Tsai  (<a href="https://codepen.io/andy6804tw">@andy6804tw</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## 小結
到目前為止我們提了 Flex 在外層容器的設定方式，使得內層元素 item 能夠並排顯示。

- 要在父元素 container 加上 `display: flex;` 使得子元素都會並排
- 子元素會依照各自的原始寬度去計算比例自適應瀏覽器大小
- 子元素預設是等高的，依照最大的高作為子元素預設高度