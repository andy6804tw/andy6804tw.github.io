---
layout: post
title: '[CSS學習筆記] Bootstrap4 Badge元件'
categories: 'CSS'
description: 'Bootstrap4'
keywords: CSS
---

## 前言
Badge 是一個標籤元件，像是一個訊息未讀右上角會有一個未讀的數量的樣式

## span 標籤與 badge
一個標籤組件我們使用 `span` 標籤，因為他是一個行的元素，當你使用標題標籤他會隨著字元大小放大，在裡面的 ㄏlass 我們放入 `badge badge-xxx` xxx 總共有五種樣式已修改。

- primary
- secondary
- success
- info
- warning
- danger

```html
<h1>Example heading <span class="badge badge-primary">New</span></h1>
<h2>Example heading <span class="badge badge-success">New</span></h2>
<h3>Example heading <span class="badge badge-info">New</span></h3>
```

<img src="/images/posts/css/2018/IMG1070113-1.png">

## badge 圓角化
在 class 加入 `badge-pill` 就能將 badge 圓角化 pill 的中文意思是膠囊藥丸，就像膠囊一樣的感覺。

```html
<span class="badge badge-primary badge-pill">new</span>
<span class="badge badge-secondary badge-pill">new</span>
```

<img src="/images/posts/css/2018/IMG1070113-2.png">


參考：https://v4-alpha.getbootstrap.com/components/badge/
