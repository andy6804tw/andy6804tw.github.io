---
layout: post
title: 'JS判斷圖片是否載入完成'
categories: 'Web'
description: 
keywords: 
---

## 前言
當圖片畫素較高時，網頁就必須要花時間從伺服端下載。因此在網頁第一次載入時會等待圖片下載的時間，所導致空窗期等待。常見的解決方式就是加入 Loading 畫面，但是要如何透過 JavaScript 來監聽並接收圖片以載入完成的事件呢？下圖就是今天要簡單實作的範例。

![](https://github.com/1010code/image-loaded-detect/raw/main/screenshot/demo.gif)

## 透過 JS 監聽圖片下載
首先建立一張影像的 DOM，透過 `onload()` 函式來監聽圖片載入是否完成，當成功載入後就會觸發此函式。因此我們可以在此函式中停止 loading 的動畫。

```js
// 建立一張照片
var bgImg = new Image();
// 當圖片載入完成時執行onload function
bgImg.onload = function () {
    console.log('載入完成！');
    // 在body放入背景圖位置
    document.body.style.backgroundImage = 'url(' + bgImg.src + ')';
    // 停止loading動畫
    document.getElementById('load-wrapper').classList.add('d-none');
};
// 指定圖片來源位置
bgImg.src = 'https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg';
```

## 補充
如果要監聽 `<img>` 標籤內的圖片是否以載入完成，可以透過取得圖片標籤的 DOM。一樣呼叫 `onload()` 函式來監聽圖片載入是否完成。

```html
<!DOCTYPE HTML>
<html>
  <head>
    <title></title>
  </head>
  <body>
    <img src="https://effigis.com/wp-content/uploads/2015/02/DigitalGlobe_WorldView1_50cm_8bit_BW_DRA_Bangkok_Thailand_2009JAN06_8bits_sub_r_1.jpg">
    <p>loading...</p>
    <script type="text/javascript">
      document.getElementsByTagName("img")[0].onload =function() {
        document.getElementsByTagName("p")[0].innerHTML ='載入完成！';
      }
    </script>
  </body>
</html>
```

完整 Code 可以從我的 [GitHub](https://github.com/1010code/image-loaded-detect) 中取得！