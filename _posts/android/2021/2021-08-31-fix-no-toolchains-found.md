---
layout: post
title: '[故障排除] How to fix:No toolchains found in the NDK toolchains folder for ABI with prefix:arm-linux-android'
categories: 'Android'
description: 
keywords: Android Developers
---

## 前言
當你從 GitHub 下載人家的專案要執行時，發生以下錯誤：

> No toolchains found in the NDK toolchains folder for ABI with prefix:arm-linux-android.

![](https://i.imgur.com/Sia0fpY.png)

## 解決方式
這個錯誤是由於 Android3.0 以上的開發環境的版本更新所導致的。最快的方法是開啟專案(project)的 `build.gradle`，並找到 `dependencies` 將 `com.android.tools.build:gradle` 改成 `3.2.1` 版本。筆者是在 `3.5.1` 下出現此錯誤訊息的。


> com.android.tools.build:gradle:3.2.1

![](https://i.imgur.com/6JiUgm4.png)

修改完成後重新 Sync 一下應該就可以繼續執行囉！