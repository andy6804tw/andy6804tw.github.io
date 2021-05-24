---
layout: post
title: '[CSS學習筆記] RWD 技巧 min-width & max-width '
categories: 'CSS'
description: 'CSS Reset'
keywords: CSS
---


## 區寬度自適應
我們先舉個沒有自適應網頁的例子，建立一個 `div` content 的區塊，並設定寬 `width: 800px;`。接著我們將網頁的寬縮小看看，將會發現區塊會被遮住。第二張圖可以看到底部 Ｘ 軸出現，詳細內容必需要左右拖移才能看見。

```html
<div class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque consequatur illo laborum numquam quod ullam voluptate, quos consectetur quidem neque officiis quia placeat. Libero voluptatibus nam ipsum officiis a quam!</div>
```

```css
.content{
    width: 800px;
    margin: auto;
    height: 500px;
    background-color: antiquewhite;
}
```

![](/images/posts/css/2021/img1100524-1.png)

![](/images/posts/css/2021/img1100524-2.png)

如果我們將 content 的區塊，並設定寬 `max-width: 800px;`。神奇事情發生了！此區塊的寬會自適應瀏覽器大小。因為我們在 CSS 上設定了區塊`最大寬`。因此寬度最大就會只有 `800px`，而當瀏覽器縮放至 `800px` 以下， content 區塊寬會自動的縮放至適當大小。相對的該區塊內部的所有元素也會動的去調整版型(ex: 換行)。

![](/images/posts/css/2021/img1100524-3.png)

##  圖片自適應
建議如果要放圖片直接將所有的 `<img/>` 元素進行統一自適應容器大小。這樣網頁縮放時，內部區塊照片大於瀏覽器時會自動去縮放。

```css
img{
    max-width: 100%;
    height: auto;
}
```