---
layout: post
title: '[故障排除] 解決 java.lang.OutOfMemoryError 的錯誤訊息'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
在進行 Android APP 開發的時候，特別是在處理影像時會出現以下的錯誤訊息：

> java.lang.OutOfMemoryError: Failed to allocate a 546124 byte allocation with 427656 free bytes and 417KB until OOM

## 解決方法
圖片處理的時候占用了過多記憶體，會導致 APP 在執行時因為圖片太大而閃退。這時候可以在 `AndroidManifest.xml` 中，加入 `android:largeHeap="true"`。

![](/images/posts/android/2021/img1100906-1.png)
