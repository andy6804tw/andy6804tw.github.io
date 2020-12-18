---
layout: post
title: 'Android Studio 自動匯入相關套件設定'
categories: Android
description: 
keywords: Android Studio
---

使用 Android Studio 開發時，程式碼若沒有載入相對應的函式庫會出現紅字且無法編譯，如下圖所示。

![](/images/posts/android/2020/img1091218-1.png)

如果想要自動匯入函式庫的功能可以參考一下設定。

- Windows/Linux
    - File -> Settings -> Editor -> General -> Auto Import
- Mac
    - Preferences -> Editor -> General -> Auto Import

![](/images/posts/android/2020/img1091218-3.png)

設定完成後，IDE 會自動偵測程式碼中會使用到的套件。並自動載入。

![](/images/posts/android/2020/img1091218-2.png)