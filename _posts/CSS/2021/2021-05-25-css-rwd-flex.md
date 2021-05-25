---
layout: post
title: '[CSS學習筆記] CSS Media Queries 基礎使用'
categories: 'CSS'
description: 
keywords: CSS
---

## 前言
寫 RWD 網頁通常可以使用框架實現自適應這種裝置的排版，例如當今嘴火紅的 [Bootstrap](https://getbootstrap.com/)、[Tailwind](https://tailwindcss.com/)、[Pure.css](https://purecss.io/)...等。如果你要純手刻網頁或是客製化網頁，勢必需要使用到 CSS Media Queries 技巧來調整畫面樣式。當然最常見做法是先為 PC 客戶做視覺設計，接著再進行隨身裝置平板、手機。我們可以發現畫面大小是由大至小，這就稱為 PC 優先。然而在 Bootstrap 的架構是採手機優先，也就是順序是從小裝置到大裝置。

![](https://purecss.io/img/layout-icon.jpg)
> image from `purecss.io`

## Media Queries 基礎使用
通常我們在寫 RWD 網頁，解析度由大寫到小，也就是說 CSS 從 PC 開始寫到小型設備(手機)，後續用 media + max-width 做斷點。以下範例建立一個雙欄的排版，透過 CSS Flex 容器來實現。並使用 `@media` 來動態調整不同解析度下的排版樣式。

- 一開始在 PC 上，menu 和 content 並排
    - container 最大寬度為 1140px，左右 padding 各為 15px
    - menu width 為 30%、content width 為 70%
- 第一個斷點: 螢幕解析度在 width < 992px
    - container 最大寬度為 940px，左右的 padding 15px 也會繼續留著
- 第二個斷點: 螢幕解析度在 width < 768px 
    - container 最大寬度為 720px，左右的 padding 15px 也會繼續留著
    - menu 和 content 變為上下排列，寬度都為 100%


```html
<div class="container">
  <div class="row">
    <div class="menu">
      <h2>menu</h2>
    </div>
    <div class="content">
     <h2>content</h2>
    </div>
  </div>
</div>
```

```css
*,*:before,*::after{
  box-sizing: border-box;
}

.container{
  max-width: 1140px;
  height: 200px;
  padding-right: 15px;
  padding-left: 15px;
  margin:0 auto;
}
.row{
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.menu{
  width: 30%;
  background: pink;
}
.content{
  width: 70%;
  background: green;
}
@media(max-width:992px){
  .container{
    max-width: 940px;
  }
}
@media(max-width:768px){
  .container{
    max-width: 720px;
  }
  .menu{
   width: 100%;
  }
  .content{
    width: 100%;
  }
}
```

![](/images/posts/css/2021/img1100525-1.gif)