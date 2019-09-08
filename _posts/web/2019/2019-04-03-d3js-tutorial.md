---
layout: post
title: '[D3.js] 資料視覺化快速上手'
categories: 'Web'
description: 
keywords:
---

## 前言
`D3.js` 是一個使用動態圖形進行資料視覺化的JavaScript函式庫。使用此函式庫可以輕鬆簡單的繪製 SVG 向量圖或是直方圖、折線圖及圓餅圖，相似的套件有很多像是 Canvas.js、Chart.js。這些我都用過但 `D3.js` 優點在於可以客製化使用原生 DOM 去做出你想到的內容。

## 引入 D3 函式庫
首先我們先將 `D3.js` 的 CDN 在 HTML 中引入。

```html
<script src='https://d3js.org/d3.v5.min.js'></script>
```

[D3.js GitHub](https://github.com/d3/d3)


## DOM Selection
`D3.js` 可以允許直接控制 DOM ，所以我們可以利用選擇器(select)來為標籤處理事件，像是變換顏色更改style......等。

這邊我們先使用 `select()` 來設定 `h3` 標籤的字體顏色和字體大小，是不是跟 CSS 有些神似呢。

```html
<html>
<head>
    <title>Learn D3.js</title>
</head>
<body>

<h3>Hello world!</h3>

<script src='https://d3js.org/d3.v5.min.js'></script>

<script>
    d3.select('h3').style('color', 'darkblue');
    d3.select('h3').style('font-size', '24px');
</script>
</body>
</html>
```
![](/images/posts/web/2019/img20190403-1.png)

## Data Binding
這邊我們使用一個方法將陣列中的資料全部渲染出來，一樣我們建立 `ul` 列表的標籤，接著使用剛所學到的`select()` 來設定 `ul` 內容 。 `data()` 可以放入陣列型態的資料接著就很像 ES6 的 map 可以將所有的內容走訪一遍並印出來。這邊使用 `append()` 來新增標籤內容。

```html
<html>

<head>
  <title>Learn D3.js</title>
</head>

<body>

  <ul></ul>

  <script src='https://d3js.org/d3.v5.min.js'></script>

  <script>
    var days = ['星期一', '星期二', '星期三', '星期四'];
      d3.select('ul')
        .selectAll('li')
        .data(days)
        .enter()
        .append('li')
        .text(function (d) { return d; });
  </script>
</body>

</html>
```

![](/images/posts/web/2019/img20190403-2.png)
