---
layout: post
title: '[CSS學習筆記] 解決div或img多餘的空白'
categories: 'CSS'
description: '解決div或img多餘的空白'
keywords: CSS
---

## 處理四周空白
在設計網頁時你未發現元件標籤的四周有預留一些小空白，如下圖，這些空白要如何去除呢？這要往 `body` 下手去處理，原因是預設 `body` 四周圍本身就有預留一些 `margin` 空隙，所以將 `body` 的 `margin` 歸零就可以囉。

<img src="/images/posts/web/img1061219-2.png">



- css(方法一)

```css
body{ margin: 0; padding: 0; }
```

- css(方法二)

```css
img{
  display: block;
}
```

## 移除 img 底部的空白

上述問題解決後你會發現圖片底部往往都會多個空白，如下圖，為了應對此問題整理出以下幾個解決方法。

<img src="/images/posts/web/img1061219-3.png">

- html

```html
 <img src="https://ps.w.org/custom-banners/assets/banner-772x250.png?rev=1101436">

<div>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam fugit vero nemo eum, dolorem eveniet perferendis, qui maiores cupiditate minima sequi, consectetur dolorum consequatur itaque?
  </p>
</div>
```

- css

```css
body{ margin: 0; padding: 0; }
div{
  padding: 5px;
  background-color:#ffe26b;
  width:763px;
}
```

##### 方法1.

在 img 標籤下加入 `display:block` 形成一區塊

```css
img{
  display:block;
}
  ```

##### 方法2.
設置圖片的垂直對齊方式，將 `vertical-align` 屬性設為 top、text-top、bottom、text-bottom 皆可解決。

```css
img{
  vertical-align:top;
}
```
