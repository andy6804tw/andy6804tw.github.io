---
layout: post
title: 'Android Studio 如何修改 Package Name(專案名稱)'
categories: 'Android'
description: 'Android modify project name'
keywords: Android Developers
---

## 前言
如果臨時要修改專案的名稱僅修改資料夾名稱是無效的，內部的 Package Name 是在建立專案時即設定了。因此本文教會教各位如何在 Android Studio 將所有的專案路徑一並重新命名。

## 1. Rename project
首先在左邊的工具視窗選擇 Android 並且在 app→java→Package Name 按下滑鼠右鍵，並點選 Refactor→Rename。

![](/images/posts/android/2021/img1101107-1.png)

此時會出現警訊視窗，因我們要變更 Package Name，因此要點選 Rename package。

![](/images/posts/android/2021/img1101107-2.png)

接著會出現 Rename 視窗，輸入所要變更的 Package Name，並按下 Refactor 按鈕。

![](/images/posts/android/2021/img1101107-3.png)

在 Android Studio 的下方會出現 Refactoring Preview 頁籤，接著再按下 `Do Refactor` 按鈕。

![](/images/posts/android/2021/img1101107-4.png)

## 2. 修改 `build.gradle` applicationID
接著打開 build.gradle(app) 修改 defaultConfig 內的 applicationID 與 Package Name 相同即可。修改完成記得點選 Sync Now。

![](/images/posts/android/2021/img1101107-5.png)

## 3. 修改專案路徑
最後一個步驟打開 `settings.gradle` 修改專案路徑。修改完成記得點選 Sync Now。

![](/images/posts/android/2021/img1101107-6.png)


修改完成後將會看到已經更新專案名稱了。記得如果有需要修改 APP 名稱記得到 `values` 資料夾中 `strings.xml` 進行更改。

![](/images/posts/android/2021/img1101107-7.png)
