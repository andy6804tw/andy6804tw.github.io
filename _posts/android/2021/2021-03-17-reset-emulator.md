---
layout: post
title: '[Android] The device needs more free storage to install the application 問題排除'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
使用 Android 開發的使用者通常都會利用內建的模擬器來除錯，若進行編譯時出現下錯誤訊息:

> Installation did not succeed. 
> The application could not be installed: INSTALL_FALLED_INTERNAL_ERROR
> The device needs more free storage to install the application(extra space is needed in addition to APK size)

表示模擬器的內部儲存空間已用盡，此時快速的方法就是進行重置清空資料，或是手動刪除不必要的APP。

## 問題解決
Android Studio 上方工具列找到下圖紅框的 Icon，點選進入 Android Virtual Device Manager。

![](/images/posts/android/2021/img1100317-1.png)

進入後點選欲重置的模擬器機型->Wipe Data即可將所有內容一次清空。

![](/images/posts/android/2021/img1100317-2.png)