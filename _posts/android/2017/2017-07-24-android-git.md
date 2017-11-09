---
layout: post
title: '[Android新手] Android Studio git簡單上傳專案到GitHub'
categories: Android
description: Android Studio git簡單上傳專案到GitHub
keywords: Android Studio
---

[上篇教學](/2017/07/18/android-intro/)Android Studio初始化設定教到如何建置git環境
本篇教學會教您如何把本機端的專案上Git並儲存到遠端資料庫GitHub當中

## 前置作業
1. 到GitHub申請一組個人帳號
2. 切記要安裝git套件(在上篇教學最後有提到)

## 教學

##### 1. 開啟終端機
在搜尋列開啟git Bash若沒看到請安裝 git 套件哦，mac 使用者請安裝 [iterm2](https://www.iterm2.com/)，開啟後把先前所建好的Android專案的資料夾打開找到路徑在git Bash中輸入cd ***  (***為你的專案實際位置，這邊有個小技巧，您可以使用拖拉方式到 git Bash 路徑就會自動跑出來囉)

<img src="https://2.bp.blogspot.com/-L7UakysV4yI/WXWVpfs13uI/AAAAAAAABsg/quHzZAQ92nYT529mjKTtFZkZ8x8Qq_s0wCLcBGAs/s1600/1.png">

##### 2. git初始化專案

初始化git專案指令=> `git init`
之後在Android Studio介面中就會自動偵測到你有VCS root

```
$ git init
```

<img src="https://2.bp.blogspot.com/-wpBRHTqVShM/WXWWP9nvoXI/AAAAAAAABsk/KfXDdpn18hELcwBOIdGfzsL1-wYFqX7VACLcBGAs/s640/2.png">

`git status `可以查詢您目前的專案中 git 狀態，像圖中尚未 commit 所以偵測到下列檔案未上git

```
$ git status
```

<img src="https://2.bp.blogspot.com/-xnsfYQcwrYA/WXWW1suveLI/AAAAAAAABso/sMctAdukUWUTyamSDTkH4l6jh6XzjPL3QCLcBGAs/s1600/3.png">


##### 3. 新增 git 檔案

把資料上索引，這邊你把它想成我要提交一次git要寫申請書告知有哪些檔案
`git add .` (注意後面有一點哦)

```
$ git add .
```

<img src="https://2.bp.blogspot.com/-liAPSHfuQIc/WXWXtKMv69I/AAAAAAAABsw/OQWU0nAYLI4OqMg_qX-Zxm_cNw72gDgCQCLcBGAs/s1600/4.png">

##### 4. 提交 commit

此步驟還只是在您的本機中建立git紀錄哦

`git commit –m ‘第一次上傳’`  (單引號內為備註使用者可自行說明此次上傳說明)

```
$ git commit –m ‘第一次上傳’
```
<img src="https://3.bp.blogspot.com/-YIn1yC505hE/WXWYhCzKcNI/AAAAAAAABs4/4OnD7wyEVCEU7glOzpjWHO1lYMrrWxk9gCLcBGAs/s1600/5.png">

之後你會發現它會要求您輸入資訊，誰上傳誰留下痕跡當然要留下你的資訊才知道這份文件是誰修改的呀!
```
$ git config --global user.email "you@example.com"
$ git config --global user.name "Your Name"
```
最後在下一次`git commit –m ‘第一次上傳’`就成功囉!

>到上述步驟其實就已間簡單完成版本控制了，但還尚未結束先前不是有提到GitHub嗎?
這部份我們使用GitHub作為我們專案儲存的地方當然你也可以使用其他的例如BitBucket等...
GitHub是什麼?你可以簡單想成它是一個遠端的數據庫也就是一個讓你可以儲存Code的空間
有一種Google drive的概念，不過他的特點是你啥時修改上傳平台上一一的做紀錄，所以哪天某位合作夥伴不小心寫壞了專案第一時間可以知道是誰搞的鬼，另一方面也可以及時調回前一版本的檔案。

##### 5. GitHub 建立 Repositories

到GitHub註冊帳號登入進去後新增第一個Repositories輸入你的專案名稱這裡寫GitTest

<img src="https://2.bp.blogspot.com/-xPQmS9cX1YM/WXWaVr3I0aI/AAAAAAAABtE/T9kLKUHHWSMVuXHFfSaR7zmFxA_j2CiogCLcBGAs/s1600/6.png">

##### 6. push到遠端數據庫

Creat之後會給你一段git程式碼把它複製貼放你的git bash就可以把本地端的檔案上傳到據庫囉，以下是我的位置不要照貼啊！！
```
$ git remote add origin https://github.com/andy6804tw/GitTest.git
$ git push -u origin master
```

<img src="https://2.bp.blogspot.com/-3waFgNh0lRs/WXWbT_gAsQI/AAAAAAAABtM/svQHFLtwA9wZcFooUw9XxUMTHyKMpYhfwCLcBGAs/s1600/7.png">


最後上傳成功回到網頁上重新整理就會發先檔案已經全部上傳囉!
是不是很快速又方便，雖然網路上有許多git的GUI圖形介面化的軟體例如：[GitHub Desktop](https://desktop.github.com/)、[SourceTree](https://www.sourcetreeapp.com/)，簡單按個幾下也可以做出上步驟，所以下篇教學打算來完整說明git的運作流程與圖形化界面的操作。
