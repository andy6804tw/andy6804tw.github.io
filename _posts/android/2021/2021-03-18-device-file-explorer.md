---
layout: post
title: 'Android Studio 查看模擬器資料夾內容'
categories: 'Android'
description: 
keywords: View on-device files with Device File Explorer
---

## 前言
平時使用 Android Studio 模擬器進行除錯，有時候會直接將照片輸出至相簿中。但要如何進入資料夾將圖片複製出來呢？這時就可以採用 `Device File Explorer ` 來幫助我們在 Android 設備上查看、複製和刪除文件。

## 操作
如需使用設備的文件系統，請按以下步驟操作：

1.  依次點擊View > Tool Windows > Device File Explorer或點擊工具窗口欄中的Device File Explorer ![](https://developer.android.com/studio/images/buttons/toolbar-device-file-explorer.png) 按鈕以打開設備文件瀏覽器。

2. 從下拉列表中選擇一個設備。

3. 在文件瀏覽器的畫面中可以尋找你要的資料夾路徑。

![](/images/posts/android/2021/img1100318-1.png)

假設要將相簿的資料夾複製出來，可以在資料夾名稱點選右鍵 > Save As ，將資料夾輸出至指定位置。

![](/images/posts/android/2021/img1100318-2.png)