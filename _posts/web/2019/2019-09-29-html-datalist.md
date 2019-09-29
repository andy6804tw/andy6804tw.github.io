---
layout: post
title: 'Input 標籤 datalist 自動過濾選項'
categories: 'Web'
description: 
keywords:
---

## 前言
我們可以透過 input 標籤來實作 select 的 option 下拉式選單來讓使用者選擇。當選項過多時造成使用者所找上的負擔。

![](/images/posts/web/2019/img1080929-1.png)

因此突然發現有 `datalist` 標籤可以解決這種狀況。它的功能有點類似 Android 中的 `SearchView` 中的過濾列表資料的功能。

## datalist 標籤
datalist 標籤可以定義 input 元素可以選擇的列表，被用來為 input 標籤提供 `自動完成` 的特性，藉由輸入關鍵字就可以找到想要的選項內容。

下面為 HTML 的標籤範例，建立一個 input 標籤可以讓使用者輸入文字。接著建立 datalist 標籤，你可以直接在 HTML 中定義列表內容。也可以透過 JavaScript 來動態新增選項內容。這次範例就以 js 動態新增為例。
```html
選擇城市: <input type="text" list="cities" /><br />
<datalist id="cities">
</datalist>
```

在 js 中我們可以透過 HTTP Request 來 GET API 資料取得 data list。這邊放利直接手動建立一個城市的陣列JSON物件，分別有 `label` 以及 `value`。接著取得 datalist 的 DOM 並且逐一地載入資料到 datalist 中來動態新增選項(option)標籤。
```js
var cities = [
  { label: "Taipei", value: "台北市" },
  { label: "Tainan", value: "台南市" },
  { label: "Yunlin", value: "雲林縣" }
];
// 取得datalist的dom
var ss = document.getElementById("cities");
// 載入資料到datalist
for (var i = 0; i < cities.length; i++) {
  var city = cities[i];
  var op = document.createElement("option");
  op.setAttribute("label", city.label);
  op.setAttribute("value", city.value);
  ss.appendChild(op);
}
```

完成後結果就如下圖，使用者可以輸入關鍵字自動篩選出相似的資料了！

![](/images/posts/web/2019/img1080929-2.gif)


[GitHub 程式碼](https://github.com/1010code/datalist-element-demo)
