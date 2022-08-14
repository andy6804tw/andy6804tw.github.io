---
layout: post
title: 'Flutter APP 安裝卡在 Running Gradle task assembleDebu'
categories: 'Flutter'
description: 'Flutter App stuck at Running Gradle task assembleDebug'
keywords: 
---

## 前言
當在撰寫 Flutter APP 時安裝到 Android 實體機的時候，卡在 `Gradle task assembleDebug` 階段很久的時間。以下提供兩種解決辦法。

## 方法一：重置 Gradle
在 Flutter 專案中有個 Android 資料夾，使用終端機進入 Android 目錄下。接著執行以下兩個指令：

```sh
gradlew clean
```

重新 build 可能需要等個十幾分鐘。
```sh
gradlew build
```

## 方法二：更新 Android SDK built-tools
在 Android Studio 點選 Tools->SDK Manager-SDK tools，選擇 Android SDK Built-Tools 並安裝更新。

![](/images/posts/Flutter/2022/img1110814-1.png)