---
layout: post
title: '純 CSS 實現滑鼠 hover 圖片切換'
categories: 'CSS'
description: '滑鼠停留淡出切換照片'
keywords: CSS
---

## 方法一(使用 div)
建立一個 `<div>` 標籤並透過 css 的 hover 動作偵測切換另一張圖片。

```css
/* css */
.fashion-image {
  margin:0 auto;
  width:450px;
  height:281px;
  transition: background-image 1s ease-in-out;
  background-image:url("https://i.imgur.com/EzSlpOr.png");
}

.fashion-image:hover {
  background-image:url("https://i.imgur.com/LJaCii8.png");
}
```

```html
<!-- html -->
<div class="fashion-image"></div>
```

![](/images/posts/css/2022/img1110118-1.gif)

## 方法二(使用 img)
此種方法必須在 html 建立兩個 `<img>` 並透過 css 的 opacity 調整前後照片的透明度。當滑鼠移過去時 class="top" 的影像偵測到並將透明度設為 0。此時背後的 bottom 影像就會被看見了。

```css
/* css */
.fashion-image {
  position:relative;
  height:281px;
  width:450px;
  margin:0 auto;
}

.fashion-image img {
  position:absolute;
  left:0;
  -webkit-transition: opacity 1s ease-in-out;
  -moz-transition: opacity 1s ease-in-out;
  -o-transition: opacity 1s ease-in-out;
  transition: opacity 1s ease-in-out;
}

.fashion-image img.top:hover {
  opacity:0;
}
```

```html
<!-- html -->
<div class="fashion-image">
    <img class="bottom" src="https://i.imgur.com/LJaCii8.png" />
    <img class="top" src="https://i.imgur.com/EzSlpOr.png" />
</div>
```

- [參考](http://css3.bradshawenterprises.com/cfimg/)