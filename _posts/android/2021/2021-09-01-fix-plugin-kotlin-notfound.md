---
layout: post
title: '[故障排除] Android 專案 Plugin with id 'kotlin-android' not found 解决方法'
categories: 'Android'
description: 
keywords: Android Developers
---

## 問題
當你建立的 Android 專案無導入任何 Kotlin 的工具包時，新增一個含有 `.kt` 的頁面將會跳出一煆錯誤訊息。

> Plugin with id 'kotlin-android' not found.

## 解決方法
僅需要將專案導入 Kotlin 相關函式庫即可。開啟專案(Project)的 `buidd.gradle` 並在下圖中兩個位置加上這兩段式程式即可。

```
ext.kotlin_version = "1.4.21"
```

```
classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
```

![](/images/posts/android/2021/img1100901-1.png)