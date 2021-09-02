---
layout: post
title: '[故障排除] Android TFLite: Fatal signal 11 (SIGSEGV) 解決方法'
categories: 'Android'
description: 
keywords: Android Developers
---

## 問題
最近在執行 Android TensorFlow Lite 影像辨識的專案，一張影像辨識都很正常。當連續多張影像要辨識時就會跳出以下錯誤訊息：


> A/libc: Fatal signal 11 (SIGSEGV), code 1, fault addr 0x0 in tid 9863 (pool-2-thread-1)

## 解決方法
由於錯誤訊息在 Android Studio 的 Logcat 錯誤訊息只有一行，明顯確定不是我們自己程式的問題。這問題似乎是 `tensorflow-lite` 函式庫內部的 bug 所造成的問題(個人猜測是記憶體)。其解決辦法就是安裝穩定版的 `tensorflow-lite`。

Try changing:
```
implementation 'org.tensorflow:tensorflow-lite:0.0.0-nightly'
implementation 'org.tensorflow:tensorflow-lite-gpu:0.0.0-nightly'
```

To
```
implementation 'org.tensorflow:tensorflow-lite:+'
implementation 'org.tensorflow:tensorflow-lite-gpu:+'
```