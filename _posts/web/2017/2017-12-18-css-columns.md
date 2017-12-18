---
layout: post
title: '[CSS學習筆記] columns多欄式排版'
categories: 'Web'
description: '置中'
keywords: CSS
---

在設設計網頁中常會看到2、3或多欄式排版，這是很常見的排版方式，今天就來試著實作多欄式的版型，分別為 2、3、4 欄實作。

## 2 columns

首先建立一個 container 寬度為 600px，內文為兩欄式所以每個欄位為一個區塊 class 設為 work，每個 work 的寬度為 container 的一半也就是 50%，這裡為了區分間隔所以 work 的寬度設為 48% ， 2% 留給 `margin-right` 右邊間距，此外使用 `float:left` 為文繞圖用意是有空間就將其餘部分向上對齊。

```html
<div class="container">
  <div class="work">
    
  </div>
  <div class="work">
    
  </div>
  <div class="work">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis officia possimus cum vel rerum accusamus, excepturi aperiam rem voluptas commodi?
  </div>
  <div class="work">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis officia possimus cum vel rerum accusamus, excepturi aperiam rem voluptas commodi?
  </div>
  <div class="work">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis officia possimus cum vel rerum accusamus, excepturi aperiam rem voluptas commodi?
  </div>
  <div class="work">
    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis officia possimus cum vel rerum accusamus, excepturi aperiam rem voluptas commodi?
  </div>
</div>
```

```css
.container{
  margin:0 auto;
  width: 600px;
}

.work{
  float:left;
  width: 48%;
  margin-bottom: 10px;
  margin-right: 2%;
  background-color: #ccc;
}
```
<img src="/images/posts/web/img1061218-3.png">

[範例程式碼](https://codepen.io/andy6804tw/pen/rpxyYv)

## 3&4 columns

接下來要實作 3 欄 100/3 為 33.333 除不盡，此外 px 像素值笑小值為 1 不允許小數點存在，但我們可以利用 % 來表示 1/3 ，所以直接 `width: 33.333%` css 會自動幫你切齊，相對的 4 欄為 100/4 為 25% 扣掉右邊間隔最後為 23%。

```css
.container{
  margin:0 auto;
  width: 600px;
}

.work{
  float:left;
  width: 31.3333%;
  margin-bottom: 10px;
  margin-right: 2%;
  background-color: #ccc;
}
```

## float collapse (文繞崩塌)

先看下面這張圖，你有沒有發現別段文字也跟著上一個容器的文繞格式所影響而網上遞補，這種情況稱為 `float collapse` ，為了解決這個問題所以在每個區塊 `float` 後最尾端建立一個 `div` 標籤名為 `clearfix` ，在此 css 中設定 `clear:both` ，他跟 float 視為一組的，告訴網頁這個地方停止 float 並清除狀態， both 意思是將兩邊做清除，你也可以改成 `clear:left`

<img src="/images/posts/web/img1061218-4.png">

```html
<div class="clearfix"></div>
```

```css
.clearfix{
  clear:both;
}

```

[範例程式碼](https://codepen.io/andy6804tw/pen/ypePeL)
