---
layout: post
title: 'BitmapFactory 載入的影像大小與實際不符'
categories: 'Android'
description: 'BitmapFactory returns bigger image than source'
keywords: Android Developers
---

## 前言
最近正在進行 Android 影像相關的開發，透過 `BitmapFactory` 載入本地資料夾內的影像檔。但是載入後發現 `decodeResource` 後的影像大小遠比實際的影像畫素還來得大。若要避免載入影像時被縮放，可以參考以下的解法。

## 解決方法
首先建立一個 `BitmapFactory.Options()` 並將 `inScaled` 設為 `false`。最後在解析圖片的時候在方法的最後加上 `options` 變數即可。

```java
BitmapFactory.Options options = new BitmapFactory.Options();
options.inScaled = false;               
Bitmap bitmap = BitmapFactory.decodeResource(this.context.getResources(),  R.drawable.image, options);
Log.d("image", "height: " + bitmap.getHeight() + " width: " + bitmap.getWidth());
```
