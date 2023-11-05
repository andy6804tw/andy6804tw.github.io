---
layout: post
title: 'HTML 和 CSS 中內嵌入 SVG 圖片'
categories: 'Web'
description: 'svg to css'
keywords: frontend
---

## 前言
對於 SVG 圖示或圖形，如果要作為 CSS 背景使用，通常只要尺寸不超過2KB，就會直接內嵌到 CSS 程式碼中。這種方法 SVG 不需要額外的檔案請求，渲染幾乎沒有延遲，可以提高網頁的載入效能。

## svg to css
各位可以使用線上的網頁服務，用記事本將原始的 SVG 貼到以下連結網頁，接著就會自動地幫我們產生 `data:image/svg+xml` 格式的圖檔。

- [svg-to-css](https://bloggerpilot.com/en/tools/svg-to-css/)

```css
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' width='512' height='512' x='0' y='0' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg%3E%3Cg data-name='Layer 2'%3E%3Ccircle cx='256' cy='256' r='256' fill='%23ffc107' opacity='1' data-original='%23ff2147' class=''%3E%3C/circle%3E%3Crect width='65.74' height='280' x='223.13' y='116' fill='%23ffffff' rx='18.26' transform='rotate(-90 256 256)' opacity='1' data-original='%23ffffff' class=''%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
background-repeat: no-repeat no-repeat;
background-position: center center;
background-size: cover;
```

![](https://i.imgur.com/RkH4VIv.png)