---
layout: post
title: '[Android] 隱藏狀態列、標題列'
categories: 'Android'
description: 
keywords: Android Developers
---
## 前言
Android 的 Toolbar 包含了狀態列(Status Bar)與標題列(Action Bar)。如果需要克制會會隱藏必須要先到 `values` 資料夾中的 `themes.xml` 設定好 Toolbar 的樣式。接著打開 `AndroidManifest.xml` ， 更改 application tag 內的 theme 參數。以下教學手把手帶你來將狀態列與標題列隱藏，文章最後會提供此範例程式。

<img src="/images/posts/android/2021/img1100309-1.png" width="350px">

## 修改 themes.xml
最新版的 Android 在主題的架構上有稍微調整，原先主題樣式的配色修改會在 `values.xml` 中設定。最新版本會發現多了 `themes` 資料夾，以及眼尖的朋友可以發現到除了 `values` 資料夾還多了夜間版本的設定 `values-night`

![](/images/posts/android/2021/img1100309-2.png)

![](/images/posts/android/2021/img1100309-3.png)

分別在 `values/themes.xml` 和 `values-night/themes.xml` 加入以下程式碼。Style 參數中，分別有三個參數可以設定，包含：

 - windowNoTitle：是否顯示Title，若選擇是則 隱藏 Title
 - windowActionBar：是否顯示 ActionBar，選擇是則 顯示 ActionBar
 - android:windowFullscreen：是否全銀幕顯示，若選擇是則 隱藏 ActionBar 與 StatusBar

```xml
<resources xmlns:tools="http://schemas.android.com/tools">
    <!-- Base application theme. -->
    .
    .
    .
    略

    <style name="Theme.NoActionBar" parent="Theme.Androidhideactionbarandstatusbar">
        <item name="windowNoTitle">true</item>
        <item name="windowActionBar">false</item>
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>
```

## 修改 AndroidManifest.xml
開啟 AndroidManifest.xml，將沒有 Toolbar 的主題樣式套用。

```xml
android:theme= "@style/Theme.NoActionBar"
```

![](/images/posts/android/2021/img1100309-5.png)

<img src="/images/posts/android/2021/img1100309-4.png" width="250px">


顯示 Status Bar 與 Action Bar，但不顯示 Title。

```xml
<style name="Theme.NoActionBar" parent="Theme.Androidhideactionbarandstatusbar">
    <item name="windowNoTitle">true</item>
    <item name="windowActionBar">false</item>
    <item name="android:windowFullscreen">false</item>
</style>
```

<img src="/images/posts/android/2021/img1100309-6.png" width="250px">

顯示 Action Bar 與 Title，但不顯示 Status Bar。

```xml
<style name="Theme.NoActionBar" parent="Theme.Androidhideactionbarandstatusbar">
     <item name="windowNoTitle">false</item>
     <item name="windowActionBar">true</item>
     <item name="android:windowFullscreen">true</item>
</style>
```

<img src="/images/posts/android/2021/img1100309-7.png" width="250px">

完整 Code 可以從我的 [GitHub](https://github.com/1010code/android-hide-actionbar-and-statusbar) 中取得！