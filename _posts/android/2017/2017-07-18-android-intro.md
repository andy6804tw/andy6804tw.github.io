---
layout: post
title: '[Android新手] Android Studio 環境設定'
categories: Android
description: Android 環境設定教學
keywords: Android Studio
---

<img src="https://cdn57.androidauthority.net/wp-content/uploads/2017/05/android-studio-logo-840x359.png" width="550" >

哈囉大家好!
今天要來教各位基本的Android環境設定與如何建置版本控制環境
首先，到Android Studio的官網下載開發環境(容量蠻大的)

https://developer.android.com/studio/index.html


##### 1. 建立專案
安裝好後就直接執行它吧!首次打開可以新建一個專案，在這部分鍵入專案名稱，company domain視情況命名，這跟之後上架App比較有關連，選好儲存路徑後就持續下一步開啟一個Empty的專案吧。

<img src="https://2.bp.blogspot.com/-sBQ4kkmBqyA/WW3kIpZd_3I/AAAAAAAABro/FS28R3WfNVwsaVTnuXGcC7DJQHqAK1x3ACLcBGAs/s1600/1.png">

##### 2.環境設定
接下來我們來做簡單環境設定，個人喜歡黑色版面(顧眼睛)
 File->Settings->Appearance 選取主題Theme選取Darcula

<img src="https://1.bp.blogspot.com/-g2PT34dsow8/WW3lF-4wotI/AAAAAAAABrs/ddohUYZOVj4B1o1lbSxhhzh3WSnGACkdgCLcBGAs/s1600/2.png">

##### 3.自動 import
有時候貼上程式碼或是自己寫Code時常常要引入函式庫，選取自動匯入系統就會偵測依照您目前狀態匯入適合的library
 File->Settings->Editor->General->Auto Import 選取All自動匯入lib

<img src="https://3.bp.blogspot.com/-mO_q3Ma9I5o/WW3mHuS_pvI/AAAAAAAABrw/iUdYApfQmbg4beISrVO4xOpNJSMq2cXewCLcBGAs/s640/3.png">

##### 4. 與 git 連動

版本控制是製作專案的最重要部分，這這片文章中先教各位檢察環境

建議安裝Android Studio之前先到以下網站下載

Git : https://git-scm.com/

之後再Android Studio中`File->Settings->Version Control->Git `點選Test測試看看有沒有連動萬一沒有的話請選擇當初安裝Git的磁碟機底下的位置，基本上安裝預設都會在這`C:\Program Files\Git\cmd\git.exe`

<img src="https://4.bp.blogspot.com/-1jzriqUS2y8/WW3nrSpM47I/AAAAAAAABr4/XQeVksFxkwMaAjp-2DFUFj02HwqW145VwCLcBGAs/s1600/4.png">

下篇教學再教各位如何使用Git bash命令提示字元方式做版本控制，且上傳到遠端GitHub中 !