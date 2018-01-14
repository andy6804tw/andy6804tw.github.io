---
layout: post
title: '[CSS學習筆記] Bootstrap4 Card(卡片)元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Card 就是卡片，一些圖文的列表可以使用 Bootstrap 的卡片元件來顯示。

##  Card 基本使用
一個卡片組建需要一個標籤包裝 `card`，卡片內部內容可以有一個 `card-header` 當作標題，內容可以放在 `card-body` 來顯示內容，body裡面可以有 `card-title` 標題與 `card-text` 內文還有 `card-link` 連結，最後還有一個底部 `card-footer`。

- `text-center` 可以將文字居中
- `text-right` 可以將文字靠右
- `text-left` 可以將文字靠左

```html
<div class="container">
  <div class="card">
    <div class="card-header text-center">
      <h2>Card</h2>
    </div>
    <div class="card-body">
      <h4 class="card-title">Hello</h4>
      <div class="card-text">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
      </div>
      <a class="card-link" href="#">Link</a>
    </div>
    <div class="card-footer">
      footer
    </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-13.png">

## 圖片卡片

##### 1. 圖文卡片
因為 container 會佔據一整面的關係所以我使用 `row、col` 將卡片用欄列排版。我們可以做一張卡片圖片 `card-img` 你可以發賢圖片上方多了圓角，此外內文可以使用 `card-body` 區塊來實作內容。 

```html
<div class="container">
  <div class="row">
    <div class="col-4">
      <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-15.png">


##### 2. 文字覆蓋圖片
跟第一種方法類似，製作一張全圖的卡片並且使用 `card-img-overlay` 將文字整個覆蓋在圖片之上，把原本 `card-body` 區塊替換掉即可。

```html
<div class="container">
  <div class="row">
    <div class="col-4">
      <div class="card text-center text-white">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-img-overlay">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-14.png">

## 卡片群組

#### card-group
很多張卡片可以定義一個卡片群組 `card-group` 給他包起來，當然你也可以使用欄列方式，其中卡片群組是等高的

```html
<div class="container">
  <div class="card-group">
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-16.png">

#### card-deck
如果圖片之間想要有間隔可以使用 `card-deck`。

```html
<div class="container">
  <div class="card-deck">
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-17.png">

#### card-columns 瀑布流


```html
<div class="container">
  <div class="card-columns">
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui. ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
    <div class="card text-center">
        <img src="https://goo.gl/jhpihv" alt="" class="card-img">
        <div class="card-body">
          <h4 class="card-title">Hello</h4>
          <div class="card-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis hic ut quae laborum at qui.
          </div><a class="card-link" href="#">Link</a>
        </div>
      </div>
  </div>
</div>
```

<img src="/images/posts/css/2018/img1070113-18.png">


參考：https://v4-alpha.getbootstrap.com/components/card/
