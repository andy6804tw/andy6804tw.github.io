---
layout: post
title: 'RWD 網頁起手式'
categories: 'Web'
description: 
keywords: 
---

## 前言
現今網頁設計開發，最基本地要求就是符合響應式網頁設計 (RWD, Responsive Web Design)。如果你聽到這個名詞，就表示你的網頁必須要支援跨平台(手機、電腦、平板...)，能夠自適應不同的設備大小。

## 如何判斷是否支援 RWD
如果你逛一個網站，你可以從開發人員模式中查看網頁程式碼。從標頭`<head></head>`中找出下面這段程式:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

如果有看到上述 viewport 語法，代表此網頁支援 RWD。 

- width=device-width
    - 自適應手機螢幕寬度
- initial-scale 到 minimun-scale=1.0
    - 伸縮比及最大最低的伸縮比都為1倍

## 使用 `@media` 自適應版面
通常我們設計網頁 CSS 的設計都會以 PC 為主，但是如果要添加響應式的設計就必須在 CSS 中加上 `@media` 來控制版面。以下是參照 Bootstrap 所規定的幾種不同的尺寸。

- `< 576px Extra small devices(手機直式螢幕稱)`
- `>= 576px Small devices(手機橫式螢幕)`
- `>= 768px Medium devices(平板)`
- `>= 992px Large devices(一般電腦螢幕)`
- `>= 1200px Extra large devices(大尺寸電腦螢幕)`


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1 class="title">標題一標題一標題一標題一標題一標題一標題一</h1>
  <p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque consequatur illo laborum numquam quod ullam voluptate, quos consectetur quidem neque officiis quia placeat. Libero voluptatibus nam ipsum officiis a quam!</p>
</body>
</html>
```


```css
/* 先寫PC版型，再依序往下寫響應式設計 */
.title{
  color: red;
}
/* Medium: xx-md*/
@media(max-width:768px){
  .title{
    color: blue;
  }
}
/* Small: xx-sm */
@media(max-width: 576px){
  .title{
    color: yellow;
  }
}

```

![](/images/posts/web/2021/img1100523-1.png)

> 注意: 螢幕較小的樣式要擺在最後面，因為後者會覆蓋前面的內容

## 注意 `@media` 順序
大家可以試著將上面的 CSS 中的 `Small` 和 `Medium` 的樣式順序對調，會發現在手機版本的 `Small` 就不會被觸發了。其原因是對調後的 `Medium` 把 `Small` 覆蓋了。


![](/images/posts/web/2021/img1100523-2.gif)